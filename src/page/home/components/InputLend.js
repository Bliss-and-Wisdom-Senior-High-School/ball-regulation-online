import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import styled from '@emotion/styled';
import React, { useState, useEffect } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "firebase/compat/firestore";
import  TextField  from "@mui/material/TextField";
import  Autocomplete  from "@mui/material/Autocomplete";
import firebase from '../../../utils/firebase';
import Button from '@mui/material/Button';

const Text = styled.h2`
    text-align: left;
`;

const Space = styled.div`
    padding: 15%
`;


const InputLend = () => {
    const [ball, setBall] = useState("volleyball");
    const [classnames, setClassnames] = useState([]);
    const [name, setName] = useState("");

    useEffect(()=>{
        firebase.firestore()
        .collection("class")
        .where("ban", "==", false)
        .get()
        .then((collectionSnapshot) => {
          const data = collectionSnapshot.docs.map(doc => {
            return doc.data();
          });
          setClassnames(data);
        
        });
      },[]);

    const handleChange = (event, newBall) => {
        setBall(newBall);
    };

    return(
        <Space>
            <Card sx = {{pl: '15%',pr: '15%',pt: '20px',pb: 5, bgcolor: '#48a999'}}>
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

            <form style={{overflow: 'hidden'}}>

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={classnames.map((classnmaes => classnmaes.name))}
                sx={{ width: 29/30}}
                inputValue={name}
                onInputChange={(event, newInputValue) => {
                    setName(newInputValue);}}
        
                renderInput={(params) => <TextField  {...params} label="class" />}
            />

            <Text>球數</Text>
            <Input type="Bigint" 
            minRows={1} label="球數" 
            defaultValue= "1" 
            inputProps={{ 'aria-label': 'description' }} 
            required = {true}/>

            <Text sx={{display:`${ball === "volleyball" ? 'none' : ' '}`}} >拍數</Text>
            <Input 
            sx={{visibility:`${ball === "volleyball" ? 'hidden': ' '}`}}
            type="Bigint" minRows={2} 
            label="球數" defaultValue= "2" 
            inputProps={{ 'aria-label': 'description' }} 
            required = {true}
            />
            <div style={{padding: '10px'}}></div>
            <Button
            type="submit"
            onClick={() => alert( name +  ball)}
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