# Documento de Diseño

## IKEA Eats - Aplicación Web de Pedidos de Comida

**Participantes:** Randy Grullon

**Fecha:** 2024/11/19

**Petición de referencia:** N/A

---

## Objetivo

Desarrollar una aplicación web moderna y funcional que permita a los clientes de IKEA explorar el menú del restaurante, personalizar platillos y realizar pedidos de comida para recoger en tienda, optimizando la experiencia de compra y reduciendo los tiempos de espera en las filas del restaurante.

La aplicación busca reflejar los valores fundamentales de IKEA: accesibilidad, funcionalidad y diseño democrático, proporcionando una plataforma digital que combine la simplicidad característica de la marca con tecnología moderna para ofrecer una experiencia de usuario fluida, intuitiva y agradable.

---

## Funcionalidad

La aplicación IKEA Eats funciona como una plataforma de pedidos de comida tipo e-commerce con las siguientes características principales:

### Navegación y Exploración

Los usuarios pueden acceder libremente a la aplicación sin necesidad de autenticación inicial. La página de inicio presenta un hero section atractivo con imagen de fondo de platillos apetitosos, barra de búsqueda integrada y acceso rápido a categorías de menú (Breakfast, Lunch & Dinner, Desserts & Pastries).

El sistema de navegación incluye filtros por categoría, búsqueda en tiempo real mediante modal con resultados instantáneos, y tarjetas de platillos con información detallada (imagen, nombre, descripción, precio, disponibilidad).

### Gestión de Carrito

Los usuarios pueden agregar platillos al carrito sin autenticarse. El carrito se mantiene persistente mediante localStorage y se presenta en un sidebar deslizante que muestra todos los items seleccionados, permite ajustar cantidades, eliminar items y visualizar el subtotal, impuestos y total.

La sección "Your Saved Items" en la página principal muestra hasta 6 items recientes del carrito con controles rápidos de cantidad.

### Personalización de Platillos

Cada platillo cuenta con una página de detalles donde los usuarios pueden ver información completa (descripción extendida, información nutricional, ingredientes) y personalizar el platillo agregando extras, seleccionando tamaño de porción y añadiendo instrucciones especiales.

Adicionalmente, existe una funcionalidad de creación de platillos personalizados donde los usuarios pueden construir su propio plato seleccionando base, proteína, vegetales, salsas y extras.

### Proceso de Checkout

Al proceder al checkout, el sistema requiere autenticación del usuario. El proceso incluye dos opciones de pedido:

- Carry Out: Pago inmediato requerido con procesamiento de tarjeta
- Pre-order: Pedido anticipado sin pago, finalizado en caja registradora

El checkout incluye validación de información de contacto, selección de método de pago (tarjeta de crédito/débito, Apple Pay, Google Pay), aplicación de cupones/descuentos y confirmación de orden.

### Confirmación y Seguimiento

Una vez completado el pedido, se genera un código de confirmación único junto con código QR y código de barras para validación en caja. Los usuarios pueden acceder a su historial de órdenes en la sección de perfil, donde pueden ver detalles completos de pedidos anteriores, reordenar platillos favoritos y descargar comprobantes.

### Autenticación Selectiva

El sistema implementa autenticación solo cuando es necesario. Las rutas públicas (home, menú, búsqueda, detalles de platillos) son accesibles sin login. Las rutas protegidas (checkout, perfil, historial de órdenes, creación de platillos personalizados) requieren autenticación y redirigen automáticamente al login si el usuario no está autenticado.

El sistema soporta login con email/contraseña, Google Sign-In y recuperación de contraseña, con persistencia de sesión mediante tokens almacenados en localStorage con validez de 24 horas.

---

## Detalles Técnicos

### Arquitectura General

La aplicación está construida como una Single Page Application (SPA) utilizando Next.js 14 con App Router, aprovechando las capacidades de Server Components y Client Components según las necesidades de cada página.

### Stack Tecnológico

