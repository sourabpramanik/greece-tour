import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { alpha, styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';

const CustomDatepicker = ({value, handleTimeChange}) => {

  const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {     
      '& [type="text"]':{
        background: 'transparent',
        color: 'rgb(107 114 128)',
        opacity: 0,
        textAlign: "center"
      },
      '& [type="text"]:focus' : {
        boxShadow: 'none',
        borderColor: 'transparent',
      },  
      '& fieldset': {
        border: 'none',           
      },     
    },
  });

  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDateFns}>        
          <MobileDatePicker            
            value={value}         
            onChange={(newValue) => {
              handleTimeChange(newValue);
            }}
            minDate={new Date('2017-01-01')}          
            renderInput={(params) => <CssTextField {...params} fullWidth/>}
          />       
      </LocalizationProvider>
    </FormControl>
  );
}
export default CustomDatepicker;