import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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

const ProjectSelector = props => {
  const classes = useStyles();

  const [apiData, setData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [hasSelectedClient, setHasSelectedClient] = useState(false);

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedproject, setSelectedproject] = useState("");

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

  const handleClientChange = event => {
    setSelectedClient(event.target.value);

    setSelectedproject("");

    if (event.target.value === "") {
      setHasSelectedClient(false);
    } else {
      setHasSelectedClient(true);
    }
  };

  const handleProjectChange = event => {
    setSelectedproject(event.target.value);
  };

  function handleClickOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  const handleOK = () => {
    handleClose();

    var clientName = "";
    var projectTitle = "";

    apiData.forEach(element => {
      if (element.id === selectedClient) {
        clientName = element.name;

        element.projects.forEach(item => {
          if (item.id === selectedproject) {
            projectTitle = item.title;
          }
        });
      }
    });

    props.handlechange(
      clientName,
      projectTitle,
      selectedClient,
      selectedproject
    );
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>{props.title}</Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle>Select Project</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Client</InputLabel>
              <Select
                native
                value={selectedClient}
                onChange={handleClientChange}
                input={<Input id="age-native-simple" />}
              >
                <option value="" />
                {apiData.map(item => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl
              className={classes.formControl}
              disabled={!hasSelectedClient}
            >
              <InputLabel htmlFor="age-simple">Project</InputLabel>
              <Select
                native
                value={selectedproject}
                onChange={handleProjectChange}
                input={<Input id="age-native-simple" />}
              >
                <option value="" />
                {apiData.map(item =>
                  item.projects.map(p =>
                    selectedClient === item.id ? (
                      <option value={p.id} key={p.id}>
                        {p.title}
                      </option>
                    ) : (
                      ""
                    )
                  )
                )}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleOK}
            color="primary"
            disabled={!(hasSelectedClient && selectedproject !== "")}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProjectSelector;
