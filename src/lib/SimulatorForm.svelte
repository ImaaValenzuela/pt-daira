<script>
  import { calculateInvestment } from "./api.js";
  import InputField from "./components/InputField.svelte";
  import Button from "./components/Button.svelte";
  import Panel from "./components/Panel.svelte";

  let { onResult } = $props();

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
    } finally {
      isLoading = false;
    }
  }

  /** @param {MouseEvent} e */
  async function handleSimulateError(e) {
    if (e) e.preventDefault();
    apiErrorMsg = "";
    isLoading = true;
    await new Promise((r) => setTimeout(r, 600));
    isLoading = false;
    apiErrorMsg =
      "Error 500: El servicio no se encuentra disponible temporalmente.";
  }
</script>

<Panel>
  <form onsubmit={handleSubmit} novalidate>
    <h2 class="form-title">Simulación de inversión</h2>

    <div class="form-body">
      <InputField
        id="capital"
        label="Monto ($)"
        suffix="ARS"
        placeholder="Ej 10,000.00"
        bind:value={capitalStr}
        oninput={handleCapitalInput}
        onblur={() => (touched.capital = true)}
        error={capitalError}
        touched={touched.capital}
        inputmode="numeric"
      />

      <div class="input-row">
        <InputField
          id="plazo"
          label="Plazo (días)"
          type="number"
          bind:value={plazo}
          onblur={() => (touched.plazo = true)}
          error={plazoError}
          touched={touched.plazo}
        />

        <InputField
          id="tna"
          label="Tasa de interés anual (%)"
          type="number"
          step="0.01"
          bind:value={tna}
          onblur={() => (touched.tna = true)}
          error={tnaError}
          touched={touched.tna}
        />
      </div>

      <div aria-live="polite">
        {#if apiErrorMsg}
          <div class="error-text">{apiErrorMsg}</div>
        {/if}
      </div>

      <div class="form-actions">
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading ||
            (touched.capital && !!capitalError) ||
            (touched.plazo && !!plazoError) ||
            (touched.tna && !!tnaError)}
        >
          {#if isLoading}
            Procesando...
          {:else}
            Calcular rendimiento
          {/if}
        </Button>
      </div>
    </div>
  </form>
</Panel>

<style>
  .form-title {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 24px 0;
    color: var(--text-main);
  }

  .form-body {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .input-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .error-text {
    color: var(--danger);
    font-size: 13px;
    font-weight: 600;
    background-color: rgba(250, 77, 86, 0.1);
    padding: 12px;
    border-radius: var(--radius);
    border: 1px solid var(--danger);
  }

  .form-actions {
    margin-top: 8px;
  }

  @media (max-width: 640px) {
    .input-row {
      grid-template-columns: 1fr;
    }
  }
</style>
