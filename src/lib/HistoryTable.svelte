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
  <div class="history-header">
    <h2 class="history-title">Archivo Histórico de Operaciones</h2>
  </div>

  <div role="status">
    {#if isLoading}
      <div class="loading-text">
        Cargando registros... aguarde.
      </div>
    {:else if errorMsg}
      <div class="error-container">
        <span class="error-text">{errorMsg}</span><br /><br />
        <Button onclick={fetchHistory}>Reintentar conexión</Button>
      </div>
    {:else if records.length === 0}
      <div class="empty-text">
        No hay registros disponibles en la base de datos.
      </div>
    {:else}
      <table class="retro-table">
        <thead>
          <tr>
            <th>Capital Invertido</th>
            <th>Plazo</th>
            <th>T.N.A.</th>
            <th>Intereses Ganados</th>
            <th>Monto Total</th>
          </tr>
        </thead>
        <tbody>
          {#each paginatedRecords as record}
            <tr>
              <td class="align-right">{formatCurrency(record["Capital"])}</td>
              <td class="align-center">{record["Plazo en días"]} días</td>
              <td class="align-center">{formatPercent(record["TNA aplicada"])}</td>
              <td class="align-right"
                >+{formatCurrency(record["Intereses ganados"])}</td
              >
              <td class="align-right font-bold"
                >{formatCurrency(record["Monto total"])}</td
              >
            </tr>
          {/each}
        </tbody>
      </table>

      {#if totalPages > 1}
        <div class="pagination-wrapper">
          <Button variant="secondary" onclick={prevPage} disabled={currentPage === 1}>
            &lt;&lt; Anterior
          </Button>
          <span class="pagination-text">
            Página {currentPage} de {totalPages}
          </span>
          <Button variant="secondary"
            onclick={nextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente &gt;&gt;
          </Button>
        </div>
      {/if}
    {/if}
  </div>
</Panel>

<style>
  .history-header {
    margin-bottom: 10px;
  }

  .history-title {
    font-size: 14px;
    margin: 0;
  }

  .loading-text, .empty-text, .error-container {
    text-align: center;
    padding: 20px;
    font-weight: bold;
    font-size: 11px;
  }

  .empty-text {
    color: #666666;
    font-weight: normal;
  }

  .error-text {
    color: var(--danger);
  }

  table.retro-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    border: 1px solid #000000;
    font-size: 11px;
    background: #ffffff;
  }

  table.retro-table th,
  table.retro-table td {
    border: 1px solid #999999;
    padding: 3px 5px;
  }

  table.retro-table th {
    background-color: var(--primary-light);
    color: #000000;
    text-align: left;
    font-weight: bold;
  }

  table.retro-table tr:nth-child(even) {
    background-color: #F9F9F9;
  }

  table.retro-table tr:hover {
    background-color: #FFFFCC;
  }

  .align-right { text-align: right; }
  .align-center { text-align: center; }
  .font-bold { font-weight: bold; }

  .pagination-wrapper {
    text-align: center; 
    margin-top: 15px; 
    border-top: 1px dashed #cccccc; 
    padding-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }

  .pagination-text {
    font-weight: bold; 
    font-size: 11px;
  }
</style>
