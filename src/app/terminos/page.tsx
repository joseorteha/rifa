import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          📋 Términos y Condiciones
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Rifa Solidaria Siera Code - TecNM Zongolica
        </p>
        <p className="text-sm text-muted-foreground">
          Última actualización: 12 de noviembre de 2025
        </p>
      </div>

      {/* Contenido */}
      <div className="prose prose-sm sm:prose dark:prose-invert max-w-none space-y-6">
        
        <section className="rounded-lg border bg-card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <span>1.</span>
            <span>Objetivo de la Rifa</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Esta rifa solidaria tiene como único objetivo recaudar fondos para apoyar al equipo <strong>Siera Code</strong> del 
            <strong> TecNM Campus Zongolica</strong> en su participación en el <strong>HackaTec Nacional 2025</strong> en Pachuca. 
            Los fondos recaudados se destinarán exclusivamente a cubrir gastos de hospedaje y alimentación del equipo durante el evento.
          </p>
        </section>

        <section className="rounded-lg border bg-card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <span>2.</span>
            <span>Premio</span>
          </h2>
          <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
            <p className="leading-relaxed">
              El premio de esta rifa es un <strong>Kit Gamer 4-en-1 Profesional "Lobo del Trueno TF800"</strong>, 
              que incluye:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Teclado mecánico español QWERTY con switches Cherry MX Red</li>
              <li>Mouse gaming óptico 1,200 DPI con sensor PixArt 3360</li>
              <li>Audífonos gaming con cable trenzado de 210cm</li>
              <li>Mousepad antideslizante incluido</li>
            </ul>
            <p className="leading-relaxed">
              El premio será entregado al ganador en perfectas condiciones, tal como se muestra en las fotografías publicadas 
              en la sección de "Premios" de este sitio web.
            </p>
          </div>
        </section>

        <section className="rounded-lg border bg-card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <span>3.</span>
            <span>Participación</span>
          </h2>
          <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
            <h3 className="font-semibold text-foreground">3.1 Elegibilidad</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Pueden participar personas mayores de edad o menores con autorización de un tutor legal</li>
              <li>No hay restricciones geográficas dentro de México</li>
              <li>Los organizadores y sus familiares directos pueden participar, pero su participación será pública y transparente</li>
            </ul>

            <h3 className="font-semibold text-foreground mt-4">3.2 Costo del Boleto</h3>
            <p className="leading-relaxed">
              Cada boleto tiene un costo de <strong>$30.00 MXN (treinta pesos mexicanos)</strong>. 
              Cada participante puede adquirir un máximo de <strong>5 boletos</strong> por compra.
            </p>

            <h3 className="font-semibold text-foreground mt-4">3.3 Proceso de Compra</h3>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>El participante debe registrarse en el sitio web con su correo electrónico</li>
              <li>Seleccionar los números de boleto deseados</li>
              <li>Realizar la transferencia bancaria por el monto total</li>
              <li>Subir el comprobante de pago en el formulario de registro</li>
              <li>Esperar la validación del equipo organizador (máximo 24 horas)</li>
            </ol>
          </div>
        </section>

        <section className="rounded-lg border bg-card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <span>4.</span>
            <span>Validación de Boletos</span>
          </h2>
          <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
            <p className="leading-relaxed">
              Una vez recibido el comprobante de pago, el equipo organizador verificará la transferencia. Si todo está correcto:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>El boleto pasará de estado "pendiente" a "confirmado"</li>
              <li>El número aparecerá públicamente en la sección de "Transparencia"</li>
              <li>El participante recibirá una confirmación por correo electrónico</li>
            </ul>
            <p className="leading-relaxed mt-3">
              <strong>Importante:</strong> Solo los boletos con estado "confirmado" participarán en el sorteo final.
            </p>
          </div>
        </section>

        <section className="rounded-lg border bg-card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <span>5.</span>
            <span>Transparencia</span>
          </h2>
          <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
            <p className="leading-relaxed">
              Nos comprometemos a mantener total transparencia en todo el proceso:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Todos los boletos confirmados son visibles públicamente en la sección "Transparencia"</li>
              <li>Se muestra únicamente: número de boleto, sede del participante (si aplica) y fecha de registro</li>
              <li>Los datos personales completos están protegidos y no serán compartidos públicamente</li>
              <li>El estado de disponibilidad de todos los boletos es visible en tiempo real</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg border bg-card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <span>6.</span>
            <span>Sorteo</span>
          </h2>
          <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
            <h3 className="font-semibold text-foreground">6.1 Fecha y Hora</h3>
            <p className="leading-relaxed">
              El sorteo se realizará el <strong>23 de noviembre de 2025 a las 8:00 PM</strong> (hora del centro de México).
            </p>

            <h3 className="font-semibold text-foreground mt-4">6.2 Transmisión en Vivo</h3>
            <p className="leading-relaxed">
              El sorteo será transmitido EN VIVO a través de Facebook para garantizar total transparencia. 
              El link de transmisión se publicará con anticipación en nuestras redes sociales oficiales.
            </p>

            <h3 className="font-semibold text-foreground mt-4">6.3 Método de Selección</h3>
            <p className="leading-relaxed">
              El ganador será seleccionado de manera aleatoria utilizando una herramienta de sorteo digital verificable. 
              Solo participarán los boletos con estado "confirmado" al momento del sorteo.
            </p>

            <h3 className="font-semibold text-foreground mt-4">6.4 Anuncio del Ganador</h3>
            <p className="leading-relaxed">
              El número ganador será anunciado durante la transmisión en vivo y publicado inmediatamente en el sitio web 
              y redes sociales oficiales.
            </p>
          </div>
        </section>

        <section className="rounded-lg border bg-card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <span>7.</span>
            <span>Entrega del Premio</span>
          </h2>
          <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
            <h3 className="font-semibold text-foreground">7.1 Notificación</h3>
            <p className="leading-relaxed">
              El ganador será contactado por correo electrónico y/o teléfono (si proporcionó estos datos) 
              dentro de las 48 horas posteriores al sorteo.
            </p>

            <h3 className="font-semibold text-foreground mt-4">7.2 Verificación de Identidad</h3>
            <p className="leading-relaxed">
              El ganador deberá presentar una identificación oficial para reclamar su premio y confirmar 
              que es el titular del boleto ganador.
            </p>

            <h3 className="font-semibold text-foreground mt-4">7.3 Opciones de Entrega</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Entrega personal:</strong> En las instalaciones del TecNM Zongolica (preferido)</li>
              <li><strong>Envío:</strong> Por paquetería a cargo del ganador (costo de envío no incluido)</li>
            </ul>

            <h3 className="font-semibold text-foreground mt-4">7.4 Plazo para Reclamar</h3>
            <p className="leading-relaxed">
              El ganador tendrá un plazo de <strong>30 días naturales</strong> para reclamar su premio. 
              Después de este periodo, si no se ha establecido contacto, se realizará un nuevo sorteo entre 
              los boletos participantes restantes.
            </p>
          </div>
        </section>

        <section className="rounded-lg border bg-card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <span>8.</span>
            <span>Protección de Datos Personales</span>
          </h2>
          <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
            <p className="leading-relaxed">
              Todos los datos personales proporcionados serán tratados conforme a la Ley Federal de Protección de 
              Datos Personales en Posesión de los Particulares:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Los datos se utilizarán únicamente para gestionar la rifa y contactar al ganador</li>
              <li>No compartiremos datos personales con terceros</li>
              <li>Solo se publicará información básica (número de boleto, sede general) en la sección de transparencia</li>
              <li>Los participantes pueden solicitar la eliminación de sus datos después del sorteo</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg border bg-card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <span>9.</span>
            <span>Cancelaciones y Reembolsos</span>
          </h2>
          <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
            <h3 className="font-semibold text-foreground">9.1 Cancelación por el Participante</h3>
            <p className="leading-relaxed">
              Una vez confirmado el pago, <strong>no se aceptan cancelaciones ni reembolsos</strong>, 
              ya que los fondos se destinan inmediatamente a los gastos del evento.
            </p>

            <h3 className="font-semibold text-foreground mt-4">9.2 Cancelación del Evento</h3>
            <p className="leading-relaxed">
              En caso de que el HackaTec Nacional 2025 sea cancelado y la rifa no pueda realizarse:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Se realizará el sorteo de todas formas en la fecha programada</li>
              <li>Los fondos recaudados se donarán a una causa benéfica local (a definir con transparencia)</li>
              <li>El premio será entregado normalmente al ganador</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg border bg-card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <span>10.</span>
            <span>Responsabilidades</span>
          </h2>
          <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
            <p className="leading-relaxed">
              El equipo organizador (Siera Code - TecNM Zongolica):
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Se compromete a realizar el sorteo en la fecha y hora establecidas</li>
              <li>Garantiza que el premio está en perfectas condiciones</li>
              <li>Mantendrá la transparencia en todo el proceso</li>
              <li>No se hace responsable por problemas en la transferencia bancaria del participante</li>
              <li>No se hace responsable de daños al premio durante el envío (si el ganador elige esta opción)</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg border bg-card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <span>11.</span>
            <span>Modificaciones</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            El equipo organizador se reserva el derecho de modificar estos términos y condiciones si fuera necesario, 
            notificando a todos los participantes por correo electrónico y actualizando esta página. 
            Las modificaciones no afectarán a boletos ya adquiridos.
          </p>
        </section>

        <section className="rounded-lg border bg-card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <span>12.</span>
            <span>Contacto</span>
          </h2>
          <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
            <p className="leading-relaxed">
              Para cualquier duda, aclaración o comentario sobre la rifa, puedes contactarnos:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Equipo:</strong> Siera Code</li>
              <li><strong>Institución:</strong> TecNM Campus Zongolica</li>
              <li><strong>Ubicación:</strong> Zongolica, Veracruz, México</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg border-2 border-primary bg-primary/5 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
            ✅ Aceptación de Términos
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center">
            Al participar en esta rifa, confirmas que has leído, entendido y aceptado todos estos términos y condiciones. 
            Tu participación implica la aceptación total de estas reglas.
          </p>
        </section>

      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button variant="outline" className="shadow-sm bg-background hover:bg-accent border border-border" asChild>
          <Link href="/reglamento">
            📋 Ver Reglamento
          </Link>
        </Button>
        <Button className="shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
          <Link href="/comprar">
            🎫 Comprar Boleto
          </Link>
        </Button>
      </div>
    </div>
  );
}
