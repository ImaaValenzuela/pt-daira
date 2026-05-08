<script>
  import { onMount } from "svelte";
  import SimulatorForm from "./lib/SimulatorForm.svelte";
  import SimulatorResult from "./lib/SimulatorResult.svelte";
  import HistoryTable from "./lib/HistoryTable.svelte";
  import Loader from "./lib/components/Loader.svelte";
  import Banner from "./lib/components/Banner.svelte";
  import Button from "./lib/components/Button.svelte";

  /** @type {{ capital: number, interes_ganado: number, monto_total: number } | null} */
  let result = $state(null);
  let showHistory = $state(false);
  let showLoader = $state(true);

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
</script>

{#if showLoader}
  <Loader />
{/if}

<main id="app">
  <div class="main-container">
    <Banner />

    <div class="content-area">
      <SimulatorForm onResult={handleCalculate} />

      <div style="margin-top: 15px;">
        {#if result}
          <SimulatorResult {result} onReset={handleReset} />
        {/if}
      </div>

      <div class="history-toggle-section">
        <Button variant="secondary" onclick={toggleHistory}>
          {#if showHistory}
            Ocultar Historial de Simulaciones
          {:else}
            Consultar Historial de Simulaciones
          {/if}
        </Button>
      </div>

      {#if showHistory}
        <div style="margin-top: 15px;">
          <HistoryTable />
        </div>
      {/if}
    </div>
  </div>
</main>

<style>
  #app {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }

  .main-container {
    width: 760px;
    background-color: var(--panel-bg);
    border: 2px outset #ffffff;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  }

  .content-area {
    padding: 15px;
  }

  .history-toggle-section {
    margin-top: 15px; 
    text-align: center; 
    border-top: 1px solid #ccc; 
    padding-top: 15px;
  }
</style>