**Frontend:**
- Framework: Next.js 15.3.3 (App Router)
- Lenguaje: TypeScript 5.x
- Estilos: Tailwind CSS 3.4.1
- Componentes UI: Radix UI (suite completa de componentes accesibles)
- Iconos: Lucide React
- Gestión de Estado: React Hooks (useState, useContext, useEffect)
- Carrusel: Embla Carousel React
- Validación: Zod + React Hook Form
- Generación de Códigos: qrcode, jsbarcode

**Inteligencia Artificial:**
- Framework: Genkit 1.20.0
- Proveedor: Google Generative AI
- Integración: @genkit-ai/next para recomendaciones personalizadas

**Autenticación:**
- Firebase 11.9.1 (configurado pero no implementado completamente)
- Sistema personalizado de autenticación con endpoints simulados
- Almacenamiento de sesión: localStorage

### Estructura de Carpetas

```
src/
├── app/                      # Rutas Next.js App Router
│   ├── auth/                # Páginas de autenticación
│   ├── categories/          # Navegación por categorías
│   ├── checkout/            # Proceso de pago
│   ├── confirmation/        # Confirmación de orden
│   ├── create-dish/         # Creación de platillos personalizados
│   ├── dishes/[id]/         # Detalles de platillo (ruta dinámica)
│   ├── orders/              # Historial y detalles de órdenes
│   ├── profile/             # Perfil de usuario
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página de inicio
│   └── globals.css          # Estilos globales
├── components/              # Componentes React
│   ├── ui/                  # Componentes base (34 componentes Radix)
│   ├── cart-sidebar.tsx     # Sidebar del carrito
│   ├── header.tsx           # Header principal
│   ├── menu-item-card.tsx   # Tarjeta de platillo
│   ├── mobile-sidebar.tsx   # Navegación móvil
│   ├── protected-route.tsx  # HOC para rutas protegidas
│   └── layout-wrapper.tsx   # Wrapper del layout
├── hooks/                   # Custom Hooks
│   ├── use-auth.tsx         # Gestión de autenticación
│   ├── use-cart.tsx         # Gestión del carrito
│   ├── use-cart-sidebar.tsx # Control del sidebar
│   ├── use-search.tsx       # Funcionalidad de búsqueda
│   └── use-toast.tsx        # Sistema de notificaciones
├── lib/                     # Utilidades y servicios
│   ├── auth-service.ts      # Servicio de autenticación
│   ├── data.ts              # Datos del menú (9 platillos, 3 categorías)
│   ├── firebase.ts          # Configuración Firebase
│   ├── placeholder-images.ts # URLs de imágenes
│   └── utils.ts             # Funciones utilitarias
└── types/                   # Definiciones TypeScript
    └── index.ts             # Tipos globales
```

### Modelos de Datos

**MenuItem:**
```typescript
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
}
```

**CartItem:**
```typescript
interface CartItem extends MenuItem {
  quantity: number;
}
```

**Order:**
```typescript
interface Order {
  id: string;
  code: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  type: 'carry-out' | 'pre-order';
  status: 'in-progress' | 'completed';
  createdAt: string;
}
```

**UserProfile:**
```typescript
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
}
```

### Gestión de Estado

El estado de la aplicación se maneja mediante Custom Hooks que encapsulan la lógica de negocio:

**useCart:** Gestiona el carrito de compras con funciones para agregar items, actualizar cantidades, eliminar items y limpiar el carrito. Persiste datos en localStorage con la key 'ikea-eats-cart'.

**useAuth:** Controla la autenticación del usuario, validación de tokens, login/logout y persistencia de sesión. Almacena tokens y datos de usuario en localStorage.

**useCartSidebar:** Maneja el estado de visibilidad del sidebar del carrito (abrir/cerrar/toggle).

**useSearch:** Controla el modal de búsqueda y el query de búsqueda actual con resultados en tiempo real.

### Almacenamiento Local

**localStorage:**
- ikea-eats-cart: Array de CartItem
- ikea-eats-history: Array de Order
- ikea-eats-order: Order temporal durante checkout
- ikea-eats-profile: UserProfile del usuario
- auth-token: Token de sesión JWT simulado
- auth-user: Datos del usuario autenticado

