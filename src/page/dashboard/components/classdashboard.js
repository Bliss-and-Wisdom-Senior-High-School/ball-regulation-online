import React from "react";
import { useState, useEffect } from "react";
import "firebase/firestore";
import firebase from "../../../utils/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//import Button from "@mui/material/Button";
/*
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
*/
const ClassDashBoard = () => {
  const [classnames, setClassnames] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [opendialog, setOpen] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
        let color1 = "#fafafa";
        let color2 = "#b71c1c";
        if (classname.ban === true) {
          color1 = "#f44336";
          color2 = "#1b5e20";
        }

        function togglebaned() {
          if (classname.ban === true) {
            firebase
              .firestore()
              .collection("class")
              .doc(classname.id)
              .update({ ban: false });
          } else if (classname.ban === false && classname.point.bad >= 3) {
            firebase
              .firestore()
              .collection("class")
              .doc(classname.id)
              .update({
                ban: true,
                point: {
                  good: classname.point.good,
                  bad: classname.point.bad - 3,
                },
              });
          }
        }

      /* function toggledelete() {
          setOpen("");
          handleClose();
        }
        */

        const handleClickOpen = () => {
          firebase.firestore().collection("class").doc(classname.id).delete();

          setOpen(`${classname.id}`);
        };

        const handleClose = () => {
          setOpen("");
        };
        return (
          <div key={classname.id}>
            <Accordion
              expanded={expanded === `${classname.id}`}
              onChange={handleChange(`${classname.id}`)}
              key={classname.id}
              sx={{ pl: "4%", pr: "4%", pt: 1, pb: 3, bgcolor: color1 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{ bgcolor: color1 }}
              >
                <div sx={{ display: "inline-flex" }}>
                  <Typography
                    variant="h6"
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    {classname.name}
                  </Typography>
                  <IconButton
                    sx={{
                      alignItems: "left",
                      bgcolor: color1,
                      display: "flex",
                      flexDirection: "column",
                      color: color2,
                    }}
                    onClick={togglebaned}
                  >
                    <BlockIcon></BlockIcon>
                  </IconButton>
                </div>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: color1 }}>
                <List>
                  <ListItem>
                    <ListItemText>
                      <ThumbUpAltIcon></ThumbUpAltIcon>
                      {classname.point.good}
                    </ListItemText>
                    <ListItemText>
                      <ThumbDownAltIcon></ThumbDownAltIcon>
                      {classname.point.bad}
                    </ListItemText>
                  </ListItem>

                  <ListItem sx={{ pt: 1, pb: 1 }}>
                    <ListItemText>
                      <h3>排球</h3>
                    </ListItemText>
                    <ListItemText>球數</ListItemText>
                    <ListItemText>{classname.volleyball.ball}</ListItemText>
                  </ListItem>

                  <ListItem sx={{ pt: 1, pb: 1 }}>
                    <ListItemText>
                      <h3>羽球</h3>
                    </ListItemText>
                    <ListItemText>
                      <List>
                        <ListItem>
                          <ListItemText>球數</ListItemText>
                          <ListItemText>
                            {classname.badminton.ball}
                          </ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemText>球拍</ListItemText>
                          <ListItemText>
                            {classname.badminton.racket}
                          </ListItemText>
                        </ListItem>
                      </List>
                    </ListItemText>
                  </ListItem>

                  <ListItem>
                    <ListItemText>
                      <h3>桌球</h3>
                    </ListItemText>
                    <ListItemText>
                      <List>
                        <ListItem>
                          <ListItemText>球數</ListItemText>
                          <ListItemText>
                            {classname.tabletennis.ball}
                          </ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemText>球拍</ListItemText>
                          <ListItemText>
                            {classname.tabletennis.racket}
                          </ListItemText>
                        </ListItem>
                      </List>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <IconButton
                      sx={{ alignItems: "left", bgcolor: "#d32f2f" }}
                      onClick={handleClickOpen}
                    >
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </Stack>
  );
};

export default ClassDashBoard;

/*
                <Dialog
                  open= {({ opendialog }) => (opendialog === `${classname.id}` ? false : false)}
                  onClose={handleClose}
                >
                  <DialogTitle>{"確定要刪除 "}{classname.name}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>{"如果您刪除該班，這筆資料無法復原"}</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button 
                      autoFocus
                      onClick={toggledelete}
                      ><DeleteIcon></DeleteIcon></Button>
                    <Button
                      autoFocus
                      onClick={handleClose}
                    >取消</Button>
                  </DialogActions>
                </Dialog>
*/
