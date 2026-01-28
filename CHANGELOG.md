# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [0.4.0] - 2026-01-28

### Añadido
- ✨ **Paginación optimizada** con carga progresiva (50 Pokémon por página)
- ✨ **Carga en dos fases**: Primera página instantánea, resto en background
- ✨ **Master Ball animada** personalizada como spinner de carga
- ✨ **Diseño temático Pokémon** con colores oficiales
- ✨ Indicador visual de carga en segundo plano
- ✨ **Debounce en búsqueda** (300ms) para mejor rendimiento
- ✨ Scroll automático suave al cambiar de página

### Mejorado
- 🎨 **Rediseño completo** con gradientes y colores Pokémon
- 🎨 Navegación de páginas con números clickeables
- 🎨 Botones con gradientes rojo/azul temáticos
- 🎨 Tarjetas con bordes, sombras y efectos Pokéball decorativos
- 🎨 Página de detalle con diseño mejorado y responsive
- 🎨 Stats con fondos coloreados y mejor visualización
- 🎨 Badge de "Actual" con estilo amarillo Pikachu
- 🎨 Iconos temáticos en todos los títulos (🔍 🎮 ⚡ 📊 🔄 💪)
- 📱 **100% responsive** en todos los breakpoints (móvil, tablet, desktop, 4K)
- 📱 Grid adaptativo: 1-6 columnas según pantalla
- 📱 Textos y botones escalables
- 📱 Controles táctiles optimizados para móvil

### Optimizado
- ⚡ **Carga inicial < 1 segundo** (antes 30-60s)
- ⚡ Solo carga 50 Pokémon inicialmente
- ⚡ Resto se carga en background sin bloquear
- ⚡ Búsqueda optimizada en dos pasos
- ⚡ Filtrado solo de evoluciones necesarias (límite 100)

### Cambiado
- 🔄 Botón "Volver" ahora siempre va a la página principal
- 🔄 Estado de página guardado en URL
- 🔄 Reset a página 1 al cambiar filtros

## [0.3.0] - 2026-01-28

### Añadido

- ✨ **Buscador en tiempo real** por nombre de Pokémon
- ✨ Búsqueda incluye evoluciones (buscar "Pikachu" muestra Pichu y Raichu)
- ✨ **Página de detalle completa** para cada Pokémon
- ✨ Visualización de estadísticas base con barras de progreso
- ✨ **Cadena evolutiva** con imágenes de todas las evoluciones
- ✨ Navegación entre evoluciones desde la página de detalle
- ✨ Marcado visual de la evolución actual
- ✨ **Preservación del estado** de filtros y búsqueda en la URL
- ✨ Botón de regreso al listado

### Cambiado

- 🎨 Tarjetas de Pokémon ahora son clickeables
- 🎨 Efectos hover mejorados con animaciones de escala
- 📱 Página de detalle responsive con layout adaptativo
- ⚡ Suspense boundary para mejor experiencia de carga

### Optimizado

- 🚀 Carga inteligente de cadenas de evolución
- 🚀 Caché de detalles de Pokémon para navegación rápida
- 🚀 Lazy loading de imágenes en evoluciones

## [0.2.0] - 2026-01-28

### Añadido

- ✨ Listado completo de todos los Pokémon (hasta 1000) ordenados por ID
- ✨ Información de generación para cada Pokémon (Gen I - Gen IX)
- ✨ Filtro por tipo de Pokémon con selector desplegable
- ✨ Filtro por generación con selector desplegable
- ✨ Combinación de múltiples filtros
- ✨ Botón para limpiar todos los filtros
- ✨ Contador de resultados filtrados
- ✨ Mapeo estático de generaciones por ID para optimización
- ✨ Carga en lotes para filtros por tipo

### Cambiado

- ⚡ Optimización del rendimiento con mapeo de generaciones
- ⚡ Mejora en la carga de datos usando React Query
- 🎨 Interfaz actualizada con componente de filtros
- 📱 Grid responsive ahora soporta hasta 5 columnas en pantallas XL

### Optimizado

- 🚀 Reducción de llamadas a la API usando mapeo estático
- 🚀 Carga bajo demanda de detalles de Pokémon
- 🚀 Memoización de resultados filtrados

## [0.1.0] - 2026-01-28

### Añadido

- ✨ Configuración inicial del proyecto con Next.js 14 y TypeScript
- ✨ Estructura de carpetas siguiendo las mejores prácticas de T3 Stack
- ✨ Integración con React Query para gestión de estado y caché
- ✨ Listado de Pokémon con paginación funcional
- ✨ Tarjetas de Pokémon con información detallada
- ✨ Actualización automática en tiempo real cada 60 segundos
- ✨ Diseño responsive con Tailwind CSS
- ✨ Soporte para modo oscuro automático
- ✨ Tipos TypeScript completos para la API de Pokémon
- ✨ Configuración de ESLint y Prettier
- ✨ Documentación completa en README.md
- ✨ Guía de contribución (CONTRIBUTING.md)
- ✨ Configuración de VS Code recomendada
- ✨ GitHub Actions para CI/CD
- ✨ Licencia MIT

### Características

- 🎨 Interfaz moderna y limpia
- 🚀 Optimización de imágenes con Next.js Image
- 📱 Diseño responsive (móvil, tablet, desktop)
- ⚡ Rendimiento optimizado con SSG
- 🎯 TypeScript strict mode habilitado
- 🔄 Refresco automático de datos

### Tecnologías

- Next.js 14 (App Router)
- TypeScript 5
- React 18
- Tailwind CSS 3
- React Query (TanStack Query) 5
- Zod para validación de esquemas