**sessionStorage:**
- ikea-eats-last-order-id: ID de la última orden creada
- redirect-after-login: Ruta de destino post-autenticación

### Sistema de Diseño

**Paleta de Colores (IKEA Brand):**
- Primary (Azul IKEA): hsl(209 100% 33.5%)
- Secondary (Amarillo IKEA): hsl(48 96% 53%)
- Background: hsl(0 0% 100%)
- Foreground: hsl(0 0% 3.9%)
- Muted: hsl(0 0% 96.1%)

**Tipografía:**
- Font Family: Outfit (Google Fonts)
- Tamaños: Sistema de escala Tailwind (text-sm a text-4xl)

**Espaciado:**
- Padding de secciones: py-16
- Gap entre elementos: gap-4, gap-6, gap-8
- Contenedor máximo: max-w-7xl

**Componentes UI:**
- 34 componentes base de Radix UI (Button, Card, Input, Dialog, Tabs, etc.)
- 13 componentes personalizados específicos de la aplicación
- Sistema de sombras: shadow-lg, shadow-xl
- Bordes redondeados: rounded-lg, rounded-xl
- Transiciones: duration-300 ease-in-out

### Responsive Design

**Breakpoints:**
- Mobile: < 768px (1 columna, header compacto, sidebar full-width)
- Tablet: 768px - 1024px (2 columnas, sidebar 384px)
- Desktop: > 1024px (3 columnas, sidebar 384px empuja contenido)

### Optimizaciones

**Rendimiento:**
- Next.js Image Optimization para todas las imágenes
- Code Splitting automático por rutas
- Lazy loading de componentes pesados
- Debounce en búsqueda (150ms)
- Transiciones CSS con GPU acceleration

**SEO:**
- Metadata en cada página
- Semantic HTML5
- URLs descriptivas
- Open Graph tags

**Accesibilidad:**
- Contraste WCAG AA
- Labels en todos los inputs
- Alt text en imágenes
- Navegación por teclado
- ARIA labels
- Focus visible

### Seguridad

**Validaciones:**
- Algoritmo de Luhn para validación de tarjetas
- Validación de fecha de expiración
- Validación de CVV (3-4 dígitos)
- Sanitización de inputs

**Datos Sensibles:**
- NO se almacenan números de tarjeta completos
- NO se almacenan CVV
- Tokens con expiración de 24 horas
- Datos de perfil no sensibles en localStorage

### Integración con IA

La aplicación incluye integración con Genkit y Google Generative AI para:
- Recomendaciones personalizadas de platillos
- Sugerencias basadas en historial de pedidos
- Asistente virtual para ayuda en la selección

---

## Interfaz de Usuario

### Página de Inicio

**Hero Section:**
- Banner con imagen de fondo de alta calidad (platillos suecos)
- Gradiente overlay azul IKEA para legibilidad
- Título principal: "Welcome to IKEA Eats"
- Subtítulo con palabra "Extraordinary" resaltada en amarillo
- Badge "New Seasonal Menu" con fondo amarillo
- Barra de búsqueda integrada con placeholder descriptivo
- Botón CTA "Create Your Own Dish" con fondo amarillo

**Categorías:**
- Grid responsive de 3 tarjetas con gradientes distintivos
- Breakfast: Gradiente naranja a amarillo
- Lunch & Dinner: Gradiente azul a índigo
- Desserts & Pastries: Gradiente rosa a rojo
- Hover effect con escala 105% y texto "Explore [categoría]"

**Your Saved Items:**
- Sección dinámica visible solo con items en carrito
- Fondo gris claro diferenciado
- Header con título, subtítulo y contador de items
- Botón "View Cart" en esquina superior derecha
- Grid de hasta 6 items más recientes
- Cada tarjeta incluye imagen, nombre, precio, controles de cantidad y botón eliminar

**Our Menu:**
- Header con título "Our Menu" y subtítulo descriptivo
- Barra de filtros: All, Main Courses, Desserts
- Grid responsive de tarjetas de platillos
- Cada tarjeta muestra: imagen, badges (cantidad en carrito, unavailable), nombre, descripción truncada, precio, botones "Customize" y "Add"

