<script>
  // Simplified banner for retro-only
  let { ...rest } = $props();
</script>

<div class="header-banner" {...rest}>
  <h1>Banco de la República Argentina</h1>
  <p>Módulo de Simulación de Inversiones a Plazo Fijo</p>
</div>

<style>
  .header-banner {
    background-color: var(--primary);
    color: #ffffff;
    padding: 10px 15px;
    border-bottom: 4px solid var(--accent);
  }

  .header-banner h1 {
    font-size: 16px;
    margin: 0;
    font-weight: bold;
  }

  .header-banner p {
    font-size: 11px;
    margin: 2px 0 0 0;
    color: #e0e0e0;
  }
</style>
