"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { authAPI } from "@/lib/api";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const processCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const errorParam = urlParams.get('error');

        if (errorParam) {
          setError(`Error de autenticación: ${errorParam}`);
          setStatus('error');
          return;
        }

        if (!token) {
          setError('No se recibió token de autenticación');
          setStatus('error');
          return;
        }

        // Guardar token
        localStorage.setItem('token', token);
        
        // Obtener información del usuario
        try {
          const userInfo = await authAPI.getProfile();
          localStorage.setItem('user', JSON.stringify(userInfo));
          
          // Disparar evento de cambio de autenticación
          window.dispatchEvent(new CustomEvent('authChange'));
          
          setStatus('success');
          
          // Redirigir después de 2 segundos
          setTimeout(() => {
            router.push('/comprar');
          }, 2000);
          
        } catch (profileError) {
          console.error('Error obteniendo perfil:', profileError);
          // Aunque falle el perfil, si tenemos token, continuar
          window.dispatchEvent(new CustomEvent('authChange'));
          setStatus('success');
          
          setTimeout(() => {
            router.push('/comprar');
          }, 2000);
        }

      } catch (err) {
        console.error('Error en callback:', err);
        setError('Error procesando autenticación');
        setStatus('error');
      }
    };

    processCallback();
  }, [router]);

  return (
    <div className="max-w-md mx-auto mt-8 space-y-6">
      <Card>
        <CardContent className="p-6 text-center space-y-4">
          {status === 'loading' && (
            <>
              <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full mx-auto"></div>
              <p>Procesando autenticación con Google...</p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-xl font-semibold text-green-600">
                ¡Inicio de sesión exitoso!
              </h2>
              <p className="text-sm text-muted-foreground">
                Bienvenido a Rifa Siera Code. Redirigiendo a la página de compra...
              </p>
            </>
          )}
          
          {status === 'error' && (
            <>
              <div className="text-4xl mb-4">❌</div>
              <h2 className="text-xl font-semibold text-red-600">
                Error de autenticación
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {error || 'Hubo un problema al iniciar sesión con Google. Por favor, inténtalo de nuevo.'}
              </p>
              <button 
                onClick={() => router.push('/auth/login')}
                className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
              >
                Volver al login
              </button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}