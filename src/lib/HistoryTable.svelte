<script>
  import '../styles/HistoryTable.css';
  import { onMount, getContext } from "svelte";
  import { formatCurrency, formatPercent } from "./utils.js";
  import { fetchHistory as apiFetchHistory } from "./api.js";

  let themeState = getContext("theme");
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

<div class="retro-panel">
  <div style="margin-bottom: 10px;">
    <h2>Archivo Histórico de Operaciones</h2>
  </div>

  <div aria-live="polite">
    {#if isLoading}
      {#if themeState.isModern}
        <table class="retro-table" style="margin-top: 0;">
          <tbody>
            {#each Array(5) as _}
              <tr>
                <td class="skeleton-cell"
                  ><div class="skeleton-row" style="width: 80%;"></div></td
                >
                <td class="skeleton-cell"
                  ><div class="skeleton-row" style="width: 50%;"></div></td
                >
                <td class="skeleton-cell"
                  ><div class="skeleton-row" style="width: 60%;"></div></td
                >
                <td class="skeleton-cell"
                  ><div class="skeleton-row" style="width: 90%;"></div></td
                >
              </tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <div style="text-align: center; font-weight: bold; padding: 20px;">
          Cargando registros... aguarde.
        </div>
      {/if}
    {:else if errorMsg}
      <div style="text-align: center; padding: 20px;">
        <span class="error-text">{errorMsg}</span><br /><br />
        <button class="btn" onclick={fetchHistory}>Reintentar conexión</button>
      </div>
    {:else if records.length === 0}
      <div style="text-align: center; padding: 20px; color: #666666;">
        No hay registros disponibles en la base de datos.
      </div>
    {:else}
      <table class="retro-table" border="1">
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
              <td align="right">{formatCurrency(record["Capital"])}</td>
              <td align="center">{record["Plazo en días"]} días</td>
              <td align="center">{formatPercent(record["TNA aplicada"])}</td>
              <td align="right"
                >+{formatCurrency(record["Intereses ganados"])}</td
              >
              <td align="right" style="font-weight: bold;"
                >{formatCurrency(record["Monto total"])}</td
              >
            </tr>
          {/each}
        </tbody>
      </table>

      {#if totalPages > 1}
        <div
          class="pagination-wrapper"
          style="text-align: center; margin-top: 15px; border-top: 1px dashed #cccccc; padding-top: 10px;"
        >
          <button class="btn" onclick={prevPage} disabled={currentPage === 1}>
            &lt;&lt; Anterior
          </button>
          <span
            class="pagination-text"
            style="margin: 0 15px; font-weight: bold; font-size: 11px;"
          >
            Página {currentPage} de {totalPages}
          </span>
          <button
            class="btn"
            onclick={nextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente &gt;&gt;
          </button>
        </div>
      {/if}
    {/if}
  </div>
</div>
