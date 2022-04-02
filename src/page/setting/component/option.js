import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AddClass from './addclass';

const OptionEffect = (props) =>{
  const type = props.alignment;
  if(type === 'addclass')
    return <AddClass />;
  else if (type === 'reset')
    return (<p>reset</p>);
};


const Option = () => {
  const [alignment, setAlignment] = useState('addclass');

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
        <ToggleButton value="reset">全部重置</ToggleButton>
        <ToggleButton value="addclass">新增班級</ToggleButton>
      </ToggleButtonGroup>
      <OptionEffect alignment={alignment}/>
    </>
  );
};

export default Option;