<script>
  import { onMount } from "svelte";
  import { formatCurrency, formatPercent } from "./utils.js";
  import { fetchHistory as apiFetchHistory } from "./api.js";
  import Button from "./components/Button.svelte";
  import Panel from "./components/Panel.svelte";

  /** @type {Array<{ "Capital": number, "Plazo en días": number, "TNA aplicada": number, "Intereses ganados": number, "Monto total": number }>} */
  let records = $state([]);
  let isLoading = $state(true);
  let errorMsg = $state("");

  let currentPage = $state(1);
  let itemsPerPage = 5;
  let totalPages = $derived(Math.ceil(records.length / itemsPerPage));
  let paginatedRecords = $derived(
    records.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
  );

  async function fetchHistory() {
    isLoading = true;
    errorMsg = "";
    try {
      await new Promise((r) => setTimeout(r, 600));
      const resData = await apiFetchHistory();
      if (resData.data && Array.isArray(resData.data)) {
        records = resData.data.slice(0, 20);
      }
    } catch (err) {
      errorMsg = "No se pudo cargar el historial.";
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    fetchHistory();
  });

  function nextPage() {
    if (currentPage < totalPages) currentPage++;
  }

  function prevPage() {
    if (currentPage > 1) currentPage--;
  }
</script>

<Panel>
  <div role="status">
    {#if isLoading}
      <div class="status-container">
        <div class="loader-spinner"></div>
        <p class="loading-text">Cargando registros...</p>
      </div>
    {:else if errorMsg}
      <div class="status-container">
        <span class="error-text">{errorMsg}</span>
        <Button onclick={fetchHistory}>Reintentar conexión</Button>
      </div>
    {:else if records.length === 0}
      <div class="status-container">
        <p class="empty-text">No hay registros disponibles en la base de datos.</p>
      </div>
    {:else}
      <div class="table-container">
        <table class="modern-table">
          <thead>
            <tr>
              <th>Capital Invertido</th>
              <th>Plazo</th>
              <th>T.N.A. Applied</th>
              <th class="align-right">Intereses Ganados</th>
              <th class="align-right">Monto Total</th>
            </tr>
          </thead>
          <tbody>
            {#each paginatedRecords as record}
              <tr>
                <td>{formatCurrency(record["Capital"])}</td>
                <td>{record["Plazo en días"]} días</td>
                <td>{formatPercent(record["TNA aplicada"])}</td>
                <td class="align-right success"
                  >+{formatCurrency(record["Intereses ganados"])}</td
                >
                <td class="align-right font-bold"
                  >{formatCurrency(record["Monto total"])}</td
                >
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      {#if totalPages > 1}
        <div class="pagination-wrapper">
          <button class="pagination-arrow" onclick={prevPage} disabled={currentPage === 1}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span class="pagination-text">
            Página {currentPage} de {totalPages}
          </span>
          <button class="pagination-arrow"
            onclick={nextPage}
            disabled={currentPage === totalPages}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      {/if}
    {/if}
  </div>
</Panel>

<style>
  .status-container {
    text-align: center;
    padding: 60px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .loader-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--panel-border);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .loading-text, .empty-text {
    font-size: 14px;
    color: var(--text-muted);
    margin: 0;
  }

  .error-text {
    color: var(--danger);
    font-weight: 600;
  }

  .table-container {
    margin: 0 -24px; /* Counteract Panel padding for full-bleed feel */
    overflow-x: auto;
  }

  table.modern-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  th {
    padding: 16px 24px;
    text-align: left;
    color: var(--text-muted);
    font-size: 13px;
    font-weight: 600;
    border-bottom: 1px solid var(--panel-border);
    white-space: nowrap;
  }

  td {
    padding: 16px 24px;
    color: var(--text-main);
    border-bottom: 1px solid var(--panel-border);
    white-space: nowrap;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background-color: rgba(255, 255, 255, 0.02);
  }

  .align-right { text-align: right; }
  .font-bold { font-weight: 700; }
  .success { color: var(--success); }

  .pagination-wrapper {
    margin-top: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .pagination-arrow {
    background: var(--panel-border);
    border: none;
    color: var(--text-main);
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .pagination-arrow:hover:not(:disabled) {
    background: var(--text-muted);
  }

  .pagination-arrow:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .pagination-text {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-muted);
  }
</style>
