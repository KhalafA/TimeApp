import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const SubmitButton = props => {
  return (
    <Button
      variant="contained"
      color="primary"
      className={useStyles.button}
      onClick={props.handlesubmit}
    >
      Add Entry
    </Button>
  );
};

export default SubmitButton;
