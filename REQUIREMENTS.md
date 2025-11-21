# IKEA Eats - Requerimientos Funcionales

## Información General

**Nombre del Proyecto:** IKEA Eats  
**Tipo:** Aplicación Web de Pedidos de Comida  
**Propósito:** Permitir a los usuarios explorar el menú del restaurante IKEA, personalizar platillos y realizar pedidos para recoger en tienda.

**Alcance:** Esta aplicación está diseñada para ser utilizada por clientes de IKEA que deseen ordenar comida del restaurante de manera anticipada, evitando filas y optimizando su experiencia de compra. La aplicación permite tanto a usuarios nuevos como registrados realizar pedidos, con funcionalidades adicionales para usuarios frecuentes.

---

## Descripción del Proyecto

IKEA Eats es una aplicación web moderna diseñada para revolucionar la experiencia de pedido de comida en los restaurantes IKEA. La aplicación combina la simplicidad característica de IKEA con tecnología moderna para ofrecer una experiencia de usuario fluida y agradable.

### Visión del Producto
Crear una plataforma digital que refleje los valores de IKEA: accesibilidad, funcionalidad y diseño democrático, permitiendo a los clientes disfrutar de la comida sueca de calidad con la conveniencia del pedido digital.

### Objetivos Principales
1. **Reducir tiempos de espera:** Permitir a los clientes ordenar con anticipación
2. **Mejorar la experiencia:** Ofrecer información detallada de cada platillo
3. **Facilitar la personalización:** Permitir customización completa de órdenes
4. **Aumentar satisfacción:** Proporcionar un proceso de pago simple y seguro
5. **Fomentar lealtad:** Mantener historial de órdenes para facilitar recompras

### Público Objetivo
- **Familias:** Que visitan IKEA y desean ordenar comida sin interrumpir su experiencia de compra
- **Profesionales:** Que buscan almorzar rápidamente durante su visita
- **Clientes frecuentes:** Que conocen el menú y desean ordenar sus favoritos rápidamente
- **Nuevos visitantes:** Que desean explorar las opciones gastronómicas de IKEA

La aplicación está diseñada siguiendo los principios de diseño de IKEA: simplicidad, funcionalidad y accesibilidad, asegurando que cualquier persona pueda usarla sin dificultad.

---

## Identidad de Marca

### Colores Oficiales IKEA

La aplicación utiliza estrictamente la paleta de colores oficial de IKEA para mantener la coherencia de marca:

- **Azul IKEA (Primary):** 
  - Uso: Botones principales, enlaces, elementos interactivos destacados
  - Significado: Confianza, profesionalismo, identidad de marca
  - Aplicación: Botones de acción principal, header, elementos de navegación activos

- **Amarillo IKEA (Secondary):** 
  - Uso: Badges, highlights, elementos de acento, estados seleccionados
  - Significado: Energía, optimismo, llamadas de atención
  - Aplicación: Badges de cantidad, elementos seleccionados, notificaciones positivas

- **Fondo:** 
  - Blanco limpio para máxima legibilidad
  - Gris claro (#F5F5F5) para diferenciar secciones
  - Gradientes sutiles para profundidad visual

- **Texto:** 
  - Negro (#000000) para contenido principal y títulos
  - Gris oscuro (#666666) para texto secundario y descripciones
  - Blanco para texto sobre fondos oscuros

### Principios de Diseño

**1. Minimalismo**
- Diseño limpio que elimina elementos innecesarios
- Espacios en blanco generosos para facilitar la lectura
- Jerarquía visual clara que guía la atención del usuario
- Cada elemento tiene un propósito definido

**2. Claridad**
- Información presentada de forma directa y sin ambigüedades
- Etiquetas descriptivas en todos los controles
- Mensajes de error y confirmación claros
- Iconografía intuitiva que complementa el texto

**3. Accesibilidad**
- Contraste de colores que cumple con estándares WCAG AA
- Tamaños de fuente legibles en todos los dispositivos
- Áreas de toque suficientemente grandes (mínimo 44x44px)
- Navegación por teclado completamente funcional
- Textos alternativos en todas las imágenes

**4. Consistencia**
- Elementos visuales coherentes en toda la aplicación
- Patrones de interacción predecibles
- Terminología uniforme en toda la interfaz
- Comportamientos consistentes de los componentes

### Filosofía de Diseño IKEA

La aplicación refleja la filosofía de diseño democrático de IKEA:
- **Forma:** Diseño atractivo y moderno
- **Función:** Cada elemento cumple un propósito claro
- **Calidad:** Experiencia premium sin complejidad innecesaria
- **Sostenibilidad:** Diseño eficiente que minimiza recursos
- **Bajo costo:** Simplicidad que reduce costos de desarrollo y mantenimiento

---

## Funcionalidades Principales

### 1. Página de Inicio (Home)

La página de inicio es el punto de entrada principal de la aplicación y está diseñada para dar una primera impresión impactante mientras facilita el acceso rápido a todas las funcionalidades clave.

#### 1.1 Hero Section

**Propósito:** 
Dar la bienvenida al usuario, comunicar la propuesta de valor y proporcionar acceso inmediato a las funciones principales.

**Descripción Detallada:**
La sección hero ocupa la parte superior de la página con una imagen de fondo de alta calidad que muestra platillos apetitosos de IKEA. Sobre esta imagen se aplica un gradiente semitransparente que va del azul IKEA al transparente, asegurando que el texto sea legible mientras se mantiene visible la imagen de fondo.

**Elementos:**

1. **Banner con Imagen de Fondo:**
   - Imagen hero de alta resolución mostrando comida sueca
   - Gradiente overlay que mejora la legibilidad
   - Altura responsive que se adapta al dispositivo
   - Efecto parallax sutil al hacer scroll (opcional)

2. **Título Principal:**
   - "Welcome to IKEA Eats" en tipografía grande y bold
   - Color blanco para máximo contraste
   - Animación de entrada suave al cargar la página

3. **Subtítulo Destacado:**
   - Frase motivacional con la palabra "Extraordinary" resaltada en amarillo IKEA
   - Comunica la propuesta de valor única
   - Tamaño de fuente prominente pero secundario al título

4. **Badge "New Seasonal Menu":**
   - Indicador visual de novedades
   - Fondo amarillo IKEA con texto oscuro
   - Posicionado estratégicamente para llamar la atención
   - Actualizable según temporada o promociones

5. **Barra de Búsqueda Integrada:**
   - Input grande y visible con placeholder descriptivo
   - Ícono de lupa a la izquierda
   - Diseño que invita a la interacción
   - Bordes redondeados suaves
   - Efecto de enfoque visual al hacer click

6. **Botón CTA "Create Your Own Dish":**
   - Botón secundario pero prominente
   - Fondo amarillo IKEA para destacar
   - Texto en negro para máximo contraste
   - Ícono de chef o utensilio
   - Efecto hover con elevación de sombra

**Experiencia del Usuario:**
Al llegar a la aplicación, el usuario es inmediatamente recibido con una imagen apetitosa que despierta el apetito. El mensaje de bienvenida es claro y directo, mientras que la barra de búsqueda prominente invita a usuarios que saben qué quieren. El botón de creación personalizada atrae a usuarios aventureros que desean experimentar.

**Interacciones:**

1. **Búsqueda Reactiva:**
   - Al escribir en la barra de búsqueda, se abre automáticamente un modal
   - Los resultados aparecen en tiempo real mientras el usuario escribe
   - Cada resultado es clickeable y lleva a la página de detalles
   - La búsqueda es inteligente: busca en nombres, descripciones y categorías

2. **Hover Effects:**
   - El botón CTA muestra una sombra más pronunciada al pasar el mouse
   - Cambio sutil de color para indicar interactividad
   - Cursor cambia a pointer para indicar clickeabilidad
   - Transición suave de 300ms para todos los efectos

3. **Gradiente Overlay:**
   - Se ajusta dinámicamente según el tamaño de pantalla
   - Asegura legibilidad en todos los dispositivos
   - Mantiene visible la imagen de fondo sin comprometer el texto

#### 1.2 Categorías

**Propósito:**
Facilitar la navegación rápida permitiendo a los usuarios filtrar el menú por tipo de comida según su preferencia o momento del día.

**Descripción Detallada:**
Esta sección presenta las categorías principales del menú en un formato visualmente atractivo de tarjetas. Cada categoría tiene su propia identidad visual mediante gradientes de colores únicos, haciendo que la navegación sea intuitiva y agradable.

**Elementos:**

1. **Grid de Tarjetas:**
   - Diseño responsive: 1 columna en móvil, 3 en desktop
   - Espaciado uniforme entre tarjetas
   - Altura consistente para todas las tarjetas
   - Bordes redondeados que reflejan el estilo IKEA

2. **Cada Tarjeta Incluye:**
   
   a) **Nombre de la Categoría:**
   - Tipografía grande y bold
   - Color blanco para contraste sobre el gradiente
   - Centrado vertical y horizontalmente
   
   b) **Gradiente de Color Distintivo:**
   - Breakfast: Naranja a amarillo (energía matutina)
   - Lunch & Dinner: Azul a índigo (comida principal)
   - Desserts & Pastries: Rosa a rojo (dulzura)
   - Gradientes diagonales para dinamismo
   
   c) **Overlay Oscuro:**
   - Capa semitransparente para mejorar legibilidad
   - Se intensifica en hover para feedback visual
   
   d) **Texto Adicional en Hover:**
   - "Explore [categoría]" aparece suavemente
   - Invita a la acción de manera sutil
   - Animación de desvanecimiento suave

