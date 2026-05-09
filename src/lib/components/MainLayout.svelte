<script>
  import Sidebar from "./Sidebar.svelte";
  let { children } = $props();
</script>

<div class="layout">
  <Sidebar />
  <main class="content">
    <div class="container">
      {@render children()}
    </div>
  </main>
</div>

<style>
  .layout {
    display: flex;
    min-height: 100vh;
    background-color: var(--bg-color);
  }

  .content {
    flex: 1;
    padding: 40px;
    overflow-y: auto;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .content {
      padding: 20px;
    }
  }
</style>
