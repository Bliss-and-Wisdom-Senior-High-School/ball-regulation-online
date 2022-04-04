import React from "react";
import { useState, useEffect } from "react";
import "firebase/firestore";
import firebase from "../../../utils/firebase";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";

const Badminton = () => {
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
  }, []);

  return (
    <Stack spacing={2} sx={{ p: "14%" }}>
      {classnames.map((classname) => {

        const LendRacket = () => {
          firebase
            .firestore()
            .collection("class")
            .doc(classname.id)
            .update({
              badminton: {
                racket: classname.badminton.racket + 1,
                ball: classname.badminton.ball,
              },
            });
        };

        const ReturnRacket = () => {
          if (classname.badminton.racket >= 1) {
            firebase
              .firestore()
              .collection("class")
              .doc(classname.id)
              .update({
                badminton: {
                  racket: classname.badminton.racket - 1,
                  ball: classname.badminton.ball,
                },
              });
          } else {
          }
        };

        const LendBall = () => {
          firebase
            .firestore()
            .collection("class")
            .doc(classname.id)
            .update({
              badminton: {
                ball: classname.badminton.ball + 1,
                racket: classname.badminton.racket,
              },
            });
        };

        const ReturnBall = () => {
          if (classname.badminton.ball >= 1) {
            firebase
              .firestore()
              .collection("class")
              .doc(classname.id)
              .update({
                badminton: {
                  ball: classname.badminton.ball - 1,
                  racket: classname.badminton.racket
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
                  onClick={LendBall}
                  variant="text"
                >
                  <Typography>借</Typography>
                </Button>
                <Typography variant="h6" sx={{ pl: "7px", pr: "7px" }}>
                  球數: {classname.badminton.ball}
                </Typography>
                <Button variant="text" onClick={ReturnBall} color="info">
                  <Typography>還</Typography>
                </Button>
              </ButtonGroup>

              <ButtonGroup>
                <Button color="info" onClick={LendRacket} variant="text">
                  <Typography>借</Typography>
                </Button>
                <Typography variant="h6" sx={{ pl: "7px", pr: "7px" }}>
                  拍數: {classname.badminton.racket}
                </Typography>
                <Button variant="text" onClick={ReturnRacket} color="info">
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

export default Badminton;