<script>
  // Simplified loader for retro-only
  let { ...rest } = $props();
</script>

<div class="loader-overlay" {...rest}>
  <div class="loader-box">
    <div class="loader-title">Conectando...</div>
    
    <div class="loader-text">
      Estableciendo conexión segura con el servidor...
    </div>
    
    <div class="loader-bar">
      <div class="loader-progress"></div>
    </div>
  </div>
</div>

<style>
  .loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #C0C0C0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .loader-box {
    background: #E0E0E0;
    border: 2px outset #ffffff;
    width: 320px;
    padding: 15px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }

  .loader-title {
    background: var(--primary);
    color: white;
    padding: 3px 5px;
    font-weight: bold;
    font-size: 11px;
    margin: -13px -13px 15px -13px;
  }

  .loader-text {
    font-size: 11px;
  }

  .loader-bar {
    border: 2px inset #ffffff;
    background: white;
    height: 18px;
    width: 100%;
    margin-top: 10px;
    position: relative;
    padding: 1px;
  }

  .loader-progress {
    background: var(--primary);
    height: 100%;
    width: 0%;
    animation: progress 2.5s cubic-bezier(0.1, 0.7, 1.0, 0.1) forwards;
  }

  @keyframes progress {
    0% { width: 0%; }
    30% { width: 30%; }
    50% { width: 40%; }
    100% { width: 100%; }
  }
</style>
