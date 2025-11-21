# IKEA Eats - Documentación Técnica

## 📋 Información General

**Nombre del Proyecto:** IKEA Eats  
**Tipo:** Aplicación Web de Pedidos de Comida  
**Framework:** Next.js 14 (App Router)  
**Versión:** 1.0.0  
**Fecha de Creación:** Noviembre 2024

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

#### Frontend
- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes UI:** Radix UI
- **Iconos:** Lucide React
- **Gestión de Estado:** React Hooks (useState, useContext)
- **Almacenamiento:** LocalStorage (para carrito, historial, perfil)

#### Librerías Adicionales
- `clsx` - Utilidad para clases condicionales
- `tailwind-merge` - Merge de clases Tailwind
- `qrcode` - Generación de códigos QR
- `jsbarcode` - Generación de códigos de barras
- `next/image` - Optimización de imágenes

### Estructura de Carpetas

```
src/
├── app/                      # Rutas de Next.js App Router
│   ├── checkout/            # Página de checkout
│   │   └── page.tsx
│   ├── create-dish/         # Creación de platillos personalizados
│   │   └── page.tsx
│   ├── dishes/[id]/         # Detalles de platillo (dinámico)
│   │   └── page.tsx
│   ├── orders/[id]/         # Detalles de orden (dinámico)
│   │   └── page.tsx
│   ├── profile/             # Perfil de usuario
│   │   └── page.tsx
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página de inicio
│   └── globals.css          # Estilos globales
├── components/              # Componentes React
│   ├── ui/                  # Componentes UI base (Radix)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── tabs.tsx
│   │   ├── radio-group.tsx
│   │   ├── separator.tsx
│   │   ├── avatar.tsx
│   │   └── toast.tsx
│   ├── cart-sidebar.tsx     # Sidebar del carrito
│   ├── cart-button.tsx      # Botón del carrito
│   ├── header.tsx           # Header principal
│   ├── menu-item-card.tsx   # Tarjeta de platillo
│   ├── mobile-sidebar.tsx   # Sidebar móvil
│   ├── layout-wrapper.tsx   # Wrapper del layout
│   ├── custom-dish-block.tsx # Bloque de creación de platillo
│   └── icons.tsx            # Iconos personalizados
├── hooks/                   # Custom Hooks
│   ├── use-cart.tsx         # Hook del carrito
│   ├── use-cart-sidebar.tsx # Hook del sidebar del carrito
│   ├── use-search.tsx       # Hook de búsqueda
│   └── use-toast.tsx        # Hook de notificaciones
├── lib/                     # Utilidades y datos
│   ├── data.ts              # Datos del menú
│   ├── placeholder-images.ts # URLs de imágenes
│   └── utils.ts             # Funciones utilitarias
└── types/                   # Definiciones TypeScript
    └── index.ts             # Tipos globales
```

---

## 📊 Modelos de Datos

### MenuItem
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

### CartItem
```typescript
interface CartItem extends MenuItem {
  quantity: number;
}
```

### Order
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

### UserProfile
```typescript
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
}
```

### Category
```typescript
interface Category {
  id: string;
  name: string;
  icon: string;
}
```

---

## 🔧 Gestión de Estado

### Custom Hooks

#### useCart
**Ubicación:** `src/hooks/use-cart.tsx`

**Funcionalidades:**
- `addToCart(item: MenuItem)` - Agregar item al carrito
- `updateQuantity(id: string, quantity: number)` - Actualizar cantidad
- `removeFromCart(id: string)` - Eliminar item
- `clearCart()` - Limpiar carrito completo
- `cartItems` - Array de items en el carrito
- `cartTotal` - Total del carrito
- `itemCount` - Número total de items

**Persistencia:** LocalStorage (`ikea-eats-cart`)

#### useCartSidebar
**Ubicación:** `src/hooks/use-cart-sidebar.tsx`

**Funcionalidades:**
- `isOpen` - Estado de visibilidad
- `openCart()` - Abrir sidebar
- `closeCart()` - Cerrar sidebar
- `toggleCart()` - Toggle estado

#### useSearch
**Ubicación:** `src/hooks/use-search.tsx`

**Funcionalidades:**
- `searchQuery` - Query de búsqueda actual
- `setSearchQuery(query: string)` - Actualizar query
- `isSearchOpen` - Estado del modal
- `openSearch()` - Abrir modal
- `closeSearch()` - Cerrar modal

---

## 💾 Almacenamiento Local

### LocalStorage Keys

| Key | Descripción | Tipo de Datos |
|-----|-------------|---------------|
| `ikea-eats-cart` | Carrito de compras | `CartItem[]` |
| `ikea-eats-history` | Historial de órdenes | `Order[]` |
| `ikea-eats-order` | Orden temporal (checkout) | `Order` |
| `ikea-eats-profile` | Perfil de usuario | `UserProfile` |

