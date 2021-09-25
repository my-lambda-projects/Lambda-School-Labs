// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { ConfirmModal } from '../../../components';

// Actions
import { deletePost } from '../../../actions';

// Styles
import styled from 'styled-components';

class Post extends Component {
	state = {};

	// Delete post (with confirmation prompt)
	deleteHandler = event => {
		event.preventDefault();

		this.props.willDeletePost(this.props.post.post_id);

		this.setState({
			confirm: {
				text: ['Are you sure? This cannot be undone.', 'Cancel', 'Delete Post'],
				cancel: event => {
					event.preventDefault();
					this.setState({ confirm: undefined });
					this.props.willDeletePost(false);
				},
				submit: event => {
					event.preventDefault();

					this.props.deletePost(
						this.props.post.post_id,
						this.props.project_id,
						this.props.user_id,
						() => this.props.willDeletePost(false)
					);

					this.setState({ confirm: undefined });
				}
			}
		});
	};

	render() {
		return (
			<PostContainer>
				<ImgTextContainer>
					{/* Does this post have an image? */}
					{this.props.post.img_url && (
						// Display image
						<Img alt={this.props.post.img_url} src={this.props.post.img_url} />
					)}
					{/* Does this post have text? */}
					{this.props.post.text && (
						// Display text
						<Text>{this.props.post.text}</Text>
					)}
					{this.props.owner && (
						<OptionsContainer>
							<EditLink
								onClick={() =>
									this.props.willUpdatePost(this.props.post.post_id)
								}
								disabled={this.props.disabled}
							>
								edit
							</EditLink>
							<DeleteLink
								onClick={this.deleteHandler}
								disabled={this.props.disabled}
							>
								delete
							</DeleteLink>
						</OptionsContainer>
					)}

					{this.props.postToDelete &&
						(this.props.deletingPost || this.props.gettingProject) && (
							<StatusMessage small>Deleting post...</StatusMessage>
						)}
					{this.props.postToDelete && this.props.deletingPostError && (
						<StatusMessage small error>
							{this.props.deletingPostError}
						</StatusMessage>
					)}

					{this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
				</ImgTextContainer>
			</PostContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		gettingProject: state.projectReducer.gettingProject,

		deletingPost: state.postReducer.deletingPost,
		deletingPostError: state.postReducer.deletingPostError
	};
};

export default connect(
	mapStateToProps,
	{
		deletePost
	}
)(Post);

// Styles

const PostContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 4px;
	width: 100%;
	border: 1px solid lightgray;
	padding: 20px 20px 18px;
	margin: 0 0 30px;
`;

const ImgTextContainer = styled.div``;

const Img = styled.img`
	background: #f6f6f6;
	max-height: 600px;
	width: 100%;
	margin: 0 0 18px;
	object-fit: contain;
`;

const Text = styled.p`
	width: auto;
	font-size: 1.4rem;
	line-height: 1.6rem;
`;

const OptionsContainer = styled.div`
	display: flex;
	margin: 8px 0 -6px 0;
	font-size: 1.4rem;
	width: auto;
	justify-content: flex-end;
`;

const StatusMessage = styled.p``;

const EditLink = styled.button`
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
	margin-right: 12px;
`;

const DeleteLink = styled.button`
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
`;
