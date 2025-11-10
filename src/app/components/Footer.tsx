import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo y descripción */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
                <span className="text-sm font-bold text-primary-foreground">SC</span>
              </div>
              <div>
                <div className="text-lg font-semibold">Rifa Siera Code</div>
                <div className="text-sm text-muted-foreground">TecNM Zongolica</div>
              </div>
            </Link>
            <p className="max-w-md text-muted-foreground">
              Apoyando al talento tecnológico del TecNM Zongolica en su camino al 
              HackaTec Nacional 2025. Cada boleto cuenta, cada peso ayuda.
            </p>
          </div>

          {/* Enlaces */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Navegación</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/comprar" className="text-muted-foreground transition-colors hover:text-foreground">
                  Comprar Boleto
                </Link>
              </li>
              <li>
                <Link href="/premios" className="text-muted-foreground transition-colors hover:text-foreground">
                  Premios
                </Link>
              </li>
              <li>
                <Link href="/transparencia" className="text-muted-foreground transition-colors hover:text-foreground">
                  Transparencia
                </Link>
              </li>
              <li>
                <Link href="/reglamento" className="text-muted-foreground transition-colors hover:text-foreground">
                  Reglamento
                </Link>
              </li>
            </ul>
          </div>

          {/* Información */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Información</h4>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">📅 Sorteo</p>
                <p className="mt-1">21 de noviembre, 8:00 PM</p>
              </div>
              <div>
                <p className="font-medium text-foreground">🎫 Precio</p>
                <p className="mt-1">$30 MXN por boleto</p>
              </div>
              <div>
                <p className="font-medium text-foreground">🏆 Premio</p>
                <p className="mt-1">Kit Gamer 4-en-1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-muted-foreground md:flex-row md:text-left">
            <p>
              © {new Date().getFullYear()} Equipo Siera Code · TecNM Campus Zongolica
            </p>
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-1">
                💡 Hecho con amor en Zongolica
              </span>
              <span className="inline-flex items-center gap-1">
                🚀 #HackaTec2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}