**Categorías Disponibles:**

1. **Breakfast (Desayuno):**
   - Incluye opciones matutinas
   - Horario sugerido: Hasta las 11:00 AM
   - Ejemplos: Pancakes, huevos, café

2. **Lunch & Dinner (Comida y Cena):**
   - Platillos principales del menú
   - Disponible todo el día
   - Incluye las famosas albóndigas suecas

3. **Desserts & Pastries (Postres y Repostería):**
   - Opciones dulces y pasteles
   - Complementos perfectos para cualquier comida
   - Incluye opciones para llevar

**Interacciones:**

1. **Click en Categoría:**
   - Navega a la sección "Our Menu" más abajo en la página
   - Aplica automáticamente el filtro de la categoría seleccionada
   - Scroll suave hasta la sección del menú
   - El filtro correspondiente aparece activo

2. **Hover Effect:**
   - Escala sutil de la tarjeta (105%)
   - Elevación de sombra para efecto de profundidad
   - Aparición del texto "Explore [categoría]"
   - Transición suave de 300ms

3. **Feedback Visual:**
   - Cursor cambia a pointer
   - Overlay se oscurece ligeramente
   - Animación de transformación suave

**Experiencia del Usuario:**
Las categorías actúan como un sistema de navegación visual que permite a los usuarios encontrar rápidamente el tipo de comida que buscan. Los gradientes de colores no solo son estéticamente agradables, sino que también ayudan a crear asociaciones mentales (naranja/amarillo = mañana, rosa/rojo = dulce).

#### 1.3 Your Saved Items (Tus Items Guardados)

**Propósito:**
Proporcionar acceso rápido a los items que el usuario ha agregado al carrito, permitiendo revisión y modificación sin necesidad de abrir el sidebar completo del carrito.

**Descripción Detallada:**
Esta sección aparece dinámicamente solo cuando el usuario tiene items en su carrito. Está diseñada con un fondo ligeramente diferente (gris claro) y bordes superiores e inferiores para diferenciarla visualmente del resto del contenido, creando una "zona de trabajo" donde el usuario puede gestionar su pedido actual.

**Visibilidad:** 
La sección completa se oculta cuando el carrito está vacío, manteniendo la página limpia y enfocada. Aparece automáticamente cuando se agrega el primer item, con una animación suave de entrada.

**Elementos:**

1. **Header de Sección:**
   
   a) **Título "Your Saved Items":**
   - Tipografía grande y bold
   - Color azul IKEA para consistencia
   - Alineado a la izquierda
   
   b) **Subtítulo Descriptivo:**
   - "Pick up where you left off"
   - Color gris para jerarquía visual
   - Invita a continuar con el pedido
   
   c) **Contador de Items:**
   - Badge con número total de items
   - Fondo amarillo IKEA
   - Actualización en tiempo real

2. **Botón "View Cart":**
   - Posicionado en la esquina superior derecha
   - Estilo outline con borde azul IKEA
   - Ícono de carrito de compras
   - Muestra el número de items entre paréntesis
   - Al hacer click, abre el sidebar del carrito

3. **Grid de Tarjetas de Items:**
   - Layout responsive: 1-3 columnas según dispositivo
   - Máximo 6 items visibles (los más recientes)
   - Si hay más de 6, se muestra mensaje "and X more items"
   - Espaciado uniforme entre tarjetas

**Cada Tarjeta de Item Incluye:**

1. **Imagen del Platillo:**
   - Thumbnail cuadrado de alta calidad
   - Bordes redondeados
   - Efecto hover con zoom sutil
   - Lazy loading para optimización

2. **Información del Platillo:**
   - Nombre del platillo (truncado si es muy largo)
   - Precio unitario en texto pequeño
   - Precio total (precio × cantidad) destacado

3. **Controles de Cantidad:**
   
   a) **Botón Menos (-):**
   - Círculo con borde
   - Deshabilitado si cantidad es 1
   - Reduce cantidad en 1 al hacer click
   
   b) **Número de Cantidad:**
   - Centrado entre los botones
   - Tipografía bold
   - Actualización instantánea
   
   c) **Botón Más (+):**
   - Círculo con borde
   - Sin límite máximo
   - Incrementa cantidad en 1 al hacer click

4. **Botón de Eliminar:**
   - Ícono de basura
   - Visible solo en hover (desktop)
   - Siempre visible en móvil
   - Color rojo al hacer hover
   - Confirmación visual al eliminar

**Interacciones:**

1. **Incrementar/Decrementar Cantidad:**
   - Click en + o - actualiza inmediatamente
   - Animación sutil del número al cambiar
   - Recalcula automáticamente el precio total
   - Actualiza el contador general del carrito
   - Persiste en localStorage

2. **Eliminar Item:**
   - Click en ícono de basura
   - Animación de desvanecimiento del item
   - Si era el último item, la sección completa se oculta
   - Notificación toast confirmando la eliminación
   - Opción de deshacer (5 segundos)

3. **Abrir Carrito Completo:**
   - Click en "View Cart"
   - Sidebar se desliza desde la derecha
   - Contenido principal se desplaza para hacer espacio
   - Muestra todos los items sin límite

**Experiencia del Usuario:**
Esta sección actúa como un "área de trabajo" donde los usuarios pueden hacer ajustes rápidos a su pedido sin interrumpir su navegación. Es especialmente útil para usuarios que están agregando múltiples items y quieren mantener un control visual de lo que llevan sin abrir constantemente el carrito completo.

**Estados Especiales:**

1. **Carrito Vacío:**
   - Sección completamente oculta
   - No ocupa espacio en la página
   - Aparece suavemente al agregar primer item

2. **Muchos Items:**
   - Muestra solo los 6 más recientes
   - Mensaje "and 3 more items in cart"
   - Invita a abrir el carrito completo

3. **Item Recién Agregado:**
   - Animación de entrada destacada
   - Breve highlight en amarillo IKEA
   - Se desvanece después de 2 segundos

#### 1.4 Our Menu (Nuestro Menú)

**Propósito:**
Presentar el catálogo completo de platillos disponibles de manera organizada y visualmente atractiva, permitiendo a los usuarios explorar todas las opciones y tomar decisiones informadas.

**Descripción Detallada:**
Esta es la sección principal de la página de inicio, donde se muestra el menú completo en un formato de grid. La sección está diseñada para facilitar tanto la exploración casual como la búsqueda dirigida, con filtros intuitivos y tarjetas de platillos ricas en información.

**Elementos:**

