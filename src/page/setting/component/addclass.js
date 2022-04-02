import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import firebase from "../../../utils/firebase";
import "firebase/firestore";

const AddClass = () => {
  const [name, setName] = useState("");

  const addclasstodb = (event) => {
    event.preventDefault();

    firebase
      .firestore()
      .collection("class")
      .add({
        name: name,
        ban: false,
        point: {
          good: 0,
          bad: 0,
        },
        badminton: {
          ball: 0,
          racket: 0,
        },
        volleyball: {
          ball: 0,
          racket: 0,
        },
        tabletennis: {
          ball: 0,
          racket: 0,
        },
      });
    setName("");
    /*
          const updateInput = e => {
            setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            })
        }
        const handleSubmit = event => {
            event.preventDefault()
            sendEmail()
            setFormData({
            name: '',
            email: '',
            message: '',
            })
        }
        const sendEmail = () => {
                db.collection('emails').add({
                name: formData.name,
                email: formData.email,
                message: formData.message,
                time: new Date(),
                })
            })
            .catch(error => {
                console.log(error)
            })
        }
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        */
  };

  return (
    <Stack sx={{ p: "14%" }}>
      <Card
        sx={{ pl: "15%", pr: "15%", pt: "20px", pb: 5, bgcolor: "#fafafa" }}
      >
        <h1>新增班級</h1>
        <form onSubmit={addclasstodb}>
          <TextField
            margin="normal"
            type="text"
            variant="outlined"
            label="NAME"
            inputProps={{ "aria-label": "description" }}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          ></TextField>
          <h1></h1>
          <Button
            type="submit"
            sx={{
              fontSize: "25px",
              color: "#ffffff",
              bgcolor: "#005b9f",
              border: "0",
            }}
          >
            新增班級
          </Button>
        </form>
      </Card>
    </Stack>
  );
};

export default AddClass;
