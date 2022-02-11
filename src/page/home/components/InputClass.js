import { useState, useEffect} from 'react';
import 'firebase/compat/firestore';
import  TextField  from "@mui/material/TextField";
import  Autocomplete  from "@mui/material/Autocomplete";
import firebase from '../../../utils/firebase';


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

export default InputClass;

/*
{classname.map(classname => {
      return(
        <li Key="{classname.name}" >
        {classname.name}
        </li>
      )
    })}





*/
  /* class name in B&W
  const classname = [
    { name: '高三忠', year: 1994 },
    { name: '高三孝', year: 1972 },
    { name: '高二忠', year: 1974 },
    { name: '高二孝', year: 2008 },
    { name: '高一忠', year: 1957 },
    { name: '高一孝', year: 1993 },
    { name: '國三忠', year: 1994 },
    { name: '國三孝', year: 2003},
    { name: '國二忠', year: 1966 },
    { name: '國二孝', year: 1999 },
    { name: '國一忠', year: 2001},
    { name: '國一孝', year: 1980},
  ];*/