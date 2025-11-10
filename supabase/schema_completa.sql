-- ============================================================================
-- SCHEMA COMPLETO PARA RIFA SIERA CODE
-- ============================================================================
-- Ejecuta este archivo completo en el SQL Editor de Supabase
-- Asegúrate de estar en la BD pública (public)
-- ============================================================================

-- PASO 1: Crear tipos ENUM
-- ============================================================================
CREATE TYPE public.boleto_estado AS ENUM ('pendiente','confirmado','ganador');
CREATE TYPE public.tipo_participante AS ENUM ('Estudiante TecNM','Público General');
CREATE TYPE public.sedes_zongolica AS ENUM (
  'Zongolica',
  'Nogales',
  'Tezonapa',
  'Tehuipango',
  'Tequila',
  'Cuichapa',
  'Acultzinapa'
);

-- PASO 2: Crear tabla de catálogo de boletos (números disponibles)
-- ============================================================================
DROP TABLE IF EXISTS public.boletos_catalogo CASCADE;
CREATE TABLE public.boletos_catalogo (
  numero_boleto text NOT NULL,
  CONSTRAINT boletos_catalogo_pkey PRIMARY KEY (numero_boleto)
);

-- Llenar boletos_catalogo con números del 001 al 150
INSERT INTO public.boletos_catalogo (numero_boleto)
SELECT LPAD(generate_series::text, 3, '0')
FROM generate_series(1, 150);

-- PASO 3: Crear tabla de boletos registrados
-- ============================================================================
DROP TABLE IF EXISTS public.boletos CASCADE;
CREATE TABLE public.boletos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  correo text NOT NULL UNIQUE,
  telefono text,
  tipo_participante public.tipo_participante NOT NULL,
  sede public.sedes_zongolica,
  fecha_registro timestamptz NOT NULL DEFAULT now(),
  numero_boleto text NOT NULL UNIQUE,
  estado public.boleto_estado NOT NULL DEFAULT 'pendiente'::public.boleto_estado,
  comprobante_url text,
  CONSTRAINT boletos_pkey PRIMARY KEY (id),
  CONSTRAINT boletos_numero_boleto_fkey FOREIGN KEY (numero_boleto)
    REFERENCES public.boletos_catalogo(numero_boleto) ON DELETE RESTRICT
);

-- PASO 4: Crear tabla de reservas temporales
-- ============================================================================
DROP TABLE IF EXISTS public.reservas_boletos CASCADE;
CREATE TABLE public.reservas_boletos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  numero_boleto text NOT NULL UNIQUE,
  reservado_at timestamptz NOT NULL DEFAULT now(),
  expira_at timestamptz NOT NULL,
  CONSTRAINT reservas_boletos_pkey PRIMARY KEY (id),
  CONSTRAINT reservas_boletos_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT reservas_boletos_numero_boleto_fkey FOREIGN KEY (numero_boleto)
    REFERENCES public.boletos_catalogo(numero_boleto) ON DELETE CASCADE
);

-- PASO 5: Habilitar Row Level Security (RLS)
-- ============================================================================
ALTER TABLE public.boletos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservas_boletos ENABLE ROW LEVEL SECURITY;

-- PASO 6: Crear políticas RLS para boletos
-- ============================================================================

-- Política: Lectura pública de boletos confirmados
DROP POLICY IF EXISTS "boletos_select_public_confirmados" ON public.boletos;
CREATE POLICY "boletos_select_public_confirmados"
  ON public.boletos
  FOR SELECT
  TO public
  USING (estado = 'confirmado'::public.boleto_estado);

-- Política: Lectura autenticada de propios boletos
DROP POLICY IF EXISTS "boletos_select_own_authenticated" ON public.boletos;
CREATE POLICY "boletos_select_own_authenticated"
  ON public.boletos
  FOR SELECT
  TO authenticated
  USING (correo = auth.jwt() ->> 'email');

-- Nota: INSERT y UPDATE solo se hacen vía Service Role desde Server Actions
-- No se crean políticas para estas operaciones

