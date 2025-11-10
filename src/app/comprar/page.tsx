import PaymentForm from "./PaymentForm";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ComprarPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          🎫 Comprar tu Boleto
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Premio:</span>
                <span className="font-medium">Kit Gamer 4-en-1 Profesional</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Precio por boleto:</span>
                <span className="font-bold text-primary text-lg">$30 MXN</span>
              </div>
              <div className="flex justify-between">
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
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Completa el formulario con tus datos</span>
              </div>
              <div className="flex gap-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Selecciona tus números de la suerte</span>
              </div>
              <div className="flex gap-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Sube tu comprobante de pago</span>
              </div>
              <div className="flex gap-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/premios">
                🏆 Ver detalles del premio
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/transparencia">
                👀 Ver boletos participantes
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/reglamento">
                📋 Leer reglamento
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}