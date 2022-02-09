import Card from '@mui/material/Card';
import IconButton  from '@mui/material/IconButton';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useState } from 'react';
import styled from '@emotion/styled';
import InputClass from './InputClass';

const Space = styled.div`
    padding: 15%
`;



const InputPoint = () =>{
    const [point, setpoint] = useState('');

    return(
    <Space>
        <Card sx={{pl: '15%',pr: '15%',pt: '20px',pb: '30%', bgcolor: '#48a999'}} >
        <h1>點數</h1>
            <form>
            <InputClass />
            <IconButton 
                aria-label="ThumbUpAlt" 
                onClick={() => setpoint("good")}
                ><ThumbUpAltIcon
                    fontSize="large"
                    style={{
                        color: `${point === "good" ? '#ff7043' : '#546e7a'}`,
                }}/>
            </IconButton>
            <IconButton 
                aria-label="ThumbDownAlt" 
                onClick = {() => setpoint("bad")}
                ><ThumbDownAltIcon 
                    fontSize="large"
                    style={{
                        color: `${point === "bad" ? '#ff7043' : '#546e7a'}`
                }}/>
            </IconButton>
            <div style={{padding: '10px'}}></div>
            <br></br>
            <input 
            type="submit"
            value="✅ record"
            style={{ 
                fontSize: '25px',
                color:'#ffffff',
                backgroundColor: '#005b9f',
                paddingTop: '10px',
                paddingRight: '16px',
                paddingLeft: '16px',
                paddingBottom: '10px',
                borderRadius: '8px',
                border:'0'}}></input>
            </form>
        </Card>
    </Space>
    
    );
};

export default InputPoint;
