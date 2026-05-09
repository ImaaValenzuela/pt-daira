<script>
  import MainLayout from "./lib/components/MainLayout.svelte";
  import SimulatorForm from "./lib/SimulatorForm.svelte";
  import SimulatorResult from "./lib/SimulatorResult.svelte";
  import HistoryTable from "./lib/HistoryTable.svelte";

  /** @type {{ capital: number, interes_ganado: number, monto_total: number } | null} */
  let result = $state(null);

  /**
   * @param {{ capital: number, interes_ganado: number, monto_total: number }} data
   */
  function handleCalculate(data) {
    result = data;
  }

  function handleReset() {
    result = null;
  }
</script>

<MainLayout>
  <header class="page-header">
    <h1 class="page-title">Simulador de plazo fijo</h1>
    <p class="page-subtitle">Calculador de rendimiento de inversiones</p>
  </header>

  <div class="grid-layout">
    <section class="form-section">
      <SimulatorForm onResult={handleCalculate} />
    </section>

    <section class="result-section">
      {#if result}
        <SimulatorResult {result} onReset={handleReset} />
      {:else}
        <div class="empty-result">
          <p>Complete el formulario para ver los resultados de su inversión.</p>
        </div>
      {/if}
    </section>
  </div>

  <section class="history-section">
    <div class="section-header">
      <h2 class="section-title">Historial de simulaciones</h2>
      <button class="text-button">Ver todas</button>
    </div>
    <HistoryTable />
  </section>
</MainLayout>

<style>
  .page-header {
    margin-bottom: 32px;
  }

  .page-title {
    font-size: 28px;
    font-weight: 700;
    color: var(--text-main);
    margin: 0;
  }

  .page-subtitle {
    font-size: 14px;
    color: var(--text-muted);
    margin: 8px 0 0 0;
  }

  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 40px;
  }

  .empty-result {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed var(--panel-border);
    border-radius: var(--radius);
    color: var(--text-muted);
    padding: 40px;
    text-align: center;
  }

  .history-section {
    margin-top: 48px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-main);
    margin: 0;
  }

  .text-button {
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 13px;
    cursor: pointer;
    text-decoration: underline;
  }

  .text-button:hover {
    color: var(--text-main);
  }

  @media (max-width: 1024px) {
    .grid-layout {
      grid-template-columns: 1fr;
    }
  }
</style>