1. **Header de Sección:**
   
   a) **Título "Our Menu":**
   - Tipografía grande (3xl) y bold
   - Color negro para máximo contraste
   - Alineado a la izquierda
   
   b) **Subtítulo:**
   - "Explore our delicious Swedish specialties"
   - Color gris para jerarquía
   - Invita a la exploración

2. **Barra de Filtros:**
   - Posicionada a la derecha del título (desktop)
   - Debajo del título en móvil
   - Diseño de pills (botones redondeados)
   - Scroll horizontal en móvil si es necesario

**Filtros de Categoría:**

1. **All (Todos):**
   - Muestra todos los platillos sin filtro
   - Activo por defecto al cargar la página
   - Fondo amarillo IKEA cuando está activo

2. **Main Courses (Platos Principales):**
   - Filtra para mostrar solo desayunos y comidas
   - Incluye categorías: breakfast, lunch-dinner
   - Útil para usuarios buscando comida sustancial

3. **Desserts (Postres):**
   - Filtra para mostrar solo postres y repostería
   - Incluye categoría: desserts-pastries
   - Perfecto para usuarios buscando algo dulce

**Comportamiento de Filtros:**
- Solo un filtro puede estar activo a la vez
- Click en filtro activo no lo desactiva (siempre hay uno activo)
- Transición suave al cambiar filtros
- El grid se reorganiza con animación
- Contador de resultados se actualiza

3. **Grid de Platillos:**
   - Responsive: 1 columna (móvil), 2 (tablet), 3 (desktop)
   - Gap uniforme entre tarjetas
   - Altura automática según contenido
   - Lazy loading de imágenes para rendimiento

**Cada Tarjeta de Platillo Incluye:**

1. **Imagen del Platillo:**
   - Aspecto ratio 4:3 para consistencia
   - Alta calidad y apetitosa
   - Efecto zoom al hacer hover
   - Gradiente overlay en hover
   - Click lleva a página de detalles

2. **Badges Informativos:**
   
   a) **Badge de Cantidad en Carrito:**
   - Esquina superior izquierda
   - Fondo amarillo IKEA
   - Ícono de carrito + número
   - Solo visible si el item está en el carrito
   - Actualización en tiempo real
   - Animación de entrada/salida
   
   b) **Badge "Unavailable":**
   - Esquina superior derecha
   - Fondo rojo
   - Solo visible si el platillo no está disponible
   - Deshabilita botones de acción

3. **Información del Platillo:**
   
   a) **Nombre:**
   - Tipografía bold y grande
   - Color negro
   - Clickeable (lleva a detalles)
   - Hover muestra subrayado
   
   b) **Descripción:**
   - Texto gris
   - Máximo 2 líneas (truncado con "...")
   - Tamaño de fuente menor
   - Proporciona contexto rápido
   
   c) **Precio:**
   - Tipografía bold
   - Color azul IKEA
   - Tamaño prominente
   - Formato: $X.XX

4. **Botones de Acción:**
   
   a) **Botón "Customize":**
   - Estilo outline (borde azul IKEA)
   - Ocupa 50% del ancho
   - Texto "Customize"
   - Lleva a página de detalles
   - Permite ver información completa y agregar extras
   
   b) **Botón "Add":**
   - Estilo filled (fondo azul IKEA)
   - Ocupa 50% del ancho
   - Ícono de + y texto "Add"
   - Agrega directamente al carrito
   - Si ya está en carrito, muestra "Add (X)" donde X es la cantidad actual

**Interacciones:**

1. **Filtrado de Categorías:**
   - Click en filtro aplica inmediatamente
   - Grid se reorganiza con animación
   - Items que no coinciden se desvanecen
   - Items que coinciden aparecen suavemente
   - Duración de animación: 300ms
   - Scroll automático al inicio del grid

2. **Hover en Tarjeta:**
   - Elevación de sombra (shadow-lg a shadow-xl)
   - Imagen hace zoom (scale 110%)
   - Gradiente oscuro aparece sobre imagen
   - Nombre del platillo cambia a azul IKEA
   - Transición suave de 300ms

3. **Click en Imagen/Título:**
   - Navega a `/dishes/[id]`
   - Muestra página de detalles completa
   - Permite personalización con extras
   - Mantiene contexto del filtro aplicado

4. **Click en "Add":**
   - Agrega item al carrito inmediatamente
   - Notificación toast aparece
   - Badge de cantidad se actualiza
   - Animación breve de "agregado"
   - Botón muestra temporalmente checkmark
   - Si ya estaba en carrito, incrementa cantidad

5. **Actualización de Badge de Cantidad:**
   - Aparece cuando se agrega el primer item
   - Se actualiza al cambiar cantidad
   - Desaparece al eliminar del carrito
   - Animación de zoom al actualizar

**Experiencia del Usuario:**

La sección del menú está diseñada para balancear exploración y eficiencia:

- **Usuarios Exploradores:** Pueden navegar por todas las opciones, usar filtros para reducir opciones, y hacer click en platillos para ver detalles completos.

- **Usuarios Decididos:** Pueden usar el botón "Add" para agregar rápidamente items conocidos sin navegar a páginas adicionales.

- **Usuarios Visuales:** Las imágenes grandes y de alta calidad permiten tomar decisiones basadas en apariencia.

- **Usuarios Informados:** La descripción breve y el precio visible permiten evaluación rápida sin clicks adicionales.

**Estados Especiales:**

1. **Sin Resultados:**
   - Mensaje "No dishes found in this category"
   - Sugerencia de probar otro filtro
   - Ícono ilustrativo

2. **Platillo No Disponible:**
   - Badge rojo "Unavailable"
   - Imagen con overlay gris
   - Botones deshabilitados
   - Tooltip explicativo en hover

3. **Platillo en Carrito:**
   - Badge amarillo con cantidad
   - Botón "Add" muestra "(X)" con cantidad actual
   - Indicación visual clara de que ya está seleccionado

---

### 2. Búsqueda de Platillos

La funcionalidad de búsqueda es una característica clave que permite a los usuarios encontrar rápidamente platillos específicos sin necesidad de navegar por todo el menú.

#### 2.1 Modal de Búsqueda

**Propósito:**
Proporcionar una experiencia de búsqueda rápida, intuitiva y eficiente que permita a los usuarios encontrar platillos por nombre, descripción o categoría en tiempo real.

**Descripción Detallada:**
El modal de búsqueda es un componente overlay que aparece sobre el contenido principal cuando se activa. Está diseñado para ser no intrusivo pero altamente funcional, con un enfoque en la velocidad y la relevancia de los resultados.

**Activación:**
- Click en el ícono de lupa en el header
- Atajo de teclado: Ctrl/Cmd + K (futuro)
- Click en la barra de búsqueda del hero (redirige al modal)

**Diseño del Modal:**

1. **Overlay de Fondo:**
   - Fondo semitransparente oscuro (rgba(0,0,0,0.5))
   - Blur del contenido detrás (backdrop-filter)
   - Click fuera del modal lo cierra
   - Animación de fade-in al abrir

2. **Contenedor del Modal:**
   - Centrado vertical y horizontalmente
   - Ancho máximo: 672px (2xl en Tailwind)
   - Altura máxima: 80% del viewport
   - Fondo blanco con bordes redondeados
   - Sombra pronunciada para profundidad

**Elementos:**

1. **Header del Modal:**
   
   a) **Input de Búsqueda:**
   - Tamaño grande (height: 48px)
   - Placeholder: "Search dishes, ingredients..."
   - Auto-focus al abrir el modal
   - Tipografía grande para legibilidad
   - Sin borde para diseño limpio
   
   b) **Ícono de Búsqueda:**
   - Posicionado a la izquierda del input
   - Color gris para indicar función
   - Tamaño: 20px
   
   c) **Botón Limpiar (X):**
   - Aparece solo cuando hay texto
   - Posicionado a la derecha del input
   - Click limpia el input
   - Animación de fade-in/out

2. **Área de Resultados:**
   - Scroll vertical si hay muchos resultados
   - Altura máxima: calc(80vh - 120px)
   - Padding uniforme
   - Fondo blanco

