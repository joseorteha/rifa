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
      <div className="rounded-lg border p-8 text-center">
        <div className="animate-spin mx-auto w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        <p className="mt-2 text-sm text-muted-foreground">Cargando disponibilidad...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border p-4 bg-destructive/10 text-destructive">
        Error al cargar disponibilidad: {error}
      </div>
    );
  }

  const disponibles = rows.filter((r) => r.estado === "disponible").length;
  const pendientes = rows.filter((r) => r.estado === "pendiente").length;
  const confirmados = rows.filter((r) => r.estado === "confirmado").length;

  return (
    <div className="space-y-3">
      <div className="flex gap-3 text-sm">
        <span className="px-2 py-1 rounded-md border bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200">
          Disponibles: {disponibles}
        </span>
        <span className="px-2 py-1 rounded-md border bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200">
          Pendientes: {pendientes}
        </span>
        <span className="px-2 py-1 rounded-md border bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
          Confirmados: {confirmados}
        </span>
      </div>
      
      <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-20 gap-2">
        {rows.map((r) => (
          <div
            key={r.numero_boleto}
            className={`
              p-2 text-center text-xs font-medium rounded border
              ${r.estado === "disponible" 
                ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700"
                : r.estado === "pendiente"
                ? "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700"
                : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700"
              }
            `}
          >
            {r.numero_boleto}
          </div>
        ))}
      </div>
    </div>
  );
}