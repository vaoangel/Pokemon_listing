# Arquitectura del Proyecto

## 📐 Estructura General

El proyecto sigue una arquitectura moderna de Next.js 14 con App Router, TypeScript y principios de diseño limpio.

```
Pokemon_listing/
├── src/
│   ├── app/              # App Router de Next.js
│   ├── components/       # Componentes React reutilizables
│   ├── lib/              # Utilidades y funciones helper
│   └── types/            # Definiciones de tipos TypeScript
├── public/               # Archivos estáticos
└── docs/                 # Documentación técnica
```

## 🎯 Capas de la Aplicación

### 1. Capa de Presentación (`src/app/`)

**Responsabilidad:** Manejo de rutas, layouts y páginas principales.

- `layout.tsx`: Layout raíz con metadatos y providers
- `page.tsx`: Página principal del Pokédex
- `providers.tsx`: Configuración de React Query
- `globals.css`: Estilos globales con Tailwind

### 2. Capa de Componentes (`src/components/`)

**Responsabilidad:** Componentes UI reutilizables y lógica de presentación.

- `PokemonList.tsx`: 
  - Componente de cliente con paginación
  - Gestiona estado de offset y límite
  - Maneja navegación entre páginas
  - Muestra indicador de carga y errores

- `PokemonCard.tsx`:
  - Tarjeta individual de Pokémon
  - Carga detalles bajo demanda
  - Muestra imagen, tipos, altura y peso
  - Colores dinámicos por tipo

### 3. Capa de Datos (`src/lib/`)

**Responsabilidad:** Comunicación con APIs externas y lógica de negocio.

- `api.ts`:
  - `fetchPokemonList()`: Obtiene lista paginada
  - `fetchPokemonDetails()`: Obtiene detalles específicos
  - Manejo de errores HTTP
  - Tipado estricto de respuestas

### 4. Capa de Tipos (`src/types/`)

**Responsabilidad:** Definiciones TypeScript para seguridad de tipos.

- `pokemon.ts`:
  - `Pokemon`: Estructura básica de un Pokémon
  - `PokemonListResponse`: Respuesta de lista paginada
  - `PokemonDetails`: Detalles completos de un Pokémon
  - Interfaces para tipos, sprites, habilidades y stats

## 🔄 Flujo de Datos

```
Usuario → PokemonList → React Query → API (fetchPokemonList)
                ↓
         [Cache de React Query]
                ↓
         Lista de Pokémon → PokemonCard → React Query → API (fetchPokemonDetails)
                                    ↓
                            [Cache de React Query]
                                    ↓
                            Detalles del Pokémon → UI
```

## 🎨 Gestión de Estado

### React Query (TanStack Query)

**Configuración:**
- `staleTime`: 60 segundos (datos se consideran frescos)
- `refetchInterval`: 60 segundos (refresco automático)
- Caché automático por `queryKey`
- Invalidación inteligente de caché

**Estrategia de Caché:**
1. Primera carga: Fetch desde API
2. Navegación: Usa caché si disponible
3. Cada 60s: Refresco automático en background
4. Enfoque de ventana: Refresco al volver a la pestaña

### Estado Local (useState)

- `offset`: Posición actual en la lista
- `limit`: Cantidad de elementos por página (20)

## 🚀 Optimizaciones

### 1. Renderizado

- **Server Components por defecto**: Layout y página principal
- **Client Components selectivos**: Solo componentes con interactividad
- **Lazy loading**: Imágenes cargadas bajo demanda

### 2. Datos

- **Caché agresivo**: React Query cachea todas las respuestas
- **Stale-while-revalidate**: Muestra caché mientras actualiza
- **Prefetching implícito**: Al cargar lista, prepara detalles

### 3. Imágenes

- **Next.js Image**: Optimización automática
- **Lazy loading**: Solo carga imágenes visibles
- **Responsive**: Tamaños adaptativos según viewport

## 🔒 Seguridad de Tipos

### TypeScript Strict Mode

```json
{
  "strict": true,
  "noEmit": true,
  "esModuleInterop": true
}
```

### Beneficios:
- Detección temprana de errores
- Autocompletado inteligente
- Refactoring seguro
- Documentación implícita

## 🌐 Integración con API

### PokéAPI

**Base URL:** `https://pokeapi.co/api/v2`

**Endpoints:**

1. **Lista de Pokémon**
   ```
   GET /pokemon?limit={limit}&offset={offset}
   ```
   - Respuesta: `PokemonListResponse`
   - Paginación: limit/offset
   - Total: ~1000 Pokémon

2. **Detalles de Pokémon**
   ```
   GET /pokemon/{id or name}
   ```
   - Respuesta: `PokemonDetails`
   - Incluye: sprites, tipos, stats, habilidades

### Manejo de Errores

```typescript
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error('...');
  return response.json();
} catch (error) {
  // React Query maneja el error automáticamente
}
```

## 🎨 Sistema de Diseño

### Tailwind CSS

**Configuración:**
- Purge automático para producción
- Variables CSS para theming
- Dark mode con `prefers-color-scheme`

**Paleta de Colores:**
- Tipos de Pokémon: Colores semánticos
- Fondo: Gradiente azul claro → oscuro
- Texto: Adaptativo a tema

### Componentes Reutilizables

- Sistema de grid responsive
- Cards con hover effects
- Botones con estados disabled
- Loading skeletons

## 📦 Gestión de Dependencias

### pnpm

**Ventajas:**
- Instalación rápida
- Menos espacio en disco
- Strict peer dependencies
- Monorepo-friendly

### Dependencias Principales

```json
{
  "next": "14.x",           // Framework
  "react": "18.x",          // UI library
  "typescript": "5.x",      // Type safety
  "@tanstack/react-query": "5.x", // State management
  "tailwindcss": "3.x",     // Styling
  "zod": "3.x"              // Schema validation
}
```

## 🧪 Testing (Futuro)

### Estrategia Recomendada

1. **Unit Tests**: Vitest
2. **Component Tests**: Testing Library
3. **E2E Tests**: Playwright
4. **Visual Tests**: Chromatic

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conectar repositorio
2. Auto-detect Next.js
3. Deploy automático en push

### Variables de Entorno

Ninguna requerida (API pública).

## 📈 Escalabilidad

### Mejoras Futuras

1. **Server-Side Rendering**
   - Mejorar SEO individual
   - Pre-renderizar páginas populares

2. **Incremental Static Regeneration**
   - Revalidación bajo demanda
   - Caché a nivel de CDN

3. **Database Local**
   - Prisma + PostgreSQL
   - Favoritos y colecciones
   - Búsqueda avanzada

4. **Real-time Updates**
   - WebSockets para updates
   - Notificaciones push
   - Colaboración multi-usuario

## 🏗️ Principios de Arquitectura

1. **Separation of Concerns**: Cada capa tiene una responsabilidad clara
2. **Single Responsibility**: Componentes pequeños y enfocados
3. **DRY (Don't Repeat Yourself)**: Código reutilizable
4. **KISS (Keep It Simple)**: Soluciones simples primero
5. **Type Safety**: TypeScript en toda la aplicación
6. **Performance First**: Optimizaciones desde el diseño

---

**Última actualización:** 28 de enero de 2026
