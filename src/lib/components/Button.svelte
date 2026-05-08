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

<button 
  {type} 
  class="btn btn-{variant}" 
  {disabled} 
  {onclick}
  {style}
  {...rest}
>
  {@render children()}
</button>

<style>
  .btn {
    padding: 3px 10px;
    font-family: var(--font-sans);
    font-size: 11px;
    cursor: pointer;
    background-color: #D4D0C8;
    border: 2px outset #ffffff;
    color: #000000;
  }

  .btn-primary {
    background-color: var(--primary);
    color: white;
    font-weight: bold;
    border-color: #6699cc #001133 #001133 #6699cc;
  }

  .btn-primary:active:not(:disabled) {
    border-style: inset;
  }

  .btn-secondary {
    background-color: #e0e0e0;
  }

  .btn-test {
    background-color: transparent;
    border: 1px solid #999;
    color: #666;
    font-size: 10px;
  }

  .btn:active:not(:disabled) {
    border-style: inset;
  }

  .btn:disabled {
    color: #888888;
    border-color: #cccccc;
    background-color: #D4D0C8;
    cursor: default;
    opacity: 0.6;
  }
</style>
