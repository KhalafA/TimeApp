import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import Invoice from "../Templates/InvoiceTemplate";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GenerateInvoice = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [client, setClient] = useState({});
  const [company, setcompany] = useState({});
  const [invoice, setInvoice] = useState({});

  const [totalAmount, setTotalAmount] = useState(0);

  const buildItems = () => {
    var rate = props.project.baseRate;
    var totalCost = 0;
    var temp = [];

    props.project.entries.forEach(entry => {
      const start = new Date(entry.startTime);
      const finish = new Date(entry.finishTime);

      const duration = finish - start;

      var h = calcHours(duration);
      var m = calcMins(duration);

      var cost = h * rate + (rate / 60) * m;

      var item = {
        title: entry.entryTitle,
        time: h + ":" + m + " - " + cost + " Kr"
      };

      totalCost = totalCost + cost;
      temp.push(item);

      console.log(temp);
      console.log(h);
      console.log(m);
      console.log(cost);
    });

    setInvoice({
      createdDate: calcDate(new Date(props.project.invoice.created)),
      dueDate: calcDate(new Date(props.project.invoice.dueDate)),
      paymentMethod: props.project.invoice.paymentMethod,
      id: props.project.invoice.id,
      description: props.project.invoice.discription,
      items: temp
    });

    setTotalAmount(totalCost);
  };

  const calcDate = date => {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    return day + "-" + month + "-" + year;
  };

  const calcHours = duration => {
    var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    return hours;
  };

  const calcMins = duration => {
    var minutes = Math.floor((duration / (1000 * 60)) % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes;
  };

  const buildInvoice = () => {
    buildItems();

    setcompany({
      name: "Reviso",
      address: "Ewaldsgade 3",
      email: "Reviso@Reviso.dk",
      logoUrl:
        "https://www.shakeshack.com/wp-content/themes/shakeshack/images/shakeshack_logo.png"
    });

    setClient({
      name: props.client.name,
      email: props.client.email,
      address: props.client.address,
      logoUrl:
        "http://p.fod4.com/p/media/c9c34f4e09/JqdTM3oTiqTcrbFoLdxb_Hamilton_200x200.jpg"
    });
  };

  function handleClickOpen() {
    buildInvoice();
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        See Invoice
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Invoice
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Invoice
          invoice={invoice}
          customer={client}
          company={company}
          totalAmount={totalAmount}
          notes={props.project.invoice.notes}
        />
      </Dialog>
    </div>
  );
};

export default GenerateInvoice;
