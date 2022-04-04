import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import VolleyBall from "./volleyball";
import InputPoint from "./InputPoint";
import Badminton from "./badminton";
import TableTennis from "./tabletennis";
import Typography from "@mui/material/Typography";

const OptionEffect = (props) => {
  const type = props.alignment;
  if (type === "point") return <InputPoint />;
  else if (type === "badminton") return <Badminton />;
  else if (type === "volleyball") return <VolleyBall />;
  else;
  return <TableTennis />;
};

const Option = () => {
  const [alignment, setAlignment] = useState("volleyball");

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
        <ToggleButton value="point">
          <Typography>點數</Typography>
        </ToggleButton>
        <ToggleButton value="badminton">
          <Typography>羽球</Typography>
        </ToggleButton>
        <ToggleButton value="volleyball">
          <Typography>排球</Typography>
        </ToggleButton>
        <ToggleButton value="tabletennis">
          <Typography>桌球</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
      <OptionEffect alignment={alignment} />
    </>
  );
};

export default Option;
