"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { User, Hash, Landmark, FileUp, Clock, CheckCircle, ChevronDown, Copy, Check, ArrowRight, X as XIcon } from "lucide-react";

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
  const [tickets, setTickets] = useState<number>(1);
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

  const pricePerTicket = 30;
  const totalPrice = tickets * pricePerTicket;

  const copyToClipboard = async (text: string, field: "clabe" | "concept") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      setTimeout(() => setCopied(null), 1600);
    } catch (e) {
      // noop
    }
  };

  const decrement = () => setTickets((n) => Math.max(1, n - 1));
  const increment = () => setTickets((n) => Math.min(5, n + 1));

  const steps = [
    {
      icon: User,
      title: "Regístrate o inicia sesión",
      description: "Crea tu cuenta o entra con tu usuario para poder registrar tus boletos y subir comprobantes.",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50/80 dark:bg-blue-950/50",
      borderColor: "border-blue-200 dark:border-blue-800",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
      number: "01"
    },
    {
      icon: Hash,
      title: "Selecciona tus números",
      description: "Elige boletos disponibles. Hasta 5 por persona; verifica disponibilidad en Transparencia.",
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50/80 dark:bg-purple-950/50",
      borderColor: "border-purple-200 dark:border-purple-800",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
      number: "02",
      interactive: true
    },
    {
      icon: Landmark,
      title: "Realiza tu transferencia",
      description: "Paga $30.00 MXN por boleto (o múltiplos si compras más).",
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50/80 dark:bg-green-950/50",
      borderColor: "border-green-200 dark:border-green-800",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
      number: "03",
      expandable: true
    },
    {
      icon: FileUp,
      title: "Sube tu comprobante",
      description: "Registra tus datos y sube el archivo (JPG, PNG o PDF).",
      gradient: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50/80 dark:bg-amber-950/50",
      borderColor: "border-amber-200 dark:border-amber-800",
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
      number: "04"
    },
    {
      icon: Clock,
      title: "Validación manual",
      description: "Nuestro equipo revisa tu comprobante. Puede tomar hasta 24 horas.",
      gradient: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50/80 dark:bg-teal-950/50",
      borderColor: "border-teal-200 dark:border-teal-800",
      iconBg: "bg-gradient-to-br from-teal-500 to-cyan-500",
      number: "05"
    },
    {
      icon: CheckCircle,
      title: "Confirmación y Transparencia",
      description: "Al confirmar, tu boleto aparece públicamente en Transparencia y participa en el sorteo.",
      gradient: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50/80 dark:bg-emerald-950/50",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      iconBg: "bg-gradient-to-br from-emerald-500 to-green-500",
      number: "06"
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize} className={cn("font-semibold", buttonClassName)}>
          {buttonLabel}
        </Button>
      </DialogTrigger>
      
      <DialogContent showCloseButton={false} className="max-w-6xl max-h-[90vh] bg-background/95 backdrop-blur-xl border-2 shadow-2xl p-0 overflow-hidden rounded-xl">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b px-6 py-5">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Pasos para participar en la rifa
            </DialogTitle>
            <DialogDescription className="text-base mt-2">
              Sigue estos pasos para que tu boleto quede confirmado correctamente.
            </DialogDescription>
          </DialogHeader>
          {/* Close button en el header */}
          <DialogClose asChild>
            <Button aria-label="Cerrar" variant="ghost" size="icon-sm" className="absolute right-4 top-4">
              <XIcon className="h-4 w-4" />
            </Button>
          </DialogClose>
        </div>

        <div className="overflow-y-auto px-6 py-6 max-h-[calc(90vh-200px)]">
          {/* Vista Desktop/Tablet - Scroll horizontal */}
          <div className="hidden md:block">
            <div className="overflow-x-auto pb-4 -mx-2 px-2">
              <div className="flex gap-4 min-w-max">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="relative group">
                      <div className={cn(
                        "w-[320px] lg:w-[340px] rounded-xl border-2 p-6 transition-all duration-300",
                        "hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1",
                        step.bgColor,
                        step.borderColor
                      )}>
                        {/* Número de paso */}
                        <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-background border-2 border-current flex items-center justify-center font-bold text-sm shadow-lg">
                          {step.number}
                        </div>
                        
                        {/* Icono con gradiente */}
                        <div className={cn(
                          "w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg",
                          step.iconBg,
                          "group-hover:scale-110 transition-transform duration-300"
                        )}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        
                        <h3 className="font-bold text-lg mb-2 text-foreground">
                          {step.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>

                        {/* Selector de boletos */}
                        {step.interactive && (
                          <div className="mt-4 p-4 rounded-lg bg-background/60 border border-border">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium">Cantidad:</span>
                              <div className="flex items-center gap-3">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={decrement}
                                  className="h-8 w-8 p-0 rounded-full"
                                >
                                  -
                                </Button>
                                <div className="w-12 text-center font-bold text-lg">{tickets}</div>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={increment}
                                  className="h-8 w-8 p-0 rounded-full"
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                            <div className="text-center py-2 px-3 rounded-md bg-gradient-to-r from-purple-400/10 to-pink-400/10 border border-purple-300/40 dark:border-purple-700/30">
                              <span className="text-sm">Total: </span>
                              <span className="font-bold text-lg">${totalPrice} MXN</span>
                            </div>
                          </div>
                        )}

                        {/* Datos bancarios expandibles */}
                        {step.expandable && (
                          <div className="mt-4">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full justify-between"
                              onClick={() => setShowBank(!showBank)}
                            >
                              <span>Ver datos bancarios</span>
                              <ChevronDown className={cn(
                                "h-4 w-4 transition-transform duration-300",
                                showBank ? "rotate-180" : "rotate-0"
                              )} />
                            </Button>
                            
                            {showBank && (
                              <div className="mt-3 p-4 rounded-lg bg-background/70 border border-border space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex justify-between items-center text-sm">
                                  <span className="font-medium text-muted-foreground">Banco:</span>
                                  <span className="font-semibold">{bankName}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="font-medium text-muted-foreground">Beneficiario:</span>
                                  <span className="font-semibold">{bankBeneficiary}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm gap-2">
                                  <span className="font-medium text-muted-foreground">CLABE:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs">{bankClabe}</span>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-7 w-7 p-0"
                                      onClick={() => copyToClipboard(bankClabe, "clabe")}
                                    >
                                      {copied === "clabe" ? 
                                        <Check className="h-4 w-4 text-green-600" /> : 
                                        <Copy className="h-4 w-4" />
                                      }
                                    </Button>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center text-sm gap-2">
                                  <span className="font-medium text-muted-foreground">Concepto:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs">{transferConcept}</span>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-7 w-7 p-0"
                                      onClick={() => copyToClipboard(transferConcept, "concept")}
                                    >
                                      {copied === "concept" ? 
                                        <Check className="h-4 w-4 text-green-600" /> : 
                                        <Copy className="h-4 w-4" />
                                      }
                                    </Button>
                                  </div>
                                </div>
                                {copied && (
                                  <div className="text-xs text-green-600 dark:text-green-400 text-center py-1 animate-in fade-in duration-200">
                                    ✓ {copied === "clabe" ? "CLABE" : "Concepto"} copiado al portapapeles
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Flecha conectora */}
                      {index < steps.length - 1 && (
                        <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 translate-x-full z-10">
                          <ArrowRight className="h-5 w-5 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Vista Mobile - Cards apiladas */}
          <div className="md:hidden space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index} 
                  className={cn(
                    "relative rounded-xl border-2 p-5 transition-all duration-300",
                    step.bgColor,
                    step.borderColor
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Número y icono */}
                    <div className="flex-shrink-0">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg relative",
                          step.iconBg
                        )}>
                          <Icon className="h-6 w-6 text-white" />
                          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border-2 border-current flex items-center justify-center text-xs font-bold">
                            {step.number}
                          </div>
                        </div>
                    </div>
                    
                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base mb-1 text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>

                      {/* Selector de boletos mobile */}
                      {step.interactive && (
                        <div className="mt-3 p-3 rounded-lg bg-background/60 border border-border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Cantidad:</span>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={decrement}
                                className="h-8 w-8 p-0 rounded-full"
                              >
                                -
                              </Button>
                              <div className="w-10 text-center font-bold">{tickets}</div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={increment}
                                className="h-8 w-8 p-0 rounded-full"
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <div className="text-center py-2 px-3 rounded-md bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-300/30">
                            <span className="text-sm">Total: </span>
                            <span className="font-bold">${totalPrice} MXN</span>
                          </div>
                        </div>
                      )}

                      {/* Datos bancarios mobile */}
                      {step.expandable && (
                        <div className="mt-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-between text-xs"
                            onClick={() => setShowBank(!showBank)}
                          >
                            <span>Ver datos bancarios</span>
                            <ChevronDown className={cn(
                              "h-4 w-4 transition-transform",
                              showBank && "rotate-180"
                            )} />
                          </Button>
                          
                          {showBank && (
                            <div className="mt-2 p-3 rounded-lg bg-background/70 border border-border space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Banco:</span>
                                <span className="font-semibold">{bankName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Beneficiario:</span>
                                <span className="font-semibold">{bankBeneficiary}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">CLABE:</span>
                                <div className="flex items-center gap-1">
                                  <span className="font-mono text-[10px]">{bankClabe}</span>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-6 w-6 p-0"
                                    onClick={() => copyToClipboard(bankClabe, "clabe")}
                                  >
                                    {copied === "clabe" ? 
                                      <Check className="h-3 w-3 text-green-600" /> : 
                                      <Copy className="h-3 w-3" />
                                    }
                                  </Button>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Concepto:</span>
                                <div className="flex items-center gap-1">
                                  <span className="text-[10px]">{transferConcept}</span>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-6 w-6 p-0"
                                    onClick={() => copyToClipboard(transferConcept, "concept")}
                                  >
                                    {copied === "concept" ? 
                                      <Check className="h-3 w-3 text-green-600" /> : 
                                      <Copy className="h-3 w-3" />
                                    }
                                  </Button>
                                </div>
                              </div>
                              {copied && (
                                <div className="text-[10px] text-green-600 text-center py-1">
                                  ✓ {copied === "clabe" ? "CLABE" : "Concepto"} copiado
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Separador mobile */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center mt-3 mb-1">
                      <div className="w-px h-4 bg-gradient-to-b from-border to-transparent" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Nota informativa */}
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border text-center">
            <p className="text-sm text-muted-foreground">
              💡 <span className="font-medium">Tip:</span> Puedes calcular el total antes de comprar usando el selector de cantidad
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}