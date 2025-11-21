# IKEA Foody: Resumen del Proyecto

## Enlace del Proyecto
*   **URL:** [Inserte URL aquí si disponible, o dejar como placeholder]
*   **Usuario de prueba:** test@foody.com
*   **Contraseña:** test123

---

## Introducción
IKEA Foody es una aplicación web moderna diseñada para revolucionar la experiencia de pedido de comida en los restaurantes IKEA. Combina la simplicidad característica de la marca con tecnología actual para optimizar el flujo de servicio, permitiendo a los usuarios explorar el menú, personalizar sus platos y gestionar sus pedidos de manera digital.

## Objetivo
El propósito principal es eliminar los cuellos de botella tradicionales en el área de comida, mejorando la satisfacción del cliente y la eficiencia operativa.

### Fases del Proyecto
*   **Fase I: Colaboradores:** Implementación inicial enfocada en el personal interno para probar flujos y estabilidad.
*   **Fase II: Clientes:** Despliegue general al público visitante de la tienda.

---

## Funcionalidades Principales

### 1. Registrarse e Iniciar Sesión
Sistema seguro de autenticación que permite a los usuarios crear un perfil para guardar su historial y preferencias.
*   **Métodos:** Correo/Contraseña, Google Auth.
*   **Perfil:** Gestión de datos personales y métodos de pago.

### 2. Categorías y Menú
Exploración intuitiva del catálogo gastronómico de IKEA.
*   **Categorías:** Organización clara (Desayunos, Almuerzos, Postres, Bebidas).
*   **Catálogo:** Visualización atractiva con imágenes de alta calidad.
*   **Búsqueda:** Herramienta para encontrar platos específicos rápidamente.

### 3. Gestión de Platos
Detalle profundo de cada opción culinaria.
*   **Detalles:** Información nutricional, descripción y precio.
*   **Personalización:** Posibilidad de "Crear un plato" o modificar existentes.
    *   **Ingredientes:** Agregar o quitar ingredientes.
    *   **Productos:** Selección de guarniciones o extras.

### 4. Carrito de Compras
Gestión flexible del pedido antes de la confirmación.
*   **Agregar al carrito:** Selección rápida desde el menú o detalle.
*   **Edición:** Modificar cantidades o eliminar ítems.
*   **Resumen:** Vista clara del subtotal y total.

### 5. Procesar el Pedido
Flujo de checkout optimizado.
*   **Confirmación:** Revisión final de ítems.
*   **Selección de modalidad:** Elegir cómo y cuándo retirar la comida.
*   **Pago:** Procesamiento seguro de la transacción.

---

## Modalidades de Pedido

### Pre-orden (Programada)
Ideal para planificar la comida con antelación.
*   **Especificar hora:** El usuario selecciona un bloque horario para el retiro.
*   **Retiro:** El usuario debe presentarse a la hora indicada.
*   **Proceso:** Requiere hacer fila breve para validación final o pago en caja si no se pagó digitalmente (dependiendo de la configuración de la tienda).

### Entrega Directa (Express)
Para consumo inmediato.
*   **Confirmación:** La orden se confirma y paga digitalmente al instante.
*   **Retiro:** El usuario solo debe presentarse en el área de entrega ("Pick-up point") para retirar su pedido ya preparado, sin pasar por caja.

---

## Tipos de Pago
Soporte para múltiples métodos modernos y corporativos.

*   **Billeteras Digitales:** Apple Pay, Google Pay.
*   **Tarjetas:** Crédito y Débito (Visa, Mastercard).
*   **Descuento de Nómina (Exclusivo Fase I/Colaboradores):**
    *   **Funcionamiento:** Posibilidad de que la empresa permita el descuento directo por nómina.
    *   **Límite:** Funciona como un préstamo con un monto límite preestablecido.
    *   **Integración:** Conexión con Workday o ERP de contabilidad para registrar el asiento automáticamente.

---

## Gestión de Órdenes

### Identificación y Seguimiento
*   **Código QR / Barras:** Cada orden genera un código único para presentar en el restaurante (área de servicio/entrega).
*   **Estados del Pedido:**
    1.  **Nuevo:** Orden recibida en cocina.
    2.  **Preparado:** Listo para retirar.
    3.  **Entregado:** Completado exitosamente.

### Entrega y Despacho
*   **Pantalla en Restaurante:** Monitor visual para el personal que muestra los pedidos entrantes y su estado.
*   **Validación:** Escaneo del QR o código de barra en el punto de entrega para confirmar el despacho.
*   **Facturación:** Integración con el sistema IKEA Food para emitir la factura oficial y realizar el registro contable correspondiente.

---

## Perfil de Usuario
Centro de control personal para el cliente.

*   **Resumen de Pedidos:** Historial completo de órdenes anteriores.
*   **Balances:** Visualización del saldo disponible o pendiente por pagar (en caso de descuento por nómina).
*   **Carrito de Compra:** Acceso persistente a la orden en curso.
*   **Platos Personalizados:** Guardado de configuraciones favoritas.
*   **Acceso Rápido:** Atajos al menú principal.
*   **Re-ordenar:** Funcionalidad para repetir un pedido anterior con un solo clic.

---

## Dependencias y Recursos
Para el funcionamiento óptimo del sistema se requiere:
*   **Recursos Humanos:** Personal disponible en restaurante dedicado a servir y despachar las órdenes digitales.
*   **Infraestructura:** Pantallas de visualización en cocina/despacho y lectores de códigos QR.

---

## Ventajas del Sistema
1.  **Eliminación de Cuellos de Botella:** Reduce drásticamente la congestión en las cajas tradicionales.
2.  **Experiencia de Cliente:** Evita largas filas, permitiendo un disfrute más relajado de la visita a IKEA.
3.  **Eficiencia Operativa:** Automatización del flujo de pedidos y pagos.

---

## Futuro: Fase II
**Expansión a Clientes Generales:**
Habilitar el sistema de cara al público general, permitiendo a cualquier visitante reservar sus pedidos desde su móvil mientras recorre la tienda, asegurando que su comida esté lista justo cuando lleguen al restaurante.