**Funcionalidad de Búsqueda:**

1. **Algoritmo de Búsqueda:**
   - Busca en tres campos:
     * Nombre del platillo (prioridad alta)
     * Descripción (prioridad media)
     * Categoría (prioridad baja)
   - Case-insensitive (no distingue mayúsculas/minúsculas)
   - Búsqueda parcial (encuentra "meat" en "meatballs")
   - Resultados ordenados por relevancia

2. **Búsqueda en Tiempo Real:**
   - Resultados aparecen mientras se escribe
   - Debounce de 150ms para optimización
   - Mínimo 2 caracteres para iniciar búsqueda
   - Actualización instantánea al escribir/borrar

3. **Estados de la Búsqueda:**
   
   a) **Estado Inicial (Sin Búsqueda):**
   - Ícono de lupa grande y centrado
   - Mensaje: "Start typing to search for dishes..."
   - Color gris claro para indicar inactividad
   - Sugerencias de búsquedas populares (futuro)
   
   b) **Buscando (Menos de 2 caracteres):**
   - Mensaje: "Type at least 2 characters..."
   - Ícono de búsqueda animado
   
   c) **Con Resultados:**
   - Lista de platillos que coinciden
   - Máximo 10 resultados visibles
   - Scroll para ver más
   - Contador: "X results found"
   
   d) **Sin Resultados:**
   - Ícono de búsqueda con X
   - Mensaje: "No dishes found for '[query]'"
   - Sugerencia: "Try a different search term"
   - Botón para limpiar búsqueda

**Cada Resultado Muestra:**

1. **Estructura del Resultado:**
   - Diseño horizontal (imagen a la izquierda, info a la derecha)
   - Padding generoso para facilitar click
   - Hover effect para feedback
   - Clickeable en toda el área

2. **Imagen del Platillo:**
   - Thumbnail cuadrado (64x64px)
   - Bordes redondeados
   - Object-fit: cover
   - Lazy loading

3. **Información del Platillo:**
   
   a) **Nombre:**
   - Tipografía bold
   - Color negro
   - Truncado a 1 línea si es muy largo
   - Términos de búsqueda resaltados (futuro)
   
   b) **Descripción:**
   - Texto gris
   - Tamaño de fuente pequeño
   - Truncado a 1 línea
   - Proporciona contexto adicional
   
   c) **Categoría:**
   - Badge pequeño
   - Color según categoría
   - Capitalizado
   - Ejemplo: "Lunch & Dinner"
   
   d) **Precio:**
   - Tipografía bold
   - Color azul IKEA
   - Formato: $X.XX
   - Alineado a la derecha

**Interacciones:**

1. **Escribir en el Input:**
   - Cada tecla actualiza resultados
   - Debounce de 150ms para optimización
   - Loading indicator sutil mientras busca
   - Cursor siempre visible

2. **Click en Resultado:**
   - Navega a `/dishes/[id]`
   - Modal se cierra automáticamente
   - Query de búsqueda se limpia
   - Transición suave a la página de detalles

3. **Navegación por Teclado:**
   - Flecha arriba/abajo: navegar resultados
   - Enter: seleccionar resultado destacado
   - Escape: cerrar modal
   - Tab: navegar entre elementos

4. **Cerrar Modal:**
   - Click en overlay de fondo
   - Presionar Escape
   - Click en botón X (si se agrega)
   - Animación de fade-out al cerrar

5. **Limpiar Búsqueda:**
   - Click en botón X del input
   - Borra todo el texto
   - Vuelve al estado inicial
   - Input mantiene el focus

**Experiencia del Usuario:**

La búsqueda está diseñada para ser extremadamente rápida y eficiente:

- **Usuarios Rápidos:** Pueden escribir, ver resultados y hacer click en menos de 5 segundos
- **Usuarios Exploradores:** Pueden escribir términos generales y explorar resultados relacionados
- **Usuarios Indecisos:** Pueden probar diferentes términos de búsqueda sin compromiso

**Optimizaciones:**

1. **Rendimiento:**
   - Debounce para evitar búsquedas excesivas
   - Lazy loading de imágenes
   - Virtualización de lista si hay muchos resultados (futuro)

2. **UX:**
   - Auto-focus en input al abrir
   - Resultados instantáneos
   - Feedback visual claro
   - Animaciones suaves

3. **Accesibilidad:**
   - Navegación por teclado completa
   - ARIA labels apropiados
   - Anuncios de screen reader
   - Contraste de colores adecuado

**Casos de Uso Comunes:**

1. **Búsqueda Directa:**
   - Usuario escribe "meatballs"
   - Ve "Swedish Meatballs" como primer resultado
   - Click y va a detalles

2. **Búsqueda por Ingrediente:**
   - Usuario escribe "salmon"
   - Ve todos los platillos con salmón
   - Puede comparar opciones

3. **Búsqueda por Categoría:**
   - Usuario escribe "dessert"
   - Ve todos los postres
   - Equivalente a usar filtro de categoría

---

### 3. Detalles de Platillo

La página de detalles de platillo es donde los usuarios obtienen información completa sobre un platillo específico y pueden personalizarlo antes de agregarlo al carrito.

#### 3.1 Información Principal

**Propósito:**
Proporcionar toda la información necesaria para que el usuario tome una decisión informada sobre el platillo, incluyendo descripción, precio, información nutricional e ingredientes.

**Descripción Detallada:**
Esta página está diseñada como una experiencia inmersiva que pone el platillo en el centro de atención. El diseño es limpio y organizado, con secciones claramente definidas que guían al usuario a través de toda la información relevante.

**Navegación:**

1. **Header Sticky:**
   - Se mantiene visible al hacer scroll
   - Fondo blanco con blur
   - Sombra sutil para profundidad
   
   Elementos:
   - Botón "Back to Menu" (izquierda)
   - Nombre del platillo (centro)
   - Espacio para balance visual (derecha)

2. **Botón "Back to Menu":**
   - Ícono de flecha izquierda
   - Texto descriptivo
   - Hover effect sutil
   - Navega de regreso a la página principal
   - Mantiene el filtro aplicado (si había uno)

**Imagen Hero:**

1. **Características:**
   - Aspecto ratio 16:9
   - Ancho completo del contenedor
   - Altura responsive
   - Alta resolución
   - Bordes redondeados

2. **Overlay "SOLD OUT":**
   - Solo visible si el platillo no está disponible
   - Fondo negro semitransparente
   - Texto blanco grande y bold
   - Borde blanco grueso
   - Rotación de -12 grados para efecto dinámico
   - Centrado sobre la imagen

**Información del Platillo:**

1. **Sección de Título:**
   
   a) **Nombre del Platillo:**
   - Tipografía muy grande (3xl-4xl)
   - Font bold
   - Color negro
   - Margen generoso arriba y abajo
   
   b) **Precio:**
   - Posicionado a la derecha del nombre
   - Tipografía grande (3xl)
   - Color azul IKEA
   - Font bold
   - Formato: $XX.XX

2. **Descripción:**
   - Texto gris oscuro
   - Tamaño de fuente grande (lg)
   - Line-height generoso para legibilidad
   - Máximo 3-4 líneas
   - Describe el platillo de manera apetitosa

3. **Badges Informativos:**
   
   a) **Badge de Categoría:**
   - Fondo amarillo IKEA
   - Texto negro
   - Bordes redondeados
   - Ejemplo: "Lunch & Dinner"
   - Capitalizado
   
   b) **Badge de Calorías:**
   - Estilo outline
   - Borde gris
   - Ícono de información
   - Ejemplo: "450 kcal"
   - Proporciona contexto nutricional rápido

#### 3.2 Información Nutricional

**Propósito:**
Proporcionar transparencia sobre los ingredientes y valores nutricionales del platillo, permitiendo a los usuarios tomar decisiones informadas basadas en sus necesidades dietéticas.

**Descripción Detallada:**
Esta sección está dividida en dos columnas (en desktop) que presentan información complementaria: ingredientes y datos nutricionales.

