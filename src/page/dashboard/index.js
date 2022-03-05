import React from 'react'
import { useState, useEffect, Fragment } from 'react';
import 'firebase/compat/firestore';
import firebase from '../../utils/firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';

const ClassDashBoard = () => {
  const [classnames, setClassnames] = useState([]);
  const [newname,SetNewname] = useState("");
  
  useEffect(()=>{
    firebase.firestore()
    .collection("class")
    //.orderBy("point", 'desc')
    .onSnapshot((collectionSnapshot)=>{
      const data = collectionSnapshot.docs.map((docSnapshot) => {
        const id = docSnapshot.id;
        return {...docSnapshot.data(),id}
      });
      setClassnames(data);
    });
    
    const handleChange = (event, newname) => {
      SetNewname(newname);
  };


    /*
    .get()
    .then((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((docSnapshot) => {
        const id = docSnapshot.id;
        return {...docSnapshot.data(),id}
      });
      setClassnames(data);
    
    });
    */
  },[]);


  return(
    <Stack spacing={2} sx={{p:'14%'}}>
      {classnames.map((classname) => {
        let color1 = "#48a999";
        if (classname.ban === true){
          color1 = "#f44336"
        }

        function togglebaned (){
          if (classname.ban === true){
            firebase
            .firestore()
            .collection("class")
            .doc(classname.id)
            .update({"ban": false}
            )
          }
          else if(classname.ban === false) {
            firebase
            .firestore()
            .collection("class").doc(classname.id)
            .update({"ban": true, "point": 0})
          } 
        }
          
        function toggledelete (){
            firebase
            .firestore()
            .collection("class")
            .doc(classname.id)
            .delete()
        }
        
        return(
          <Card key={classname.id} sx={{pl: '8%',pr: '8%',pt: 1,pb: 3, bgcolor:  color1 }} >
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: color1 ,textAlign: 'left'} }>
              <h2>{classname.name}</h2>
              <ListItem sx={{alignItems: 'center'}}>
                <ListItemIcon><ThumbUpAltIcon ></ThumbUpAltIcon></ListItemIcon>
                <ListItemText>{classname.point}</ListItemText>
              </ListItem>

              <ListItem sx={{pt: 1, pb: 1}}>
                <ListItemText><h3>排球</h3></ListItemText>
                <ListItemText>球數</ListItemText><ListItemText>{classname.volleyball.ball}</ListItemText>
              </ListItem>

              <ListItem sx={{pt: 1, pb: 1}}>
                  <ListItemText><h3>羽球</h3></ListItemText>
                  <ListItemText>
                    <List>
                      <ListItem><ListItemText>球數</ListItemText><ListItemText>{classname.badminton.ball}</ListItemText></ListItem>
                      <ListItem><ListItemText>球拍</ListItemText><ListItemText>{classname.badminton.racket}</ListItemText></ListItem>
                    </List>
                  </ListItemText>
              </ListItem>

              <ListItem >
                  <ListItemText><h3>桌球</h3></ListItemText>
                  <ListItemText>
                    <List>
                      <ListItem><ListItemText>球數</ListItemText><ListItemText>{classname.tabletennis.ball}</ListItemText></ListItem>
                      <ListItem><ListItemText>球拍</ListItemText><ListItemText>{classname.tabletennis.racket}</ListItemText></ListItem>
                    </List>
                  </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Button 
                sx = {{alignItems: 'left', bgcolor: '#ce93d8'}}
                onClick={togglebaned}
                >
                  <BlockIcon></BlockIcon>
                </Button>
                </ListItemText>
                <ListItemText>
                  <Button 
                sx = {{alignItems: 'left', bgcolor: '#d32f2f'}}
                onClick={toggledelete}
                ><DeleteIcon></ DeleteIcon></Button></ListItemText>
            </ListItem>
            </List>
          </ Card>
      )})}
      <Card sx={{alignContent: 'center', bgcolor: '#ff7043', p:'10px'}}>
        <form>
        <TextField  
          variant="outlined"
          label="classname"
          type="text"
          margin="normal"
          onChange={
            (e) => {
              SetNewname(e.target.value);
            }
          }
          requried
          ></TextField>
          <p>{newname}</p>
        <br></br>
        <Button 
          sx ={{ bgcolor: '#ffa270'}}
          type="submit"
          onClick={
            firebase
            .firestore()
            .collection("class")
            .doc()
            .set({
              "name": newname,
              "point": 0,
              "ban" :false,
              "volleyball": {
                "ball" :0
              },
              "tabletennis": {
                "ball": 0,
                "racket": 0
              },
              "badminton": {
                "ball": 0,
                "racket": 0
              }
            }
            )
          }
          >add</Button>
        </form>
      </Card>
    </Stack>
  );

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