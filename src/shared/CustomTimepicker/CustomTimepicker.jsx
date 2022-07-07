import React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Stack from "@mui/material/Stack";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import DesktopTimePicker from "@mui/lab/DesktopTimePicker";
import { alpha, styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";

const CustomTimepicker = ({ value, handleTimeChange }) => {
  const CssTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      '& [type="text"]': {
        background: "transparent",
        color: "rgb(107 114 128)",
        opacity: 0,
      },
      '& [type="text"]:focus': {
        boxShadow: "none",
        borderColor: "transparent",
      },
      "& fieldset": {
        border: "none",
      },
    },
  });

  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileTimePicker
          ampm={false}
          openTo="hours"
          views={["hours", "minutes"]}
          inputFormat="HH:mm"
          mask="__:__"
          value={value}
          onChange={(newValue) => {
            handleTimeChange(newValue);
          }}
          DialogProps={{
            PaperProps: {
              sx: { "& *:focus": { outline: "none" } },
            },
          }}
          renderInput={(params) => <CssTextField {...params} fullWidth />}
        />
      </LocalizationProvider>
    </FormControl>
  );
};
export default CustomTimepicker;
