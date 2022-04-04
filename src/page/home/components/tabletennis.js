import React from "react";
import { useState, useEffect } from "react";
import "firebase/firestore";
import firebase from "../../../utils/firebase";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { ButtonGroup } from "@mui/material";

const TableTennis = () => {
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
              tabletennis: {
                racket: classname.tabletennis.racket + 1,
                ball: classname.tabletennis.ball,
              },
            });
        };

        const ReturnRacket = () => {
          if (classname.tabletennis.racket >= 1) {
            firebase
              .firestore()
              .collection("class")
              .doc(classname.id)
              .update({
                tabletennis: {
                  racket: classname.tabletennis.racket - 1,
                  ball: classname.tabletennis.ball,
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
              tabletennis: {
                ball: classname.tabletennis.ball + 1,
                racket: classname.tabletennis.racket,
              },
            });
        };

        const ReturnBall = () => {
          if (classname.tabletennis.ball >= 1) {
            firebase
              .firestore()
              .collection("class")
              .doc(classname.id)
              .update({
                tabletennis: {
                  ball: classname.tabletennis.ball - 1,
                  racket: classname.tabletennis.racket,
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
                <Button color="info" onClick={LendBall} variant="text">
                  <Typography>借</Typography>
                </Button>
                <Typography variant="h6" sx={{ pl: "7px", pr: "7px" }}>
                  球數: {classname.tabletennis.ball}
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
                  拍數: {classname.tabletennis.racket}
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

export default TableTennis;
