# Daira - Simulador de Plazo Fijo (Reto Técnico)

Este proyecto es la solución al reto técnico para la construcción de una aplicación funcional que permite a los usuarios proyectar las ganancias de un plazo fijo.

## 🚀 Características Principales

1. **Simulación de Inversión**: 
   - Cálculo del plazo fijo ingresando Monto a Invertir (Mínimo $1.000).
   - Plazo de días parametrizable (Mínimo 30 días).
   - Tasa Nominal Anual (TNA) máxima de 50%.
   - Cálculos en tiempo real consumiendo la API proporcionada.
   
2. **Historial de Simulaciones**:
   - Visualización de las últimas 20 consultas procesadas a través de la API.
   
3. **Manejo de Estados de Carga (Loading)**:
   - Feedback visual en tiempo real para el usuario mientras las APIs resuelven las peticiones (Tanto en cálculo como en la carga del historial).

4. **Interfaz UI/UX Premium**:
   - Diseño moderno basado en **Glassmorphism**.
   - Colores oscuros de alto contraste con acentos esmeralda (esquema clásico Fintech).
   - Tipografía adaptada (*Inter* para fluidez de lectura y *Roboto Mono* para precisión de lectura numérica).
   - Formateo automático de precisión monetaria de 2 decimales para la moneda argentina utilizando la API de Internacionalización (`Intl.NumberFormat`).

## 🛠️ Tecnologías y Herramientas

- **Framework Front-End**: Svelte 5 (con Vite).
- **Estilos**: Vanilla CSS (CSS3) puro sin frameworks, aprovechando variables CSS para escalabilidad, *Grid* y *Flexbox*.
- **Gestor de Paquetes**: npm.
- **Asincronismo**: Fetch API para el consumo de webhooks externos.

## ⚙️ Instalación y Configuración Local

1. Clona el repositorio:
   ```bash
   git clone <url-de-tu-repositorio>
   cd prueba-tecnica
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Levanta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre la aplicación en tu navegador web en la dirección indicada en consola (normalmente `http://localhost:5173`).

## 📁 Estructura del Proyecto

El código fuente principal se encuentra en la carpeta `src`:
- `src/App.svelte`: Archivo base y layout principal de la UI.
- `src/app.css`: Variables globales, diseño Glassmorphism, y animaciones.
- `src/lib/SimulatorForm.svelte`: Componente encargado del formulario, validaciones de los inputs y envío asíncrono (POST).
- `src/lib/SimulatorResult.svelte`: Componente encargado de la presentación visual de los resultados devueltos por el POST.
- `src/lib/HistoryTable.svelte`: Componente encargado de la consulta asíncrona GET y tabulación del historial de las simulaciones.
- `src/lib/utils.js`: Funciones de utilidad auxiliares compartidas, tales como el formateador de monedas y porcentajes.

## 📝 Notas de Desarrollo
- Se optó por Svelte 5 ya que la plantilla lo predeterminaba en su última versión, haciendo uso de runas (`$state`, `$props`) para lograr la máxima reactividad que se exige en los criterios de evaluación.
- Todo el manejo monetario ha sido diseñado para nunca perder de vista la precisión en las centésimas, exigencia clave de todo sistema financiero moderno.