**Layout:**
- Grid de 2 columnas en desktop
- Stack vertical en móvil
- Gap generoso entre columnas
- Separador visual (línea horizontal) arriba

**1. What's Inside (Ingredientes):**

**Propósito:**
Informar a los usuarios sobre los componentes principales del platillo, destacando la calidad y origen de los ingredientes.

**Elementos:**

a) **Título de Sección:**
- "What's Inside"
- Tipografía bold y grande
- Color negro
- Margen inferior generoso

b) **Lista de Ingredientes:**
- Formato de lista con viñetas
- Cada item en una línea separada
- Color gris para el texto
- Espaciado vertical entre items

**Información Mostrada (Actualmente Genérica):**
- "Premium quality ingredients" - Enfatiza calidad
- "Freshly prepared daily" - Destaca frescura
- "Sustainably sourced" - Comunica valores de sostenibilidad
- "Chef's special seasoning" - Añade exclusividad

**Futuro:**
- Ingredientes específicos por platillo
- Alérgenos destacados
- Certificaciones (orgánico, vegano, etc.)
- Origen de ingredientes principales

**2. Nutrition Facts (Datos Nutricionales):**

**Propósito:**
Proporcionar información nutricional clara y accesible para usuarios conscientes de su dieta.

**Elementos:**

a) **Título de Sección:**
- "Nutrition Facts"
- Tipografía bold y grande
- Color negro
- Margen inferior generoso

b) **Panel de Información:**
- Fondo gris claro (muted/30)
- Bordes redondeados
- Padding generoso
- Diseño tipo tabla

**Información Mostrada:**

1. **Calorías:**
   - Valor numérico (ej: 450)
   - Unidad implícita (kcal)
   - Tipografía bold para el número

2. **Proteína:**
   - Valor con unidad (ej: 24g)
   - Importante para dietas altas en proteína

3. **Carbohidratos:**
   - Valor con unidad (ej: 32g)
   - Relevante para dietas bajas en carbohidratos

4. **Grasa:**
   - Valor con unidad (ej: 18g)
   - Información para control de grasas

**Formato de Presentación:**
- Cada nutriente en una fila
- Nombre a la izquierda
- Valor a la derecha
- Líneas separadoras sutiles
- Espaciado vertical uniforme

**Experiencia del Usuario:**
Esta sección permite a usuarios con necesidades dietéticas específicas (diabetes, dietas bajas en carbohidratos, control de calorías, etc.) tomar decisiones informadas sin necesidad de preguntar al personal.

#### 3.3 Personalización

**Propósito:**
Permitir a los usuarios personalizar su platillo agregando complementos y extras, creando una experiencia de pedido más flexible y satisfactoria.

**Descripción Detallada:**
La sección de personalización, titulada "Complete Your Meal", presenta opciones de extras que complementan perfectamente el platillo principal. Está diseñada para ser tentadora pero no abrumadora.

**Complete Your Meal (Extras):**

**Título de Sección:**
- "Complete Your Meal"
- Tipografía bold y grande
- Color negro
- Subtítulo: "Popular additions to this dish"
- Color gris para jerarquía

**Extras Disponibles:**

Los extras varían según el platillo, pero ejemplos comunes incluyen:

1. **Extra Lingonberry Jam (+$0.50):**
   - Complemento tradicional sueco
   - Precio accesible
   - Mejora el sabor de carnes

2. **Cream Sauce (+$0.75):**
   - Salsa cremosa
   - Complemento popular
   - Precio moderado

3. **Mashed Potatoes (+$1.50):**
   - Acompañamiento sustancial
   - Precio más alto por ser un lado completo
   - Opción de comida completa

4. **Fountain Drink (+$1.25):**
   - Bebida para acompañar
   - Precio estándar de bebidas
   - Completa la experiencia de comida

**Diseño de Cada Extra:**

1. **Contenedor:**
   - Tarjeta clickeable completa
   - Bordes redondeados (rounded-xl)
   - Padding generoso
   - Hover effect sutil
   - Cursor pointer

2. **Estado No Seleccionado:**
   - Fondo blanco (bg-card)
   - Borde transparente o gris claro
   - Sombra sutil
   - Hover: fondo gris muy claro

3. **Estado Seleccionado:**
   - Borde azul IKEA (2px)
   - Fondo azul IKEA muy claro (primary/5)
   - Sombra más pronunciada
   - Animación de transición suave

**Elementos de Cada Extra:**

1. **Checkbox Visual:**
   - Cuadrado pequeño (20x20px)
   - Borde gris cuando no está seleccionado
   - Fondo azul IKEA cuando está seleccionado
   - Ícono de check blanco cuando está seleccionado
   - Transición suave de colores

2. **Nombre del Extra:**
   - Tipografía medium
   - Color negro
   - Alineado a la izquierda
   - Junto al checkbox

3. **Precio Adicional:**
   - Formato: "+$X.XX"
   - Tipografía bold
   - Color azul IKEA
   - Alineado a la derecha
   - Indica claramente el costo adicional

**Layout:**
- Grid de 2 columnas en desktop
- 1 columna en móvil
- Gap uniforme entre extras
- Máximo 6 extras visibles

**Interacciones:**

1. **Seleccionar/Deseleccionar Extra:**
   - Click en cualquier parte de la tarjeta
   - Toggle del estado seleccionado
   - Animación de checkbox
   - Cambio de borde y fondo
   - Duración: 200ms

2. **Actualización de Precio:**
   - Cálculo automático e instantáneo
   - Suma de precio base + extras seleccionados
   - Multiplicado por cantidad
   - Actualización visible en barra inferior
   - Sin necesidad de confirmación adicional

3. **Feedback Visual:**
   - Animación de selección
   - Cambio de color del borde
   - Aparición del check
   - Sombra más pronunciada

**Lógica de Negocio:**

1. **Múltiples Selecciones:**
   - Usuario puede seleccionar 0 o más extras
   - Sin límite máximo
   - Cada extra se suma al precio

2. **Persistencia:**
   - Selecciones se mantienen al cambiar cantidad
   - Se guardan al agregar al carrito
   - Cada extra se agrega como item separado (actualmente)

3. **Precio Dinámico:**
   - Precio base del platillo
   - + Suma de todos los extras seleccionados
   - × Cantidad seleccionada
   - = Total mostrado en barra inferior

**Experiencia del Usuario:**

Esta sección está diseñada para:
- **Aumentar el valor del pedido:** Sugerencias tentadoras de complementos
- **Mejorar la satisfacción:** Permitir personalización según preferencias
- **Simplificar decisiones:** Mostrar solo opciones relevantes y populares
- **Transparencia de precios:** Mostrar claramente el costo de cada extra

**Estrategia de Presentación:**

1. **Orden de Extras:**
   - Más populares primero
   - Precio ascendente
   - Complementos antes que bebidas

2. **Descripciones:**
   - Nombres claros y apetitosos
   - Sin jerga técnica
   - Enfoque en beneficios

3. **Precios:**
   - Siempre visibles
   - Formato consistente
   - Símbolo "+" indica adicional

#### 3.4 Controles de Orden

**Propósito:**
Proporcionar controles intuitivos para ajustar la cantidad del pedido y agregarlo al carrito, con visibilidad constante del precio total.

**Descripción Detallada:**
La barra de controles es un elemento sticky (pegajoso) que permanece visible en la parte inferior de la pantalla mientras el usuario navega por los detalles del platillo. Esto asegura que los controles de acción siempre estén accesibles sin necesidad de scroll.

**Barra Inferior Sticky:**

**Características Técnicas:**
- Posición: Fixed bottom
- Ancho: 100% del viewport
- Z-index: 50 (sobre contenido, bajo modales)
- Fondo: Blanco con blur
- Borde superior: Línea gris sutil
- Sombra: Pronunciada hacia arriba
- Padding: Generoso para facilitar interacción

**Layout Responsive:**
- Desktop: Elementos en fila horizontal
- Móvil: Stack vertical con controles arriba y botón abajo
- Contenedor máximo: 768px (3xl) centrado

