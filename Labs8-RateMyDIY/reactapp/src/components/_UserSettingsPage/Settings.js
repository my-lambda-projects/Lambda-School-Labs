// Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUsername, getProfilePic } from '../../actions/settingActions';
import { fetchSearchResults } from '../../actions';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
// import Button from '@material-ui/core/Button';
import { compose } from 'redux';
import ReactLoading from 'react-loading';

import { Header, Twillio } from '../../components';

const styles = theme => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		height: '75%',
		backgroundColor: theme.palette.primary.main,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		//   marginLeft: 'auto',
		//   marginRight: 'auto',
		//   left: 0,
		//   right: 0,
		margin: 'auto',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		borderRadius: '5px'
	}
});

//Styles
const SettingsPageContainer = styled.div`
	width: 100%;
	min-width: 550px;
	background-color: ${props => props.theme.mui.palette.primary.main};

	@media (max-width: 500px) {
		width: 100vw;
	}
`;

const SettingsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 80%;
	margin: 0 auto;
	margin-top: 100px;
	border-radius: 30px;
	background-color: ${props => props.theme.mui.palette.primary.light};

	@media (max-width: 500px) {
		position: absolute;
		width: 100%;
		border-radius: none;
		text-align: center;
	}
`;

const ProfileImgHolder = styled.div`
	width: 300px;
	height: 300px;
	border-radius: 50%;
`;

const ProfileImg = styled.img`
	width: 100%;
	height: 100%;
