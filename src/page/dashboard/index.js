import React from 'react'
import { useState, useEffect} from 'react';
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
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const ClassDashBoard = () => {
  const [classnames, setClassnames] = useState([]);
  const [newname,SetNewname] = useState("");
  
  useEffect(()=>{
    firebase.firestore()
    .collection("class")
    .onSnapshot((collectionSnapshot)=>{
      const data = collectionSnapshot.docs.map((docSnapshot) => {
        const id = docSnapshot.id;
        return {...docSnapshot.data(),id}
      });
      setClassnames(data);
    });
    

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

  const handleChange = (event, newname) => {
    if (newname === ""){
      return;
    }
    SetNewname(newname);
  };

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
          else if(classname.ban === false && classname.point.bad > 3) {
            firebase
            .firestore()
            .collection("class").doc(classname.id)
            .update({"ban": true, "point": {good: classname.point.good + 1, bad: classname.point.bad - 3}})
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
        <Typography>{classname.name}</Typography>
              
              <ListItem>
                <ListItemText><ThumbUpAltIcon ></ThumbUpAltIcon>{classname.point.good}</ListItemText>
                <ListItemText><ThumbDownAltIcon ></ThumbDownAltIcon>{classname.point.bad}</ListItemText>
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
                ><DeleteIcon></ DeleteIcon></Button>
                </ListItemText>
            </ListItem>
            </List>
        </ Card>)
        }
      )}
     
    </Stack>
  );

};


const DashBoard = () => {
    return (
     <>
      <Typography
      sx={{
        FontSize: '80px',
        p: '10px'
      }}
      fontSize="xx-large"
      >DashBoard</Typography>
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