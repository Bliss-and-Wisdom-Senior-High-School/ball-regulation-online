import React from "react";
import { useState, useEffect } from "react";
import "firebase/firestore";
import firebase from "../../../utils/firebase";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { Typography } from "@mui/material";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { ButtonGroup } from "@mui/material";

const InputPoint = () => {
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
        const AddGoodPoint = () => {
          firebase
            .firestore()
            .collection("class")
            .doc(classname.id)
            .update({
              point: {
                good: classname.point.good + 1,
                bad: classname.point.bad,
              },
            });
        };

        const AddBadPoint = () => {
          firebase
            .firestore()
            .collection("class")
            .doc(classname.id)
            .update({
              point: {
                good: classname.point.good,
                bad: classname.point.bad + 1,
              },
            });
        };

        return (
          <div key={classname.id}>
            <Card>
              <Typography variant="h5">{classname.name}</Typography>
              <ButtonGroup>
                <IconButton onClick={AddGoodPoint}>
                  <ThumbUpAltIcon></ThumbUpAltIcon>
                  {classname.point.good}
                </IconButton>
                <Typography sx={{ pr: "10px", pl: "10px" }}></Typography>
                <IconButton onClick={AddBadPoint}>
                  <ThumbDownAltIcon></ThumbDownAltIcon>
                  {classname.point.bad}
                </IconButton>
              </ButtonGroup>
            </Card>
          </div>
        );
      })}
    </Stack>
  );
};

export default InputPoint;
