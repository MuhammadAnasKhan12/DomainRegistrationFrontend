import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import "./index.css"
export default function ControlledCheckbox({label,onCheckboxChange}) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    onCheckboxChange(event.target.checked)
  };

  return (
    <div  className={"CheckBox"}>
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    {label}
    
    </div>
  );
}
