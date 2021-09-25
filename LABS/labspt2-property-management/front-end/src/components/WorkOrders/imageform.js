import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';

const axios = require('axios');
//const url = 'http://localhost:9000/images';
const url = 'https://tenantly-back.herokuapp.com/images';

const styles = (theme) => ({
	button: {
		margin: theme.spacing.unit
	}
});

class Imageform extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file: null,
			url: null
		};
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	onFormSubmit(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', this.state.file);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		axios
			.post(url, formData, config)
			.then((response) => {
				this.setState({ url: response.data });
				this.updateUrl();
			})
			.catch((error) => {});
	}

	updateUrl() {
		this.props.url(this.state.url);
	}

	onChange(e) {
		e.preventDefault();
		this.setState({ file: e.target.files[0] });
	}

	render() {
		const { classes } = this.props;
		return (
			// TENANT
			<form>
				<h1>File Upload</h1>
				{/* <input type="file" name="image" onChange={this.onChange}  style="width:200px"/> */}
				<label class="custom-file-upload">
				<input type="file" name="image" onChange={this.onChange}/>
				</label>
				<Button variant="contained" color="default" className={classes.button}  onClick={this.onFormSubmit}>
					Upload
					<CloudUploadIcon className={classes.rightIcon} />
				</Button>
			</form>
		);
	}
}
Imageform.propTypes = {
	classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Imageform);
