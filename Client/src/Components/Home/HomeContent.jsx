import React from "react";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

import FromController from "./FormController";
import ProjectList from "./ProjectList";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    type: "light" // Switching the dark mode on is a single property value change.
  }
});

const HomeContent = props => {
  return (
    <MuiThemeProvider theme={theme}>
      <h1>Home</h1>
      <FromController />
      <ProjectList />
    </MuiThemeProvider>
  );
};

export default HomeContent;
