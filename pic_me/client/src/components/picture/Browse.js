import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { othermephotos, claimPicture, resetPhotoErrors } from '../../actions';
import withRoot from '../../withRoot';

const styles = theme => ({
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  icon: {
    color: 'white'
  }
});

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      othermes: [],
      // modal: false,
      open: false,
      selectedId: ''
    };
    // this.toggle = this.toggle.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    this.props.resetPhotoErrors();
    this.props.othermephotos();
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.othermes.length > 0 && this.props.photoError === null) {
    // this.props.resetPhotoErrors();
    // }

    this.setState({ othermes: nextProps.othermes });
  }

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

  // // toggle for modal window
  // toggle(imgId) {
  // 	this.setState({
  // 		selectedId: imgId,
  // 		modal: !this.state.modal,
  // 	});
  // }
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

  claimPictureButtonClickedHandler = _ => {
    this.props.claimPicture(this.state.selectedId);
    // this.toggle();
    this.handleClose();
  };

  componentDidMount() {
    this.setState({ othermes: this.props.othermes });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="container">
        <h2> Pic Me </h2>
        <hr />
        {this.renderAlert()}
        <GridList cellHeight={300} spacing={1} cols={3}>
          {this.state.othermes.map(img => (
            <GridListTile key={img.id} cols={img.cols || 1}>
              <img src={img.url} alt="myuploads" />
              <GridListTileBar
                title={img.tags.map(i => i.text).join(', ')}
                titlePosition="bottom"
                actionIcon={
                  // <IconButton onClick={_ => this.toggle(img.id)} className={classes.icon}>
                  <IconButton
                    onClick={_ => this.handleClickOpen(img.id)}
                    className={classes.icon}
                  >
                    <FavoriteIcon />
                  </IconButton>
                }
                actionPosition="right"
                className={classes.titleBar}
              />
              {/* <Modal
								isOpen={this.state.modal}
								toggle={this.toggle}
								className={this.props.className}
							>
								<ModalHeader toggle={this.toggle}>Is this you?</ModalHeader>
								<ModalBody>
									Pay 1 credit and add this photo to your collection?
								</ModalBody>
								<ModalFooter>
									<Button
										color="primary"
										onClick={_ => this.claimPictureButtonClickedHandler()}
									>
										Yes
									</Button>{' '}
									<Button color="secondary" onClick={this.toggle}>
										Cancel
									</Button>
								</ModalFooter>
							</Modal> */}
            </GridListTile>
          ))}
        </GridList>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          area-labelledby="alert-dialog-title"
          area-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Is this you?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Pay 1 credit and add this photo to your collection?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="raised">
              Cancle
            </Button>
            <Button
              onClick={_ => this.claimPictureButtonClickedHandler()}
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
    photoError: state.photo.error,
    othermes: state.photo.othermes
  };
};

const BrowseWrapped = withRoot(withStyles(styles)(Browse));

export default connect(
  mapStatetoProps,
  {
    othermephotos,
    claimPicture,
    resetPhotoErrors
  }
)(BrowseWrapped);
