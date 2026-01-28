# Pokémon Listing - PokéAPI en Tiempo Real

Una aplicación web moderna que muestra información en tiempo real sobre Pokémon utilizando la [PokéAPI](https://pokeapi.co/). Desarrollada con Next.js 14, TypeScript y TailwindCSS.

## 🚀 Características

- ✅ **Listado completo** de todos los Pokémon ordenados por ID
- ✅ **Paginación optimizada** con carga progresiva (50 por página)
- ✅ **Buscador en tiempo real** con debounce que incluye evoluciones
- ✅ **Filtros avanzados** por Tipo y Generación
- ✅ **Página de detalle** completa para cada Pokémon
- ✅ **Cadena evolutiva** visual con navegación entre evoluciones
- ✅ **Estadísticas base** con barras de progreso animadas
- ✅ **Preservación del estado** con Context API y hook personalizado
- ✅ **Diseño 100% responsive** (móvil, tablet, desktop, 4K)
- ✅ **Temática Pokémon** con colores oficiales y Master Ball
- ✅ **Modo oscuro** automático
- ✅ **Carga instantánea** (< 1 segundo inicial)
- ✅ **Optimización de rendimiento** extrema
- ✅ TypeScript estricto y React Query
- ✅ Animaciones y transiciones suaves

## 🛠️ Tecnologías Utilizadas (T3 Stack Patterns)

Este proyecto sigue las mejores prácticas y patrones de **T3 Stack**:

- **Next.js 14** - Framework de React con App Router
- **TypeScript** - Superset tipado de JavaScript (strict mode)
- **TailwindCSS** - Framework de CSS utility-first
- **React Query (TanStack Query)** - Gestión de estado del servidor y caché
- **Zod** - Validación de schemas TypeScript-first con validación runtime
- **clsx + tailwind-merge** - Utilidades para manejo de clases CSS (patrón T3)
- **pnpm** - Gestor de paquetes rápido y eficiente

### 🎯 Patrones T3 Stack Implementados

- ✅ **Type-safe API calls** con validación Zod
- ✅ **Utility functions** (`cn()` para clases CSS)
- ✅ **Estructura de carpetas** siguiendo convenciones T3
- ✅ **Validación runtime** con schemas Zod
- ✅ **Type inference** desde schemas Zod

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (recomendado) o npm >= 9.0.0

### Instalar pnpm (si no lo tienes)

```bash
npm install -g pnpm
```

## 🔧 Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/Pokemon_listing.git
cd Pokemon_listing
```

2. **Instalar dependencias**

Con pnpm (recomendado):

```bash
pnpm install
```

O con npm:

```bash
npm install
```

## 🚀 Ejecución en Local

### Modo Desarrollo

Para iniciar el servidor de desarrollo:

Con pnpm:

```bash
pnpm dev
```

O con npm:

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### Modo Producción

Para crear una build de producción:

```bash
pnpm build
pnpm start
```

## 📁 Estructura del Proyecto

```
Pokemon_listing/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Página principal
│   │   ├── providers.tsx       # Providers de React Query y Filtros
│   │   ├── globals.css         # Estilos globales
│   │   └── pokemon/[name]/     # Rutas dinámicas
│   │       └── page.tsx        # Página de detalle de Pokémon
│   ├── components/             # Componentes React
│   │   ├── PokemonList.tsx     # Lista de Pokémon con paginación
│   │   ├── PokemonCard.tsx     # Tarjeta individual de Pokémon
│   │   ├── PokemonFilters.tsx  # Controles de filtros
│   │   ├── PokemonDetailPage.tsx # Vista detallada de Pokémon
│   │   └── MasterBallSpinner.tsx # Spinner personalizado
│   ├── contexts/               # Context API
│   │   └── FilterContext.tsx   # Contexto global de filtros
│   ├── lib/                    # Utilidades y funciones helper
│   │   ├── api.ts              # Funciones para llamadas a la API
│   │   └── generationMap.ts    # Mapeo estático de generaciones
│   ├── types/                  # Definiciones de tipos TypeScript
│   │   └── pokemon.ts          # Tipos de datos de Pokémon
│   └── img/                    # Imágenes del proyecto
│       └── image.png           # Master Ball icon
├── public/                     # Archivos estáticos
├── .gitignore                  # Archivos ignorados por Git
├── next.config.js              # Configuración de Next.js
├── tailwind.config.ts          # Configuración de Tailwind
├── tsconfig.json               # Configuración de TypeScript
├── package.json                # Dependencias y scripts
└── README.md                   # Este archivo
```

## 🎨 Funcionalidades Implementadas

### 1. Listado Completo de Pokémon

- Muestra todos los Pokémon disponibles (hasta 1000)
- Ordenados por ID de forma ascendente
- Información de generación para cada Pokémon
- Grid responsivo adaptativo (1-5 columnas según pantalla)

### 2. Buscador en Tiempo Real

- **Búsqueda instantánea** mientras escribes
- Busca por nombre de Pokémon
- **Incluye evoluciones**: buscar "Pikachu" muestra también Pichu y Raichu
- Indicador visual de búsqueda activa
- Funciona en combinación con otros filtros

### 3. Filtros Avanzados

- **Filtro por Generación**: Desde Gen I hasta Gen IX
- **Filtro por Tipo**: Todos los tipos de Pokémon disponibles
- Combinación de filtros para búsquedas precisas
- Botón para limpiar todos los filtros
- Contador de resultados filtrados

### 4. Tarjetas de Pokémon (Clickeables)

- Imagen oficial del Pokémon
- Nombre y número de Pokédex
- Generación a la que pertenece
- Tipos con colores distintivos
- Altura y peso
- Animaciones y efectos hover
- **Click para ver detalles completos**

### 5. Página de Detalle del Pokémon

- **Información completa** del Pokémon seleccionado
- Imagen grande de alta calidad
- Nombre, número, generación y tipos
- Altura y peso en unidades métricas
- **Estadísticas base** con visualización en barras de progreso:
  - HP, Ataque, Defensa
  - Ataque Especial, Defensa Especial
  - Velocidad
  - Total de estadísticas
- **Cadena evolutiva completa** con imágenes
- Navegación entre evoluciones clickeando en ellas
- Marcado visual de la evolución actual
- Botón de regreso al listado

### 6. Preservación del Estado (Context API)

- **Estado global** con React Context y hook personalizado `useFilters`
- Filtros se mantienen al volver del detalle
- Búsqueda se preserva en la navegación
- Número de página actual se conserva
- **Navegación limpia** sin parámetros en URL
- Estado persistente durante toda la sesión

### 7. Actualización en Tiempo Real

- Refresco automático cada minuto
- Indicador visual de actualización
- Caché inteligente con React Query

### 8. Diseño Responsive 100%

- **Móvil** (< 640px): 1-2 columnas, controles táctiles grandes
- **Tablet** (640px - 1024px): 2-3 columnas, navegación optimizada
- **Desktop** (1024px - 1536px): 4-5 columnas
- **4K/Ultra-wide** (> 1536px): hasta 6 columnas
- Textos escalables (sm, md, lg breakpoints)
- Botones y controles adaptados para touch
- Paginación con flex-wrap para pantallas pequeñas
- Modo oscuro automático según preferencias del sistema

### 9. Temática Pokémon Visual

- **Colores oficiales**: Rojo (#FF1C1C), Azul (#3B4CCA), Amarillo (#FFDE00)
- **Master Ball animada**: Spinner personalizado en todas las cargas
- **Gradientes Pokémon**: En títulos, botones y fondos
- **Iconos temáticos**: 🔍 🎮 ⚡ 📊 🔄 💪
- **Efectos Pokéball**: Decorativos en fondos
- **Tarjetas mejoradas**: Bordes, sombras y hover effects temáticos
- **Página actual**: Resaltada con amarillo Pikachu
- **Botones de navegación**: Rojo y azul Pokéball

### 10. Optimización de Rendimiento

- Mapeo estático de generaciones (sin llamadas extras a la API)
- Carga bajo demanda de detalles de Pokémon
- Carga en lotes para filtros por tipo
- Memoización de resultados filtrados

## 🔍 Scripts Disponibles

```bash
pnpm dev          # Inicia el servidor de desarrollo
pnpm build        # Crea una build de producción
pnpm start        # Inicia el servidor de producción
pnpm lint         # Ejecuta el linter de ESLint
pnpm type-check   # Verifica los tipos de TypeScript
```

## 🌐 API Utilizada

Este proyecto consume la [PokéAPI](https://pokeapi.co/), una API RESTful gratuita y pública que proporciona información completa sobre Pokémon.

**Endpoints utilizados:**

- `GET /pokemon?limit={limit}&offset={offset}` - Lista de Pokémon
- `GET /pokemon/{id or name}` - Detalles de un Pokémon específico

## 📝 Notas Técnicas

- **React Query**: Configurado con refresco automático cada 60 segundos para simular actualizaciones en tiempo real
- **Context API**: Gestión de estado global con `FilterContext` para preservación de filtros
- **Custom Hook**: `useFilters()` proporciona acceso limpio al estado de filtros desde cualquier componente
- **TypeScript Strict Mode**: Habilitado para mayor seguridad de tipos
- **Next.js App Router**: Utilizando el nuevo sistema de rutas de Next.js 14
- **Client Components**: Los componentes interactivos usan la directiva `"use client"`
- **Optimización de Imágenes**: Next.js Image optimiza automáticamente las imágenes
- **Carga Progresiva**: Primera página carga en < 1s, resto en background

## 🚀 Próximas Mejoras

- [x] Búsqueda de Pokémon por nombre (con evoluciones) ✅
- [x] Filtros por tipo ✅
- [x] Filtros por generación ✅
- [x] Vista detallada con estadísticas completas ✅
- [x] Cadena evolutiva con navegación ✅
- [ ] Comparador de Pokémon
- [ ] Favoritos guardados en localStorage
- [ ] Búsqueda avanzada por habilidades
- [ ] Filtro por estadísticas (ej: HP > 100)
- [ ] Scroll infinito o paginación virtual
- [ ] Animaciones más avanzadas
- [ ] Tests unitarios y de integración
- [ ] PWA (Progressive Web App)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

Desarrollado como prueba técnica utilizando Next.js, TypeScript y la PokéAPI.

---

**¡Disfruta explorando el mundo Pokémon!** 🎮✨
