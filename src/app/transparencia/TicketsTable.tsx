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
      <div className="rounded-lg border p-8 text-center">
        <div className="animate-spin mx-auto w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        <p className="mt-2 text-sm text-muted-foreground">Cargando boletos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border p-4 bg-destructive/10 text-destructive">
        Error al cargar boletos: {error}
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-3">Número</th>
            <th className="text-left p-3">Nombre</th>
            <th className="text-left p-3">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t, i) => (
            <tr key={i} className="border-t odd:bg-background even:bg-muted/50">
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
              <td colSpan={3} className="p-4 text-center text-muted-foreground">
                Aún no hay boletos confirmados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}