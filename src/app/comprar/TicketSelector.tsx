'use client';
import { useEffect, useState } from 'react';
import { boletosAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Boleto = {
  numero_boleto: string;
  estado: 'disponible' | 'reservado' | 'pendiente' | 'confirmado';
};

export default function TicketSelector({
  selectedTickets,
  setSelectedTickets,
}: {
  selectedTickets: string[];
  setSelectedTickets: (tickets: string[]) => void;
}) {
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoletos = async () => {
      try {
        setLoading(true);
        const data = await boletosAPI.getCatalogo();
        setBoletos(data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching boletos:', error);
        setError('No se pudieron cargar los boletos. Intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchBoletos();
  }, []);

  const handleTicketSelect = (numero: string) => {
    if (selectedTickets.includes(numero)) {
      setSelectedTickets(selectedTickets.filter(t => t !== numero));
    } else {
      if (selectedTickets.length >= 5) {
        alert('Puedes seleccionar un máximo de 5 boletos.');
        return;
      }
      setSelectedTickets([...selectedTickets, numero]);
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col sm:flex-row justify-center items-center py-8 gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="text-sm sm:text-base">Cargando boletos...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive w-full">
        <CardContent className="text-center py-6 sm:py-8 px-4">
          <p className="text-destructive mb-4 text-sm sm:text-base">{error}</p>
          <Button onClick={() => window.location.reload()} className="w-full sm:w-auto">
            Reintentar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <CardTitle className="text-base sm:text-lg">Selecciona tus boletos</CardTitle>
          <Badge variant="secondary" className="w-fit text-xs sm:text-sm">
            {selectedTickets.length}/5 seleccionados
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-4 sm:px-6">
        {selectedTickets.length > 0 && (
          <Card className="bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-3 sm:p-4">
              <p className="text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                Boletos seleccionados:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedTickets.map(numero => (
                  <Badge key={numero} variant="default" className="font-mono text-xs sm:text-sm">
                    {numero.padStart(3, '0')}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Grid responsive optimizado para diferentes tamaños de pantalla */}
        <div className="grid grid-cols-5 xs:grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 2xl:grid-cols-20 gap-1.5 sm:gap-2">
          {boletos.map(({ numero_boleto, estado }) => {
            const isSelected = selectedTickets.includes(numero_boleto);
            const isAvailable = estado === 'disponible';

            return (
              <Button
                key={numero_boleto}
                type="button"
                variant={!isAvailable ? "ghost" : isSelected ? "default" : "outline"}
                onClick={() => isAvailable && handleTicketSelect(numero_boleto)}
                disabled={!isAvailable}
                className={`
                  aspect-square p-1 sm:p-2 h-auto font-mono text-[10px] xs:text-xs sm:text-sm font-bold
                  transition-all duration-200 hover:scale-105 active:scale-95
                  ${!isAvailable
                    ? 'opacity-50 cursor-not-allowed bg-muted text-muted-foreground border border-muted-foreground/20'
                    : isSelected
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-md sm:shadow-lg border-2 border-green-500'
                    : 'bg-background hover:bg-blue-50 dark:hover:bg-blue-950 border-2 border-blue-400 dark:border-blue-600 text-foreground hover:border-blue-600 dark:hover:border-blue-400 shadow-sm'
                  }
                `}
                title={
                  !isAvailable 
                    ? `Boleto ${numero_boleto} - ${estado}` 
                    : `Boleto ${numero_boleto} - Disponible`
                }
              >
                <span className="truncate">{numero_boleto.padStart(3, '0')}</span>
              </Button>
            );
          })}
        </div>

        {/* Leyenda responsive */}
        <Card className="bg-muted/30 border border-border">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col gap-2">
              <span className="font-medium text-xs sm:text-sm text-muted-foreground sm:hidden">
                Leyenda:
              </span>
              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-background border-2 border-blue-400 dark:border-blue-600 rounded shrink-0 shadow-sm"></div>
                  <span>Disponible</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-600 border-2 border-green-500 rounded shrink-0 shadow-sm"></div>
                  <span>Seleccionado</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-muted border border-muted-foreground/20 rounded shrink-0"></div>
                  <span>No disponible</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}