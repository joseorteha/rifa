"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { authAPI } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // Si hay un token en la URL, verificar automáticamente
    const token = searchParams.get("token");
    if (token) {
      verifyEmailWithToken(token);
    } else {
      // Intentar obtener el email del usuario actual
      const user = authAPI.getCurrentUser();
      if (user?.email) {
        setEmail(user.email);
      }
    }
  }, [searchParams]);

  async function verifyEmailWithToken(token: string) {
    setVerifying(true);
    try {
      const response = await authAPI.verifyEmail(token);
      setVerified(true);
      setStatus(response.message || "¡Correo verificado exitosamente!");
      
      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (err: any) {
      setStatus(err.response?.data?.error || "Error al verificar correo");
      setVerifying(false);
    }
  }

  async function resendVerification() {
    if (!email) {
      setStatus("Por favor ingresa tu correo electrónico");
      return;
    }

    setStatus(null);
    setLoading(true);

    try {
      const response = await authAPI.resendVerification(email);
      setStatus(response.message || "Te enviamos un nuevo correo de verificación. Revisa tu bandeja.");
    } catch (err: any) {
      setStatus(err.response?.data?.error || "No se pudo reenviar el correo.");
    } finally {
      setLoading(false);
    }
  }

  if (verifying) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <div className="animate-spin mx-auto w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
            <h2 className="text-xl font-semibold">Verificando tu correo...</h2>
            <p className="text-sm text-muted-foreground">
              Por favor espera un momento
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardContent className="p-6 space-y-4 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
              <span className="text-2xl text-green-600 dark:text-green-400">✓</span>
            </div>
            <h2 className="text-2xl font-bold">¡Correo verificado!</h2>
            <p className="text-muted-foreground">
              Tu cuenta ha sido activada exitosamente
            </p>

            <p className="text-sm text-muted-foreground">
              Redirigiendo al login en 3 segundos...
            </p>

            <Button asChild className="w-full">
              <Link href="/auth/login">
                Ir al login ahora
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">📧 Verifica tu correo</h1>
        <p className="text-sm text-muted-foreground">
          Necesitas verificar tu correo electrónico para continuar. Revisa tu bandeja de entrada
          y haz clic en el enlace de verificación.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>¿No recibiste el correo?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Ingresa tu correo electrónico y te enviaremos un nuevo enlace de verificación.
          </p>

          <div className="space-y-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2 bg-background"
                placeholder="tu@email.com"
              />
            </div>

            <Button
              onClick={resendVerification}
              disabled={loading || !email}
              className="w-full"
            >
              {loading ? "Enviando..." : "Reenviar correo de verificación"}
            </Button>

            {status && (
              <Card className={status.includes('error') || status.includes('Error') ? "border-destructive bg-destructive/10" : "bg-green-50 dark:bg-green-900/20"}>
                <CardContent className="p-3">
                  <p className={`text-sm ${status.includes('error') || status.includes('Error') ? 'text-destructive' : 'text-green-800 dark:text-green-200'}`}>
                    {status}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <Button variant="outline" asChild className="w-full">
            <Link href="/auth/login">
              Volver al login
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardContent className="p-6 text-center space-y-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyContent />
    </Suspense>
  );
}