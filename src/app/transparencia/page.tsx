import TicketsTable from "./TicketsTable";
import AvailabilityTable from "./AvailabilityTable";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function TransparenciaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 py-6 sm:py-8">
      {/* Header */}
      <section className="text-center space-y-4 sm:space-y-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          🔍 Transparencia Total
        </h1>
        <p className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-muted-foreground px-4">
          Creemos en la honestidad absoluta. Aquí puedes consultar todos los boletos confirmados y el estado de disponibilidad en tiempo real.
        </p>
      </section>

      {/* Información de privacidad */}
      <section className="rounded-lg border bg-muted/30 dark:bg-green-950/20 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background border border-green-400 dark:border-green-600">
            <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">
              🔒 Tu privacidad está protegida
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Solo mostramos el número de boleto, sede del participante y fecha de registro. Tus datos personales están completamente protegidos.
            </p>
          </div>
        </div>
      </section>

      {/* Proceso de validación */}
      <section className="rounded-lg border bg-card p-4 sm:p-6 lg:p-8">
        <h2 className="mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold tracking-tight">
          <span>⚙️</span>
          <span>Proceso de Validación</span>
        </h2>
        
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3 sm:space-y-4 rounded-lg border bg-background p-4 sm:p-6 text-center">
            <div className="mx-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-background border border-blue-400 dark:border-blue-600">
              <span className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400">1</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Pago</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Realizas tu transferencia y subes el comprobante</p>
          </div>
          
          <div className="space-y-3 sm:space-y-4 rounded-lg border bg-background p-4 sm:p-6 text-center">
            <div className="mx-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-background border border-amber-400 dark:border-amber-600">
              <span className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400">2</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Registro</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Tu boleto se registra como "pendiente"</p>
          </div>
          
          <div className="space-y-3 sm:space-y-4 rounded-lg border bg-background p-4 sm:p-6 text-center">
            <div className="mx-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-background border border-orange-400 dark:border-orange-600">
              <span className="text-base sm:text-lg font-bold text-orange-600 dark:text-orange-400">3</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Validación</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Verificamos tu pago en nuestro sistema</p>
          </div>
          
          <div className="space-y-3 sm:space-y-4 rounded-lg border bg-background p-4 sm:p-6 text-center">
            <div className="mx-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-background border border-emerald-400 dark:border-emerald-600">
              <span className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400">4</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Confirmación</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Tu boleto aparece como "confirmado" aquí</p>
          </div>
        </div>
      </section>

      {/* Boletos confirmados */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            ✅ Boletos Confirmados
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground px-4">
            Estos boletos ya han sido validados y están oficialmente participando en el sorteo
          </p>
        </div>
        
        <div className="rounded-lg border bg-card p-4 sm:p-6">
          <TicketsTable />
        </div>
      </section>

      {/* Disponibilidad */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            📊 Estado de Todos los Boletos
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground px-4">
            Consulta el estado actual de todos los números: disponible, pendiente o confirmado
          </p>
        </div>
        
        <div className="rounded-lg border bg-card p-4 sm:p-6">
          <AvailabilityTable />
        </div>
      </section>

      {/* Call to Action */}
      <section className="rounded-lg border bg-card p-6 sm:p-8 text-center">
        <div className="mx-auto max-w-2xl space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">¿Quieres participar?</h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground px-4">
            Si aún no tienes tu boleto, esta es tu oportunidad. Revisa los números disponibles y asegura tu participación.
          </p>
          <Link 
            href="/comprar" 
            className="inline-flex h-10 sm:h-12 items-center gap-2 rounded-md bg-primary px-6 sm:px-8 text-sm sm:text-base font-semibold text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            🎫 Comprar mi boleto ahora
          </Link>
        </div>
      </section>
    </div>
  );
}