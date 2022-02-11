import React from 'react'
import { useState, useEffect, Fragment } from 'react';
import 'firebase/compat/firestore';
import firebase from '../../utils/firebase';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import ListItemText from '@mui/material/ListItemText';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';


const ClassDashBoard = () => {
  const [classnames, setClassnames] = useState([]);
  useEffect(()=>{
    firebase.firestore().
    collection("class")
    .get()
    .then((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((docSnapshot) => {
        const id = docSnapshot.id;
        return {...docSnapshot.data(),id}
      });
      setClassnames(data);
    
    });
  },[]);

  return(
    <Stack spacing={2} sx={{p:'14%'}}>
      {classnames.map((classname) => {
        return(
          <Card key={classname.id} sx={{pl: '8%',pr: '8%',pt: '20px',pb: '40px', bgcolor: '#48a999'}}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#48a999',textAlign: 'left'} }>
              <h2>{classname.name}</h2>
              <ListItem sx={{alignItems: 'center'}}>
                <ListItemIcon><ThumbUpAltIcon ></ThumbUpAltIcon></ListItemIcon>
                <ListItemText>{classname.point}</ListItemText>
              </ListItem>

              <ListItem>
                <ListItemText><h3>排球</h3></ListItemText>
                <ListItemText>球數</ListItemText><ListItemText>{classname.volleyball.ball}</ListItemText>
              </ListItem>

              <ListItem>
                  <ListItemText><h3>羽球</h3></ListItemText>
                  <ListItemText>
                    <List>
                      <ListItem><ListItemText>球數</ListItemText><ListItemText>{classname.badminton.ball}</ListItemText></ListItem>
                      <ListItem><ListItemText>球拍</ListItemText><ListItemText>{classname.badminton.racket}</ListItemText></ListItem>
                    </List>
                  </ListItemText>
              </ListItem>

              <ListItem>
                  <ListItemText><h3>桌球</h3></ListItemText>
                  <ListItemText>
                    <List>
                      <ListItem><ListItemText>球數</ListItemText><ListItemText>{classname.tabletennis.ball}</ListItemText></ListItem>
                      <ListItem><ListItemText>球拍</ListItemText><ListItemText>{classname.tabletennis.racket}</ListItemText></ListItem>
                    </List>
                  </ListItemText>
              </ListItem>
            </List>
          </Card>
      )})}
    </Stack>
  )

};


const DashBoard = () => {
    return (
     <>
      <h1>dashboard</h1>
      <ClassDashBoard />
     </>
    );
  };
  export default DashBoard;




  /*
  <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={classnames.map((classnmaes => classnmaes.name))}
      sx={{ width: 9/10}}
      renderInput={(params) => <TextField  {...params} label="class" />}
    />
  */
 /*
  <p>{"班級: "+classname.name}</p>
            <p>{"排球: "+classname.volleyball.ball}</p>
            <p>{"good point: "+classname.good}</p>
            <p>{"bad point"+classname.bad}</p>
            <p></p>
  */