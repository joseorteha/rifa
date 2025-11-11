"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authAPI } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authAPI.login({ email, password });
      
      // ✅ Ya no verificar email - redirigir directo
      router.push("/comprar");
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al iniciar sesión");
      setLoading(false);
    }
  }

  function handleGoogleLogin() {
    // Redirigir a Google OAuth
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">🔐 Iniciar sesión</h1>
        <p className="text-sm text-muted-foreground">
          Ingresa a tu cuenta para comprar boletos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">Accede a tu cuenta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* ✨ Botón de Google OAuth */}
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full relative"
            type="button"
          >
            <span className="mr-2">🔴</span>
            Continuar con Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O con email
              </span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-border px-3 py-2 bg-background"
                placeholder="tu@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-md border border-border px-3 py-2 bg-background"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            {error && (
              <Card className="border-destructive bg-destructive/10">
                <CardContent className="p-3">
                  <p className="text-sm text-destructive">{error}</p>
                </CardContent>
              </Card>
            )}

            <Button
              disabled={loading}
              type="submit"
              className="w-full"
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="p-4 space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                ¿No tienes cuenta?
              </span>
            </div>
          </div>

          <Button variant="outline" asChild className="w-full">
            <Link href="/auth/register">
              Crear cuenta nueva
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}