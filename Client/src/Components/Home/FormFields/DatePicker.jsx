import React from "react";
import { KeyboardDateTimePicker } from "@material-ui/pickers";

const DatePicker = props => {
  return (
    <KeyboardDateTimePicker
      value={props.value}
      onChange={props.handlechange}
      label={props.label}
      onError={console.log}
      format="yyyy/MM/dd hh:mm a"
    />
  );
};

export default DatePicker;