### Modal de Búsqueda

- Overlay semitransparente con blur
- Contenedor centrado (max-width: 672px)
- Input de búsqueda con auto-focus
- Resultados en tiempo real (debounce 150ms)
- Mínimo 2 caracteres para búsqueda
- Estados: inicial, buscando, con resultados, sin resultados
- Cada resultado muestra: thumbnail, nombre, descripción, categoría, precio
- Navegación por teclado (flechas, enter, escape)

### Página de Detalles de Platillo

- Header sticky con breadcrumb
- Imagen principal grande (aspect ratio 4:3)
- Nombre del platillo (tipografía grande)
- Descripción completa
- Precio destacado
- Sección de información nutricional
- Lista de ingredientes
- Sección de personalización con extras
- Selector de tamaño de porción
- Campo de instrucciones especiales
- Botón "Add to Cart" prominente

### Carrito (Sidebar)

- Desliza desde la derecha
- Ancho: 384px (desktop), full-width (mobile)
- Header con título y botón cerrar
- Lista de items con imagen, nombre, precio, controles de cantidad
- Subtotal, impuestos (calculados), total
- Botón "Proceed to Checkout" fijo en la parte inferior
- Estado vacío con mensaje y sugerencia de explorar menú

### Página de Checkout

- Layout de dos columnas (desktop)
- Columna izquierda: Formulario de información
  - Información de contacto
  - Tipo de pedido (Carry Out / Pre-order)
  - Método de pago (solo para Carry Out)
  - Formulario de tarjeta con validación en tiempo real
  - Opciones de pago rápido (Apple Pay, Google Pay)
- Columna derecha: Resumen de orden
  - Lista de items
  - Subtotal, impuestos, total
  - Botón "Place Order"

### Página de Confirmación

- Mensaje de éxito
- Código de confirmación alfanumérico
- Código QR generado
- Código de barras generado
- Detalles de la orden
- Botones: "Download Receipt", "View Order Details", "Back to Home"

### Página de Perfil

- Sistema de tabs:
  - Personal Info: Formulario editable de datos personales
  - Order History: Lista de órdenes previas con filtros
  - Settings: Preferencias de la aplicación
- Avatar del usuario
- Información de cuenta (email, fecha de registro)
- Botón "Logout"

### Página de Creación de Platillo Personalizado

- Wizard de múltiples pasos
- Paso 1: Selección de base (arroz, pasta, ensalada)
- Paso 2: Selección de proteína (pollo, pescado, vegetariano)
- Paso 3: Selección de vegetales (múltiple selección)
- Paso 4: Selección de salsa
- Paso 5: Extras adicionales
- Preview en tiempo real del platillo
- Cálculo dinámico del precio
- Botón "Add to Cart"

### Componentes de Navegación

**Header (Desktop):**
- Logo IKEA Eats (izquierda)
- Navegación: Home, Menu, Create Dish
- Barra de búsqueda central
- Iconos: Search, User, Cart (con badge de cantidad)

**Header (Mobile):**
- Logo IKEA Eats (centro)
- Menú hamburguesa (izquierda)
- Icono de carrito (derecha, con badge)

**Mobile Sidebar:**
- Desliza desde la izquierda
- Avatar y nombre de usuario (si está autenticado)
- Links de navegación
- Botón "Login" o "Logout"

### Sistema de Notificaciones (Toast)

- Posición: Bottom-right (desktop), Bottom-center (mobile)
- Tipos: Success, Error, Info, Warning
- Auto-dismiss después de 3 segundos
- Acción de cerrar manual
- Animación de entrada/salida suave

---

## Requerimientos

### Infraestructura

**Hosting:**
- Plataforma: Firebase Hosting (configurado en apphosting.yaml)
- Dominio: Por definir
- SSL: Certificado automático de Firebase

**Base de Datos:**
- Actualmente: Datos estáticos en archivo TypeScript (src/lib/data.ts)
- Futuro: Firestore para datos dinámicos (menú, órdenes, usuarios)
- Estructura propuesta:
  - Colección: menuItems
  - Colección: orders
  - Colección: users
  - Colección: categories

