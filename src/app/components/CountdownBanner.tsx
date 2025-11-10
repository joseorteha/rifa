"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function formatRemaining(ms: number) {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  const s = Math.floor(ms / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  return { days, hours, minutes, seconds, expired: false };
}

export default function CountdownBanner({ endDate }: { endDate: Date }) {
  const [remaining, setRemaining] = useState<number>(endDate.getTime() - Date.now());
  
  useEffect(() => {
    const id = setInterval(() => setRemaining(endDate.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [endDate]);

  const time = formatRemaining(remaining);

  if (time.expired) {
    return (
      <Card className="mx-auto max-w-4xl text-center">
        <CardHeader>
          <CardTitle className="text-2xl">¡El sorteo ha finalizado!</CardTitle>
          <CardDescription>
            El período de venta de boletos ha terminado. Gracias por participar.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/transparencia">
              Ver resultados
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-4xl overflow-hidden">
      <CardHeader className="text-center pb-4">
        <Badge variant="secondary" className="w-fit mx-auto">
          ⏰ Tiempo limitado
        </Badge>
        <CardTitle className="mt-2 text-2xl sm:text-3xl">
          El sorteo termina en:
        </CardTitle>
        <CardDescription className="text-base">
          No esperes hasta el último momento. Asegura tu boleto ahora.
        </CardDescription>
      </CardHeader>

      {/* Countdown Display */}
      <CardContent className="border-t px-6 py-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: time.days, label: 'Días' },
            { value: time.hours, label: 'Horas' },
            { value: time.minutes, label: 'Minutos' },
            { value: time.seconds, label: 'Segundos' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="rounded-lg border bg-background p-4 shadow-sm">
                <div className="text-2xl font-bold tabular-nums tracking-tight sm:text-3xl font-mono">
                  {String(item.value).padStart(2, "0")}
                </div>
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Call to Action */}
      <CardFooter className="border-t bg-muted/30 flex-col gap-4 p-6 text-center">
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <span>📍</span>
            <span>Sorteo: 18 de noviembre, 8:00 PM</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>🏆</span>
            <span>Premio: Kit Gamer 4-en-1</span>
            <span>•</span>
            <span>💰 Precio: $30 MXN</span>
          </div>
        </div>
        
        <Button size="lg" asChild>
          <Link href="/comprar">
            Comprar mi boleto
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}