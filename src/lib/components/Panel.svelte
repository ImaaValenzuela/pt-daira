<script>
  let { children, class: className = "", ...rest } = $props();
</script>

<div class="panel {className}" {...rest}>
  {@render children()}
</div>

<style>
  .panel {
    background-color: #d4d0c8;
    border: 2px outset #ffffff;
    padding: 15px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  }
</style>
