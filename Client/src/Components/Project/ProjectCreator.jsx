import React, { PureComponent } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class ProjectCreator extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      clients: [],
      selectedId: "",
      isOpen: false,
      title: "",
      baseRate: 0
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOK = this.handleOK.bind(this);
    this.handleClientChange = this.handleClientChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBaseRateChange = this.handleBaseRateChange.bind(this);
  }

  componentDidMount() {
    const that = this;
    fetch("https://localhost:44379/api/clients")
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonStr) {
        that.setState({ clients: jsonStr });
      });
  }

  handleClickOpen() {
    this.setState({ isOpen: true });
  }

  handleClose() {
    this.setState({ isOpen: false, title: "", baseRate: 0 });
  }

  handleOK = () => {
    const data = {
      Title: this.state.title,
      BaseRate: this.state.baseRate,
      isActive: true,
      Entries: []
    };

    console.log("ID: " + this.state.selectedId);
    console.log(data);

    const path = "https://localhost:44379/api/clients/" + this.state.selectedId;

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

    this.handleClose();
  };

  handleClientChange = event => {
    this.setState({
      selectedId: event.target.value
    });
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleBaseRateChange = event => {
    this.setState({ baseRate: event.target.value });
  };

  render() {
    const { title, baseRate } = this.state;

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          New Project
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.isOpen}
          onClose={this.handleClose}
        >
          <DialogTitle>Add New Client</DialogTitle>
          <DialogContent>
            <form noValidate autoComplete="off">
              <FormControl>
                <InputLabel htmlFor="age-native-simple">Client</InputLabel>
                <Select
                  native
                  value={this.state.selectedClient}
                  onChange={this.handleClientChange}
                  input={<Input id="age-native-simple" />}
                >
                  <option value="" />
                  {this.state.clients.map(item => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="standard-title"
                label="Title"
                value={title}
                fullWidth
                onChange={this.handleTitleChange}
                margin="normal"
              />
              <TextField
                id="standard-setBaseRate"
                label="BaseRate"
                value={baseRate}
                onChange={this.handleBaseRateChange}
                margin="dense"
                type="Number"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleOK} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ProjectCreator;
