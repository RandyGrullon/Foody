# Sistema de Autenticación - IKEA-Eats

## Descripción General

La aplicación Foody utiliza un **sistema de autenticación basado en endpoints personalizados** en lugar de Firebase. 

### Acceso Público con Autenticación en Checkout

La aplicación sigue un modelo de **e-commerce moderno**:
- **Navegación libre** - Los usuarios pueden explorar la app sin necesidad de login
- **Agregar al carrito** - Pueden agregar productos al carrito sin autenticarse
- **Login requerido en checkout** - Solo se requiere autenticación al momento de pagar

Este flujo mejora la experiencia del usuario y reduce la fricción en el proceso de compra.

## Credenciales de Prueba

Para completar el checkout, utiliza las siguientes credenciales:

```
Email:    test@foody.com
Password: test123
```

## Características del Sistema

### 1. **Autenticación Selectiva**
- La mayoría de la app es de acceso público (home, menú, búsqueda, etc.)
- Solo requiere autenticación en rutas específicas:
  - `/checkout` - Página de pago
  - `/profile` - Perfil del usuario
  - `/orders` - Historial de pedidos
  - `/create-dish` - Crear platos personalizados
- Los usuarios no autenticados son redirigidos automáticamente a `/auth/login` al intentar acceder a estas rutas
- Después de iniciar sesión, el usuario es redirigido a la página que intentaba acceder

### 2. **Métodos de Autenticación**
- **Email y Contraseña**: Autenticación tradicional con credenciales
- **Google Sign-In**: Autenticación simulada con Google (retorna el usuario de prueba)
- **Recuperación de Contraseña**: Funcionalidad simulada de reset de contraseña

### 3. **Persistencia de Sesión**
- Las sesiones se almacenan en `localStorage`
- Los tokens tienen una validez de 24 horas
- La sesión se mantiene incluso después de cerrar el navegador
- Al recargar la página, la sesión se valida automáticamente

### 4. **Protección de Rutas Selectiva**
- Componente `ProtectedRoute` que protege solo rutas específicas
- Rutas protegidas: checkout, profile, orders, create-dish
- El resto de la app es de acceso público
- Redirección automática a login solo cuando se intenta acceder a rutas protegidas
- Guarda la ruta de destino para redirección post-login

## Arquitectura

### Archivos Principales

#### 1. **`src/lib/auth-service.ts`**
Servicio de autenticación que simula endpoints de backend:
- `signInWithEmail()` - Login con email/password
- `signUpWithEmail()` - Registro de nuevos usuarios
- `signInWithGoogle()` - Login con Google (simulado)
- `resetPassword()` - Recuperación de contraseña
- `validateToken()` - Validación de tokens de sesión

#### 2. **`src/hooks/use-auth.tsx`**
Hook de React que proporciona el contexto de autenticación:
- Gestión del estado del usuario
- Funciones de login/logout
- Persistencia de sesión con localStorage
- Validación automática de sesión al cargar la app

#### 3. **`src/components/protected-route.tsx`**
Componente de protección selectiva de rutas:
- Solo protege rutas específicas (checkout, profile, orders, create-dish)
- Verifica si el usuario está autenticado solo para rutas protegidas
- Redirige a login si no está autenticado y accede a ruta protegida
- Muestra loading mientras valida la sesión (solo en rutas protegidas)
- Guarda la ruta de destino para redirección post-login
- El resto de la app es de acceso público

#### 4. **`src/components/layout-wrapper.tsx`**
Wrapper principal que integra la protección de rutas en toda la app

## Flujo de Autenticación

### Navegación Pública
1. Usuario abre la app → Puede navegar libremente
2. Puede explorar el menú, buscar platos, ver detalles
3. Puede agregar productos al carrito sin autenticarse

### Checkout (Requiere Login)
1. Usuario intenta acceder a `/checkout` sin estar autenticado
2. Es redirigido automáticamente a `/auth/login`
3. La ruta `/checkout` se guarda en sessionStorage
4. Usuario ingresa credenciales en `/auth/login`
5. Se validan contra el usuario de prueba
6. Se genera un token JWT simulado
7. Token y datos del usuario se guardan en localStorage
8. Usuario es redirigido de vuelta a `/checkout`
9. Puede completar su compra

### Validación de Sesión
1. Al cargar la app, se verifica si existe un token en localStorage
2. Se valida el token (verificación de expiración)
3. Si es válido, se restaura la sesión del usuario
4. Si no es válido, se limpia el localStorage

### Logout
1. Usuario hace click en "Cerrar Sesión"
2. Se eliminan token y datos del usuario de localStorage
3. Estado del usuario se establece en `null`
4. Usuario es redirigido a `/auth/login`

## Personalización

### Proteger Más Rutas

Edita `src/components/protected-route.tsx` y agrega rutas al array `protectedRoutes`:

```typescript
const protectedRoutes = [
  '/checkout', 
  '/profile', 
  '/orders', 
  '/create-dish',
  '/admin',  // Nueva ruta protegida
  '/settings' // Nueva ruta protegida
];
```

### Hacer Rutas Públicas que Están Protegidas

Simplemente remueve la ruta del array `protectedRoutes` en `src/components/protected-route.tsx`.

### Agregar Más Usuarios de Prueba

Edita `src/lib/auth-service.ts` y modifica la función `signInWithEmail`:

```typescript
const USERS = [
  {
    email: 'test@foody.com',
    password: 'test123',
    displayName: 'Usuario de Prueba',
    id: 'test-user-001',
  },
  {
    email: 'admin@foody.com',
    password: 'admin123',
    displayName: 'Administrador',
    id: 'admin-user-001',
  },
];
```

### Cambiar Duración de Sesión

En `src/lib/auth-service.ts`, modifica la función `generateToken`:

```typescript
exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 días
```

## Migración a Backend Real

Cuando estés listo para conectar con un backend real:

1. **Reemplaza las funciones en `auth-service.ts`** con llamadas HTTP reales:
```typescript
export async function signInWithEmail(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) throw new Error('Login failed');
  
  return await response.json();
}
```

2. **Actualiza la validación de tokens** para usar tu backend
3. **Implementa refresh tokens** para mayor seguridad
4. **Agrega interceptores HTTP** para incluir el token en todas las peticiones

## Notas Importantes

- **Este sistema es solo para desarrollo/demo**. No uses esto en producción sin implementar un backend real.
- Los tokens generados son simulados y no están firmados criptográficamente
- Los datos se almacenan en localStorage (no es seguro para datos sensibles en producción)
- No hay validación de email ni requisitos de contraseña complejos

## Troubleshooting

### La sesión no persiste
- Verifica que localStorage esté habilitado en tu navegador
- Revisa la consola del navegador para errores

### Redirección infinita
- Limpia el localStorage: `localStorage.clear()`
- Recarga la página

### Usuario no puede hacer login
- Verifica que estés usando las credenciales correctas: `test@foody.com` / `test123`
- Revisa la consola del navegador para mensajes de error

## Recursos Adicionales

- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [React Context API](https://react.dev/reference/react/useContext)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
