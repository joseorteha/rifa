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
  // Fecha de inicio de la rifa: 12 de noviembre de 2025 a las 12:00 PM (hora local)
  const startDate = new Date(2025, 10, 12, 12, 0, 0);
  // Fecha de fin: la que se pasa como parámetro (21 de noviembre de 2025)
  
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  
  useEffect(() => {
    const id = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const now = currentTime;
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();

  // Determinar el estado actual
  const beforeStart = now < startTime;
  const duringRifa = now >= startTime && now <= endTime;
  const afterEnd = now > endTime;

  // Calcular tiempo restante según el estado
  let targetTime: number;
  let timeRemaining: number;
  let title: string;
  let description: string;
  
  if (beforeStart) {
    // Antes del inicio - mostrar tiempo hasta que comience
    targetTime = startTime;
    timeRemaining = startTime - now;
    title = "La rifa comienza en:";
    description = "Prepárate para participar. ¡Pronto podrás comprar tu boleto!";
  } else if (duringRifa) {
    // Durante la rifa - mostrar tiempo hasta que termine
    targetTime = endTime;
    timeRemaining = endTime - now;
    title = "El sorteo termina en:";
    description = "No esperes hasta el último momento. Asegura tu boleto ahora.";
  } else {
    // Después del fin - rifa terminada
    timeRemaining = 0;
    title = "";
    description = "";
  }

  const time = formatRemaining(timeRemaining);

  if (afterEnd) {
    return (
      <Card className="mx-auto max-w-4xl text-center">
        <CardHeader>
          <CardTitle className="text-2xl">¡El sorteo ha finalizado!</CardTitle>
          <CardDescription>
            El período de venta de boletos ha terminado. Gracias por participar.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button className="shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground border border-border" asChild>
            <Link href="/transparencia" className="flex items-center gap-2">
              🏆 Ver resultados
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
          {title}
        </CardTitle>
        <CardDescription className="text-base">
          {description}
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
            <span>📅</span>
            <span>
              {beforeStart 
                ? "Rifa inicia: 12 de noviembre, 12:00 PM"
                : "Sorteo: 21 de noviembre, 8:00 PM"
              }
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>🏆</span>
            <span>Premio: Kit Gamer 4-en-1</span>
            <span>•</span>
            <span>💰 Precio: $30 MXN</span>
          </div>
        </div>
        
        <Button size="lg" className="shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary/20 hover:border-primary/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" asChild disabled={beforeStart}>
          <Link href="/comprar" className="flex items-center gap-2">
            {beforeStart ? "⏳ Próximamente disponible" : "🎫 Comprar mi boleto"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}