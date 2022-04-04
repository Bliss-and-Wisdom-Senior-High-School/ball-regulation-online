import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "firebase/firestore";
import Autocomplete from "@mui/material/Autocomplete";
import firebase from "../../../utils/firebase";
import Button from "@mui/material/Button";

const Space = styled.div`
  padding: 15%;
`;
const min = 0;

const InputLend = () => {
  const [ball, setBall] = useState("volleyball");
  const [classnames, setClassnames] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState({ id: "", point: 0 });
  const [ballnum, setBallnum] = useState(0);
  const [racket, setRacket] = useState(0);

  useEffect(() => {
    firebase
      .firestore()
      .collection("class")
      .where("ban", "==", false)
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setClassnames(data);
      });
  }, []);

  const handleChange = (event, newBall) => {
    setBall(newBall);
  };

  const lendball = (event) => {
    event.preventDefault();

    console.log(`${id.id} ${ball} ${ballnum}  ${racket}`);

    if (ball === "volleyball") {
      firebase.firestore
        .collection("class")
        .doc(id.id)
        .update({
          volleyball: {
            ball: firebase.firestore.FieldValue.increment(ballnum),
          },
        });
    } else if (ball === "tabletennis") {
      firebase.firestore
        .collection("class")
        .doc(id.id)
        .update({
          tabletennis: {
            ball: firebase.firestore.FieldValue.increment(ballnum),
            racket: firebase.firestore.FieldValue.increment(racket),
          },
        });
    } else if (ball === "badminton") {
      firebase.firestore
        .collection("class")
        .doc(id.id)
        .update({
          badminton: {
            ball: firebase.firestore.FieldValue.increment(ballnum),
            racket: firebase.firestore.FieldValue.increment(racket),
          },
        });
    }


  };

  return (
    <Space>
      <Card
        sx={{ pl: "15%", pr: "15%", pt: "20px", pb: 5, bgcolor: "#fafafa" }}
      >
        <h1>借</h1>
        <>
          <form 
            style={{}}
            onSubmit={lendball}
            >
            <ToggleButtonGroup
              color="primary"
              value={ball}
              exclusive
              onChange={handleChange}
              sx={{ pb: "15px", fontSize: "25px" }}
            >
              <ToggleButton value="volleyball">排球</ToggleButton>
              <ToggleButton value="tabletennis">桌球</ToggleButton>
              <ToggleButton value="badminton">羽球</ToggleButton>
            </ToggleButtonGroup>

            <Autocomplete
              required
              disablePortal
              id="combo-box-demo"
              options={classnames}
              getOptionLabel={(option) => option.name}
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

            <TextField
              margin="normal"
              type="number"
              variant="outlined"
              label="球數"
              defaultValue="1"
              inputProps={{ "aria-label": "description", min }}
              onChange={(e) => {
                setBallnum(e.target.value);
              }}
              required
            ></TextField>

            <TextField
              margin="normal"
              variant="outlined"
              sx={{ visibility: `${ball === "volleyball" ? "hidden" : " "}` }}
              type="number"
              label="拍數"
              defaultValue="1"
              inputProps={{ "aria-label": "description", min }}
              required
              onChange={(e) => {
                setRacket(e.target.value);
              }}
            ></TextField>

            <Button
              type="submit"
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
        </>
      </Card>
    </Space>
  );
};
export default InputLend;