**Autenticación:**
- Actualmente: Sistema simulado con endpoints personalizados
- Futuro: Firebase Authentication
- Métodos: Email/Password, Google Sign-In
- Gestión de sesiones: Firebase Auth SDK

**Almacenamiento de Archivos:**
- Firebase Storage para imágenes de platillos
- Optimización de imágenes con Next.js Image
- CDN para entrega rápida de assets

### Integraciones de Terceros

**Procesamiento de Pagos:**
- Stripe (configuración pendiente)
- Métodos soportados: Tarjetas de crédito/débito, Apple Pay, Google Pay
- Webhooks para confirmación de pagos
- Stripe Customers API para guardar métodos de pago

**Generación de Códigos:**
- Biblioteca qrcode para códigos QR
- Biblioteca jsbarcode para códigos de barras
- Formato de códigos: Alfanumérico único por orden

**Inteligencia Artificial:**
- Google Generative AI (Gemini)
- Genkit framework para flujos de IA
- Endpoints: src/ai/dev.ts
- Uso: Recomendaciones personalizadas

### Dependencias del Proyecto

**Producción:**
- next: 15.3.3
- react: 18.3.1
- typescript: 5.x
- firebase: 11.9.1
- genkit: 1.20.0
- @genkit-ai/google-genai: 1.20.0
- tailwindcss: 3.4.1
- 18 paquetes de @radix-ui
- lucide-react: 0.475.0
- react-hook-form: 7.54.2
- zod: 3.24.2
- qrcode: 1.5.4
- jsbarcode: 3.12.1
- date-fns: 3.6.0
- recharts: 2.15.1

**Desarrollo:**
- @types/node: 20.x
- @types/react: 18.x
- genkit-cli: 1.20.0
- postcss: 8.x

### Variables de Entorno

