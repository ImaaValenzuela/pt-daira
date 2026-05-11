<script>
  import MainLayout from "./lib/components/MainLayout.svelte";
  import SimulatorForm from "./lib/SimulatorForm.svelte";
  import SimulatorResult from "./lib/SimulatorResult.svelte";
  import HistoryTable from "./lib/HistoryTable.svelte";

  /** @type {{ capital: number, interes_ganado: number, monto_total: number } | null} */
  let result = $state(null);
  let showHistory = $state(false);

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
      <button class="toggle-history" onclick={toggleHistory}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-eye">
          <path d="M21.447021484375,11.657958984375C21.275390625,11.43450927734375,17.19677734375,6.1875,12,6.1875C6.802978515625,6.1875,2.724609375,11.43450927734375,2.553466796875,11.657958984375C2.39892578125,11.85986328125,2.39892578125,12.14019775390625,2.553466796875,12.342041015625C2.724609375,12.5648193359375,6.80224609375,17.8125,12,17.8125C17.197509765625,17.8125,21.275390625,12.5648193359375,21.447021484375,12.342041015625C21.6015625,12.14019775390625,21.6015625,11.85986328125,21.447021484375,11.657958984375M12,16.6875C8.08251953125,16.6875,4.706787109375,13.13250732421875,3.73046875,12C4.706787109375,10.86676025390625,8.08251953125,7.3125,12,7.3125C15.91796875,7.3125,19.29443359375,10.86749267578125,20.270751953125,12C19.2958984375,13.13323974609375,15.926025390625,16.6875,12,16.6875M12,9.1875C10.97998046875,9.16400146484375,10.027099609375,9.69464111328125,9.510009765625,10.57427978515625C8.993408203125,11.4539794921875,8.993408203125,12.5445556640625,9.510009765625,13.4241943359375C10.027099609375,14.3038330078125,10.97998046875,14.8345947265625,12,14.81103515625C13.53515625,14.78594970703125,14.7666015625,13.53424072265625,14.7666015625,11.9989013671875C14.7666015625,10.4635009765625,13.53515625,9.21185302734375,12,9.186767578125M12,13.686767578125C11.06787109375,13.686767578125,10.3125,12.9312744140625,10.3125,11.999267578125C10.3125,11.0672607421875,11.06787109375,10.311767578125,12,10.311767578125C12.931884765625,10.311767578125,13.6875,11.0672607421875,13.6875,11.999267578125C13.6875,12.9312744140625,12.931884765625,13.686767578125,12,13.686767578125" />
        </svg>
        <span>{showHistory ? "Ocultar" : "Ver todas"}</span>
      </button>
    </div>
    {#if showHistory}
      <HistoryTable />
    {/if}
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

  .toggle-history {
    display: flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
    transition: all 0.2s ease;
  }

  .toggle-history:hover {
    color: var(--text-main);
    background: rgba(255, 255, 255, 0.05);
  }

  .icon-eye {
    width: 20px;
    height: 20px;
    opacity: 0.8;
  }

  @media (max-width: 1024px) {
    .grid-layout {
      grid-template-columns: 1fr;
    }
  }
</style>
