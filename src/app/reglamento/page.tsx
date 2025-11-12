import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ReglamentoPage() {
  const reglas = [
    {
      numero: "1",
      titulo: "Objetivo",
      icono: "🎯",
      contenido: "Recaudar fondos para la participación del equipo 'Siera Code' del TecNM Campus Zongolica en el HackaTec Nacional 2025 en Pachuca, Hidalgo.",
      color: "border-blue-400 bg-background dark:border-blue-600"
    },
    {
      numero: "2", 
      titulo: "Vigencia",
      icono: "📅",
      contenido: "Del 12 de noviembre al 21 de noviembre de 2025, hasta las 20:00 hrs.",
      color: "border-purple-400 bg-background dark:border-purple-600"
    },
    {
      numero: "3",
      titulo: "Costo del Boleto",
      icono: "💰",
      contenido: "$30.00 MXN por boleto. Pago mediante transferencia bancaria.",
      color: "border-green-400 bg-background dark:border-green-600"
    },
    {
      numero: "4",
      titulo: "Proceso de Compra",
      icono: "📝",
      contenido: "1. Registro de usuario → 2. Selección de números → 3. Transferencia → 4. Subida de comprobante → 5. Validación → 6. Confirmación",
      color: "border-orange-400 bg-background dark:border-orange-600"
    },
    {
      numero: "5",
      titulo: "Transparencia",
      icono: "🔍",
      contenido: "Todos los boletos confirmados son visibles públicamente. Solo mostramos número de boleto, nombre del participante y fecha de registro.",
      color: "border-teal-400 bg-background dark:border-teal-600"
    },
    {
      numero: "6",
      titulo: "Sorteo",
      icono: "🎲",
      contenido: "21 de noviembre de 2025 a las 20:00 hrs. Transmisión en vivo por Facebook para máxima transparencia.",
      color: "border-red-400 bg-background dark:border-red-600"
    },
    {
      numero: "7",
      titulo: "Premio",
      icono: "🏆",
      contenido: "Kit Gamer Profesional 4-en-1 Lobo del Trueno TF800. No es canjeable por efectivo ni transferible.",
      color: "border-yellow-400 bg-background dark:border-yellow-600"
    },
    {
      numero: "8",
      titulo: "Privacidad",
      icono: "🔐",
      contenido: "Todos los datos personales están protegidos y serán utilizados únicamente para los fines de esta rifa.",
      color: "border-gray-300 bg-background dark:border-gray-600"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <Badge variant="secondary" className="text-lg px-4 py-2">
          📋 Términos y Condiciones
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Reglamento Oficial
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Rifa Siera Code - HackaTec Nacional 2025
        </p>
      </div>

      {/* Información importante */}
      <Card className="border-amber-400 bg-background dark:border-amber-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
            <span>⚠️</span>
            Información Importante
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground">
          <p>
            Al participar en esta rifa, aceptas automáticamente todos los términos y condiciones aquí establecidos. 
            Es tu responsabilidad leer y entender completamente este reglamento.
          </p>
        </CardContent>
      </Card>

      {/* Reglas */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center">📜 Reglas del Sorteo</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {reglas.map((regla, index) => (
            <Card key={index} className={`${regla.color} transition-all hover:shadow-lg`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm">
                    <span className="text-lg font-bold">{regla.numero}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{regla.icono}</span>
                    <span className="text-lg">{regla.titulo}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{regla.contenido}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Detalles adicionales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📋</span>
            Detalles Adicionales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span>🎟️</span>
                Números Disponibles
              </h4>
              <p className="text-sm text-muted-foreground">
                200 boletos numerados del 001 al 200. Cada participante puede comprar hasta 5 boletos.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span>⏰</span>
                Tiempo de Reserva
              </h4>
              <p className="text-sm text-muted-foreground">
                Los boletos se reservan por 30 minutos después de la selección para completar el pago.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span>✅</span>
                Validación de Pagos
              </h4>
              <p className="text-sm text-muted-foreground">
                Todos los comprobantes son validados manualmente. El proceso puede tomar hasta 24 horas.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span>🚫</span>
                Cancelaciones
              </h4>
              <p className="text-sm text-muted-foreground">
                No se permiten cancelaciones ni reembolsos una vez confirmado el pago.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sección de Soporte */}
      <Card className="border-blue-400 bg-background dark:border-blue-600">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-blue-700 dark:text-blue-300">
            🆘 Soporte y Ayuda
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-foreground">
            ¿Tienes alguna duda o problema? Contáctanos a través de los siguientes medios:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="text-center space-y-3">
              <div className="mx-auto w-16 h-16 rounded-full bg-background border-2 border-blue-300 dark:border-blue-600 flex items-center justify-center">
                <span className="text-2xl">📧</span>
              </div>
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                  Correo Electrónico
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Para dudas sobre pagos, registro o problemas técnicos
                </p>
                <Button asChild variant="outline" size="sm" className="border-2 border-blue-300 bg-background hover:bg-muted/30 text-blue-700 dark:text-blue-300">
                  <Link href="mailto:joseortegahac@gmail.com">
                    joseortegahac@gmail.com
                  </Link>
                </Button>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="text-center space-y-3">
              <div className="mx-auto w-16 h-16 rounded-full bg-background border-2 border-green-300 dark:border-green-600 flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <div>
                <h3 className="font-semibold text-green-700 dark:text-green-300 mb-1">
                  WhatsApp
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Atención rápida para consultas urgentes
                </p>
                <Button asChild variant="outline" size="sm" className="border-green-300 bg-background hover:bg-muted/30 text-green-700 dark:text-green-300">
                  <Link href="https://wa.me/522722968204" target="_blank">
                    +52 272 296 8204
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center p-4 bg-background border-2 border-blue-300 dark:border-blue-600 rounded-lg">
            <p className="text-sm text-foreground">
              <strong>Horario de atención:</strong> Lunes a Domingo, 8:00 AM - 8:00 PM
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="text-center bg-background border-blue-400 dark:border-blue-600">
        <CardContent className="pt-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            ¿Listo para participar?
          </h2>
          <p className="text-muted-foreground">
            Al haber leído el reglamento, ya puedes proceder a comprar tu boleto y participar en la rifa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/comprar">
                🎫 Comprar mi boleto
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-green-300 text-green-700 hover:bg-muted/30 dark:text-green-300">
              <Link href="/transparencia">
                👀 Ver transparencia
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}