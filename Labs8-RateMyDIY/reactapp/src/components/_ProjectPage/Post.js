// Dependencies
import React, { Component } from 'react';
import ModalImage from 'react-modal-image';
import { Button } from 'reactstrap';
// Components
import { Fileupload } from '../../components';

// Styles
import styled from 'styled-components';

const PostContainer = styled.div`
`;

const PostForm = styled.form``;

const TextInput = styled.input``;

const CancelButton = styled.button``;

const SubmitInput = styled.input``;

const ImgUrlInput = styled.div``;

const Img = styled(ModalImage)`
  margin: 0 auto;
	background: white;
  width: auto;
  height: auto;
`;

const ImgContainer = styled.div`
  margin: auto;
	width: 700px;
	height: auto;
`;

const Text = styled.p`
	width: 100%;
	background: lightblue;
	padding: 10px 10px;
	margin: 0 auto 20px auto;
	box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

const EditDeleteButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: -12px auto 20px auto;
`;

const EditButton = styled(Button)`
	display: flex;
	width: auto;
	margin: 0 auto 0 auto;
`;

const DeleteButton = styled(Button)`
	display: flex;
	width: auto;
	margin: 0 auto 0 auto;
`;

class Post extends Component {
	state = {};

	// This isn't finished yet.
	clickHandler = event => {
		event.preventDefault();
		this.setState({
			[event.target.name]: true
		});

		// If we're editing the post, add it to the state.
		if (this.state.editProject) {
			this.setState({
				text: this.props.post.text,
				img_url: this.props.post.img_url
			});
		}
	};

	// Keep form data in the state
	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		return (
			<PostContainer>
				{this.props.newText ? (
					<PostForm>
						<p>You can later add an image to this post</p>
						<TextInput
							name="text"
							type="text"
							placeholder="new text field"
							value={this.state.text}
							onChange={this.changeHandler}
							required
							autoFocus
						/>
						<CancelButton
							name="cancel"
							value="Cancel"
							onClick={this.props.clickHandler}
						/>
						<SubmitInput type="submit" value="Add New Text Field" />
					</PostForm>
				) : this.props.newImage ? (
					<PostForm>
						<ImgUrlInput
							// allow uploads to aws later
							name="img_url"
							type="file"
							placeholder="choose a file"
							value={this.state.img_url}
							onChange={this.changeHandler}
							required
							autoFocus
						/>
						<TextInput
							name="text"
							type="text"
							placeholder="optional text description"
							value={this.state.text}
							onChange={this.changeHandler}
						/>
						<CancelButton
							name="cancel"
							value="Cancel"
							onClick={this.props.clickHandler}
						/>
						<SubmitInput type="submit" value="Add New Image" />
					</PostForm>
				) : this.state.editPost ? (
					<PostForm>
						<ImgUrlInput
							// allow uploads to aws later
							name="img_url"
							type="text"
							placeholder="image url"
							value={this.state.img_url}
							onChange={this.changeHandler}
							required
						/>
						<TextInput
							name="text"
							type="text"
							placeholder="text field"
							value={this.state.text}
							onChange={this.changeHandler}
							required
						/>
						<SubmitInput type="submit" value="Update Post" />
						<CancelButton
							name="cancel"
							value="Cancel"
							onClick={this.props.clickHandler}
						/>
					</PostForm>
				) : (
								<React.Fragment>
									{this.props.post.img_url && (
										<ImgContainer>
											<Img
												small={props.project.img_url}
												large={props.project.img_url}
												alt={props.project.project_name}
											/>
										</ImgContainer>
									)}
									{this.props.post.text && <Text>{this.props.post.text}</Text>}
									{this.props.owner && (
										<EditDeleteButtonContainer>
											<EditButton disabled={this.props.disabled}>
												Edit Post
								</EditButton>
											<DeleteButton disabled={this.props.disabled}>
												Delete Post
								</DeleteButton>
										</EditDeleteButtonContainer>
									)}
								</React.Fragment>
							)}
			</PostContainer>
		);
	}
}

export default Post;
