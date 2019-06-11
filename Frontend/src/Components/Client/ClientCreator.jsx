import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import SnackBarComponent from "../Templates/SnackBarTemplate";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const ClientCreator = props => {
  const classes = useStyles();

  /* Dialog */
  const [isOpen, setIsOpen] = useState(false);

  /* Form fields */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [firstAddress, setFirstAddress] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  function handleClickOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setName("");
    setEmail("");
    setFirstAddress("");
    setLogoUrl("");

    setIsOpen(false);
  }

  const handleOK = () => {
    const data = {
      Name: name,
      Email: email,
      Address: firstAddress,
      LogoUrl: logoUrl,
      Projects: []
    };

    console.log(data);

    fetch("https://localhost:44379/api/clients", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }).then(
      function(response) {
        console.log(response.text());
        if (response.status === 201) {
          setVariant("success");
          setMessage("Client was succesfully added");
          setOpen(true);
        } else {
          setVariant("error");
          setMessage("Something went wrong");
          setOpen(true);
        }
      },
      function(error) {
        console.log(error.message); //=> String
      }
    );

    handleClose();
  };

  /* SnackBar States */
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");

  function handleSnackBarClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        New Client
      </Button>

      <SnackBarComponent
        open={open}
        close={handleSnackBarClose}
        message={message}
        variant={variant}
      />

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent>
          {" "}
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="standard-name"
              label="Name"
              className={classes.textField}
              value={name}
              fullWidth
              onChange={e => setName(e.target.value)}
              margin="normal"
            />

            <TextField
              id="standard-email"
              label="Email"
              className={classes.textField}
              type="email"
              name="email"
              fullWidth
              value={email}
              autoComplete="email"
              onChange={e => setEmail(e.target.value)}
              margin="normal"
            />

            <TextField
              id="standard-first-address"
              label="Address"
              className={classes.textField}
              value={firstAddress}
              onChange={e => setFirstAddress(e.target.value)}
              margin="dense"
            />

            <TextField
              id="standard-logo-url"
              label="Logo URL"
              fullWidth
              className={classes.textField}
              value={logoUrl}
              onChange={e => setLogoUrl(e.target.value)}
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOK} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClientCreator;
