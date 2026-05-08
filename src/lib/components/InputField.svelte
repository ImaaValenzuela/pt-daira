<script>
  /**
   * @type {{
   *  id: string,
   *  label: string,
   *  value?: any,
   *  type?: string,
   *  inputmode?: "decimal" | "text" | "search" | "none" | "tel" | "url" | "email" | "numeric",
   *  error?: string,
   *  touched?: boolean,
   *  prefix?: string,
   *  suffix?: string,
   *  oninput?: any,
   *  onblur?: () => void,
   *  step?: string,
   *  [key: string]: any
   * }}
   */
  let { 
    id, 
    label, 
    value = $bindable(), 
    type = "text", 
    inputmode = "text",
    error = "",
    touched = false,
    prefix = "",
    suffix = "",
    oninput = undefined,
    onblur = undefined,
    step = "1",
    ...rest
  } = $props();
</script>

<div class="form-group">
  <label for={id}>
    {label}
  </label>
  
  <div class="input-wrapper" class:error={touched && error}>
    {#if prefix}
      <span class="prefix">{prefix}</span>
    {/if}
    
    <input
      {id}
      {type}
      {inputmode}
      {step}
      class:error={touched && error}
      bind:value
      {oninput}
      onblur={() => {
        if (onblur) onblur();
      }}
      aria-invalid={touched && error ? "true" : "false"}
      {...rest}
    />
    
    {#if suffix}
      <span class="suffix">{suffix}</span>
    {/if}
  </div>
  
  {#if touched && error}
    <span class="field-error">{error}</span>
  {/if}
</div>

<style>
  .form-group {
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .form-group label {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-muted);
    width: auto;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    background-color: #0c0e14;
    border: 1px solid var(--panel-border);
    border-radius: var(--radius);
    padding: 0 16px;
    transition: all 0.2s ease;
    width: 100%;
    box-sizing: border-box;
  }

  .input-wrapper:focus-within {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(15, 98, 254, 0.2);
  }

  input {
    background: transparent;
    border: none;
    color: var(--text-main);
    padding: 12px 0;
    font-family: var(--font-sans);
    font-size: 14px;
    width: 100%;
    outline: none;
  }

  input.error {
    background-color: transparent !important;
  }

  .input-wrapper.error {
    border-color: var(--danger);
  }

  .field-error {
    color: var(--danger);
    font-size: 12px;
    margin-left: 0;
    margin-top: 4px;
    display: block;
  }

  .prefix, .suffix {
    color: var(--text-muted);
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
  }

  .prefix { margin-right: 12px; }
  .suffix { margin-left: 12px; }
</style>