-- PASO 7: Crear políticas RLS para reservas
-- ============================================================================

-- Política: Lectura de propias reservas
DROP POLICY IF EXISTS "reservas_select_own" ON public.reservas_boletos;
CREATE POLICY "reservas_select_own"
  ON public.reservas_boletos
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Política: Insertar propias reservas
DROP POLICY IF EXISTS "reservas_insert_own" ON public.reservas_boletos;
CREATE POLICY "reservas_insert_own"
  ON public.reservas_boletos
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Política: Eliminar propias reservas
DROP POLICY IF EXISTS "reservas_delete_own" ON public.reservas_boletos;
CREATE POLICY "reservas_delete_own"
  ON public.reservas_boletos
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- PASO 8: Crear índices para rendimiento
-- ============================================================================
CREATE INDEX IF NOT EXISTS reservas_boletos_expira_at_idx 
  ON public.reservas_boletos (expira_at);

CREATE INDEX IF NOT EXISTS reservas_boletos_user_id_idx 
  ON public.reservas_boletos (user_id);

CREATE INDEX IF NOT EXISTS boletos_correo_idx 
  ON public.boletos (correo);

CREATE INDEX IF NOT EXISTS boletos_numero_boleto_idx 
  ON public.boletos (numero_boleto);

CREATE INDEX IF NOT EXISTS boletos_estado_idx 
  ON public.boletos (estado);

CREATE INDEX IF NOT EXISTS boletos_fecha_registro_idx 
  ON public.boletos (fecha_registro DESC);

-- PASO 9: Crear función para limpiar reservas expiradas
-- ============================================================================
DROP FUNCTION IF EXISTS public.cleanup_reservas_expiradas();
CREATE OR REPLACE FUNCTION public.cleanup_reservas_expiradas()
RETURNS void LANGUAGE sql AS $$
  DELETE FROM public.reservas_boletos WHERE expira_at < now();
$$;

-- PASO 10: Crear vista de estado de boletos
-- ============================================================================
DROP VIEW IF EXISTS public.vw_boletos_estado CASCADE;
CREATE VIEW public.vw_boletos_estado AS
WITH boletos_confirmados AS (
  SELECT numero_boleto FROM public.boletos WHERE estado = 'confirmado'::public.boleto_estado
),
boletos_pendientes AS (
  SELECT numero_boleto FROM public.boletos WHERE estado = 'pendiente'::public.boleto_estado
),
reservas_activas AS (
  SELECT numero_boleto FROM public.reservas_boletos WHERE expira_at > now()
),
todos_numeros AS (
  SELECT numero_boleto FROM public.boletos_catalogo
)
SELECT
  tn.numero_boleto,
  CASE
    WHEN bc.numero_boleto IS NOT NULL THEN 'confirmado'::text
    WHEN bp.numero_boleto IS NOT NULL THEN 'pendiente'::text
    WHEN ra.numero_boleto IS NOT NULL THEN 'pendiente'::text
    ELSE 'disponible'::text
  END AS estado
FROM todos_numeros tn
LEFT JOIN boletos_confirmados bc ON tn.numero_boleto = bc.numero_boleto
LEFT JOIN boletos_pendientes bp ON tn.numero_boleto = bp.numero_boleto
LEFT JOIN reservas_activas ra ON tn.numero_boleto = ra.numero_boleto
ORDER BY tn.numero_boleto::int ASC;

-- PASO 11: Permisos en tabla catalogo
-- ============================================================================
-- La tabla boletos_catalogo no necesita RLS porque es solo lectura pública
-- (se usa como referencia para generar números)

-- ============================================================================
-- FIN DEL SCHEMA
-- ============================================================================
-- Después de ejecutar este SQL:
-- 1. Verifica que las tablas se crearon: SELECT * FROM information_schema.tables WHERE table_schema = 'public';
-- 2. Verifica que boletos_catalogo tiene 150 registros: SELECT COUNT(*) FROM public.boletos_catalogo;
-- 3. Prueba la vista: SELECT * FROM public.vw_boletos_estado LIMIT 10;
-- ============================================================================
