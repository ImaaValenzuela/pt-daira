<script>
  import { formatCurrency, formatPercent } from "./utils.js";
  import Button from "./components/Button.svelte";
  import Panel from "./components/Panel.svelte";

  let { result, onReset } = $props();

  const vencimiento = $derived(() => {
    const d = new Date();
    d.setDate(d.getDate() + result.plazo_en_dias);
    return d.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  const total = $derived(result.capital_invertido + result.interes_ganado);
</script>

<Panel class="result-container" role="status">
  <div class="result-header">
    <h2 class="result-title">Resultado de simulación</h2>
  </div>

  <div class="stats-grid">
    <div class="stat-group">
      <div class="stat-box">
        <span class="stat-label">Intereses ganados</span>
        <span class="stat-value success"
          >+{formatCurrency(result.interes_ganado)}</span
        >
        <div class="stat-footer">
          <span class="trend-icon">↑</span>
          <span class="stat-subtext success"
            >{formatPercent(result.tna)} de rendimiento</span
          >
        </div>
      </div>

      <div class="stat-box">
        <span class="stat-label">Monto total estimado</span>
        <span class="stat-value primary">+{formatCurrency(total)}</span>
        <span class="stat-subtext primary">Al finalizar el periodo</span>
      </div>
    </div>

    <div class="details-grid">
      <div class="detail-item">
        <span class="detail-label">TEP (Tasa efectiva período)</span>
        <span class="detail-value">{formatPercent(result.tna)}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Vencimiento</span>
        <span class="detail-value">{vencimiento()}</span>
      </div>
    </div>
  </div>

  <div class="result-actions">
    <Button variant="secondary" onclick={onReset}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline
          points="7 10 12 15 17 10"
        ></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg
      >
      Descargar PDF
    </Button>
  </div>
</Panel>

<style>
  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .result-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--primary);
    margin: 0;
  }

  .icon-button {
    background: var(--panel-border);
    border: none;
    color: var(--text-main);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .icon-button:hover {
    background: var(--text-muted);
  }

  .stat-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }

  .stat-box {
    background: #0c0e14;
    padding: 16px;
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .stat-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-muted);
  }

  .stat-value {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.5px;
  }

  .stat-value.success {
    color: var(--success);
  }
  .stat-value.primary {
    color: var(--primary);
  }

  .stat-footer {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .trend-icon {
    font-size: 14px;
  }

  .stat-subtext {
    font-size: 11px;
    font-weight: 600;
  }

  .stat-subtext.success {
    color: #02b437;
  }
  .stat-subtext.primary {
    color: var(--primary);
  }

  .details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    padding: 16px 0;
    border-top: 1px solid var(--panel-border);
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .detail-label {
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 500;
  }

  .detail-value {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-main);
  }

  .result-actions {
    margin-top: 24px;
  }

  @media (max-width: 640px) {
    .stat-group {
      grid-template-columns: 1fr;
    }
  }
</style>
