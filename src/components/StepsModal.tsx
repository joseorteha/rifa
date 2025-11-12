"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { User, Hash, Landmark, FileUp, Clock, CheckCircle, ChevronDown, Copy, Check } from "lucide-react";

type StepsModalProps = {
  buttonLabel?: string;
  buttonClassName?: string;
  buttonVariant?: "default" | "outline";
  buttonSize?: "sm" | "default" | "lg";
};

export default function StepsModal({
  buttonLabel = "📝 Pasos a seguir",
  buttonClassName,
  buttonVariant = "outline",
  buttonSize = "lg",
}: StepsModalProps) {
  const [showBank, setShowBank] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bankName = process.env.NEXT_PUBLIC_BANK_NAME || "[Nombre del Banco]";
  const bankBeneficiary =
    process.env.NEXT_PUBLIC_PAYEE_NAME ||
    process.env.NEXT_PUBLIC_BANK_BENEFICIARIO ||
    "[Nombre del Tesorero/a]";
  const bankClabe =
    process.env.NEXT_PUBLIC_CLABE ||
    process.env.NEXT_PUBLIC_BANK_CLABE ||
    "[Tu Número de CLABE]";
  const transferConcept = process.env.NEXT_PUBLIC_TRANSFER_CONCEPT || "Tu nombre o usuario en la web";
  const [copied, setCopied] = useState<"clabe" | "concept" | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      let closestIndex = 0;
      let closestDist = Infinity;
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(center - cardCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });
      setActiveStep(closestIndex);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const copyToClipboard = async (text: string, field: "clabe" | "concept") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      setTimeout(() => setCopied(null), 1600);
    } catch (e) {
      // noop
    }
  };

  const chipActiveClasses = [
    "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500",
    "bg-purple-600 text-white border-purple-600 dark:bg-purple-500 dark:border-purple-500",
    "bg-green-600 text-white border-green-600 dark:bg-green-500 dark:border-green-500",
    "bg-amber-600 text-white border-amber-600 dark:bg-amber-500 dark:border-amber-500",
    "bg-teal-600 text-white border-teal-600 dark:bg-teal-500 dark:border-teal-500",
    "bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-500 dark:border-emerald-500",
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize} className={cn(buttonClassName)}>
          {buttonLabel}
        </Button>
      </DialogTrigger>
      {/* Glassmorphism modal content */}
      <DialogContent className="max-w-3xl bg-background/80 backdrop-blur-md border-2 border-border shadow-2xl">
        <DialogHeader>
          <DialogTitle>Pasos para participar en la rifa</DialogTitle>
          <DialogDescription>
            Sigue estos pasos para que tu boleto quede confirmado correctamente.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-x-auto py-2" ref={containerRef}>
          <div className="flex gap-4 snap-x snap-mandatory px-1">
            <div ref={(el) => { cardsRef.current[0] = el; }} className="snap-start min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[380px] rounded-md border-2 border-blue-300 bg-blue-50/60 dark:border-blue-600 dark:bg-blue-900/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5" />
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-background border text-xs font-bold">1</span>
                <span className="font-semibold">Regístrate o inicia sesión</span>
              </div>
              <p className="text-sm text-foreground/90">
                Crea tu cuenta o entra con tu usuario para poder registrar tus boletos y subir comprobantes.
              </p>
            </div>

            <div ref={(el) => { cardsRef.current[1] = el; }} className="snap-start min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[380px] rounded-md border-2 border-purple-300 bg-purple-50/60 dark:border-purple-600 dark:bg-purple-900/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Hash className="h-5 w-5" />
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-background border text-xs font-bold">2</span>
                <span className="font-semibold">Selecciona tus números</span>
              </div>
              <p className="text-sm text-foreground/90">
                Elige boletos disponibles. Hasta 5 por persona; verifica disponibilidad en Transparencia.
              </p>
            </div>

            <div ref={(el) => { cardsRef.current[2] = el; }} className="snap-start min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[380px] rounded-md border-2 border-green-300 bg-green-50/60 dark:border-green-600 dark:bg-green-900/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Landmark className="h-5 w-5" />
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-background border text-xs font-bold">3</span>
                <span className="font-semibold">Realiza tu transferencia</span>
              </div>
              <p className="text-sm text-foreground/90">
                Paga <strong>$35.00 MXN</strong> por boleto (o múltiplos si compras más).
              </p>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="border-green-400 text-green-700 dark:border-green-600 dark:text-green-300" onClick={() => setShowBank((v) => !v)}>
                  <ChevronDown className={cn("mr-2 h-4 w-4 transition-transform", showBank ? "rotate-180" : "rotate-0")} /> Ver datos de transferencia
                </Button>
                {showBank && (
                  <div className="mt-3 text-sm text-foreground/90 rounded-md border border-green-300/60 dark:border-green-600/60 p-3 bg-green-50/50 dark:bg-green-900/20">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Banco:</span>
                      <span>{bankName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Beneficiario:</span>
                      <span>{bankBeneficiary}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">CLABE:</span>
                      <span className="font-mono tracking-wider">{bankClabe}</span>
                      <Button variant="ghost" size="sm" className="ml-2" onClick={() => copyToClipboard(bankClabe, "clabe")}>
                        {copied === "clabe" ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Concepto:</span>
                      <span>{transferConcept}</span>
                      <Button variant="ghost" size="sm" className="ml-2" onClick={() => copyToClipboard(transferConcept, "concept")}>
                        {copied === "concept" ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    {copied && (
                      <div className="mt-2 text-xs text-green-700 dark:text-green-400">¡{copied === "clabe" ? "CLABE" : "Concepto"} copiado!</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div ref={(el) => { cardsRef.current[3] = el; }} className="snap-start min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[380px] rounded-md border-2 border-amber-300 bg-amber-50/60 dark:border-amber-600 dark:bg-amber-900/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileUp className="h-5 w-5" />
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-background border text-xs font-bold">4</span>
                <span className="font-semibold">Sube tu comprobante</span>
              </div>
              <p className="text-sm text-foreground/90">
                Registra tus datos y sube el archivo (JPG, PNG o PDF).
              </p>
            </div>

            <div ref={(el) => { cardsRef.current[4] = el; }} className="snap-start min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[380px] rounded-md border-2 border-teal-300 bg-teal-50/60 dark:border-teal-600 dark:bg-teal-900/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5" />
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-background border text-xs font-bold">5</span>
                <span className="font-semibold">Validación manual</span>
              </div>
              <p className="text-sm text-foreground/90">
                Nuestro equipo revisa tu comprobante. Puede tomar hasta 24 horas.
              </p>
            </div>

            <div ref={(el) => { cardsRef.current[5] = el; }} className="snap-start min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[380px] rounded-md border-2 border-emerald-300 bg-emerald-50/60 dark:border-emerald-600 dark:bg-emerald-900/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5" />
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-background border text-xs font-bold">6</span>
                <span className="font-semibold">Confirmación y Transparencia</span>
              </div>
              <p className="text-sm text-foreground/90">
                Al confirmar, tu boleto aparece públicamente en Transparencia y participa en el sorteo.
              </p>
            </div>
          </div>
        </div>

        {/* Chips de navegación */}
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {[0,1,2,3,4,5].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => cardsRef.current[i]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })}
              className={cn(
                "px-3 py-1 rounded-full text-sm border transition-colors",
                activeStep === i
                  ? chipActiveClasses[i]
                  : "bg-background/70 text-foreground border-border hover:bg-accent/40"
              )}
            >
              Paso {i + 1}
            </button>
          ))}
        </div>

        <DialogFooter>
          <Button asChild>
            <Link href="/comprar">Ir a Comprar</Link>
          </Button>
          <Button asChild variant="outline" className="border-amber-400 text-amber-700 hover:bg-muted/30 dark:border-amber-600 dark:text-amber-300">
            <Link href="/reglamento">Leer Reglamento</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}