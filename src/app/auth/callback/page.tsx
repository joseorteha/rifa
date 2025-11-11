"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');

    if (error) {
      setStatus('error');
      console.error('Error de autenticación OAuth:', error);
      return;
    }

    if (token) {
      try {
        // Guardar token en localStorage
        localStorage.setItem('token', token);
        
        // Obtener información del usuario usando el token
        fetchUserInfo(token);
      } catch (err) {
        console.error('Error guardando token:', err);
        setStatus('error');
      }
    } else {
      setStatus('error');
    }
  }, [router]);

  const fetchUserInfo = async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userInfo = await response.json();
        
        // Guardar información del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(userInfo));
        
        // Disparar evento de cambio de autenticación para actualizar el Header
        window.dispatchEvent(new CustomEvent('authChange'));
        
        setStatus('success');
        
        // Redirigir después de un momento
        setTimeout(() => {
          router.push('/comprar');
        }, 2000);
      } else {
        throw new Error('Error obteniendo información del usuario');
      }
    } catch (err) {
      console.error('Error obteniendo información del usuario:', err);
      setStatus('error');
    }
  };

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
                Hubo un problema al iniciar sesión con Google. Por favor, inténtalo de nuevo.
              </p>
              <button 
                onClick={() => router.push('/auth/login')}
                className="text-primary hover:underline"
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