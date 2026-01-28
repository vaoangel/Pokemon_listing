# 🚀 Guía de Inicio Rápido

Esta guía te ayudará a poner en marcha el proyecto en menos de 5 minutos.

## ⚡ Inicio Rápido (TL;DR)

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/Pokemon_listing.git
cd Pokemon_listing

# 2. Instalar dependencias
pnpm install

# 3. Iniciar el servidor
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador. 🎉

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener:

- ✅ **Node.js** 18.0.0 o superior
- ✅ **pnpm** 8.0.0 o superior (o npm 9.0.0+)

### Instalar pnpm

Si no tienes pnpm instalado:

```bash
npm install -g pnpm
```

## 🛠️ Instalación Detallada

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/Pokemon_listing.git
cd Pokemon_listing
```

### Paso 2: Instalar Dependencias

Con pnpm (recomendado):
```bash
pnpm install
```

O con npm:
```bash
npm install
```

**Tiempo estimado:** 1-2 minutos

### Paso 3: Iniciar el Servidor de Desarrollo

```bash
pnpm dev
```

**Resultado esperado:**
```
▲ Next.js 14.2.35
- Local:        http://localhost:3000

✓ Ready in 1292ms
```

### Paso 4: Abrir en el Navegador

Visita [http://localhost:3000](http://localhost:3000)

Deberías ver:
- ✅ Título "Pokédex"
- ✅ Lista de 20 Pokémon
- ✅ Botones de navegación
- ✅ Tarjetas con imágenes y detalles

## 🧪 Verificar la Instalación

Ejecuta estos comandos para asegurarte de que todo está configurado correctamente:

```bash
# Verificar tipos de TypeScript
pnpm run type-check

# Ejecutar el linter
pnpm run lint

# Crear build de producción
pnpm run build
```

Todos deberían completarse sin errores. ✅

## 🎯 Funcionalidades para Probar

Una vez que el servidor esté corriendo:

1. **Navegación**
   - Haz clic en "Siguiente" para ver más Pokémon
   - Haz clic en "Anterior" para volver

2. **Detalles**
   - Observa las imágenes de cada Pokémon
   - Verifica los tipos con colores distintivos
   - Revisa altura y peso

3. **Actualización en Tiempo Real**
   - Deja la página abierta por 60 segundos
   - Verás un indicador "Actualizando..." cuando se refresque

4. **Responsive Design**
   - Cambia el tamaño de la ventana
   - Prueba en modo móvil (DevTools > Toggle Device Toolbar)

5. **Dark Mode**
   - Cambia el tema de tu sistema operativo
   - La app debería adaptarse automáticamente

## 🐛 Solución de Problemas

### El puerto 3000 está ocupado

```bash
# Usar un puerto diferente
pnpm dev -- --port 3001
```

### Error al instalar dependencias

```bash
# Limpiar caché y reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Errores de TypeScript

```bash
# Verificar versión de Node
node --version  # Debe ser >= 18.0.0

# Reinstalar tipos
pnpm install --force
```

### La página no carga

1. Verifica que el servidor esté corriendo
2. Revisa la consola del navegador (F12)
3. Verifica tu conexión a internet (necesaria para PokéAPI)

## 📚 Próximos Pasos

Ahora que tienes el proyecto corriendo:

1. 📖 Lee el [README.md](./README.md) completo
2. 🏗️ Revisa la [Arquitectura](./docs/ARCHITECTURE.md)
3. 🤝 Lee la [Guía de Contribución](./CONTRIBUTING.md)
4. 💡 Explora el código en `src/`

## 🆘 Ayuda

Si encuentras problemas:

1. Revisa los [Issues en GitHub](https://github.com/tu-usuario/Pokemon_listing/issues)
2. Crea un nuevo issue con:
   - Descripción del problema
   - Pasos para reproducir
   - Versión de Node.js (`node --version`)
   - Sistema operativo

## ✨ ¡Todo Listo!

Ahora estás listo para:
- 🎨 Personalizar el diseño
- ⚡ Agregar nuevas funcionalidades
- 🐛 Reportar bugs
- 🤝 Contribuir al proyecto

**¡Feliz codificación!** 🚀

---

**Última actualización:** 28 de enero de 2026
