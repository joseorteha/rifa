# Rifa Siera Code — Next.js + Supabase

Sitio de rifa digital para apoyar al equipo Siera Code (TecNM Zongolica). Implementado con Next.js (App Router), Tailwind CSS, next-themes y Supabase (DB + Storage). Listo para desplegar en Vercel.

## Páginas
- `/` Inicio con Hero y contador regresivo.
- `/comprar` Formulario para registro de boleto con subida de comprobante.
- `/premios` Tarjetas de premios con descripción técnica.
- `/reglamento` Reglas y metodología.
- `/transparencia` Tabla pública con boletos confirmados.

## Variables de entorno
Ver `.env.example` y configurar en desarrollo y en Vercel:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SORTEO_AT="2025-11-18T20:00:00"
```

## Supabase — SQL
Ejecuta en el editor SQL de Supabase:

```sql
-- Tipos
CREATE TYPE boleto_estado AS ENUM ('pendiente','confirmado','ganador');
CREATE TYPE tipo_participante AS ENUM ('Estudiante TecNM','Público General');
CREATE TYPE sedes_zongolica AS ENUM ('Zongolica','Nogales','Tezonapa','Tehuipango','Tequila','Cuichapa','Acultzinapa');

-- Tabla boletos
CREATE TABLE public.boletos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  correo text UNIQUE NOT NULL,
  telefono text,
  tipo_participante tipo_participante NOT NULL,
  sede sedes_zongolica,
  fecha_registro timestamptz DEFAULT now(),
  numero_boleto text UNIQUE NOT NULL,
  estado boleto_estado DEFAULT 'pendiente',
  comprobante_url text
);

-- Sequence auxiliar (opcional) y RPC
CREATE SEQUENCE public.boleto_sequence START 1;

CREATE OR REPLACE FUNCTION public.generar_numero_boleto()
RETURNS text LANGUAGE plpgsql AS $$
DECLARE
  seq_id bigint;
  numero text;
BEGIN
  SELECT nextval('public.boleto_sequence') INTO seq_id;
  numero := to_char(seq_id, 'FM0000');
  RETURN 'SC-' || numero;
END;
$$;
```

### Reservas y RLS
- Activa RLS en `boletos` y crea la tabla `reservas_boletos` con políticas de acceso por usuario.
- El archivo `supabase/schema.sql` contiene:
  - Políticas de lectura en `boletos` (público ve confirmados, autenticados ven propios).
  - Tabla `reservas_boletos` con `user_id`, `numero_boleto`, `expira_at` y restricción única por número.
  - Políticas para insertar/consultar/eliminar solo tus reservas.
  - Vista `vw_boletos_estado` que marca como `pendiente` los números con reserva activa.
  - Índices en `expira_at` y `user_id`, y función `cleanup_reservas_expiradas()`.

Para aplicar:
1) Abre Supabase → SQL Editor → pega el contenido de `supabase/schema.sql` → ejecutar.
2) Crea una tarea programada (Scheduler) opcional que ejecute `select public.cleanup_reservas_expiradas();` cada 10 min.
3) Habilita Realtime en la base de datos si quieres ver reservas en vivo.

### Storage
- Crear bucket `comprobantes` como privado.
- La subida se realiza desde Server Actions usando el Service Role.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000/`.

## Deploy a Vercel
- Crear proyecto en Vercel enlazando este repo.
- Configurar las variables de entorno anteriores.
- Deploy: `vercel --prod` o push al repo enlazado.

## Notas de seguridad
- El `SUPABASE_SERVICE_ROLE_KEY` solo se usa en el servidor (Server Actions).
- Validaciones redundantes: cliente y servidor.

## Flujo admin (manual)
- Verificar transferencias y cambiar `estado` de `pendiente` a `confirmado` desde Supabase Dashboard.
