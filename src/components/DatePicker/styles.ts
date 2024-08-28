import { Theme, styled } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DatePickerProps } from "./index";

const styles = ({ theme }: { theme: Theme }) => ({
  "& .MuiFormHelperText-root": {
    marginLeft: "0",
  },
  "& .MuiOutlinedInput-root": {
    "&:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):hover": {
      borderColor: theme.palette.grey["900"],
      "& svg": {
        fill: theme.palette.grey["900"],
      },
    },
    "&.Mui-focused": {
      "& svg": {
        fill: theme.palette.primary.main,
      },
    },
    "&.Mui-error:not(.Mui-disabled)": {
      "& svg": {
        fill: theme.palette.error.main,
      },
    },
    "&.Mui-disabled": {
      backgroundColor: theme.palette.grey["200"],
      color: theme.palette.grey["900"],
    },
  },
});

export const StyledDatePicker = styled(DatePicker<Date>)<DatePickerProps>(styles);
