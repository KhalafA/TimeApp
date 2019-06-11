import React from "react";
import Content from "./Components/Content";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="Content">
        <Content name="Reviso" />
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
