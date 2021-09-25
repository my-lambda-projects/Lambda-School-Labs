//Libraries
import React from 'react';

//MaterialUI Components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EditDialog extends React.Component {
  state = {
    open: false,
    title: ''
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {`Edit ${this.props.title}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <TextField
                autoFocus
                margin="dense"
                id="newName"
                name="newName"
                label="First Name"
                type="text"
                fullWidth
                value={this.props.newName}
                onChange={event => {this.props.handleNewName(event)}}
              />
              <TextField
                autoFocus
                margin="dense"
                id="newLastName"
                name="newLastName"
                label="Last Name"
                type="text"
                fullWidth
                value={this.props.newLastName}
                onChange={event => {this.props.handleNewName(event)}}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Nevermind
            </Button>
            <Button onClick={(event) => {
                this.props.editClose();
              }} color="secondary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditDialog;
