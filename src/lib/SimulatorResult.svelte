<script>
  import { formatCurrency, formatPercent } from './utils.js';
  import Button from './components/Button.svelte';
  import Panel from './components/Panel.svelte';
  
  let { result, onReset } = $props();

  let total = $derived(result.capital_invertido + result.interes_ganado);
</script>

<Panel class="result-container" role="status">
  <header class="result-header">
    <h2 class="result-title">Liquidación de Inversión</h2>
    <Button variant="secondary" onclick={onReset}>
      Nueva Consulta
    </Button>
  </header>

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
</Panel>

<style>
  .result-header {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    border-bottom: 1px solid #999; 
    padding-bottom: 5px; 
    margin-bottom: 15px;
  }

  .result-title {
    margin: 0; 
    border: none;
    font-size: 14px;
  }

  .result-grid {
    display: table;
    width: 100%;
    border: 1px solid #cccccc;
    background: #ffffff;
  }

  .result-row {
    display: table-row;
  }

  .result-cell {
    display: table-cell;
    padding: 4px 8px;
    border-bottom: 1px solid #eeeeee;
    font-size: 11px;
  }

  .result-cell.label {
    font-weight: bold;
    background-color: #f0f0f0;
    width: 40%;
    border-right: 1px solid #cccccc;
  }

  .result-cell.value {
    text-align: right;
    color: #000000;
  }

  .result-total {
    background-color: #FFFFCC;
    border: 1px solid #FFCC00;
    padding: 8px;
    margin-top: 10px;
    text-align: center;
  }

  .result-total .label {
    font-weight: bold;
    font-size: 11px;
  }

  .result-total .value {
    color: var(--danger);
    font-size: 14px;
    font-weight: bold;
  }
</style>
