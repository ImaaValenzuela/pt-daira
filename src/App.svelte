<script>
  import './styles/App.css';
  import { onMount, setContext } from "svelte";
  import SimulatorForm from "./lib/SimulatorForm.svelte";
  import SimulatorResult from "./lib/SimulatorResult.svelte";
  import HistoryTable from "./lib/HistoryTable.svelte";

  /** @type {{ capital: number, interes_ganado: number, monto_total: number } | null} */
  let result = $state(null);
  let showHistory = $state(false);
  let showLoader = $state(true);

  // Theme Context for child components
  let themeState = $state({ isModern: false });
  setContext("theme", themeState);

  onMount(() => {
    setTimeout(() => {
      showLoader = false;
    }, 2500);
  });

  /**
   * @param {{ capital: number, interes_ganado: number, monto_total: number }} data
   */
  function handleCalculate(data) {
    result = data;
  }

  function handleReset() {
    result = null;
  }

  function toggleHistory() {
    showHistory = !showHistory;
  }

  function advanceTime() {
    showLoader = true;
    setTimeout(() => {
      themeState.isModern = !themeState.isModern;
      setTimeout(() => {
        showLoader = false;
      }, 1000);
    }, 500);
  }

  $effect(() => {
    if (themeState.isModern) {
      document.body.classList.add("theme-modern");
    } else {
      document.body.classList.remove("theme-modern");
    }
  });
</script>

{#if showLoader}
  <div class="loader-overlay">
    <div class="loader-box">
      {#if !themeState.isModern}
        <div class="loader-title">Conectando...</div>
      {:else}
        <h2 class="loader-title">Actualizando UI</h2>
      {/if}
      <div
        style={themeState.isModern
          ? "font-weight: 500; color: #4B5563;"
          : "font-size: 11px;"}
      >
        Estableciendo conexión segura con el servidor...
      </div>
      <div class="loader-bar">
        <div class="loader-progress"></div>
      </div>
    </div>
  </div>
{/if}

<main id="app">
  <div class="main-container">
    <div class="header-banner">
      <h1>Banco de la República Argentina</h1>
      <p>Módulo de Simulación de Inversiones a Plazo Fijo</p>
    </div>

    <div class="content-area">
      <SimulatorForm onResult={handleCalculate} />

      <div style="margin-top: 15px;">
        {#if result}
          <SimulatorResult {result} onReset={handleReset} />
        {/if}
      </div>

      <div
        style="margin-top: 15px; text-align: center; border-top: 1px solid #ccc; padding-top: 15px;"
      >
        <button class="btn btn-secondary" onclick={toggleHistory}>
          {#if showHistory}
            Ocultar Historial de Simulaciones
          {:else}
            Consultar Historial de Simulaciones
          {/if}
        </button>
      </div>

      {#if showHistory}
        <div style="margin-top: 15px;">
          <HistoryTable />
        </div>
      {/if}

      <div
        style="margin-top: 60px; text-align: center; border-top: 2px dashed #ccc; padding-top: 20px;"
      >
        <p
          style="color: var(--text-muted); font-size: 12px; margin-bottom: 10px;"
        >
          {themeState.isModern
            ? "Estás visualizando la versión moderna."
            : "Estás visualizando la versión retro (Web 1.0)."}
        </p>
        <button
          class="btn btn-primary"
          style="background-color: var(--accent); color: #000; border: none; font-size: 14px; padding: 10px 20px; font-weight: bold; border-radius: 6px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
          onclick={advanceTime}
        >
          {themeState.isModern
            ? "Regresar al 2005"
            : "Avanzar 20 años en el diseño"}
        </button>
      </div>
    </div>
  </div>
</main>
