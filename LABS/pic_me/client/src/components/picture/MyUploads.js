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
	IconButton,
	// TextField,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
// import { reduxForm, Field } from 'redux-form';
import {
  deletemyuploads,
  myuploads,
  resetPhotoErrors,
  updateTagsOf
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
});

class MyUploads extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploads: [],
      open: false,
			selectedId: '',
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

  deleteUploadButtonClickedHandler = _ => {
    this.props.deletemyuploads(this.state.selectedId);
    this.handleClose();
	};

  componentWillMount() {
    this.props.myuploads();
  }

  componentDidMount() {
    this.setState({ uploads: this.props.uploads });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uploads.length > 0) {
      this.props.resetPhotoErrors();
    }
    this.setState({ uploads: nextProps.uploads });
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

  editTagsOf = (imgId, tags) => {
    let newTags = prompt(
      `Add or edit these tags (TAG1, TAG2, TAG3, TAG4, TAG5)`,
      `${tags.map(i => i.text).join(', ')}`
		);

    if (newTags) {
      this.props.updateTagsOf(imgId, newTags);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="container">
        <h3> My Uploads </h3>
        <hr />
        {this.renderAlert()}
        <Grid container justify="center" spacing={16}>
          {this.state.uploads.map(img => (
            <Grid item key={img.id}>
              <Card className={classes.card}>
                <CardActions>
									<IconButton 
										onClick={_ => this.handleClickOpen(img.id)}>
                    <Close />
                  </IconButton>
                </CardActions>
                <CardMedia className={classes.media} image={img.url} />
                <CardHeader
                  title={img.tags.map(i => i.text).join(', ')}
                  onClick={_ => this.editTagsOf(img.id, img.tags)}
                />
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
            {'Are you sure you want to delete this upload??'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Delete this upload from your uploads (this CANNOT be undone)?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="raised">
              Cancle
            </Button>
            <Button
						onClick={_ => this.deleteUploadButtonClickedHandler()}
              color="primary"
              variant="raised"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
				{/* <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          area-labelledby="form-dialog-title"
          area-describedby="form-dialog-description"
        >
          <DialogTitle id="form-dialog-title">
            {'Tags'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="form-dialog-description">
						Add or edit these tags (TAG1, TAG2, TAG3, TAG4, TAG5)
            </DialogContentText>
          </DialogContent>
					<Field
						name="tags"
						label="tags"
						component={
							<TextField
              autoFocus
              margin="dense"
              id="tags"
              label="tags"
              type="text"
              fullWidth
            	/>
						}
          />
          <DialogActions>
            <Button onClick={this.handleClose} variant="raised">
              Cancle
            </Button>
            <Button
							onClick={_ => this.updatetagClickedHandler()}
              color="primary"
              variant="raised"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog> */}
      </div>
    );
  }
}

const MyUploadsWrapped = withRoot(withStyles(styles)(MyUploads));

export default connect(
	state => ({
	authenticated: state.auth.authenticated,
	error: state.auth.error,
	uploads: state.photo.uploads,
	photoError: state.photo.error,
	// initialValues: state.photo,
	}),
  {
    myuploads,
    deletemyuploads,
    resetPhotoErrors,
    updateTagsOf
  }
)(MyUploadsWrapped);
// export default reduxForm({
// 	form: 'myuploads',
// 	enableReinitialize: true,
// })(MyUploadsWrapped);