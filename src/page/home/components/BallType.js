import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import styled from "@emotion/styled";

import InputClass from "./InputClass";
//import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';


const Text = styled.h2`
    text-align: left;
`;

//volleyball
//tabletennis
//badminton
const OptionEffect = (props) => {
    const ball = props.ball;
    if(ball === 'volleyball'){
        return(<>
        <form>
            <InputClass />
            <Text>球數</Text>
            <TextField type="number" minRows={1} label="球數" defaultValue= "1" inputProps={{ 'aria-label': 'description' }} required = {true}></TextField>
        </form>
        
        </>);
    }
    return(
    <>
        <form style={{overflow: 'hidden'}}>
            <InputClass />
            <Text>球數</Text>
            <TextField type="number" minRows={1} label="球數" defaultValue= "1" inputProps={{ 'aria-label': 'description' }} required = {true}></TextField>
            <Text>拍數</Text>
            <TextField type="number" minRows={2} label="球數" defaultValue= "2" inputProps={{ 'aria-label': 'description' }} required = {true}></TextField>
        </form>
    </>);
};

const BallType =  ()  => {
    const [ball, setBall] = useState('volleyball');
    const handleChange = (event, newBall) => {
        setBall(newBall);
    };



    return(
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
    )

};

export default BallType;