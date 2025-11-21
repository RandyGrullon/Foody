# Diagramas UML - IKEA Eats

Este directorio contiene los diagramas UML de la aplicación IKEA Eats.

## 📊 Diagramas Disponibles

### 1. Diagrama de Casos de Uso

#### `use-cases.puml` - Versión Completa
Diagrama detallado que incluye todos los casos de uso organizados en paquetes:

**Paquetes:**
- 🔍 **Navegación y Exploración** - Explorar menú, buscar, filtrar
- 🎨 **Personalización de Pedido** - Crear platillos personalizados, agregar extras
- 🛒 **Gestión de Carrito** - Agregar, modificar, eliminar items
- 💳 **Checkout y Pago** - Proceso de pago con múltiples métodos
- 👤 **Gestión de Perfil** - Ver y editar perfil, historial de órdenes
- 🔎 **Búsqueda y Filtros** - Búsqueda en tiempo real

**Actores:**
- Usuario Nuevo
- Usuario Registrado
- Usuario Frecuente
- Sistema de Pagos (externo)

#### `use-cases-simple.puml` - Versión Simplificada
Diagrama simplificado con los casos de uso principales para una vista rápida.

---

## 🛠️ Cómo Visualizar los Diagramas

### Opción 1: PlantUML Online
1. Visita [PlantUML Online Server](http://www.plantuml.com/plantuml/uml/)
2. Copia el contenido del archivo `.puml`
3. Pégalo en el editor
4. El diagrama se generará automáticamente

### Opción 2: VS Code Extension
1. Instala la extensión "PlantUML" en VS Code
2. Abre el archivo `.puml`
3. Presiona `Alt + D` para ver la vista previa
4. O haz clic derecho → "Preview Current Diagram"

### Opción 3: Exportar como Imagen

**Usando PlantUML CLI:**
```bash
# Instalar PlantUML (requiere Java)
# En Windows con Chocolatey:
choco install plantuml

# Generar PNG
plantuml use-cases.puml

# Generar SVG
plantuml -tsvg use-cases.puml
```

**Usando VS Code:**
1. Abre el archivo `.puml`
2. Presiona `Ctrl + Shift + P`
3. Escribe "PlantUML: Export Current Diagram"
4. Selecciona el formato (PNG, SVG, PDF)

---

## 📋 Casos de Uso Detallados

### Casos de Uso Principales

| ID | Caso de Uso | Actor | Descripción |
|----|-------------|-------|-------------|
| UC1 | Explorar Menú | Usuario Nuevo | Navegar por el menú completo |
| UC2 | Buscar Platillos | Usuario Nuevo | Buscar platillos por nombre/descripción |
| UC4 | Ver Detalles de Platillo | Usuario Nuevo | Ver información completa del platillo |
| UC6 | Crear Platillo Personalizado | Usuario Nuevo | Crear platillo con ingredientes personalizados |
| UC10 | Agregar al Carrito | Usuario Nuevo | Agregar items al carrito de compras |
| UC15 | Proceder a Checkout | Usuario Registrado | Iniciar proceso de pago |
| UC20 | Confirmar Orden | Usuario Registrado | Finalizar y confirmar la orden |
| UC23 | Ver Historial de Órdenes | Usuario Registrado | Ver órdenes anteriores |

### Relaciones entre Casos de Uso

**Include (<<include>>):**
- Relación obligatoria
- El caso base siempre ejecuta el caso incluido
- Ejemplo: "Proceder a Checkout" incluye "Seleccionar Tipo de Orden"

**Extend (<<extend>>):**
- Relación opcional
- El caso base puede ejecutarse sin el caso extendido
- Ejemplo: "Ver Carrito" puede extenderse con "Eliminar Item"

---

## 🎨 Leyenda de Colores

Los paquetes están codificados por colores para facilitar la identificación:

- 🔵 **Azul Claro** - Navegación y Exploración
- 🟢 **Verde Claro** - Personalización de Pedido
- 🟡 **Amarillo Claro** - Gestión de Carrito
- 🔴 **Coral Claro** - Checkout y Pago
- 🟣 **Lavanda** - Gestión de Perfil
- 🟠 **Melocotón** - Búsqueda y Filtros

---

## 📝 Notas Importantes

### Actores
- **Usuario Nuevo:** Puede explorar y agregar al carrito sin registro
- **Usuario Registrado:** Puede realizar checkout y ver historial
- **Usuario Frecuente:** Hereda de Usuario Registrado, con acceso rápido a favoritos

### Sistema de Pagos
- En la versión actual (v1.0), los pagos son simulados
- La integración real con Apple Pay, Google Pay y procesadores de tarjetas está planificada para versiones futuras

### Flujo Principal
```
Explorar → Ver Detalles → Agregar al Carrito → Checkout → Pagar → Confirmar
```

---

## 🔄 Actualización de Diagramas

Si necesitas actualizar los diagramas:

1. Edita el archivo `.puml` correspondiente
2. Sigue la sintaxis de PlantUML
3. Regenera la imagen si es necesario
4. Actualiza este README si hay cambios significativos

### Sintaxis Básica PlantUML

```plantuml
' Definir actor
actor "Nombre" as Alias

' Definir caso de uso
usecase "Nombre del Caso" as UC1

' Relación simple
Actor --> UC1

' Include
UC1 ..> UC2 : <<include>>

' Extend
UC1 ..> UC3 : <<extend>>

' Paquete
package "Nombre" {
  usecase UC4
}
```

---

## 📚 Referencias

- [PlantUML Official Documentation](https://plantuml.com/)
- [PlantUML Use Case Diagrams](https://plantuml.com/use-case-diagram)
- [UML Use Case Diagrams Guide](https://www.uml-diagrams.org/use-case-diagrams.html)

---

## 🔗 Documentación Relacionada

- `../REQUIREMENTS.md` - Requerimientos funcionales completos
- `../TECHNICAL.md` - Documentación técnica
- `../README.md` - Documentación general del proyecto

---

**Última actualización:** Noviembre 2024  
**Versión:** 1.0.0