**Elementos:**

1. **Controles de Cantidad:**

**Contenedor:**
- Fondo gris claro (muted)
- Bordes redondeados completos (rounded-full)
- Padding interno
- Display flex con gap

**Botón Menos (-):**
- Forma: Circular
- Tamaño: 32x32px
- Ícono: Signo menos
- Color: Gris oscuro
- Hover: Fondo más oscuro
- Estado deshabilitado:
  * Cuando cantidad es 1
  * Color gris claro
  * Cursor not-allowed
  * Opacidad reducida

**Número de Cantidad:**
- Tipografía: Bold
- Tamaño: Grande
- Color: Negro
- Ancho fijo: 32px
- Centrado
- Animación al cambiar:
  * Breve scale up/down
  * Duración: 150ms

**Botón Más (+):**
- Forma: Circular
- Tamaño: 32x32px
- Ícono: Signo más
- Color: Gris oscuro
- Hover: Fondo más oscuro
- Sin límite máximo
- Siempre habilitado

2. **Precio Total:**

**Cálculo:**
```
Total = (Precio Base + Suma de Extras) × Cantidad
```

**Presentación:**
- Tipografía: Extra bold
- Tamaño: Extra grande (2xl)
- Color: Azul IKEA
- Formato: $XX.XX
- Posición: Centro (desktop), arriba (móvil)
- Actualización: Instantánea al cambiar cantidad o extras

**Desglose Visual (Opcional):**
- Precio base visible
- "+ Extras" si hay extras seleccionados
- "× Cantidad" si cantidad > 1
- "= Total"

3. **Botón "Add to Order":**

**Características:**
- Tamaño: Grande (height: 44px mínimo)
- Ancho: 
  * Desktop: Mínimo 200px
  * Móvil: 100% del contenedor
- Fondo: Azul IKEA
- Texto: Blanco, bold
- Bordes: Completamente redondeados (rounded-full)
- Sombra: Pronunciada
- Ícono: Carrito de compras a la izquierda

**Texto del Botón:**
- "Add to Order - $XX.XX"
- Muestra el total calculado
- Actualización en tiempo real

**Estados:**

a) **Normal:**
- Fondo azul IKEA
- Texto blanco
- Sombra media
- Cursor pointer

b) **Hover:**
- Fondo azul más oscuro (primary/90)
- Sombra más pronunciada
- Ligero scale up (102%)
- Transición suave

c) **Deshabilitado:**
- Cuando platillo no está disponible
- Fondo gris
- Texto gris claro
- Cursor not-allowed
- Sin sombra
- Mensaje: "Currently Unavailable"

d) **Loading (Al agregar):**
- Spinner animado
- Texto: "Adding..."
- Deshabilitado temporalmente
- Duración: ~500ms

**Funcionalidad:**

1. **Ajustar Cantidad:**

**Incrementar:**
- Click en botón +
- Cantidad aumenta en 1
- Precio total se recalcula
- Animación del número
- Sin límite superior
- Feedback háptico en móvil (futuro)

**Decrementar:**
- Click en botón -
- Cantidad disminuye en 1
- Precio total se recalcula
- Animación del número
- Mínimo: 1 (botón se deshabilita)

**Límites:**
- Mínimo: 1 (no se puede tener 0)
- Máximo: Sin límite (confianza en el usuario)
- Validación: Automática

2. **Agregar al Carrito:**

**Proceso al Hacer Click:**

a) **Validación:**
- Verificar que platillo esté disponible
- Verificar cantidad válida (>= 1)
- Verificar que no haya errores

b) **Agregar Items:**
- Agregar platillo principal con cantidad seleccionada
- Agregar cada extra seleccionado como item separado
- Cada extra tiene referencia al platillo principal
- Actualizar contador del carrito

c) **Feedback Visual:**
- Botón muestra estado "loading"
- Animación de éxito (checkmark)
- Notificación toast aparece:
  * Título: "Added to cart"
  * Descripción: "Xх [Nombre del Platillo] [with Y extras] added to your order"
  * Duración: 3 segundos
  * Posición: Top-right
  * Tipo: Success (verde)

d) **Navegación:**
- Esperar 500ms para que usuario vea confirmación
- Navegar de regreso a la página principal
- Scroll automático a la sección "Your Saved Items"
- Highlight del item recién agregado

e) **Persistencia:**
- Guardar carrito en localStorage
- Actualizar contexto global del carrito
- Sincronizar con todos los componentes

**Casos Especiales:**

1. **Item Ya en Carrito:**
- Agregar cantidad adicional al item existente
- No crear duplicado
- Notificación menciona cantidad actualizada

2. **Múltiples Extras:**
- Cada extra se agrega como item separado
- Mantiene referencia al platillo principal
- Permite eliminar extras individualmente

3. **Sin Extras:**
- Solo agrega el platillo principal
- Proceso más simple
- Notificación más corta

**Experiencia del Usuario:**

La barra sticky asegura que:
- **Controles siempre visibles:** No necesita scroll para agregar al carrito
- **Precio siempre claro:** Usuario ve el costo total en todo momento
- **Acción rápida:** Un solo click para agregar
- **Feedback inmediato:** Confirmación visual y navegación automática

**Optimizaciones:**

1. **Rendimiento:**
- Cálculos de precio optimizados
- Actualizaciones debounced si es necesario
- Animaciones con GPU acceleration

2. **UX:**
- Transiciones suaves
- Feedback visual claro
- Prevención de doble-click
- Loading states apropiados

3. **Accesibilidad:**
- Botones con tamaño táctil adecuado (44x44px mínimo)
- Labels descriptivos
- Keyboard navigation
- Screen reader friendly

---

## Política de Pagos y Seguridad

### Principio Fundamental: Cero Almacenamiento de Datos de Pago

**IKEA Eats NO almacena, procesa ni retiene ningún dato de tarjetas de crédito o débito en sus servidores o en el dispositivo del usuario.**

Esta es una decisión de diseño fundamental basada en:
- **Seguridad:** Eliminar completamente el riesgo de brechas de datos de pago
- **Cumplimiento:** Evitar requisitos de PCI-DSS (Payment Card Industry Data Security Standard)
- **Confianza:** Garantizar a los usuarios que sus datos financieros están seguros
- **Simplicidad:** Delegar la complejidad del procesamiento de pagos a expertos

---

### Métodos de Pago Disponibles

La aplicación ofrece tres métodos de pago modernos y seguros, todos procesados a través de pasarelas de pago certificadas:

#### 1. Apple Pay

**Descripción:**
Sistema de pago digital de Apple que permite a los usuarios pagar utilizando sus dispositivos Apple (iPhone, iPad, Apple Watch, Mac) de forma segura y rápida.

**Características:**

**Seguridad:**
- Utiliza tokenización: el número real de la tarjeta nunca se comparte
- Autenticación biométrica (Face ID o Touch ID)
- Cada transacción genera un código de seguridad único
- Los datos de pago se almacenan en el Secure Element del dispositivo

**Experiencia del Usuario:**
- Un solo toque para pagar
- No necesita ingresar datos de tarjeta
- Confirmación biométrica rápida
- Recibo instantáneo en Wallet

**Disponibilidad:**
- Solo en dispositivos Apple compatibles
- Requiere tarjeta configurada en Apple Wallet
- Safari en iOS/macOS

**Flujo de Pago:**
1. Usuario selecciona "Carry Out" en checkout
2. Click en botón "Apple Pay"
3. Se abre el modal nativo de Apple Pay
4. Usuario confirma con Face ID/Touch ID
5. Pago procesado por Apple
6. IKEA Eats recibe confirmación de pago exitoso
7. Orden se confirma y genera código

**Datos Compartidos con IKEA Eats:**
- Confirmación de pago exitoso
- ID de transacción (para referencia)
- Monto pagado
- **NO se comparte:** Número de tarjeta, CVV, datos del titular

#### 2. Google Pay

**Descripción:**
Plataforma de pago digital de Google que permite pagos rápidos y seguros desde dispositivos Android y navegadores compatibles.

