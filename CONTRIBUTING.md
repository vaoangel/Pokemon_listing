# Guía de Contribución

¡Gracias por tu interés en contribuir al proyecto Pokémon Listing! 🎉

## 🚀 Cómo Contribuir

### 1. Fork y Clone

```bash
git clone https://github.com/tu-usuario/Pokemon_listing.git
cd Pokemon_listing
```

### 2. Instalar Dependencias

```bash
pnpm install
```

### 3. Crear una Rama

```bash
git checkout -b feature/nueva-funcionalidad
```

### 4. Realizar Cambios

- Asegúrate de seguir las convenciones de código del proyecto
- Escribe código TypeScript tipado
- Usa Tailwind CSS para los estilos
- Mantén los componentes pequeños y reutilizables

### 5. Verificar Código

Antes de hacer commit, verifica que:

```bash
# No haya errores de TypeScript
pnpm run type-check

# El código pase el linter
pnpm run lint

# El proyecto compile correctamente
pnpm run build
```

### 6. Commit y Push

```bash
git add .
git commit -m "feat: descripción de la nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

### 7. Crear Pull Request

Abre un Pull Request en GitHub con:
- Descripción clara de los cambios
- Screenshots si hay cambios visuales
- Referencia a issues relacionados

## 📝 Convenciones de Código

### Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato (no afectan el código)
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Mantenimiento general

### TypeScript

- Usa tipos explícitos siempre que sea posible
- Evita `any`, usa `unknown` si es necesario
- Define interfaces para objetos complejos
- Usa `type` para unions y tipos simples

### React

- Usa componentes funcionales
- Prefiere hooks sobre clases
- Usa `"use client"` solo cuando sea necesario
- Mantén los componentes pequeños y enfocados

### Estilos

- Usa Tailwind CSS para todos los estilos
- Evita estilos inline en JavaScript
- Usa las utilidades de Tailwind antes de crear CSS custom
- Mantén los nombres de clase organizados (layout, spacing, colors, etc.)

## 🐛 Reportar Bugs

Para reportar un bug, abre un issue con:

1. Descripción clara del problema
2. Pasos para reproducir
3. Comportamiento esperado vs actual
4. Screenshots si aplica
5. Información del entorno (OS, navegador, versión de Node)

## 💡 Proponer Funcionalidades

Para proponer una nueva funcionalidad:

1. Abre un issue describiendo la funcionalidad
2. Explica el caso de uso y beneficios
3. Espera feedback antes de empezar a desarrollar

## ❓ Preguntas

Si tienes preguntas, abre un issue con la etiqueta `question`.

---

¡Gracias por contribuir! 🙌
