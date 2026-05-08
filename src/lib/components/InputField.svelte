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
  
  <div class="input-wrapper">
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
    margin-bottom: 8px;
  }

  .form-group label {
    display: inline-block;
    width: 160px;
    font-weight: bold;
    vertical-align: middle;
  }

  .input-wrapper {
    display: inline-block;
    vertical-align: middle;
  }

  input {
    border: 2px inset #ffffff;
    background-color: #ffffff;
    padding: 2px 4px;
    font-family: var(--font-sans);
    font-size: 11px;
    width: 120px;
    transition: all 0.2s;
  }

  input.error {
    background-color: #ffe6e6 !important;
    border-color: var(--danger) !important;
  }

  .field-error {
    color: var(--danger);
    font-size: 10px;
    margin-left: 165px;
    display: block;
  }

  .prefix, .suffix {
    font-size: 11px;
  }
</style>
