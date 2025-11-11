"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authAPI, boletosAPI, Boleto, User } from "@/lib/api";

export default function PerfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      // Verificar si hay usuario autenticado
      const currentUser = authAPI.getCurrentUser();
      if (!currentUser) {
        router.push("/auth/login");
        return;
      }

      setUser(currentUser);

      // Cargar boletos del usuario
      const userBoletos = await boletosAPI.getMisBoletos();
      setBoletos(userBoletos);
      
      setLoading(false);
    } catch (err: any) {
      console.error("Error al cargar perfil:", err);
      setError(err.response?.data?.error || "Error al cargar el perfil");
      setLoading(false);
      
      // Si hay error 401, redirigir al login
      if (err.response?.status === 401) {
        router.push("/auth/login");
      }
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin mx-auto w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
          <p className="mt-4 text-muted-foreground">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="rounded-lg border bg-card p-6 text-center">
          <p className="text-destructive">{error}</p>
          <Link href="/" className="inline-block mt-4 px-4 py-2 rounded-md border hover:bg-accent">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Mi Perfil</h1>

      {/* Información del Usuario */}
      <div className="rounded-lg border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold">Información de la Cuenta</h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Nombre</p>
            <p className="font-medium">{user.nombre}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Estado de la cuenta</p>
            <p className="font-medium">
              <span className="text-green-600">✓ Cuenta activa</span>
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">ID de Usuario</p>
            <p className="font-mono text-xs">{user.id}</p>
          </div>
        </div>
      </div>

      {/* Boletos Comprados */}
      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Mis Boletos</h2>
          <Link href="/comprar" className="px-4 py-2 rounded-md bg-primary text-white text-sm">
            Comprar más boletos
          </Link>
        </div>

        {boletos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Aún no has comprado ningún boleto</p>
            <Link href="/comprar" className="inline-block px-4 py-2 rounded-md bg-primary text-white">
              Comprar mi primer boleto
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {boletos.map((boleto) => (
              <div key={boleto.id} className="rounded-lg border p-4 bg-background">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-primary">
                        #{boleto.numero_boleto}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          boleto.estado === "confirmado"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : boleto.estado === "pendiente"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        }`}
                      >
                        {boleto.estado === "confirmado"
                          ? "✓ Confirmado"
                          : boleto.estado === "pendiente"
                          ? "⏳ Pendiente"
                          : "🎉 Ganador"}
                      </span>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                      <div>
                        <span className="text-muted-foreground">Nombre:</span>{" "}
                        <span className="font-medium">{boleto.nombre}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tipo:</span>{" "}
                        <span>{boleto.tipo_participante}</span>
                      </div>
                      {boleto.sede && (
                        <div>
                          <span className="text-muted-foreground">Sede:</span>{" "}
                          <span>{boleto.sede}</span>
                        </div>
                      )}
                      {boleto.telefono && (
                        <div>
                          <span className="text-muted-foreground">Teléfono:</span>{" "}
                          <span>{boleto.telefono}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-muted-foreground">Registrado:</span>{" "}
                        <span>
                          {new Date(boleto.fecha_registro).toLocaleDateString("es-MX", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {boleto.estado === "pendiente" && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-muted-foreground">
                      ⏱ Tu boleto está en proceso de validación. Aparecerá en la sección de Transparencia cuando sea confirmado (usualmente en 24 horas).
                    </p>
                  </div>
                )}

                {boleto.estado === "confirmado" && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-green-600 dark:text-green-400">
                      ✓ Tu boleto está confirmado y participará en el sorteo. ¡Buena suerte!
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Acciones */}
      <div className="flex gap-3">
        <Link href="/transparencia" className="px-4 py-2 rounded-md border hover:bg-accent">
          Ver Transparencia
        </Link>
        <Link href="/reglamento" className="px-4 py-2 rounded-md border hover:bg-accent">
          Ver Reglamento
        </Link>
      </div>
    </div>
  );
}
