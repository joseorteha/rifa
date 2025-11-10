import TicketsTable from "./TicketsTable";
import AvailabilityTable from "./AvailabilityTable";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function TransparenciaPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-16">
      {/* Header */}
      <section className="text-center space-y-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          🔍 Transparencia Total
        </h1>
        <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
          Creemos en la honestidad absoluta. Aquí puedes consultar todos los boletos confirmados y el estado de disponibilidad en tiempo real.
        </p>
      </section>

      {/* Información de privacidad */}
      <section className="rounded-lg border-2 border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
            <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
              🔒 Tu privacidad está protegida
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Solo mostramos el número de boleto, sede del participante y fecha de registro. Tus datos personales están completamente protegidos.
            </p>
          </div>
        </div>
      </section>

      {/* Proceso de validación */}
      <section className="rounded-lg border bg-card p-8">
        <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold tracking-tight">
          <span>⚙️</span>
          <span>Proceso de Validación</span>
        </h2>
        
        <div className="grid gap-6 md:grid-cols-4">
          <div className="space-y-4 rounded-lg border-2 border-blue-200 bg-blue-50 p-6 text-center dark:border-blue-800 dark:bg-blue-900/20">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">1</span>
            </div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Pago</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Realizas tu transferencia y subes el comprobante</p>
          </div>
          
          <div className="space-y-4 rounded-lg border-2 border-yellow-200 bg-yellow-50 p-6 text-center dark:border-yellow-800 dark:bg-yellow-900/20">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/50">
              <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">2</span>
            </div>
            <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100">Registro</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">Tu boleto se registra como "pendiente"</p>
          </div>
          
          <div className="space-y-4 rounded-lg border-2 border-orange-200 bg-orange-50 p-6 text-center dark:border-orange-800 dark:bg-orange-900/20">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50">
              <span className="text-lg font-bold text-orange-600 dark:text-orange-400">3</span>
            </div>
            <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Validación</h3>
            <p className="text-sm text-orange-700 dark:text-orange-300">Verificamos tu pago en nuestro sistema</p>
          </div>
          
          <div className="space-y-4 rounded-lg border-2 border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-900/20">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
              <span className="text-lg font-bold text-green-600 dark:text-green-400">4</span>
            </div>
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Confirmación</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Tu boleto aparece como "confirmado" aquí</p>
          </div>
        </div>
      </section>

      {/* Boletos confirmados */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            ✅ Boletos Confirmados
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Estos boletos ya han sido validados y están oficialmente participando en el sorteo
          </p>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <TicketsTable />
        </div>
      </section>

      {/* Disponibilidad */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            📊 Estado de Todos los Boletos
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Consulta el estado actual de todos los números: disponible, pendiente o confirmado
          </p>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <AvailabilityTable />
        </div>
      </section>

      {/* Call to Action */}
      <section className="rounded-lg border bg-card p-8 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">¿Quieres participar?</h2>
          <p className="text-lg text-muted-foreground">
            Si aún no tienes tu boleto, esta es tu oportunidad. Revisa los números disponibles y asegura tu participación.
          </p>
          <Link 
            href="/comprar" 
            className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-8 text-base font-semibold text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            🎫 Comprar mi boleto ahora
          </Link>
        </div>
      </section>
    </div>
  );
}