import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton
} from '@material-ui/core';
// import ArrowDownwardIcon from '@material-ui/icons/Star';
// import Delete from '@material-ui/icons/Delete';
import GetApp from '@material-ui/icons/GetApp';
import Close from '@material-ui/icons/Close';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  mycollection,
  deletePictureFromCollection,
  resetPhotoErrors
} from '../../actions';
import withRoot from '../../withRoot';

const styles = theme => ({
  card: {
    minWidth: 350
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
	},
	actions: {
		display: 'flex',
  },
});

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: [],
      open: false,
      selectedId: ''
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen = imgId => {
    this.setState({
      open: true,
      selectedId: imgId
    });
  };

  handleClose = imgId => {
    this.setState({
      open: false,
      selectedId: imgId
    });
  };

  deletePictureFromCollection = _ => {
    this.props.deletePictureFromCollection(this.state.selectedId);
    this.handleClose();
  };

  componentWillMount() {
    // console.log('auth', this.props.authenticated);
    this.props.mycollection();
  }

  componentDidMount() {
    this.setState({ collection: this.props.collection });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collection.length > 0) {
      this.props.resetPhotoErrors();
    }
    this.setState({ collection: nextProps.collection });
  }

  openThis = uri => {
    window.open(uri, '_blank');
  };

  renderAlert() {
    if (this.props.error || this.props.photoError) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.error || this.props.photoError}
        </div>
      );
    } else if (this.props.message) {
      return (
        <div className="alert alert-success">
          <strong>Success!</strong> {this.props.message}
        </div>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="container">
        <h3> My Collection </h3>
        <hr />
        {this.renderAlert()}
        <Grid container justify="center" spacing={16}>
          {this.state.collection.map(img => (
            <Grid item key={img.id}> 
              <Card className={classes.card}>
							<CardActions className={classes.actions} disableActionSpacing>
							<IconButton onClick={_ => this.handleClickOpen(img.id)}>
                    <Close />
                  </IconButton>
                  <IconButton onClick={_ => this.openThis(img.url)}>
                    <GetApp />
                  </IconButton>

                </CardActions>

                <CardMedia className={classes.media} image={img.url} />
                <CardHeader title={img.tags.map(i => i.text).join(', ')} />
              </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          area-labelledby="alert-dialog-title"
          area-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Are you sure you want to delete this picture?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Delete this picture from your collection (this CANNOT be undone)?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="raised">
              Cancle
            </Button>
            <Button
              onClick={_ => this.deletePictureFromCollection()}
              color="primary"
              variant="raised"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    authenticated: state.auth.authenticated,
    error: state.auth.error,
    collection: state.photo.collection,
    photoError: state.photo.error
  };
};

const BrowseWrapped = withRoot(withStyles(styles)(Browse));

export default connect(
  mapStatetoProps,
  {
    mycollection,
    deletePictureFromCollection,
    resetPhotoErrors
  }
)(BrowseWrapped);
