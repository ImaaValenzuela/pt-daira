<script>
  import '../styles/SimulatorResult.css';
  import { getContext } from 'svelte';
  import { formatCurrency, formatPercent } from './utils.js';
  
  let { result, onReset } = $props();
  let themeState = getContext('theme');

  let total = $derived(result.capital_invertido + result.interes_ganado);
  let capitalPct = $derived((result.capital_invertido / total) * 100);
  let intPct = $derived((result.interes_ganado / total) * 100);
</script>

<div class="retro-panel" aria-live="polite">
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px;">
    <h2 style="margin: 0; border: none;">Liquidación de Inversión</h2>
    <button class="btn btn-secondary" onclick={onReset}>
      Nueva Consulta
    </button>
  </div>

  {#if themeState.isModern}
    <div class="modern-progress-bar">
      <div class="modern-progress-capital" style="width: {capitalPct}%"></div>
      <div class="modern-progress-interest" style="width: {intPct}%"></div>
    </div>
    <div class="modern-legend">
      <span><div class="dot" style="background: var(--primary);"></div> Capital ({capitalPct.toFixed(1)}%)</span>
      <span><div class="dot" style="background: #10B981;"></div> Intereses ({intPct.toFixed(1)}%)</span>
    </div>
  {/if}

  <div class="result-grid">
    <div class="result-row">
      <div class="result-cell label">Capital Inicial:</div>
      <div class="result-cell value">{formatCurrency(result.capital_invertido)}</div>
    </div>
    
    <div class="result-row">
      <div class="result-cell label">Plazo acordado:</div>
      <div class="result-cell value">{result.plazo_en_dias} días</div>
    </div>
    
    <div class="result-row">
      <div class="result-cell label">T.N.A.:</div>
      <div class="result-cell value">{formatPercent(result.tna)}</div>
    </div>
    
    <div class="result-row">
      <div class="result-cell label">Intereses generados:</div>
      <div class="result-cell value">+{formatCurrency(result.interes_ganado)}</div>
    </div>
  </div>
  
  <div class="result-total">
    <span class="label">Monto Total a Cobrar: </span>
    <span class="value">{formatCurrency(total)}</span>
  </div>
</div>
