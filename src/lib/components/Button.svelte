<script>
  /**
   * @type {{
   *  type?: "button" | "submit" | "reset",
   *  variant?: string,
   *  disabled?: boolean,
   *  onclick?: (e: MouseEvent) => void,
   *  children: import('svelte').Snippet,
   *  style?: string,
   *  [key: string]: any
   * }}
   */
  let {
    type = "button",
    variant = "primary",
    disabled = false,
    onclick = undefined,
    children,
    style = "",
    ...rest
  } = $props();
</script>

<button {type} class="btn btn-{variant}" {disabled} {onclick} {style} {...rest}>
  {@render children()}
</button>

<style>
  .btn {
    padding: 12px 24px;
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border-radius: var(--radius);
    border: 1px solid transparent;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
  }

  .btn-primary {
    background-color: var(--primary);
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: #0353e9;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(15, 98, 254, 0.3);
  }

  .btn-secondary {
    background-color: var(--panel-border);
    color: var(--text-main);
    border-color: var(--panel-border);
  }

  .btn-secondary:hover:not(:disabled) {
    background-color: var(--text-muted);
    color: white;
  }

  .btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .btn:disabled {
    color: var(--text-muted);
    background-color: #1d2029;
    border-color: var(--panel-border);
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
