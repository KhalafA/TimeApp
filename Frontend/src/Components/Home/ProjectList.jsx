import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import InvoiceCreator from "./InvoiceCreator";
import GenerateInvoice from "./GenerateInvoice";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: 15
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "20%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

const ProjectList = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [apiData, setData] = useState([]);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    async function fetchData() {
      const results = await fetch("https://localhost:44379/api/clients").then(
        function(response) {
          return response.json();
        }
      );

      setData(results);
    }
    fetchData();
  }, []);

  const buildTile = (client, project) => {
    const contentString = project.title + "bh-content";
    const headerString = project.title + "bh-header";

    return (
      <ExpansionPanel
        expanded={expanded === project.title}
        onChange={handleChange(project.title)}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={contentString}
          id={headerString}
        >
          <Typography className={classes.heading}>{client.name}</Typography>
          <Typography className={classes.secondaryHeading}>
            {project.title}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List dense={true}>
            {project.entries.map(entry => (
              <ListItem>
                <ListItemText
                  primary={entry.entryTitle}
                  secondary={calcTime(entry.startTime, entry.finishTime)}
                />
              </ListItem>
            ))}
          </List>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          {project.isActive ? (
            <InvoiceCreator clientId={client.id} projectId={project.id} />
          ) : (
            <GenerateInvoice client={client} project={project} />
          )}
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  };

  const calcTime = (startTime, finishTime) => {
    console.log("StartTime: " + startTime + " FinishTime: " + finishTime);

    const start = new Date(startTime);
    const finish = new Date(finishTime);

    const duration = finish - start;

    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  };

  return (
    <div className={classes.root}>
      <Container fixed>
        {apiData === null
          ? ""
          : apiData.map(client =>
              client.projects.map(project => buildTile(client, project))
            )}
      </Container>
    </div>
  );
};

export default ProjectList;
