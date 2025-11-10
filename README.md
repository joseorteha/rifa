# 🎯 Rifa Siera Code - HackaTec Nacional 2025

Sistema web completo para la rifa solidaria del equipo **Siera Code** del TecNM Campus Zongolica para el HackaTec Nacional 2025.

## 🏆 Descripción del Proyecto

Aplicación web moderna desarrollada con **Next.js 15** y **Supabase** para gestionar una rifa que ayudará al equipo Siera Code a representar al TecNM Zongolica en el HackaTec Nacional 2025 en Pachuca.

### 🎮 Premio: Kit Gamer 4-en-1 Lobo del Trueno TF800
- Teclado mecánico con switches Cherry MX Red (104 teclas, español QWERTY con letra Ñ)
- Mouse óptico gaming con sensor PixArt 3360 (1,200 DPI)
- Audífonos gaming premium con cable trenzado de 210cm
- Mousepad antideslizante incluido
- Iluminación RGBW en teclado y mouse
- Compatible con PC, Mac, PS4, PS5, Xbox, Steam Deck y más

## ✨ Características Principales

### 🎫 **Sistema de Rifa**
- **200 boletos** disponibles (números 001-200)
- Precio: **$30 MXN** por boleto
- Fechas: **12 al 21 de noviembre de 2025**
- Sorteo: **21 de noviembre a las 8:00 PM**

### 👥 **Gestión de Usuarios**
- Registro y autenticación completa
- Verificación por email (Gmail y Resend configurados)
- Perfiles de usuario personalizados
- Soporte para estudiantes TecNM con número de control

### 💳 **Sistema de Compra**
- Selección interactiva de números de boleto
- Carga de comprobantes de pago
- Validación automática de disponibilidad
- Estados de boletos: disponible, reservado, pendiente, confirmado

### 📱 **Diseño Responsive**
- Interfaz moderna con **shadcn/ui** y **Tailwind CSS**
- Totalmente optimizado para móviles
- Galería interactiva de imágenes del premio
- Modo oscuro/claro con next-themes

### 🔍 **Transparencia Total**
- Vista pública de todos los boletos vendidos
- Tabla de disponibilidad en tiempo real
- Información completa de participantes
- Estado actualizado de la rifa

## 🛠️ Stack Tecnológico

### **Frontend**
- **Next.js 15** con App Router
- **React 19** con TypeScript
- **Tailwind CSS** + **shadcn/ui**
- **Framer Motion** para animaciones
- **next-themes** para modo oscuro

### **Backend**
- **Node.js** + **Express**
- **Supabase** (PostgreSQL)
- **Multer** para carga de archivos
- **JWT** para autenticación
- **bcryptjs** para encriptación

### **Servicios**
- **Gmail API** para envío de emails (500/día)
- **Resend** como servicio de backup
- **Supabase Storage** para comprobantes

## 🚀 Instalación y Configuración

### **Prerequisitos**
- Node.js 18+ 
- NPM o Yarn
- Cuenta de Supabase
- Cuenta de Gmail con App Password

### **1. Clonar el Repositorio**
```bash
git clone git@github.com:joseorteha/rifa.git
cd rifa
```

### **2. Instalar Dependencias**
```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

### **3. Configuración de Variables de Entorno**

#### **Frontend (.env.local)**
```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_SORTEO_AT=2025-11-21T20:00:00
```

#### **Backend (.env)**
```env
# Supabase
SUPABASE_URL=tu_supabase_url
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# JWT
JWT_SECRET=tu_jwt_secret_muy_seguro

# Gmail
GMAIL_USER=tu_gmail@gmail.com
GMAIL_APP_PASSWORD=tu_app_password

# Resend (backup)
RESEND_API_KEY=tu_resend_api_key

# Servidor
PORT=5000
```

### **4. Configurar Base de Datos**
```bash
# Ejecutar en Supabase SQL Editor:
# 1. supabase/agregar_numero_control.sql
# 2. supabase/agregar_50_boletos.sql
```

### **5. Iniciar el Proyecto**
```bash
# Backend (Terminal 1)
cd backend
npm start

# Frontend (Terminal 2)  
npm run dev
```

## 📊 Estructura del Proyecto

```
rifa-web/
├── src/app/                    # Páginas y componentes de Next.js
│   ├── auth/                   # Autenticación (login, registro, verificación)
│   ├── components/             # Componentes reutilizables
│   ├── comprar/               # Proceso de compra de boletos
│   ├── premios/               # Galería del premio
│   ├── transparencia/         # Transparencia de boletos
│   └── perfil/                # Perfil de usuario
├── backend/                    # API y servicios backend
│   ├── src/controllers/        # Controladores de API
│   ├── src/routes/            # Rutas de Express
│   ├── src/services/          # Servicios (email, etc.)
│   └── src/middlewares/       # Middlewares de autenticación
├── supabase/                  # Scripts de base de datos
├── public/imagenes/           # Imágenes del premio
└── components.json            # Configuración de shadcn/ui
```

## 🔐 Características de Seguridad

- **Autenticación JWT** con tokens seguros
- **Validación de datos** en frontend y backend  
- **Encriptación bcrypt** para contraseñas
- **Variables de entorno** para datos sensibles
- **CORS configurado** para peticiones seguras
- **Validación de archivos** para comprobantes

## 📧 Sistema de Notificaciones

- **Verificación de email** obligatoria para registro
- **Confirmación de compra** automática
- **Templates HTML** profesionales
- **Fallback** entre Gmail y Resend
- **Límites de envío** configurados

## 🎨 Características de UI/UX

- **Diseño moderno** con componentes shadcn/ui
- **Galería interactiva** con modales de zoom
- **Animaciones fluidas** con Framer Motion
- **Responsive design** para todos los dispositivos
- **Modo oscuro/claro** persistente
- **Loading states** y feedback visual

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crear un Pull Request

## 👥 Equipo Siera Code

Estudiantes del **TecNM Campus Zongolica** participando en el **HackaTec Nacional 2025**.

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🎯 Estado del Proyecto

✅ **Listo para producción**
- Sistema de rifa completamente funcional
- 200 boletos configurados ($30 MXN c/u)
- Fechas: 12-21 noviembre 2025
- Galería interactiva del premio
- Sistema de emails operativo
- Diseño responsive optimizado

---

**¡Apoya al talento del TecNM Zongolica! 🚀**