import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";

import TaskInput from "./FormFields/TaskInput";
import ProjectSelector from "./FormFields/ProjectSelector";
import DatePicker from "./FormFields/DatePicker";
import SubmitButton from "./FormFields/SubmitButton";

const styles = {
  background: {
    backgroundColor: "lightgray",
    padding: 10
  },
  pad: {
    marginTop: 15
  },
  root: {
    flexGrow: 1
  },
  test: {
    textAlign: "center"
  }
};

const FromControler = props => {
  const [task, setTask] = useState("");

  const [clientId, setClientId] = useState("");
  const [projectId, setProjectId] = useState("");

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [buttonTitle, setButtonTitle] = useState("Project");

  const setProjectBtn = (clientName, projectTitle, cId, pId) => {
    setClientId(cId);
    setProjectId(pId);

    setButtonTitle(clientName + " - " + projectTitle);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const data = {
      entryTitle: task,
      startTime: fromDate,
      finishTime: toDate
    };

    console.log(data);

    const path =
      "https://localhost:44379/api/clients/" +
      clientId +
      "/projects/" +
      projectId;

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
      },
      function(error) {
        console.log(error.message); //=> String
      }
    );
  };

  return (
    <div style={styles.background}>
      <span>New Project entry</span>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center" justify="center">
            <Grid key={"task"} item>
              <TaskInput
                type={"text"}
                title={"Task"}
                value={task}
                placeholder={"What are you working on?"}
                handlechange={e => setTask(e.target.value)}
              />
            </Grid>
            <Grid key={"project"} item>
              <ProjectSelector
                title={buttonTitle}
                handlechange={setProjectBtn}
              />
            </Grid>
            <Grid key={"from"} item>
              <DatePicker
                inputType={"datetime-local"}
                value={fromDate}
                label="Start time:"
                handlechange={setFromDate}
              />
            </Grid>

            <Grid key={"arrow"} style={styles.pad} item>
              <ArrowForwardIos fontSize="small" />
            </Grid>

            <Grid key={"to"} item>
              <DatePicker
                inputType={"datetime-local"}
                value={toDate}
                label="Finish time:"
                handlechange={setToDate}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <SubmitButton handlesubmit={handleSubmit} />
    </div>
  );
};

export default FromControler;
