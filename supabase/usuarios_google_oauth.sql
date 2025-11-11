-- ============================================================================
-- MIGRACIÓN: Agregar soporte para Google OAuth
-- ============================================================================
-- Ejecuta este SQL en el SQL Editor de Supabase para agregar Google OAuth
-- ============================================================================

-- PASO 1: Crear tabla de usuarios personalizada
-- ============================================================================
DROP TABLE IF EXISTS public.usuarios CASCADE;
CREATE TABLE public.usuarios (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  nombre text NOT NULL,
  password_hash text, -- Opcional para usuarios de Google OAuth
  google_id text UNIQUE, -- Para almacenar el ID de Google
  email_verificado boolean NOT NULL DEFAULT false,
  fecha_creacion timestamptz NOT NULL DEFAULT now(),
  fecha_actualizacion timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT usuarios_pkey PRIMARY KEY (id)
);

-- PASO 2: Crear índices para rendimiento
-- ============================================================================
CREATE INDEX IF NOT EXISTS usuarios_email_idx ON public.usuarios (email);
CREATE INDEX IF NOT EXISTS usuarios_google_id_idx ON public.usuarios (google_id);

-- PASO 3: Habilitar Row Level Security
-- ============================================================================
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- PASO 4: Crear políticas RLS para usuarios
-- ============================================================================

-- Política: Los usuarios pueden ver su propio perfil
DROP POLICY IF EXISTS "usuarios_select_own" ON public.usuarios;
CREATE POLICY "usuarios_select_own"
  ON public.usuarios
  FOR SELECT
  TO authenticated
  USING (id::text = auth.jwt() ->> 'sub' OR email = auth.jwt() ->> 'email');

-- Política: Los usuarios pueden actualizar su propio perfil
DROP POLICY IF EXISTS "usuarios_update_own" ON public.usuarios;
CREATE POLICY "usuarios_update_own"
  ON public.usuarios
  FOR UPDATE
  TO authenticated
  USING (id::text = auth.jwt() ->> 'sub' OR email = auth.jwt() ->> 'email');

-- PASO 5: Actualizar tabla de boletos para usar la nueva tabla de usuarios
-- ============================================================================
-- Agregar columna user_id a la tabla boletos
ALTER TABLE public.boletos ADD COLUMN IF NOT EXISTS user_id uuid;

-- Crear relación con la tabla usuarios
ALTER TABLE public.boletos 
ADD CONSTRAINT boletos_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;

-- Crear índice para la nueva columna
CREATE INDEX IF NOT EXISTS boletos_user_id_idx ON public.boletos (user_id);

-- PASO 6: Actualizar tabla de reservas para usar la nueva tabla de usuarios
-- ============================================================================
-- La tabla reservas ya usa auth.users, pero podemos mantenerla así
-- o cambiarla para usar nuestra tabla personalizada si es necesario

-- PASO 7: Función trigger para actualizar fecha_actualizacion
-- ============================================================================
CREATE OR REPLACE FUNCTION public.update_fecha_actualizacion()
RETURNS TRIGGER AS $$
BEGIN
  NEW.fecha_actualizacion = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para usuarios
DROP TRIGGER IF EXISTS update_usuarios_fecha_actualizacion ON public.usuarios;
CREATE TRIGGER update_usuarios_fecha_actualizacion
  BEFORE UPDATE ON public.usuarios
  FOR EACH ROW
  EXECUTE FUNCTION public.update_fecha_actualizacion();

-- ============================================================================
-- MIGRACIÓN COMPLETADA
-- ============================================================================
-- Después de ejecutar este SQL:
-- 1. Verifica que la tabla usuarios se creó: SELECT * FROM public.usuarios LIMIT 5;
-- 2. Verifica las columnas: \d public.usuarios
-- 3. Prueba insertar un usuario de prueba (opcional)
-- ============================================================================

-- Insertar usuario administrador de prueba (opcional - solo para desarrollo)
-- INSERT INTO public.usuarios (email, nombre, email_verificado) 
-- VALUES ('admin@test.com', 'Administrador', true)
-- ON CONFLICT (email) DO NOTHING;