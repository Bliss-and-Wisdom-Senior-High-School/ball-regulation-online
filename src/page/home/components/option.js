import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import InputPoint from './InputPoint';
import InputReturn from'./INputReturn';
import InputLend from './InputLend';

const OptionEffect = (props) =>{
  const type = props.alignment;
  if(type === 'point')
    return <InputPoint />;
  else if (type === 'return')
    return <InputReturn />;
  else;
    return <InputLend />;
};


const Option = () => {
  const [alignment, setAlignment] = useState('lend');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  
  return (
    <>
      <ToggleButtonGroup
      color="info"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
        <ToggleButton value="point">point</ToggleButton>
        <ToggleButton value="lend">lend</ToggleButton>
        <ToggleButton value="return">return</ToggleButton>
      </ToggleButtonGroup>
      <OptionEffect alignment={alignment}/>
    </>
  );
};

export default Option;