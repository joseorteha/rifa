-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.boletos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  correo text NOT NULL,
  telefono text,
  tipo_participante USER-DEFINED NOT NULL,
  sede USER-DEFINED,
  fecha_registro timestamp with time zone NOT NULL DEFAULT now(),
  numero_boleto text NOT NULL UNIQUE,
  estado USER-DEFINED NOT NULL DEFAULT 'pendiente'::boleto_estado,
  comprobante_url text,
  fecha_confirmacion timestamp with time zone,
  CONSTRAINT boletos_pkey PRIMARY KEY (id),
  CONSTRAINT boletos_numero_boleto_fkey FOREIGN KEY (numero_boleto) REFERENCES public.boletos_catalogo(numero_boleto)
);
CREATE TABLE public.boletos_catalogo (
  numero_boleto text NOT NULL,
  CONSTRAINT boletos_catalogo_pkey PRIMARY KEY (numero_boleto)
);
CREATE TABLE public.reservas_boletos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  numero_boleto text NOT NULL UNIQUE,
  reservado_at timestamp with time zone NOT NULL DEFAULT now(),
  expira_at timestamp with time zone NOT NULL,
  CONSTRAINT reservas_boletos_pkey PRIMARY KEY (id),
  CONSTRAINT reservas_boletos_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT reservas_boletos_numero_boleto_fkey FOREIGN KEY (numero_boleto) REFERENCES public.boletos_catalogo(numero_boleto)
);
CREATE TABLE public.usuarios (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  nombre text NOT NULL,
  email_verificado boolean DEFAULT false,
  verification_token text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT usuarios_pkey PRIMARY KEY (id)
);