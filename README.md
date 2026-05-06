# Daira - Simulador de Plazo Fijo Evolutivo

Este proyecto es una plataforma de simulación financiera avanzada que permite proyectar ganancias de plazos fijos, destacándose por su motor de diseño dual que permite viajar en el tiempo entre dos eras del diseño web.

## 🌟 Características Destacadas

### 1. 🎭 Motor de Diseño Dual (Retro vs Moderno)
La aplicación implementa un sistema de temas dinámico que permite al usuario alternar entre:
- **Modo Retro (Web 1.0)**: Una estética nostálgica inspirada en la banca de principios de los 2000. Compacta, de alto contraste y fiel a la experiencia de usuario de la época.
- **Modo Premium Fintech**: Un diseño moderno de última generación basado en **Glassmorphism**, con gradientes suaves, tipografía *Inter* y una experiencia de usuario fluida y aireada.

### 2. ⚡ Simulación de Inversión en Tiempo Real
- **Cálculos Precisos**: Validación de montos (mín. $1.000), plazos (mín. 30 días) y TNA (máx. 50%).
- **Integración con API**: Procesamiento asíncrono de simulaciones mediante consumo de webhooks.
- **Formateo Internacional**: Uso de `Intl.NumberFormat` para garantizar precisión monetaria de 2 decimales para la moneda argentina.

### 3. 📜 Historial de Consultas
- Persistencia visual de las últimas 20 simulaciones procesadas.
- Carga asíncrona optimizada con estados de carga detallados.

### 4. 🚀 Experiencia de Usuario (UX)
- **Saltos Temporales**: Animaciones de transición y "skeleton loaders" que simulan la evolución tecnológica de la plataforma.
- **Feedback Inmediato**: Manejo de estados de carga (*loading states*) tanto en el formulario como en el historial para evitar incertidumbre.

## 🛠️ Stack Tecnológico

- **Framework**: [Svelte 5](https://svelte.dev/) - Utilizando el nuevo sistema de **Runes** (`$state`, `$props`, `$effect`) para una reactividad ultra-eficiente.
- **Herramienta de Construcción**: Vite.
- **Arquitectura CSS**: Vanilla CSS modularizado. Estilos desacoplados de los componentes para mayor mantenibilidad.
- **Gestión de Estado**: Context API de Svelte para la propagación del tema global.

## 📁 Estructura del Proyecto

```text
src/
├── lib/               # Componentes de lógica y presentación
│   ├── HistoryTable.svelte
│   ├── SimulatorForm.svelte
│   ├── SimulatorResult.svelte
│   ├── api.js         # Capa de servicios y fetch
│   └── utils.js       # Utilidades de formateo
├── styles/            # Arquitectura CSS modular
│   ├── App.css
│   ├── HistoryTable.css
│   ├── SimulatorForm.css
│   └── SimulatorResult.css
├── App.svelte         # Orquestador principal y gestión de contexto
└── main.js           # Punto de entrada
```

## ⚙️ Instalación y Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/ImaaValenzuela/pt-daira.git
   cd prueba-tecnica
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

4. **Acceso**:
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 📝 Notas de Implementación

- Se ha priorizado la **precisión financiera**, asegurando que todos los cálculos de intereses y montos totales mantengan la integridad de los datos en todas las capas de la aplicación.
- El refactor hacia **Svelte 5** permite una sintaxis más limpia y un rendimiento superior al evitar el overhead de las suscripciones manuales a stores en casos de estado local complejo.
- La **separación de intereses** en el CSS permite escalar el diseño de ambos temas (Retro y Moderno) de forma independiente sin generar colisiones de selectores.