**Características:**

**Seguridad:**
- Tokenización de tarjetas
- Número de cuenta virtual para cada transacción
- Autenticación del dispositivo
- Encriptación de extremo a extremo

**Experiencia del Usuario:**
- Pago con un toque
- Sincronización entre dispositivos
- Gestión de tarjetas en Google Wallet
- Historial de transacciones en Google Pay

**Disponibilidad:**
- Dispositivos Android
- Chrome en desktop
- Requiere tarjeta configurada en Google Wallet

**Flujo de Pago:**
1. Usuario selecciona "Carry Out" en checkout
2. Click en botón "Google Pay"
3. Se abre el modal nativo de Google Pay
4. Usuario selecciona tarjeta y confirma
5. Pago procesado por Google
6. IKEA Eats recibe confirmación
7. Orden se confirma

**Datos Compartidos con IKEA Eats:**
- Token de pago (no número real de tarjeta)
- Confirmación de transacción
- Monto autorizado
- **NO se comparte:** Datos sensibles de la tarjeta

#### 3. Tarjeta de Crédito/Débito (Pasarela de Pago)

**Descripción:**
Procesamiento tradicional de tarjetas a través de una pasarela de pago certificada PCI-DSS (ej: Stripe, PayPal, Adyen, Authorize.net).

**Características:**

**Seguridad:**
- Formulario de pago servido directamente por la pasarela
- Conexión HTTPS/TLS encriptada
- Tokenización de tarjetas
- Cumplimiento PCI-DSS nivel 1
- Detección de fraude integrada
- 3D Secure (autenticación adicional)

**Experiencia del Usuario:**
- Formulario familiar de pago con tarjeta
- Campos claramente etiquetados
- Validación en tiempo real
- Mensajes de error descriptivos
- Indicadores de seguridad visibles

**Campos Requeridos:**
1. **Nombre en la Tarjeta:**
   - Nombre completo como aparece en la tarjeta
   - Validación: Solo letras y espacios
   - Ejemplo: "John Doe"

2. **Número de Tarjeta:**
   - 13-19 dígitos según tipo de tarjeta
   - Formato automático: XXXX XXXX XXXX XXXX
   - Validación: Algoritmo de Luhn
   - Detección automática de tipo (Visa, Mastercard, Amex)

3. **Fecha de Expiración:**
   - Formato: MM/YY
   - Validación: Fecha futura
   - Ejemplo: "12/25"

4. **CVV/CVC:**
   - 3 dígitos (Visa, Mastercard)
   - 4 dígitos (American Express)
   - Campo oculto por seguridad
   - Tooltip explicativo

**Flujo de Pago:**
1. Usuario selecciona "Carry Out" en checkout
2. Expande sección "Credit or Debit Card"
3. Ingresa datos de tarjeta en formulario seguro
4. Click en "Place Order & Pay"
5. Datos se envían directamente a la pasarela de pago
6. Pasarela procesa y valida la tarjeta
7. Si requiere 3D Secure, se abre modal de autenticación
8. Usuario completa autenticación (SMS, app bancaria)
9. Pago se autoriza
10. IKEA Eats recibe token de confirmación
11. Orden se confirma

**Datos Procesados:**
- Todos los datos se procesan en servidores de la pasarela
- IKEA Eats solo recibe token de confirmación
- **Nunca toca los servidores de IKEA Eats:** Número de tarjeta, CVV

**Tarjetas Aceptadas:**
- Visa
- Mastercard
- American Express
- Discover (según región)
- Tarjetas de débito con logo Visa/Mastercard

---

### Política de No Almacenamiento

**Declaración Explícita:**

> **IKEA Eats NO almacena ningún dato de pago en ningún momento, ni en el servidor ni en el dispositivo del usuario.**

**Qué NO se Almacena:**

1. **Números de Tarjeta:**
   - Ni completos ni parciales
   - Ni siquiera los últimos 4 dígitos
   - Ni en texto plano ni encriptados

2. **CVV/CVC:**
   - Nunca se almacena (prohibido por PCI-DSS)
   - Solo se transmite una vez a la pasarela

3. **Fechas de Expiración:**
   - No se guardan en ningún formato

4. **Nombres en Tarjetas:**
   - No se retienen después del pago

5. **Datos Biométricos:**
   - Apple Pay y Google Pay manejan esto
   - IKEA Eats nunca accede a estos datos

**Qué SÍ se Almacena (Mínimo Necesario):**

1. **ID de Transacción:**
   - Proporcionado por la pasarela de pago
   - Usado solo para referencia y soporte
   - Ejemplo: "txn_1234567890"

2. **Monto de la Transacción:**
   - Total pagado
   - Para registro de la orden

3. **Método de Pago Usado:**
   - Solo el tipo: "Apple Pay", "Google Pay", "Card"
   - **NO** detalles de la tarjeta

4. **Estado de la Transacción:**
   - Exitosa, fallida, pendiente
   - Timestamp de la transacción

5. **Información de la Orden:**
   - Items comprados
   - Totales
   - Código de orden

**Ubicación de Almacenamiento:**
- LocalStorage del navegador (solo información de orden)
- **NO** en servidores (versión actual)
- Cuando se implemente backend: Base de datos con solo IDs de transacción

---

### Opciones de Pedido

La aplicación ofrece dos modalidades de pedido que afectan el flujo de pago:

#### 1. Carry Out (Recoger y Pagar Ahora)

**Descripción:**
El usuario paga en línea al momento de hacer el pedido y recoge la comida cuando está lista.

**Características:**
- Pago inmediato requerido
- Orden confirmada al instante
- Código QR/barcode generado
- Sin necesidad de pagar en tienda

**Métodos de Pago Disponibles:**
- Apple Pay ✅
- Google Pay ✅
- Tarjeta de Crédito/Débito ✅

**Flujo:**
1. Usuario completa su carrito
2. Selecciona "Carry Out"
3. Elige método de pago
4. Completa el pago
5. Recibe confirmación inmediata
6. Recibe código de orden
7. Llega a la tienda
8. Muestra código QR
9. Recoge comida

**Ventajas:**
- Sin filas en caja
- Orden garantizada
- Tiempo de espera reducido
- Pago seguro en línea

#### 2. In-Store Pre-order (Pre-ordenar y Pagar en Tienda)

**Descripción:**
El usuario hace el pedido en línea pero paga en la caja registradora de la tienda al recoger.

**Características:**
- **NO requiere pago en línea**
- Orden se prepara con anticipación
- Pago en efectivo o tarjeta en tienda
- Flexibilidad de pago

**Métodos de Pago Disponibles:**
- Ninguno en línea
- Todos los métodos disponibles en tienda

**Flujo:**
1. Usuario completa su carrito
2. Selecciona "In-Store Pre-order"
3. Confirma orden (sin pago)
4. Recibe código de pre-orden
5. Llega a la tienda
6. Va a la caja
7. Muestra código de pre-orden
8. Paga en caja
9. Recoge comida

**Ventajas:**
- No requiere tarjeta en línea
- Opción de pago en efectivo
- Flexibilidad de cambios
- Orden preparada con anticipación

---

### Seguridad y Cumplimiento

#### Certificaciones y Estándares

**PCI-DSS (Payment Card Industry Data Security Standard):**
- IKEA Eats **NO requiere certificación** porque no procesa ni almacena datos de tarjetas
- Toda la responsabilidad recae en las pasarelas de pago certificadas
- Reducción de riesgo y responsabilidad legal

**HTTPS/TLS:**
- Toda comunicación encriptada
- Certificado SSL/TLS válido
- Protección contra man-in-the-middle attacks

**GDPR (General Data Protection Regulation):**
- Cumplimiento con regulaciones de privacidad
- Datos mínimos recolectados
- Derecho al olvido respetado

#### Medidas de Seguridad Implementadas

**1. Comunicación Segura:**
- HTTPS obligatorio en toda la aplicación
- TLS 1.2 o superior
- Certificados válidos y actualizados

