"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authAPI, boletosAPI } from "@/lib/api";
import TicketSelector from "./TicketSelector";
import { paymentConfig } from "@/lib/paymentConfig";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PaymentForm() {
  const router = useRouter();
  const [tipo, setTipo] = useState<string>("Público General");
  const [nombre, setNombre] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [sede, setSede] = useState<string>("");
  const [numeroControl, setNumeroControl] = useState<string>("");
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [comprobante, setComprobante] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const necesitaSede = tipo === "Estudiante TecNM";
  const totalAmount = selectedTickets.length * 30;

  useEffect(() => {
    const currentUser = authAPI.getCurrentUser();
    setIsLoggedIn(authAPI.isAuthenticated());
    setUser(currentUser);
  }, []);

  useEffect(() => {
    setFileError(null);
  }, [tipo]);

  function validarArchivo(file?: File) {
    if (!file) return "Sube tu comprobante de transferencia";
    if (!(file.type.startsWith("image/") || file.type === "application/pdf")) {
      return "El archivo debe ser imagen o PDF";
    }
    if (file.size > 5 * 1024 * 1024) {
      return "El archivo debe ser <= 5 MB";
    }
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const err = validarArchivo(comprobante || undefined);
    setFileError(err);
    if (err) return;

    if (!isLoggedIn) {
      setError("Debes iniciar sesión para comprar boletos");
      return;
    }

    if (selectedTickets.length === 0) {
      setError("Debes seleccionar al menos un boleto");
      return;
    }

    if (selectedTickets.length > 5) {
      setError("No puedes comprar más de 5 boletos a la vez");
      return;
    }

    if (tipo === "Estudiante TecNM" && !sede) {
      setError("Los estudiantes TecNM deben seleccionar su sede");
      return;
    }

    setLoading(true);

    try {
      await boletosAPI.registrar({
        nombre,
        telefono: telefono || undefined,
        tipo_participante: tipo as any,
        sede: sede || undefined,
        numero_control: numeroControl || undefined,
        numeros_boleto: selectedTickets,
        comprobante: comprobante!,
      });

      setSuccess(true);
      
      setTimeout(() => {
        router.push("/perfil");
      }, 8000);

    } catch (err: any) {
      setError(err.response?.data?.error || "Error al registrar boletos");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="p-6 space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
              <span className="text-2xl text-green-600 dark:text-green-400">✓</span>
            </div>
            <h2 className="text-2xl font-bold">¡Compra registrada!</h2>
            <p className="text-muted-foreground">
              Tu compra está en revisión. Hemos recibido tus datos.
            </p>

            <Card className="bg-green-50 dark:bg-green-900/20">
              <CardContent className="p-4">
                <p className="text-sm font-medium">
                  <strong>Números de boleto registrados:</strong> {selectedTickets.join(", ")}
                </p>
                <p className="text-sm mt-2">
                  Tus boletos aparecerán en la sección de Transparencia tan pronto como validemos
                  tu pago (usualmente en 24 horas). ¡Gracias por apoyar a Siera Code!
                </p>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground">
              Redirigiendo a tu perfil en 8 segundos...
            </p>

            <Button asChild className="w-full">
              <Link href="/perfil">
                Ir a mi perfil ahora
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!isLoggedIn && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <span>⚠️</span> Debes iniciar sesión para continuar
            </p>
            <p className="text-sm mb-3">
              Para continuar con la compra, inicia sesión y así podremos reservar tus boletos seleccionados.
            </p>
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/auth/login">
                  Iniciar sesión
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/auth/register">
                  Crear cuenta
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {user && !user.email_verificado && (
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <span>📧</span> Verifica tu correo electrónico
            </p>
            <p className="text-sm mb-3">
              Debes verificar tu correo antes de poder comprar boletos.
            </p>
            <Button variant="outline" asChild>
              <Link href="/auth/verify">
                Verificar correo
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>💳</span>
            Paso 1: Realiza tu Transferencia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            Realiza tu transferencia de <Badge variant="secondary" className="font-bold text-lg">${totalAmount}.00 MXN</Badge> a la siguiente cuenta.
            <strong> ¡No olvides guardar tu comprobante!</strong>
          </p>
          
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-muted-foreground">Banco:</span>
                  <span className="font-medium">{paymentConfig.banco}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-muted-foreground">Beneficiario:</span>
                  <span className="font-medium">{paymentConfig.beneficiario}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-muted-foreground">CLABE:</span>
                  <span className="font-mono font-medium break-all">{paymentConfig.clabe}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-muted-foreground">Concepto:</span>
                  <span className="font-medium">{paymentConfig.concepto}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <p className="text-xs text-muted-foreground">
            Tu boleto no es válido hasta que subas tu comprobante y sea validado por nuestro equipo.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📋</span>
            Paso 2: Registra tus Datos y Sube tu Comprobante
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre Completo *</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    minLength={3}
                    className="w-full rounded-md border border-border px-3 py-2 bg-background text-sm"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Correo Electrónico *</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full rounded-md border border-border px-3 py-2 bg-muted text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Este es tu correo de cuenta
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full rounded-md border border-border px-3 py-2 bg-background text-sm"
                  placeholder="2711234567"
                />
              </div>

              {/* Selector de boletos en su propia sección */}
              <div className="pt-2">
                <TicketSelector
                  selectedTickets={selectedTickets}
                  setSelectedTickets={setSelectedTickets}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo de participante *</label>
                  <div className="mt-2 space-y-2 sm:space-y-0 sm:flex sm:gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="tipo_participante"
                        value="Público General"
                        checked={tipo === "Público General"}
                        onChange={() => setTipo("Público General")}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Público General</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="tipo_participante"
                        value="Estudiante TecNM"
                        checked={tipo === "Estudiante TecNM"}
                        onChange={() => setTipo("Estudiante TecNM")}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Estudiante TecNM</span>
                    </label>
                  </div>
                </div>

                {necesitaSede && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Sede *</label>
                    <select
                      value={sede}
                      onChange={(e) => setSede(e.target.value)}
                      required={necesitaSede}
                      className="w-full rounded-md border border-border px-3 py-2 bg-background text-sm"
                    >
                      <option value="">Selecciona tu sede</option>
                      <option>Zongolica</option>
                      <option>Nogales</option>
                      <option>Tezonapa</option>
                      <option>Tehuipango</option>
                      <option>Tequila</option>
                      <option>Cuichapa</option>
                      <option>Acultzinapa</option>
                    </select>
                  </div>
                )}
              </div>

              {necesitaSede && (
                <div>
                  <label className="block text-sm font-medium mb-2">Número de Control *</label>
                  <input
                    type="text"
                    value={numeroControl}
                    onChange={(e) => setNumeroControl(e.target.value)}
                    required={necesitaSede}
                    className="w-full rounded-md border border-border px-3 py-2 bg-background text-sm"
                    placeholder="Ej: 226w0448"
                    pattern="[0-9]{3}[A-Za-z]{1}[0-9]{4}"
                    title="Formato: 226w0448 (3 dígitos, 1 letra, 4 dígitos)"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Formato: 226w0448 (3 dígitos + 1 letra + 4 dígitos)
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Comprobante (imagen o PDF) *
              </label>
              <input
                type="file"
                accept="image/*,application/pdf"
                required
                onChange={(e) => setComprobante(e.target.files?.[0] || null)}
                className="w-full rounded-md border border-border px-3 py-2 bg-background file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:bg-primary file:text-primary-foreground file:text-sm"
              />
              {fileError && (
                <Card className="mt-2 border-destructive bg-destructive/10">
                  <CardContent className="p-2">
                    <p className="text-xs text-destructive">{fileError}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="terminos" required className="w-4 h-4" />
              <label htmlFor="terminos" className="text-sm">
                Acepto los términos y condiciones de la Rifa Siera Code
              </label>
            </div>

            {error && (
              <Card className="border-destructive bg-destructive/10">
                <CardContent className="p-3">
                  <p className="text-sm text-destructive">{error}</p>
                </CardContent>
              </Card>
            )}

            <Button
              type="submit"
              disabled={loading || !isLoggedIn || selectedTickets.length === 0 || (user && !user.email_verificado)}
              className="w-full"
            >
              {loading ? "Registrando..." : "Finalizar Registro"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
