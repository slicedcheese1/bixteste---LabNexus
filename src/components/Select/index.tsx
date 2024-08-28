import { Autocomplete, TextField } from "@mui/material";

type SelectValueType = string | number | object;

export interface SelectProps {
  label: string;
  options: [];
  onChange?: (data: SelectValueType) => void;
  defaultValue?: SelectValueType;
  value?: SelectValueType;
  autoHighlight?: boolean;
  disabled?: boolean;
  loading?: boolean;
  multiple?: boolean;
  open?: boolean;
  readOnly?: boolean;
  size?: "small" | "medium";
  error?: string;
}
export function Select({ options, error, label, disabled, defaultValue, size = "small", ...props }: SelectProps) {
  return (
    <Autocomplete
      {...props}
      options={options}
      disabled={disabled}
      disablePortal
      size={size}
      defaultValue={defaultValue}
      fullWidth
      noOptionsText="Sem opções"
      renderInput={params => (
        <>
          <TextField {...params} disabled={disabled} error={!error === false} label={label} />
        </>
      )}
      loadingText="Carregando..."
    />
  );
}
