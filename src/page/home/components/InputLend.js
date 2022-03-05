import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import TextField from "@mui/material/TextField";
import styled from '@emotion/styled';
import React, { useState, useEffect } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "firebase/compat/firestore";
import  Autocomplete  from "@mui/material/Autocomplete";
import firebase from '../../../utils/firebase';
import Button from '@mui/material/Button';

const Text = styled.h2`
    text-align: left;
`;

const Space = styled.div`
    padding: 15%
`;
const min = 0;

const InputLend = () => {
    const [ball, setBall] = useState("volleyball");
    const [classnames, setClassnames] = useState([]);
    const [name, setName] = useState("");
    const [id, setId] = useState({id: "",point: 0});
    const [ballnum, setBallnum] = useState(0);
    const [racket, setRacket] = useState(0);

    useEffect(()=>{
        firebase.firestore()
        .collection("class")
        .where("ban", "==", false)
        .get()
        .then((collectionSnapshot) => {
          const data = collectionSnapshot.docs.map((docSnapshot) => {
            const id = docSnapshot.id;
            return {...docSnapshot.data(),id}
          });
          setClassnames(data);
        
        });
      }, []);

    const handleChange = (event, newBall) => {
        setBall(newBall);
    };

    return(
        <Space>
            <Card sx = {{pl: '15%',pr: '15%',pt: '20px',pb: 5, bgcolor: '#48a999'}}>
            <h1>借</h1>
            <>
            <form style={{overflow: 'hidden'}}>
            <ToggleButtonGroup
                color="primary"
                value={ball}
                exclusive
                onChange={handleChange}
                sx={{pb: '15px', fontSize: '25px'}}
            >
                <ToggleButton value="volleyball" >排球</ToggleButton>
                <ToggleButton value="tabletennis">桌球</ToggleButton>
                <ToggleButton value="badminton">羽球</ToggleButton>
            </ToggleButtonGroup>

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={classnames}
              getOptionLabel={option => option.name}
              sx={{ width: 29/30}}
              inputValue={name}
              onInputChange={(event, newInputValue) => {
                  setName(newInputValue);
                }}
                onChange={(event, newValue) => {
                  setId({id: newValue.id, point: newValue.point});
                }}  
              renderInput={(params) => <TextField  {...params} label="class" />}
            />  


            <TextField 
              margin="normal"
              InputProps={{min}}
              type="number" 
              variant="outlined"
              label="球數" 
              defaultValue= "1" 
              inputProps={{ 'aria-label': 'description'}} 
              onChange={
                (e) => {
                  setBallnum(e.target.value);
                  if(ballnum < 0){
                    setBallnum(0);
                  }
                }
              }
              required
            ></TextField>

            <TextField 
              margin="normal"
              variant="outlined"
              sx={{visibility:`${ball === "volleyball" ? 'hidden': ' '}`}}
              type="number" 
              label="拍數" 
              defaultValue= "1" 
              inputProps={{ 'aria-label': 'description'}} 
              required
              onChange={
                (e) => {
                    setRacket(e.target.value);
                    if (racket < 0){
                      setRacket(0);
                    }
                }
              }
            ></TextField>

            <Button
            type="submit"
            onClick={() => alert({ballnum},{racket} )}
            sx={{ 
                fontSize: '25px',
                color:'#ffffff',
                bgcolor: '#005b9f',
                border:'0'}}>✅上傳</Button>
        </form>
        </>
        </Card>
        </Space>
    );
};
export default InputLend;