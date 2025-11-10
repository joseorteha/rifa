import Link from "next/link";
import CountdownBanner from "./components/CountdownBanner";
import ClientOnly from "./components/ClientOnly";
import PrizeCard from "./components/PrizeCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const sorteoAt = process.env.NEXT_PUBLIC_SORTEO_AT || "2025-11-21T20:00:00";
  const endDate = new Date(sorteoAt);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[6rem_4rem] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]" />
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center px-4">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm">
            🚀 HackaTec Nacional 2025
          </Badge>
          
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            🎉 ¡Apoya al talento del{" "}
            <span className="text-primary">TecNM Zongolica!</span>
          </h1>
          
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Nuestro equipo <span className="font-semibold text-foreground">Siera Code</span> representará 
            a nuestra institución en el <span className="font-semibold text-foreground">HackaTec Nacional 2025</span> en Pachuca, 
            y necesitamos tu ayuda para llegar allá.
          </p>

          <p className="mt-4 max-w-3xl text-base text-muted-foreground">
            Participa en nuestra <span className="font-medium text-foreground">Gran Rifa Solidaria</span> y ayúdanos a cubrir 
            los gastos de estancia allá. ¡Con tu boleto, llevas la innovación zongoliqueña al siguiente nivel!
          </p>

          <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/comprar">
                Comprar boleto ahora ($30 MXN)
              </Link>
            </Button>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold tracking-tight">$35 MXN</div>
              <div className="text-sm text-muted-foreground">por boleto</div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-12">
        <ClientOnly>
          <CountdownBanner endDate={endDate} />
        </ClientOnly>
      </section>

      {/* Prize Section */}
      <section className="border-t bg-muted/30">
        <div className="py-16">
          <div className="mx-auto max-w-2xl text-center px-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Un Premio Increíble te Espera
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Hemos conseguido un Kit Gamer 4-en-1 profesional para nuestro premio principal. 
              Perfecto para estudiar, trabajar o jugar al más alto nivel.
            </p>
          </div>
          
          <div className="mx-auto mt-12 max-w-4xl px-4">
            <ClientOnly>
              <PrizeCard />
            </ClientOnly>
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/premios">
                Ver detalles del premio
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20 border">
              <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Una Rifa Honesta y Transparente
            </h2>
            
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Creemos en la honestidad. Cada boleto validado será visible públicamente (protegiendo tus datos personales) 
              y el sorteo será transmitido en vivo. Tu apoyo es valioso y lo cuidaremos con total transparencia.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto text-4xl">🔍</div>
                <CardTitle className="mt-4">Verificación pública</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Todos los boletos confirmados son visibles públicamente protegiendo tu privacidad
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto text-4xl">📺</div>
                <CardTitle className="mt-4">Sorteo en vivo</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  El sorteo será transmitido en vivo por Facebook para máxima transparencia
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button variant="outline" asChild>
              <Link href="/transparencia">
                Ver boletos participantes
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/reglamento">
                Leer reglamento
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t bg-muted/30">
        <div className="py-16">
          <div className="mx-auto max-w-2xl text-center px-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Listo para participar?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Cada boleto cuenta. Cada apoyo nos acerca más a representar al TecNM Zongolica en el HackaTec Nacional 2025.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/comprar">
                  Comprar mi boleto ahora
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}