### SessionStorage Keys

| Key | Descripción | Tipo de Datos |
|-----|-------------|---------------|
| `ikea-eats-last-order-id` | ID de última orden | `string` |

---

## 🎨 Sistema de Diseño

### Colores (Tailwind Config)

```typescript
colors: {
  primary: {
    DEFAULT: "hsl(209 100% 33.5%)", // IKEA Blue
    foreground: "hsl(0 0% 100%)",
  },
  secondary: {
    DEFAULT: "hsl(48 96% 53%)", // IKEA Yellow
    foreground: "hsl(0 0% 0%)",
  },
  background: "hsl(0 0% 100%)",
  foreground: "hsl(0 0% 3.9%)",
  muted: {
    DEFAULT: "hsl(0 0% 96.1%)",
    foreground: "hsl(0 0% 45.1%)",
  },
  // ... otros colores
}
```

### Tipografía

```typescript
fontFamily: {
  body: ["Outfit", "sans-serif"],
  headline: ["Outfit", "sans-serif"],
}
```

### Espaciado Estándar
- Padding de secciones: `py-16`
- Gap entre elementos: `gap-4`, `gap-6`, `gap-8`
- Contenedor máximo: `max-w-7xl`

### Sombras
- Cards: `shadow-lg`
- Hover: `hover:shadow-xl`
- Botones importantes: `shadow-md`

### Bordes
- Radius global: `rounded-lg`, `rounded-xl`
- Botones: `rounded-full`
- Inputs: `rounded-lg`

### Transiciones
- Duración estándar: `duration-300`
- Ease: `ease-in-out`

---

## 🎨 Componentes UI

### Componentes Base (Radix UI)

| Componente | Uso | Ubicación |
|------------|-----|-----------|
| Button | Botones interactivos | `components/ui/button.tsx` |
| Card | Contenedores de contenido | `components/ui/card.tsx` |
| Input | Campos de entrada | `components/ui/input.tsx` |
| Label | Etiquetas de formulario | `components/ui/label.tsx` |
| Badge | Indicadores y etiquetas | `components/ui/badge.tsx` |
| Dialog | Modales y diálogos | `components/ui/dialog.tsx` |
| Tabs | Navegación por pestañas | `components/ui/tabs.tsx` |
| RadioGroup | Selección única | `components/ui/radio-group.tsx` |
| Separator | Separadores visuales | `components/ui/separator.tsx` |
| Avatar | Avatares de usuario | `components/ui/avatar.tsx` |
| Toast | Notificaciones | `components/ui/toast.tsx` |

### Componentes Personalizados

| Componente | Descripción | Props Principales |
|------------|-------------|-------------------|
| MenuItemCard | Tarjeta de platillo | `item: MenuItem` |
| CartSidebar | Sidebar del carrito | - |
| CartButton | Botón del carrito | - |
| Header | Header principal | - |
| MobileSidebar | Navegación móvil | `children: ReactNode` |
| LayoutWrapper | Wrapper del layout | `children: ReactNode` |
| CustomDishBlock | Creación de platillo | - |

---

## 🔀 Navegación y Rutas

### Rutas Estáticas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `app/page.tsx` | Página de inicio |
| `/checkout` | `app/checkout/page.tsx` | Checkout |
| `/create-dish` | `app/create-dish/page.tsx` | Crear platillo |
| `/profile` | `app/profile/page.tsx` | Perfil de usuario |

### Rutas Dinámicas

| Ruta | Componente | Parámetro |
|------|------------|-----------|
| `/dishes/[id]` | `app/dishes/[id]/page.tsx` | `id: string` |
| `/orders/[id]` | `app/orders/[id]/page.tsx` | `id: string` |

### Navegación Programática

```typescript
import { useRouter } from 'next/navigation';

const router = useRouter();

// Navegar a una ruta
router.push('/checkout');

// Navegar con parámetros
router.push(`/dishes/${dishId}`);

// Regresar
router.back();
```

---

## 📱 Responsive Design

### Breakpoints (Tailwind)

| Breakpoint | Ancho Mínimo | Uso |
|------------|--------------|-----|
| `sm` | 640px | Tablets pequeñas |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Pantallas grandes |

### Adaptaciones por Dispositivo

#### Mobile (< 768px)
- Header: Logo + menú hamburguesa
- Sidebar del carrito: Ancho completo
- Grid de platillos: 1 columna
- Formularios: Stack vertical
- Botones: Ancho completo

#### Tablet (768px - 1024px)
- Grid de platillos: 2 columnas
- Sidebar del carrito: 384px
- Formularios: Híbrido