**2. Validación del Lado del Cliente:**
- Validación de formato de tarjeta (Luhn algorithm)
- Validación de fecha de expiración
- Validación de CVV
- **Propósito:** Mejorar UX, NO para seguridad

**3. Tokenización:**
- Pasarelas de pago generan tokens
- Tokens usados para referencias
- Tokens no pueden revertirse a datos de tarjeta

**4. No Persistencia:**
- Datos de pago nunca se guardan en localStorage
- Formularios se limpian después del pago
- No hay caché de datos sensibles

**5. Auditoría:**
- Logs de transacciones (solo IDs)
- Monitoreo de intentos de fraude
- Alertas de actividad sospechosa

#### Protección contra Fraude

**Medidas Implementadas por Pasarelas:**

1. **3D Secure:**
   - Autenticación adicional del titular
   - SMS, app bancaria, o biometría
   - Reduce fraude significativamente

2. **Detección de Patrones:**
   - Algoritmos de machine learning
   - Identificación de transacciones sospechosas
   - Bloqueo automático de intentos fraudulentos

3. **Verificación de Dirección (AVS):**
   - Compara dirección de facturación
   - Validación con banco emisor

4. **Límites de Transacción:**
   - Montos máximos por transacción
   - Límites diarios por usuario

---

### Experiencia del Usuario en Pagos

#### Transparencia

**Información Clara:**
- Métodos de pago mostrados prominentemente
- Iconos oficiales de cada método
- Descripciones claras de cada opción
- Indicadores de seguridad visibles

**Sin Sorpresas:**
- Total siempre visible
- Desglose de costos (subtotal, tax, total)
- Sin cargos ocultos
- Confirmación antes de procesar

#### Facilidad de Uso

**Diseño Intuitivo:**
- Formularios simples y claros
- Validación en tiempo real
- Mensajes de error descriptivos
- Autocompletado de navegador permitido

**Opciones Modernas:**
- Apple Pay y Google Pay para pagos rápidos
- Un toque para pagar
- Sin necesidad de escribir datos

**Flexibilidad:**
- Opción de pre-ordenar sin pago en línea
- Múltiples métodos disponibles
- Adaptado a preferencias del usuario

#### Confianza

**Indicadores de Seguridad:**
- Candado HTTPS visible
- Logos de pasarelas de pago certificadas
- Mensajes de seguridad claros
- Política de privacidad accesible

**Comunicación:**
- "Tus datos de pago están seguros"
- "No almacenamos información de tarjetas"
- "Procesado por [Pasarela Certificada]"
- Enlaces a políticas de seguridad

---

### Manejo de Errores de Pago

#### Tipos de Errores

**1. Tarjeta Declinada:**
- Mensaje: "Your card was declined. Please try another payment method."
- Razones comunes: Fondos insuficientes, límite excedido, tarjeta bloqueada
- Acción: Sugerir otro método de pago

**2. Error de Red:**
- Mensaje: "Connection error. Please check your internet and try again."
- Acción: Botón "Retry Payment"
- Orden no se pierde, se puede reintentar

**3. Timeout:**
- Mensaje: "Payment is taking longer than expected. Please wait..."
- Acción: Mostrar spinner, esperar respuesta
- Si falla: Opción de verificar estado o reintentar

**4. 3D Secure Fallido:**
- Mensaje: "Authentication failed. Please try again or use another card."
- Acción: Permitir reintento o cambio de tarjeta

**5. Error de Validación:**
- Mensajes específicos por campo:
  * "Card number is invalid"
  * "Expiration date has passed"
  * "CVV must be 3 digits"
- Acción: Corregir campo indicado

#### Recuperación de Errores

**Preservación de Datos:**
- Carrito se mantiene intacto
- Selecciones de orden se preservan
- Usuario no pierde progreso

**Opciones de Recuperación:**
- Reintentar con misma tarjeta
- Cambiar método de pago
- Cambiar a "In-Store Pre-order"
- Contactar soporte

**Comunicación Clara:**
- Explicación del error
- Pasos siguientes sugeridos
- Opción de ayuda/soporte

---

### Confirmación de Pago

#### Información Proporcionada

**Confirmación Inmediata:**
- Mensaje de éxito prominente
- Código de orden único
- Resumen de la compra
- Método de pago usado (tipo, no detalles)

**Detalles de la Orden:**
- Items comprados
- Cantidades
- Subtotal
- Tax
- Total pagado
- Fecha y hora

**Códigos de Recogida:**
- QR Code generado
- Código de barras
- Instrucciones de uso
- "Show this code at pickup"

**Próximos Pasos:**
- Instrucciones claras
- Tiempo estimado de preparación
- Ubicación de recogida
- Información de contacto

#### Notificaciones

**Confirmación en Pantalla:**
- Toast notification de éxito
- Navegación automática a página de orden
- Highlight de información importante

**Email de Confirmación (Futuro):**
- Resumen de orden
- Código de orden
- Recibo de pago
- Instrucciones de recogida

**Historial:**
- Orden guardada en perfil
- Accesible en "Orders" tab
- Detalles completos disponibles
- Estado actualizable

---

### Política de Reembolsos

#### Principios

**Transparencia:**
- Política clara y accesible
- Términos fáciles de entender
- Proceso simple

**Justicia:**
- Reembolsos por errores de IKEA
- Consideración de circunstancias especiales
- Proceso rápido

#### Casos de Reembolso

**1. Orden No Preparada:**
- Reembolso completo automático
- Procesado en 3-5 días hábiles

**2. Error en la Orden:**
- Reembolso o reemplazo
- Decisión del cliente

**3. Cancelación Anticipada:**
- Antes de preparación: Reembolso completo
- Durante preparación: A discreción de gerencia
- Después de preparada: No reembolsable

**4. Problemas de Calidad:**
- Evaluación caso por caso
- Reembolso parcial o completo
- Crédito para orden futura

#### Proceso de Reembolso

**Pasos:**
1. Cliente contacta soporte
2. Proporciona código de orden
3. Explica razón de reembolso
4. Soporte evalúa solicitud
5. Aprobación/rechazo comunicado
6. Reembolso procesado a método original
7. Confirmación enviada

**Tiempos:**
- Aprobación: 24-48 horas
- Procesamiento: 3-5 días hábiles
- Aparición en cuenta: Según banco (5-10 días)

---

### Preguntas Frecuentes sobre Pagos

**¿Es seguro pagar en IKEA Eats?**
Sí, absolutamente. No almacenamos ningún dato de tu tarjeta. Todos los pagos se procesan a través de pasarelas certificadas PCI-DSS nivel 1.

**¿Qué datos de mi tarjeta se guardan?**
Ninguno. No guardamos números de tarjeta, CVV, ni fechas de expiración. Solo guardamos un ID de transacción para referencia.

**¿Puedo guardar mi tarjeta para pagos futuros?**
No. Por seguridad, no ofrecemos la opción de guardar tarjetas. Deberás ingresar los datos en cada compra o usar Apple Pay/Google Pay.

**¿Qué pasa si mi pago falla?**
Tu orden no se perderá. Podrás reintentar el pago, cambiar de método, o cambiar a "In-Store Pre-order" para pagar en tienda.

**¿Puedo pagar en efectivo?**
Sí, seleccionando "In-Store Pre-order". Tu orden se preparará y pagarás en la caja al recoger.

**¿Aceptan todas las tarjetas?**
Aceptamos Visa, Mastercard, American Express y Discover (según región).

**¿Hay cargos adicionales por pagar en línea?**
No. No cobramos fees adicionales por usar cualquier método de pago.

**¿Puedo obtener un recibo?**
Sí. Puedes ver y descargar tu recibo desde tu perfil en la sección "Orders".

**¿Qué es 3D Secure?**
Es una capa adicional de seguridad donde tu banco verifica que eres tú quien hace la compra, usualmente mediante SMS o app bancaria.

**¿Mis datos están protegidos?**
Sí. Usamos HTTPS, no almacenamos datos de pago, y cumplimos con GDPR y otras regulaciones de privacidad.

---

**Última actualización:** Noviembre 2024  
**Versión del documento:** 2.1.0

