import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePickerProps as MuiDatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale/pt-BR";
import { StyledDatePicker } from "./styles";

export interface DatePickerProps extends MuiDatePickerProps<Date> {
  value?: Date;
  defaultValue?: Date;
  label: string;
  error?: string;
  size?: "small" | "medium";
  disabled?: boolean;
  onChange?: (value: Date | null) => void;
}

export function DatePicker({ label, size = "medium", error, disabled = false, ...props }: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <StyledDatePicker
        {...props}
        label={label}
        localeText={{
          clearButtonLabel: "Limpar",
          previousMonth: "Mês anterior",
          nextMonth: "Próximo mês",
          cancelButtonLabel: "Cancelar",
          todayButtonLabel: "Hoje",
        }}
        slotProps={{
          textField: {
            size: size,
            error: disabled ? false : Boolean(error),
            helperText: error,
          },
        }}
        disabled={disabled}
      />
    </LocalizationProvider>
  );
}
