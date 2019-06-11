import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DatePicker from "./FormFields/DatePicker";

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

const InvoiceCreator = props => {
  const classes = useStyles();

  /* Dialog */
  const [isOpen, setIsOpen] = useState(false);

  /* Form fields */
  const [created, setCreated] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState("");
  const [discription, setDiscription] = useState("");
  const [note, setNote] = useState("");

  function handleClickOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setCreated(new Date());
    setDueDate(new Date());
    setPaymentMethod("");
    setDiscription("");
    setNote("");

    setIsOpen(false);
  }

  const handleOK = () => {
    const data = {
      Created: created,
      DueDate: dueDate,
      PaymentMethod: paymentMethod,
      Discription: discription,
      Note: note
    };

    const path =
      "https://localhost:44379/api/clients/" +
      props.clientId +
      "/projects/" +
      props.projectId +
      "/create-invoice";

    fetch(path, {
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
          setMessage("Invoice was succesfully created");
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
        <DialogTitle>Build Invoice</DialogTitle>
        <DialogContent>
          <form className={classes.container} noValidate autoComplete="off">
            <DatePicker
              inputType={"datetime-local"}
              value={dueDate}
              label="Due Date:"
              handlechange={setDueDate}
            />

            <TextField
              id="standard-first-payment-Method"
              label="Payment Method"
              fullWidth
              className={classes.textField}
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              margin="dense"
            />

            <TextField
              id="standard-discription"
              label="Discription"
              fullWidth
              className={classes.textField}
              value={discription}
              onChange={e => setDiscription(e.target.value)}
              margin="normal"
            />

            <TextField
              id="standard-note"
              label="Note"
              fullWidth
              className={classes.textField}
              value={note}
              onChange={e => setNote(e.target.value)}
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

export default InvoiceCreator;
