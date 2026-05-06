<script>
  import '../styles/SimulatorForm.css';
  import { getContext } from "svelte";
  import { calculateInvestment } from "./api.js";
  let { onResult } = $props();
  let themeState = getContext("theme");

  let capitalStr = $state("10.000");
  let capital = $derived(parseFloat(capitalStr.replace(/\./g, "")) || 0);

  let plazo = $state(30);
  let tna = $state(40);

  let isLoading = $state(false);
  let apiErrorMsg = $state("");

  let touched = $state({
    capital: false,
    plazo: false,
    tna: false,
  });

  let capitalError = $derived(
    capital < 1000 ? "El monto mínimo a invertir es de $1.000." : "",
  );
  let plazoError = $derived(plazo < 30 ? "El plazo mínimo es de 30 días." : "");
  let tnaError = $derived(
    tna > 50
      ? "La TNA máxima permitida es 50%."
      : tna <= 0
        ? "La TNA debe ser mayor a 0%."
        : "",
  );

  let isFormValid = $derived(!capitalError && !plazoError && !tnaError);

  /** @param {any} e */
  function handleCapitalInput(e) {
    touched.capital = true;
    let raw = e.target.value.replace(/\D/g, "");
    if (!raw) {
      capitalStr = "";
    } else {
      capitalStr = raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }

  /** @param {SubmitEvent} e */
  async function handleSubmit(e) {
    e.preventDefault();
    touched = { capital: true, plazo: true, tna: true };

    if (!isFormValid) {
      return;
    }

    apiErrorMsg = "";
    isLoading = true;

    try {
      const data = await calculateInvestment({
        capital_invertido: capital,
        plazo_en_dias: plazo,
        tna: tna,
      });
      onResult(data);
    } catch (err) {
      apiErrorMsg =
        (err instanceof Error ? err.message : String(err)) ||
        "Error de conexión. Intente nuevamente.";
      if (themeState.isModern) autoDismissToast();
    } finally {
      isLoading = false;
    }
  }

  /** @param {MouseEvent} e */
  async function handleSimulateError(e) {
    e.preventDefault();
    apiErrorMsg = "";
    isLoading = true;
    await new Promise((r) => setTimeout(r, 600));
    isLoading = false;
    apiErrorMsg =
      "Error 500: El servicio no se encuentra disponible temporalmente.";
    if (themeState.isModern) autoDismissToast();
  }

  function autoDismissToast() {
    setTimeout(() => {
      apiErrorMsg = "";
    }, 4000);
  }
</script>

<div class="retro-panel">
  <form onsubmit={handleSubmit} novalidate>
    <h2>Formulario de Datos</h2>

    <div class="form-group">
      <label for="capital">Monto a invertir:</label>
      <div class="input-wrapper">
        <span style="font-weight: bold;">$ </span>
        <input
          type="text"
          inputmode="numeric"
          id="capital"
          class={touched.capital && capitalError ? "error" : ""}
          value={capitalStr}
          oninput={handleCapitalInput}
          onblur={() => (touched.capital = true)}
          aria-invalid={touched.capital && capitalError ? "true" : "false"}
        />
      </div>
      {#if touched.capital && capitalError}
        <span class="field-error">{capitalError}</span>
      {/if}
    </div>

    <div class="form-group">
      <label for="plazo">Plazo de inversión:</label>
      <div class="input-wrapper">
        <input
          type="number"
          id="plazo"
          class={touched.plazo && plazoError ? "error" : ""}
          bind:value={plazo}
          oninput={() => (touched.plazo = true)}
          onblur={() => (touched.plazo = true)}
          aria-invalid={touched.plazo && plazoError ? "true" : "false"}
        />
        <span> días</span>
      </div>
      {#if touched.plazo && plazoError}
        <span class="field-error">{plazoError}</span>
      {/if}
    </div>

    <div class="form-group">
      <label for="tna" style="display: flex; align-items: center;">
        TNA Autorizada:
        {#if themeState.isModern}
          <span
            class="modern-tooltip"
            data-tooltip="Tasa Nominal Anual. Porcentaje fijado por el BCRA."
            >i</span
          >
        {/if}
      </label>
      <div class="input-wrapper">
        <input
          type="number"
          id="tna"
          class={touched.tna && tnaError ? "error" : ""}
          bind:value={tna}
          step="0.01"
          oninput={() => (touched.tna = true)}
          onblur={() => (touched.tna = true)}
          aria-invalid={touched.tna && tnaError ? "true" : "false"}
        />
        <span> %</span>
      </div>
      {#if touched.tna && tnaError}
        <span class="field-error">{tnaError}</span>
      {/if}
    </div>

    <div aria-live="polite">
      {#if apiErrorMsg}
        {#if themeState.isModern}
          <div class="modern-toast">
            <svg
              style="width: 24px; height: 24px; color: var(--danger);"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path></svg
            >
            <span style="font-weight: 500; color: #1F2937;">{apiErrorMsg}</span>
          </div>
        {:else}
          <div class="error-text" style="margin-top: 10px;">{apiErrorMsg}</div>
        {/if}
      {/if}
    </div>

    <div
      style="margin-top: 15px; border-top: 1px solid #ccc; padding-top: 20px;"
    >
      <button
        type="submit"
        class="btn btn-primary"
        disabled={isLoading ||
          (touched.capital && !!capitalError) ||
          (touched.plazo && !!plazoError) ||
          (touched.tna && !!tnaError)}
      >
        {#if isLoading}
          Procesando...
        {:else}
          Calcular Inversión
        {/if}
      </button>

      <div style="text-align: center; margin-top: 10px;">
        <button
          type="button"
          class="btn btn-test"
          onclick={handleSimulateError}
          disabled={isLoading}
        >
          Simular Error
        </button>
      </div>
    </div>
  </form>
</div>
