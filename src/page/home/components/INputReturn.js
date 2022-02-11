import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import styled from '@emotion/styled';
import React, { useState, useEffect } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import 'firebase/compat/firestore';
import  TextField  from "@mui/material/TextField";
import  Autocomplete  from "@mui/material/Autocomplete";
import firebase from '../../../utils/firebase';

const Text = styled.h2`
    text-align: left;
`;

const Space = styled.div`
    padding: 15%
`;

const OptionEffect = (props) => {
    const ball = props.ball;
    if(ball === 'volleyball'){
        return(<>
        <form>
            <InputClass />
            <Text>球數</Text>
            <Input type="Bigint" minRows={1} label="球數" defaultValue= "1" inputProps={{ 'aria-label': 'description' }} required = {true}/>
        </form>
        
        </>);
    }
    return(
    <>
        <form style={{overflow: 'hidden'}}>
            <InputClass />
            <Text>球數</Text>
            <Input type="Bigint" minRows={1} label="球數" defaultValue= "1" inputProps={{ 'aria-label': 'description' }} required = {true}/>
            <Text>拍數</Text>
            <Input type="Bigint" minRows={2} label="球數" defaultValue= "2" inputProps={{ 'aria-label': 'description' }} required = {true}/>
        </form>
    </>);
};

const InputClass = () =>{
    const [classnames, setClassnames] = useState([]);
    const [name, setName] = useState("");
    
    useEffect(()=>{
      firebase.firestore().
      collection("class")
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map(doc => {
          return doc.data();
        });
        setClassnames(data);
      
      });
    },[]);
  
    return(
      <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={classnames.map((classnmaes => classnmaes.name))}
        sx={{ width: 9/10}}
        inputValue={name}
        onInputChange={(event, newInputValue) => {
            setName(newInputValue);}}
  
        renderInput={(params) => <TextField  {...params} label="class" />}
      />
      </>   
    )
  };

const InputLend = () => {
    const [ball, setBall] = useState("volleyball");
    const handleChange = (event, newBall) => {
        setBall(newBall);
    };

    return(
        <Space>
            <Card sx = {{pl: '15%',pr: '15%',pt: '20px',pb: '30%', bgcolor: '#48a999'}}>
            <h1>借</h1>
            <>
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
            <OptionEffect ball={ball}/>
        </>
        </Card>
        </Space>
    );
};
export default InputLend;