#### Desktop (> 1024px)
- Grid de platillos: 3 columnas
- Sidebar del carrito: 384px (empuja contenido)
- Formularios: Layout horizontal

---

## 🚀 Optimizaciones

### Rendimiento

1. **Next.js Image Optimization**
   ```tsx
   <Image
     src={imageUrl}
     alt={altText}
     fill
     className="object-cover"
   />
   ```

2. **Code Splitting Automático**
   - Next.js divide automáticamente el código por rutas
   - Lazy loading de componentes pesados

3. **Transiciones CSS**
   - Uso de `transition-all` con `duration-300`
   - GPU acceleration con `transform`

### SEO

```typescript
// En cada página
export const metadata: Metadata = {
  title: "Título de la Página",
  description: "Descripción para SEO",
};
```

### Accesibilidad

- Labels en todos los inputs
- Alt text en todas las imágenes
- Contraste de colores WCAG AA
- Navegación por teclado
- ARIA labels en elementos interactivos
- Semantic HTML5

---

## 📦 Dependencias

### package.json

```json
{
  "name": "ikea-eats",
  "version": "1.0.0",
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "lucide-react": "^0.378.0",
    "qrcode": "^1.5.3",
    "jsbarcode": "^3.11.6",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.3.0",
    "tailwindcss": "^3.4.3"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/qrcode": "^1.5.5",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

---

## 🛠️ Scripts de Desarrollo

### Comandos Disponibles

```bash
# Instalar dependencias
yarn install

# Modo desarrollo (puerto 3000)
yarn dev

# Build para producción
yarn build

# Iniciar servidor de producción
yarn start

# Linting
yarn lint

# Linting con auto-fix
yarn lint --fix
```

### Variables de Entorno

```env
# .env.local (opcional)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 🔐 Seguridad

### Validaciones

#### Validación de Tarjeta (Luhn Algorithm)

```typescript
function isValidLuhn(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '');
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}
```

#### Validación de Fecha de Expiración

```typescript
function validateExpiry(expiry: string): string {
  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    return "Formato debe ser MM/YY";
  }
  
  const [month, year] = expiry.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  const expMonth = parseInt(month);
  const expYear = parseInt(year);
  
  if (expMonth < 1 || expMonth > 12) {
    return "Mes inválido";
  }
  
  if (expYear < currentYear || 
      (expYear === currentYear && expMonth < currentMonth)) {
    return "Tarjeta expirada";
  }
  
  return "";
}
```

### Datos Sensibles

- **NO** se almacenan números de tarjeta completos
- **NO** se almacenan CVV
- Datos de perfil en LocalStorage (no sensibles)
- Órdenes en LocalStorage (información pública)

---

## 🔄 Estados de la Aplicación

### Estados del Carrito
- `empty` - Carrito vacío
- `has-items` - Carrito con items
- `updating` - Actualizando cantidad
- `removing` - Eliminando item

### Estados de Orden
- `in-progress` - Orden en progreso
- `completed` - Orden completada

### Estados de UI
- `loading` - Cargando datos
- `success` - Operación exitosa
- `error` - Error en operación
- `empty` - Sin datos

---

## 📝 Convenciones de Código

### Nomenclatura

- **Componentes:** PascalCase (`MenuItemCard.tsx`)
- **Hooks:** camelCase con prefijo `use` (`useCart.tsx`)
- **Utilidades:** camelCase (`formatPrice.ts`)
- **Tipos:** PascalCase (`MenuItem`, `CartItem`)
- **Constantes:** UPPER_SNAKE_CASE (`MAX_QUANTITY`)

### Estructura de Componentes

```typescript
"use client"; // Si usa hooks de cliente

import { useState } from "react";
import { ComponentProps } from "@/types";

interface Props {
  // Props del componente
}

export function ComponentName({ prop1, prop2 }: Props) {
  // Hooks
  const [state, setState] = useState();
  
  // Funciones
  const handleAction = () => {
    // Lógica
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

---

## 🧪 Testing (Futuro)

### Herramientas Sugeridas
- **Jest** - Unit testing
- **React Testing Library** - Component testing
- **Cypress** - E2E testing
- **Playwright** - E2E testing alternativo

---

## 📈 Mejoras Futuras

### Backend
- API REST con Node.js/Express
- Base de datos (PostgreSQL/MongoDB)
- Autenticación JWT
- WebSockets para actualizaciones en tiempo real

### Pagos
- Integración con Stripe
- Integración con PayPal
- Apple Pay real
- Google Pay real

### Features
- Notificaciones push
- Tracking de orden en tiempo real
- Programa de lealtad
- Reseñas y calificaciones
- Favoritos/Wishlist
- Historial de búsquedas
- Recomendaciones personalizadas

---

**Última actualización:** Noviembre 2024  
**Versión del documento:** 1.0.0
