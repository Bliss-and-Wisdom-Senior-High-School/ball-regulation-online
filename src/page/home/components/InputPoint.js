import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import "firebase/firestore";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import firebase from "../../../utils/firebase";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Space = styled.div`
  padding: 15%;
`;

const InputPoint = () => {
  const [classnames, setClassnames] = useState([]);
  const [name, setName] = useState("");
  const [point, setpoint] = useState(0);
  const [id, setId] = useState({ id: "", point: {} });

  useEffect(() => {
    firebase
      .firestore()
      .collection("class")
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setClassnames(data);
      });
  }, []);

  const handlechange = (event) => {
    setpoint(event.target.value);
  }

  const addGoodPoint = (event) => {
    event.preventDefault();

    console.log(`${id.id} ${point} ${id.point.good} ${id.point.bad}`);

    if (point === 1) {
      firebase
        .firestore()
        .collection("class")
        .doc(id.id)
        .update({
          point: {
            good: firebase.firestore.FieldValue.increment(1),
            bad: id.point.bad,
          },
        });
    } else if (point === -1) {
      firebase
        .firestore()
        .collection("class")
        .doc(id.id)
        .update({
          point: {
            good: id.point.good,
            bad: id.point.bad + 1,
          },
        });
    }
  };

  return (
    <Space>
      <Card
        sx={{ pl: "15%", pr: "15%", pt: "20px", pb: 10, bgcolor: "#fafafa" }}
      >
        <h1>點數</h1>
        <form onSubmit={addGoodPoint}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={classnames}
            getOptionLabel={(option) => option.name}
            sx={{ width: 29 / 30 }}
            inputValue={name}
            onInputChange={(event, newInputValue) => {
              setName(newInputValue);
            }}
            onChange={(event, newValue) => {
              setId({ id: newValue.id, point: newValue.point });
            }}
            renderInput={(params) => (
              <TextField {...params} label="class" required />
            )}
          />
          <div style={{ padding: "10px" }}></div>
          <RadioGroup
            row
          >
            <FormControlLabel value="1" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 30,},}} />} label={<ThumbUpAltIcon fontSize="large"></ThumbUpAltIcon>} />
            <FormControlLabel value="-1" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 30,},}} />} label={<ThumbDownAltIcon fontSize="large"></ThumbDownAltIcon>} />
          </RadioGroup>
          
          <div style={{ padding: "10px" }}></div>
          <Button
            sx={{
              fontSize: "25px",
              color: "#ffffff",
              bgcolor: "#005b9f",
              border: "0",
            }}
          >
            ✅上傳
          </Button>
        </form>
      </Card>
    </Space>
  );
};

export default InputPoint;
