"use client";
import { useEffect, useState } from "react";
import { boletosAPI, Boleto } from "@/lib/api";

export default function TicketsTable() {
  const [tickets, setTickets] = useState<Boleto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTickets();
  }, []);

  async function loadTickets() {
    try {
      const data = await boletosAPI.getTransparencia();
      setTickets(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al cargar boletos");
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-lg border p-6 sm:p-8 text-center">
        <div className="animate-spin mx-auto w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Cargando boletos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border p-4 bg-destructive/10 text-destructive text-sm">
        Error al cargar boletos: {error}
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      {/* Versión móvil: Cards */}
      <div className="block sm:hidden space-y-3 p-4">
        {tickets.map((t, i) => (
          <div key={i} className="rounded-lg border bg-card p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-muted-foreground">Número</span>
              <span className="text-base font-bold">#{t.numero_boleto}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-muted-foreground">Nombre</span>
              <span className="text-sm">{t.nombre}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-muted-foreground">Fecha</span>
              <span className="text-sm">
                {new Date(t.fecha_registro).toLocaleDateString("es-MX", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
        {tickets.length === 0 && (
          <div className="p-6 text-center text-sm text-muted-foreground">
            Aún no hay boletos confirmados
          </div>
        )}
      </div>

      {/* Versión desktop: Tabla */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50 dark:bg-muted">
            <tr>
              <th className="text-left p-3 font-semibold">Número</th>
              <th className="text-left p-3 font-semibold">Nombre</th>
              <th className="text-left p-3 font-semibold">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t, i) => (
              <tr key={i} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="p-3 font-medium">#{t.numero_boleto}</td>
                <td className="p-3">{t.nombre}</td>
                <td className="p-3">
                  {new Date(t.fecha_registro).toLocaleDateString("es-MX", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr>
                <td colSpan={3} className="p-6 text-center text-muted-foreground">
                  Aún no hay boletos confirmados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
