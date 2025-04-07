import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup({list}) {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        > 
        {list.map((items,i)=>(
            <FormControlLabel sx={{color:"gray",fontSize:'16px'}} value={items} control={<Radio />} label={items} />

        ))}
       
      </RadioGroup>
    </FormControl>
  );
}
