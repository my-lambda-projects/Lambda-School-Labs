import React, { Component } from 'react';
import axios from 'axios';

class fileupload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFile: null,
			imgSrc: null
		};
	}

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
				.post('http://localhost:5000/api/projects/image-upload', data, {
					headers: {
						accept: 'application/json',
						'Accept-Language': 'en-US,en;q=0.8',
						'Content-Type': `multipart/form-data; boundary=${data._boundary}`
					}
				})
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
								imgSrc: photo
							});
							console.log('filedata', fileName);

							console.log('photo', photo);

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

	render() {
		return (
			<form>
				<p className="card-text">Please upload an image for your profile</p>
				<input type="file" onChange={this.singleFileChangedHandler} />
				<div className="mt-5">
					<button
						className="btn btn-info"
						onClick={this.singleFileUploadHandler}
					>
						Upload!
					</button>
					<div>
						<img style={{ height: 400 }} src={this.state.imgSrc} alt="" />
					</div>
				</div>
			</form>
		);
	}
}

export default fileupload;
