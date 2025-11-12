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
      
      // Generar todos los números del 001 al 150
      const allNumbers = Array.from({ length: 150 }, (_, i) => {
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
        <span className="px-3 py-1.5 rounded-md border-2 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800 font-medium">
          ✓ Disponibles: {disponibles}
        </span>
        <span className="px-3 py-1.5 rounded-md border-2 bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800 font-medium">
          ⏳ Pendientes: {pendientes}
        </span>
        <span className="px-3 py-1.5 rounded-md border-2 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800 font-medium">
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
                ? "bg-green-50 text-green-700 border-green-300 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700"
                : r.estado === "pendiente"
                ? "bg-yellow-50 text-yellow-700 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700"
                : "bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700"
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