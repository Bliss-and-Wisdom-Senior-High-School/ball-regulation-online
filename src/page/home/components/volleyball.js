import React from "react";
import { useState, useEffect } from "react";
import "firebase/firestore";
import firebase from "../../../utils/firebase";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";

const VolleyBall = () => {
  const [classnames, setClassnames] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("class")
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
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
  }, []);

  return (
    <Stack spacing={2} sx={{ p: "14%" }}>
      {classnames.map((classname) => {
        const Lend = () => {
          firebase
            .firestore()
            .collection("class")
            .doc(classname.id)
            .update({
              volleyball: {
                ball: classname.volleyball.ball + 1,
              },
            });
        };

        const Return = () => {
          if (classname.volleyball.ball >= 1) {
            firebase
              .firestore()
              .collection("class")
              .doc(classname.id)
              .update({
                volleyball: {
                  ball: classname.volleyball.ball - 1,
                },
              });
          } else {
          }
        };

        return (
          <div key={classname.id}>
            <Card sx={{ p: "10px" }}>
              <Typography variant="h5">{classname.name}</Typography>
              <ButtonGroup>
                <Button
                  color="info"
                  //fullWidth={false}
                  onClick={Lend}
                  variant="text"
                >
                  <Typography>借</Typography>
                </Button>
                <Typography variant="h6" sx={{ pl: "7px", pr: "7px" }}>
                  球數:{classname.volleyball.ball}
                </Typography>

                <Button variant="text" onClick={Return} color="info">
                  <Typography>還</Typography>
                </Button>
              </ButtonGroup>
            </Card>
          </div>
        );
      })}
    </Stack>
  );
};

export default VolleyBall;