**Requeridas:**
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
GOOGLE_GENAI_API_KEY=
```

**Opcionales:**
```
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_API_URL=
```

### Requisitos de Sistema

**Desarrollo:**
- Node.js: 20.x o superior
- Package Manager: Yarn (recomendado) o npm
- Sistema Operativo: Windows, macOS, Linux
- Editor: VS Code (recomendado) con extensiones TypeScript y Tailwind CSS

**Producción:**
- Node.js: 20.x o superior
- Memoria: Mínimo 512MB RAM
- Almacenamiento: Mínimo 100MB para la aplicación
- Ancho de banda: Según tráfico esperado

### Navegadores Soportados

- Chrome: Últimas 2 versiones
- Firefox: Últimas 2 versiones
- Safari: Últimas 2 versiones
- Edge: Últimas 2 versiones
- Mobile Safari (iOS): Últimas 2 versiones
- Chrome Mobile (Android): Últimas 2 versiones

---

## Apreciaciones

### Fortalezas del Diseño Actual

**Experiencia de Usuario:**
La aplicación implementa un flujo de usuario moderno tipo e-commerce que reduce la fricción al permitir navegación libre sin autenticación obligatoria. Este enfoque aumenta la tasa de conversión al no requerir registro previo para explorar el menú y agregar items al carrito.

**Identidad de Marca:**
El diseño respeta fielmente la identidad visual de IKEA utilizando exclusivamente los colores oficiales (azul y amarillo) y aplicando los principios de diseño democrático de la marca: forma, función, calidad, sostenibilidad y bajo costo.

**Arquitectura Técnica:**
El uso de Next.js 14 con App Router proporciona una base sólida con Server Components para rendimiento óptimo, code splitting automático y excelente SEO. La estructura modular de componentes y hooks facilita el mantenimiento y escalabilidad.

**Accesibilidad:**
La implementación de Radix UI garantiza componentes accesibles por defecto con soporte completo de navegación por teclado, ARIA labels y cumplimiento de estándares WCAG AA.

### Áreas de Mejora Identificadas

**Backend y Persistencia:**
Actualmente la aplicación utiliza datos estáticos y localStorage para persistencia. Para producción se requiere:
- Implementación completa de Firebase Firestore
- API REST para operaciones CRUD
- Sincronización en tiempo real de inventario
- Gestión de sesiones server-side

**Procesamiento de Pagos:**
El sistema de pagos está simulado. Se necesita:
- Integración completa con Stripe
- Implementación de webhooks para confirmación
- Manejo de errores de pago
- Soporte para reembolsos
- Cumplimiento PCI DSS

**Autenticación:**
El sistema actual es simulado con un usuario de prueba. Se requiere:
- Migración completa a Firebase Authentication
- Implementación de refresh tokens
- Recuperación de contraseña funcional
- Verificación de email
- Autenticación de dos factores (opcional)

**Testing:**
No existe suite de testing implementada. Se recomienda:
- Unit tests con Jest
- Component tests con React Testing Library
- E2E tests con Cypress o Playwright
- Cobertura mínima del 80%

**Monitoreo y Analytics:**
Falta implementación de:
- Google Analytics o alternativa
- Error tracking (Sentry)
- Performance monitoring
- User behavior analytics

### Consideraciones de Escalabilidad

**Gestión de Menú:**
El menú actual tiene 9 platillos hardcodeados. Para escalabilidad:
- Sistema de administración de menú (CMS)
- Gestión de disponibilidad por tienda
- Gestión de disponibilidad por horario
- Precios dinámicos según ubicación
- Menús estacionales automatizados

**Multi-tienda:**
La aplicación actual no diferencia entre tiendas. Para soporte multi-tienda:
- Selector de tienda en header
- Menús específicos por ubicación
- Horarios de operación por tienda
- Inventario independiente
- Geolocalización para sugerencia de tienda más cercana

**Internacionalización:**
Actualmente solo en inglés. Para expansión:
- Sistema i18n (next-intl)
- Traducción de contenido dinámico
- Formatos de moneda por región
- Formatos de fecha/hora localizados

**Rendimiento a Escala:**
Para alto tráfico se requiere:
- CDN para assets estáticos
- Caché de API responses
- Optimización de queries a base de datos
- Load balancing
- Rate limiting

### Recomendaciones de Implementación

**Fase 1 - Fundamentos (4-6 semanas):**
- Migrar datos estáticos a Firestore
- Implementar Firebase Authentication completa
- Configurar CI/CD pipeline
- Implementar suite básica de tests

**Fase 2 - Pagos y Órdenes (3-4 semanas):**
- Integrar Stripe completamente
- Implementar sistema de órdenes en tiempo real
- Desarrollar panel de administración básico
- Implementar notificaciones por email

**Fase 3 - Optimización (2-3 semanas):**
- Implementar analytics y monitoring
- Optimizar rendimiento (Core Web Vitals)
- Mejorar SEO
- Implementar PWA features

**Fase 4 - Features Avanzadas (4-6 semanas):**
- Sistema de recomendaciones con IA
- Programa de lealtad
- Sistema de cupones y descuentos
- Reseñas y calificaciones

### Consideraciones de Seguridad

**Datos Sensibles:**
- Nunca almacenar números de tarjeta completos
- Usar Stripe Elements para captura segura
- Encriptar datos personales en base de datos
- Implementar HTTPS obligatorio

**Autenticación:**
- Tokens JWT con expiración corta
- Refresh tokens con rotación
- Rate limiting en endpoints de auth
- Protección contra ataques de fuerza bruta

**Validación:**
- Validación server-side de todos los inputs
- Sanitización de datos de usuario
- Protección contra XSS
- Protección contra CSRF

### Métricas de Éxito

**KPIs Técnicos:**
- Tiempo de carga inicial: < 2 segundos
- First Contentful Paint: < 1.5 segundos
- Time to Interactive: < 3 segundos
- Lighthouse Score: > 90 en todas las categorías
- Uptime: > 99.9%

**KPIs de Negocio:**
- Tasa de conversión: > 15%
- Valor promedio de orden: Tracking
- Tasa de abandono de carrito: < 30%
- Tiempo promedio de checkout: < 3 minutos
- Satisfacción de usuario: > 4.5/5

---

## Desglose de Tareas

| Área | Descripción Tarea | Tiempo (h) |
|------|-------------------|------------|
| Diseño | Análisis de requerimientos y documentación | 8 |
| Diseño | Creación de mockups y prototipos | 12 |
| Diseño | Definición de sistema de diseño | 6 |
| Frontend | Configuración inicial del proyecto Next.js | 4 |
| Frontend | Implementación de componentes UI base (Radix) | 16 |
| Frontend | Desarrollo de página de inicio | 12 |
| Frontend | Desarrollo de sistema de navegación y búsqueda | 10 |
| Frontend | Desarrollo de página de detalles de platillo | 8 |
| Frontend | Implementación de carrito de compras | 12 |
| Frontend | Desarrollo de página de checkout | 16 |
| Frontend | Implementación de autenticación (páginas y flujos) | 12 |
| Frontend | Desarrollo de página de perfil | 8 |
| Frontend | Desarrollo de página de confirmación | 6 |
| Frontend | Implementación de creación de platillos personalizados | 14 |
| Frontend | Responsive design y optimizaciones móviles | 10 |
| Frontend | Implementación de sistema de notificaciones | 4 |
| Bases de Datos | Diseño de esquema Firestore | 6 |
| Bases de Datos | Configuración de Firebase proyecto | 3 |
| Bases de Datos | Implementación de colecciones y reglas de seguridad | 8 |
| Bases de Datos | Migración de datos estáticos a Firestore | 4 |
| Bases de Datos | Implementación de queries y optimizaciones | 6 |
| Backend | Configuración de Firebase Authentication | 4 |
| Backend | Implementación de endpoints de autenticación | 8 |
| Backend | Integración con Stripe (configuración) | 6 |
| Backend | Implementación de procesamiento de pagos | 12 |
| Backend | Desarrollo de webhooks de Stripe | 6 |
| Backend | Implementación de generación de códigos (QR, barras) | 4 |
| Backend | Sistema de gestión de órdenes | 10 |
| Backend | Implementación de emails transaccionales | 6 |
| IA | Configuración de Genkit y Google Generative AI | 4 |
| IA | Implementación de sistema de recomendaciones | 12 |
| IA | Entrenamiento y ajuste de prompts | 6 |
| Testing | Configuración de entorno de testing | 4 |
| Testing | Unit tests para componentes críticos | 16 |
| Testing | Integration tests para flujos principales | 12 |
| Testing | E2E tests para checkout y autenticación | 10 |
| Testing | Testing de accesibilidad | 4 |
| DevOps | Configuración de CI/CD pipeline | 6 |
| DevOps | Configuración de Firebase Hosting | 3 |
| DevOps | Configuración de variables de entorno | 2 |
| DevOps | Optimización de build y deployment | 4 |
| QA | Testing manual de funcionalidades | 12 |
| QA | Testing de compatibilidad cross-browser | 6 |
| QA | Testing de rendimiento y optimización | 6 |
| QA | Corrección de bugs identificados | 16 |
| Documentación | Documentación técnica completa | 8 |
| Documentación | Guía de usuario | 6 |
| Documentación | Documentación de API | 4 |
| **Total** | | **365** |

### Distribución por Área

- **Diseño:** 26 horas (7%)
- **Frontend:** 132 horas (36%)
- **Bases de Datos:** 27 horas (7%)
- **Backend:** 56 horas (15%)
- **IA:** 22 horas (6%)
- **Testing:** 46 horas (13%)
- **DevOps:** 15 horas (4%)
- **QA:** 40 horas (11%)
- **Documentación:** 18 horas (5%)

### Estimación de Tiempo Total

**Horas totales:** 365 horas

**Equivalente en semanas (40h/semana):** 9.1 semanas

**Duración estimada del proyecto:** 10-12 semanas (considerando imprevistos y revisiones)

---

**Documento preparado por:** Randy Grullon  
**Última actualización:** 2024/11/21  
**Versión del documento:** 1.0.0