`;

const ProfileForm = styled.form`
	display: flex;
	justify-content: space-around;
	width: 30%;
	height: 100%;
	margin: 2% 0%;

	@media (max-width: 500px) {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
`;

// const CustomFileInput = styled.input`
//     // ::-webkit-file-upload-button {
//     //     background: ${props => props.theme.mui.palette.secondary.light}
//     //     color: ${props => props.theme.mui.palette.secondary.main}
//     //     padding: 1em;
//     //     border-radius: 20px;
//     // }
//     display: none;
// `;

const FileButton = styled.label`
	background-color: white;
	border: 1px solid ${props => props.theme.mui.palette.primary.dark};
	border-radius: 5px;
	padding: 15px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 1.6rem;
	-webkit-transition-duration: 0.4s;
	transition-duration: 0.4s;
	outline: none;

	&:hover {
		background-color: ${props => props.theme.mui.palette.primary.dark};
		color: white;
	}

	@media (max-width: 500px) {
		width: 80%;
		margin: 3%;
	}
`;

const UploadButton = styled.button`
	background-color: white;
	border: 1px solid ${props => props.theme.mui.palette.primary.dark};
	border-radius: 5px;
	padding: 15px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 1.6rem;
	-webkit-transition-duration: 0.4s;
	transition-duration: 0.4s;
	outline: none;

	&:hover {
		background-color: ${props => props.theme.mui.palette.primary.dark};
		color: white;
	}

	@media (max-width: 500px) {
		width: 80%;
		margin: 3%;
	}
`;

const ProfileHeader = styled.h2`
	width: 80%;
	color: ${props => props.theme.mui.palette.secondary.main};
	font-size: 2.5rem;
	margin: 2% auto;
	text-align: center;

	@media (max-width: 500px) {
		color: ${props => props.theme.mui.palette.primary.dark};
	}
`;

const StatusMessage = styled.h2`
	width: 80%;
	color: ${props => props.theme.mui.palette.secondary.main};
	font-size: 2.5rem;
	margin: 2% auto;
	text-align: center;

	@media (max-width: 500px) {
		color: ${props => props.theme.mui.palette.primary.dark};
	}
`;

const UsernameContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	padding: 3%;
	background-color: ${props => props.theme.mui.palette.secondary.light};
	border-radius: 5px;

	@media (max-width: 500px) {
		width: 100%;
		text-align: center;
	}
`;

const UsernameHeader = styled.h1`
	align-self: center;
	color: ${props => props.theme.mui.palette.primary.dark};
	font-size: 4rem;

	@media (max-width: 500px) {
		color: ${props => props.theme.mui.palette.primary.dark};
	}
`;

const UsernameForm = styled.form`
	display: flex;
	flex-direction: column;

	@media (max-width: 500px) {
		width: 100%;
	}
`;

const StyledInput = styled.input`
	padding: 12px 20px;
	margin: 8px 0;

	&:focus {
		outline: none;
	}

	@media (max-width: 500px) {
		width: 80%;
		margin: 3%;
		align-self: center;
		border: 1px solid ${props => props.theme.mui.palette.primary.dark}
	}
`;

const UsernameButton = styled.input`
	background-color: white;
	border: 1px solid ${props => props.theme.mui.palette.primary.dark};
	border-radius: 5px;
	padding: 15px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 1.6rem;
	-webkit-transition-duration: 0.4s;
	transition-duration: 0.4s;
	outline: none;

	&:hover {
		background-color: ${props => props.theme.mui.palette.primary.dark};
		color: white;
	}

	@media (max-width: 500px) {
		width: 80%;
		margin: 3%;
		align-self: center;
	}
`;

const TextButton = styled.p`
	font-size: 1.6rem;
	margin: 2% 0%;

	&:hover {
		cursor: pointer;
	}
`;

class UserSettings extends Component {
	state = {
		username: '',
		img_url: null,
		open: false,
		input: ''
	};
	handleChange = e => {
		this.setState({ ...this.state, input: e.target.value });
	};

	handleSearch = e => {
		e.preventDefault();
		const searchTerm = this.state.input;
		console.log(searchTerm);
		//call featch search results action
		//push to search page
		this.props.fetchSearchResults(searchTerm);
		this.props.history.push(`/search?query=${searchTerm}`);
	};
	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	singleFileChangedHandler = event => {
		this.setState({
			selectedFile: event.target.files[0]
		});
	};

	singleFileUploadHandler = event => {
		event.preventDefault();
		const data = new FormData();
		// If file selected
		if (this.state.selectedFile) {
			data.append(
				'image',
				this.state.selectedFile,
				this.state.selectedFile.name
			);
			axios
				.post(
					(process.env.REACT_APP_BACKEND || 'http://localhost:5000') +
						`/api/projects/image-upload`,
					data,
					{
						headers: {
							accept: 'application/json',
							'Accept-Language': 'en-US,en;q=0.8',
							'Content-Type': `multipart/form-data; boundary=${data._boundary}`
						}
					}
				)
				.then(response => {
					if (200 === response.status) {
						// If file size is larger than expected.
						if (response.data.error) {
							if ('LIMIT_FILE_SIZE' === response.data.error.code) {
								// this.ocShowAlert("Max size: 2MB", "red");
							} else {
								console.log(response.data.location);
								// If not the given file type
								// this.ocShowAlert(response.data.error, "red");
							}
						} else {
							// Success
							let fileName = response.data;

							let photo = response.data.location;
							this.setState({
								img_url: photo
							});
							console.log('filedata', fileName);

							console.log('photo', photo);

							this.props.getProfilePic(this.state.img_url);

							this.setState({
								selectedFile: null
							});

							//   this.ocShowAlert("File Uploaded", "#3089cf");
						}
					} else {
						console.log('error');
					}
				})
				.catch(error => {
					// If another error
					console.log('error');
				});
		}
	};

	submitHandler = event => {
		event.preventDefault();
		this.props.getUsername(this.state.username);
		this.setState({
			username: ''
		});
	};

	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { classes } = this.props;
		return (
			<SettingsPageContainer>
				<Header
					handleChange={this.handleChange}
					handleSearch={this.handleSearch}
				/>
				<SettingsContainer>
					<ProfileImgHolder>
						<ProfileImg src={this.props.userInfo.img_url} />
					</ProfileImgHolder>
					<ProfileForm>
						<div>
							<FileButton htmlFor="fileupload">Choose File</FileButton>
							<input
								id="fileupload"
								type="file"
								style={{ display: 'none' }}
								onChange={this.singleFileChangedHandler}
							/>
						</div>
						<div>
							<UploadButton onClick={this.singleFileUploadHandler}>
								Upload
							</UploadButton>
						</div>
					</ProfileForm>
					{this.state.selectedFile ? (
						<ProfileHeader>{this.state.selectedFile.name}</ProfileHeader>
					) : null}
					{this.props.gettingProfilePic ? (
						<ReactLoading type="bubbles" color="#000" />
					) : null}
					<StatusMessage>
						{this.props.img_url
							? this.props.img_url
							: this.props.profilepic_error}
					</StatusMessage>
					<UsernameContainer>
						<UsernameHeader>{this.props.userInfo.username}</UsernameHeader>
						<UsernameForm onSubmit={this.submitHandler}>
							<StyledInput
								type="text"
								value={this.state.username}
								name="username"
								onChange={this.changeHandler}
							/>
							<UsernameButton type="submit" value="Change Username" />
						</UsernameForm>
						<StatusMessage>
							{this.props.username_error ? this.props.username_error : null}
						</StatusMessage>
					</UsernameContainer>

					<TextButton onClick={this.handleOpen}>
						Configure Text Nofications
					</TextButton>
					<Modal
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
						open={this.state.open}
						onClose={this.handleClose}
					>
						<div className={classes.paper}>
							<Twillio />
						</div>
					</Modal>
				</SettingsContainer>
			</SettingsPageContainer>
		);
	}
}

UserSettings.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	gettingUsername: state.settingsReducer.gettingUsername,
	username: state.settingsReducer.username,
	username_error: state.settingsReducer.username_error,
	gettingProfilePic: state.settingsReducer.gettingProfilePic,
	img_url: state.settingsReducer.img_url,
	profilepic_error: state.settingsReducer.profilepic_error,
	userInfo: state.loggedInReducer.userInfo
});

export default compose(
	connect(
		mapStateToProps,
		{ getUsername, getProfilePic, fetchSearchResults }
	),
	withStyles(styles)
)(UserSettings);
