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
      // Deseleccionar boleto
      setSelectedTickets(selectedTickets.filter(t => t !== numero));
    } else {
      // Seleccionar boleto (máximo 5)
      if (selectedTickets.length >= 5) {
        alert('Puedes seleccionar un máximo de 5 boletos.');
        return;
      }
      setSelectedTickets([...selectedTickets, numero]);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Cargando boletos...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="text-center py-8">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Reintentar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Selecciona tus boletos</CardTitle>
          <Badge variant="secondary">
            {selectedTickets.length}/5 boletos seleccionados
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedTickets.length > 0 && (
          <Card className="bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-3">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                Boletos seleccionados:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedTickets.map(numero => (
                  <Badge key={numero} variant="default" className="font-mono">
                    {numero.padStart(3, '0')}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 gap-2">
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
                  p-3 h-auto font-mono text-sm font-bold
                  transition-all duration-200 transform hover:scale-105
                  ${!isAvailable
                    ? 'opacity-50 cursor-not-allowed'
                    : isSelected
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                    : 'hover:bg-blue-100 border-2 border-blue-300'
                  }
                `}
                title={
                  !isAvailable 
                    ? `Boleto ${numero_boleto} - ${estado}` 
                    : `Boleto ${numero_boleto} - Disponible`
                }
              >
                {numero_boleto.padStart(3, '0')}
              </Button>
            );
          })}
        </div>

        <Card className="bg-muted/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-background border-2 border-blue-300 rounded"></div>
                <span>Disponible</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
                <span>Seleccionado</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-muted rounded"></div>
                <span>No disponible</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}