import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
 function RadioButtonsGroup({list}) {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        > 
        {list.map((items,i)=>(
            <FormControlLabel key={i+1-1} sx={{color:"gray",fontSize:'16px'}} value={items} control={<Radio />} label={items} />

        ))}
       
      </RadioGroup>
    </FormControl>
  );
}

RadioButtonsGroup.propTypes={
  list:PropTypes.any,
}

export default RadioButtonsGroup;

