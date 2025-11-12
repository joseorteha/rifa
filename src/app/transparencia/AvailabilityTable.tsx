"use client";
import { useEffect, useState } from "react";
import { boletosAPI } from "@/lib/api";

type EstadoRow = {
  numero_boleto: string;
  estado: "disponible" | "pendiente" | "confirmado";
};

export default function AvailabilityTable() {
  const [rows, setRows] = useState<EstadoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAvailability();
  }, []);

  async function loadAvailability() {
    try {
      const data = await boletosAPI.getCatalogo();
      
      // Determinar el total real de boletos.
      // Preferimos el mayor número presente en los datos (por si hay hasta 200 en la BD),
      // luego la variable de entorno NEXT_PUBLIC_TOTAL_BOLETOS si está definida,
      // y por último fallback a 150 para compatibilidad.
      const maxFromData = data && data.length > 0
        ? data.reduce((acc: number, item: any) => {
            const n = parseInt(item.numero_boleto, 10);
            return Number.isFinite(n) ? Math.max(acc, n) : acc;
          }, 0)
        : 0;

      const envTotal = typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_TOTAL_BOLETOS
        ? parseInt(process.env.NEXT_PUBLIC_TOTAL_BOLETOS, 10)
        : NaN;

      const totalBoletos = Math.max(150, maxFromData || 0, Number.isFinite(envTotal) ? envTotal : 0);

      // Generar rangos desde 1 hasta totalBoletos (ej. 200)
      const allNumbers = Array.from({ length: totalBoletos }, (_, i) => {
        const numero = String(i + 1).padStart(3, '0');
        const found = data.find((item: any) => item.numero_boleto === numero);
        return {
          numero_boleto: numero,
          estado: found?.estado || 'disponible'
        };
      });
      
      setRows(allNumbers);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al cargar disponibilidad");
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-lg border p-6 sm:p-8 text-center">
        <div className="animate-spin mx-auto w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Cargando disponibilidad...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border p-4 bg-destructive/10 text-destructive text-sm">
        Error al cargar disponibilidad: {error}
      </div>
    );
  }

  const disponibles = rows.filter((r) => r.estado === "disponible").length;
  const pendientes = rows.filter((r) => r.estado === "pendiente").length;
  const confirmados = rows.filter((r) => r.estado === "confirmado").length;

  return (
    <div className="space-y-4">
      {/* Estadísticas responsive */}
      <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
        <span className="px-3 py-1.5 rounded-md border-2 bg-background text-foreground border-blue-400 dark:border-blue-500 font-medium">
          ✓ Disponibles: {disponibles}
        </span>
        <span className="px-3 py-1.5 rounded-md border-2 bg-background text-amber-700 border-amber-400 dark:text-amber-300 dark:border-amber-600 font-medium">
          ⏳ Pendientes: {pendientes}
        </span>
        <span className="px-3 py-1.5 rounded-md border-2 bg-background text-emerald-700 border-emerald-400 dark:text-emerald-300 dark:border-emerald-600 font-medium">
          ✅ Confirmados: {confirmados}
        </span>
      </div>
      
      {/* Grid responsive de boletos */}
      <div className="grid grid-cols-5 xs:grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 2xl:grid-cols-20 gap-1.5 sm:gap-2">
        {rows.map((r) => (
          <div
            key={r.numero_boleto}
            className={`
              p-1.5 sm:p-2 text-center text-[10px] xs:text-xs sm:text-sm font-bold rounded border-2 transition-all duration-200
              ${r.estado === "disponible" 
                ? "bg-background text-foreground border-blue-400 dark:border-blue-500"
                : r.estado === "pendiente"
                ? "bg-background text-amber-700 border-amber-400 dark:text-amber-300 dark:border-amber-600"
                : "bg-background text-emerald-700 border-emerald-400 dark:text-emerald-300 dark:border-emerald-600"
              }
            `}
            title={`Boleto ${r.numero_boleto} - ${r.estado}`}
          >
            {r.numero_boleto}
          </div>
        ))}
      </div>
    </div>
  );
}