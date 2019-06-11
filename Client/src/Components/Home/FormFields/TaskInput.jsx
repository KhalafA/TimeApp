import React from "react";
import TextField from "@material-ui/core/TextField";

const TaskInput = props => {
  return (
    <TextField
      id="standard-full-width"
      label={props.title}
      value={props.value}
      onChange={props.handlechange}
      placeholder={props.placeholder}
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
      {...props}
    />
  );
};

export default TaskInput;
