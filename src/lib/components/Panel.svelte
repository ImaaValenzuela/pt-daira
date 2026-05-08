<script>
  let { children, class: className = "", ...rest } = $props();
</script>

<div class="panel {className}" {...rest}>
  {@render children()}
</div>

<style>
  .panel {
    background-color: var(--panel-bg);
    border: 1px solid var(--panel-border);
    border-radius: var(--radius);
    padding: 24px;
    transition: transform 0.2s ease;
  }
</style>
