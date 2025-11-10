"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authAPI } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (formData.nombre.length < 3) {
      setError("El nombre debe tener al menos 3 caracteres");
      return;
    }

    setLoading(true);

    try {
      await authAPI.register({
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
      });

      setSuccess(true);
      
      // Redirigir después de 3 segundos
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);

    } catch (err: any) {
      setError(err.response?.data?.error || "Error al crear la cuenta");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardContent className="p-6 space-y-4 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
              <span className="text-2xl text-green-600 dark:text-green-400">✓</span>
            </div>
            <h2 className="text-2xl font-bold">¡Cuenta creada!</h2>
            <p className="text-muted-foreground">
              Te hemos enviado un correo de verificación a <strong>{formData.email}</strong>
            </p>

            <Card className="bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="p-4">
                <p className="text-sm">
                  <strong>📧 Paso siguiente:</strong> Revisa tu bandeja de entrada y haz clic en el enlace
                  de verificación para activar tu cuenta.
                </p>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground">
              Redirigiendo al login en 3 segundos...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">👋 Crear cuenta</h1>
        <p className="text-sm text-muted-foreground">
          Regístrate para participar en la Rifa Siera Code
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">Únete a la rifa</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Nombre completo *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                minLength={3}
                className="w-full rounded-md border border-border px-3 py-2 bg-background"
                placeholder="Juan Pérez"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Correo electrónico *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-border px-3 py-2 bg-background"
                placeholder="tu@email.com"
              />
              <p className="text-xs text-muted-foreground">
                Usa tu correo institucional si eres estudiante TecNM
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Contraseña *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full rounded-md border border-border px-3 py-2 bg-background"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Confirmar contraseña *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full rounded-md border border-border px-3 py-2 bg-background"
                placeholder="Confirma tu contraseña"
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
              {loading ? "Creando cuenta..." : "Crear cuenta"}
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
                ¿Ya tienes cuenta?
              </span>
            </div>
          </div>

          <Button variant="outline" asChild className="w-full">
            <Link href="/auth/login">
              Iniciar sesión
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
