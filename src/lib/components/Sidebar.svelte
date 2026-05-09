<script>
  let { active = "simulador" } = $props();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "grid" },
    { id: "simulador", label: "Simulador", icon: "calculator" },
    { id: "reportes", label: "Reportes", icon: "bar-chart" },
  ];
</script>

<aside class="sidebar">
  <div class="logo-container">
    <div class="logo">
      <img src="/logo.png" alt="Daira Logo" class="logo-img" />
    </div>
  </div>

  <nav class="nav-menu">
    {#each menuItems as item}
      <button class="nav-item" class:active={active === item.id}>
        <span class="icon">
          {#if item.icon === "grid"}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><rect x="3" y="3" width="7" height="7"></rect><rect
                x="14"
                y="3"
                width="7"
                height="7"
              ></rect><rect x="14" y="14" width="7" height="7"></rect><rect
                x="3"
                y="14"
                width="7"
                height="7"
              ></rect></svg
            >
          {:else if item.icon === "calculator"}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><rect x="4" y="2" width="16" height="20" rx="2" ry="2"
              ></rect><line x1="8" y1="6" x2="16" y2="6"></line><line
                x1="16"
                y1="14"
                x2="16"
                y2="18"
              ></line><path d="M16 10h.01"></path><path d="M12 10h.01"
              ></path><path d="M8 10h.01"></path><path d="M12 14h.01"
              ></path><path d="M8 14h.01"></path><path d="M12 18h.01"
              ></path><path d="M8 18h.01"></path></svg
            >
          {:else if item.icon === "bar-chart"}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><line x1="18" y1="20" x2="18" y2="10"></line><line
                x1="12"
                y1="20"
                x2="12"
                y2="4"
              ></line><line x1="6" y1="20" x2="6" y2="14"></line></svg
            >
          {/if}
        </span>
        {item.label}
      </button>
    {/each}
  </nav>

  <div class="user-profile">
    <div class="user-avatar">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        ><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle
          cx="12"
          cy="7"
          r="4"
        ></circle></svg
      >
    </div>
    <span class="user-name">Nombre de usuario</span>
  </div>
</aside>

<style>
  .sidebar {
    width: 240px;
    background-color: var(--bg-color);
    border-right: 1px solid var(--panel-border);
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: sticky;
    top: 0;
  }

  .logo-container {
    padding: 32px 24px;
    margin-bottom: 20px;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .logo-img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }

  .nav-menu {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 12px;
    gap: 4px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    width: 100%;
  }

  .nav-item:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--text-main);
  }

  .nav-item.active {
    background-color: rgba(15, 98, 254, 0.1);
    color: var(--primary);
    position: relative;
  }

  .nav-item.active::before {
    content: "";
    position: absolute;
    left: 0;
    top: 20%;
    bottom: 20%;
    width: 3px;
    background-color: var(--primary);
    border-radius: 0 4px 4px 0;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
  }

  .nav-item.active .icon {
    opacity: 1;
  }

  .user-profile {
    padding: 24px;
    border-top: 1px solid var(--panel-border);
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--text-muted);
  }

  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--panel-border);
  }

  .user-name {
    font-size: 13px;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .sidebar {
      display: none;
    }
  }
</style>
