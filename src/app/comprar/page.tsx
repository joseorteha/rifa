import PaymentForm from "./PaymentForm";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ComprarPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 py-6 md:py-8">
      {/* Header */}
      <div className="text-center space-y-3 md:space-y-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          🎫 Comprar tu Boleto
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          ¡Estás a unos pasos de apoyar al equipo Siera Code y participar por el increíble Kit Gamer 4-en-1!
        </p>
      </div>

      {/* Información del sorteo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🏆</span>
            Detalles del Sorteo
          </CardTitle>
        </CardHeader>
        <CardContent className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-muted-foreground">Premio:</span>
                <span className="font-medium">Kit Gamer 4-en-1 Profesional</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-muted-foreground">Precio por boleto:</span>
                <span className="font-bold text-primary text-lg">$30 MXN</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-muted-foreground">Fecha del sorteo:</span>
                <span className="font-medium">21 de noviembre, 8:00 PM</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span>💡</span>
              <span>¿Cómo funciona?</span>
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                <span>Completa el formulario con tus datos</span>
              </div>
              <div className="flex gap-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                <span>Selecciona tus números de la suerte</span>
              </div>
              <div className="flex gap-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                <span>Sube tu comprobante de pago</span>
              </div>
              <div className="flex gap-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</span>
                <span>¡Listo! Ya estás participando</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulario */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Registra tu Boleto</CardTitle>
          <p className="text-muted-foreground">Completa la información para participar en el sorteo</p>
        </CardHeader>
        <CardContent>
          <PaymentForm />
        </CardContent>
      </Card>

      {/* Enlaces útiles */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-center mb-4">¿Necesitas más información?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button variant="outline" className="w-full shadow-sm border-2 border-blue-400 text-blue-700 bg-muted/30 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-950/30" asChild>
              <Link href="/premios" className="flex items-center justify-center gap-2">
                🏆 <span className="hidden sm:inline">Ver detalles del</span> Premio
              </Link>
            </Button>
            <Button variant="outline" className="w-full shadow-sm border-2 border-green-400 text-green-700 bg-muted/30 hover:bg-green-50 dark:border-green-600 dark:text-green-300 dark:hover:bg-green-950/30" asChild>
              <Link href="/transparencia" className="flex items-center justify-center gap-2">
                👀 <span className="hidden sm:inline">Ver</span> Boletos<span className="hidden sm:inline"> participantes</span>
              </Link>
            </Button>
            <Button variant="outline" className="w-full shadow-sm border-2 border-amber-400 text-amber-700 bg-muted/30 hover:bg-amber-50 dark:border-amber-600 dark:text-amber-300 dark:hover:bg-amber-950/30" asChild>
              <Link href="/reglamento" className="flex items-center justify-center gap-2">
                📋 <span className="hidden sm:inline">Leer</span> Reglamento
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}