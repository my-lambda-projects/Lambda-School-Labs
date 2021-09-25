// Dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import {
	Project,
	EditProject,
	Post,
	NewPost,
	EditPost,
	ReviewModal,
	ConfirmModal,
	Header,
	ScrollToTopOnMount
} from '../../components';

// Actions
import { loggedIn, project_ReviewId_Chain, deleteProject } from '../../actions';

// Styles
import styled from 'styled-components';

class ProjectPage extends Component {
	state = {
		loginUrl:
			(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/signin`,
		loginRedirect: false
	};

	// Delete project (with confirmation prompt)
	deleteHandler = event => {
		event.preventDefault();

		// Trigger confirmation modal
		this.setState({
			confirm: {
				text: [
					'Are you sure? This cannot be undone.',
					'Cancel',
					'Delete Project'
				],
				cancel: event => {
					event.preventDefault();
					this.setState({ confirm: undefined });
				},
				submit: event => {
					event.preventDefault();

					this.props.deleteProject(
						this.props.project.project_id,
						this.props.userInfo.user_id,
						() => this.setState({ redirect: '/' })
					);
					this.setState({ confirm: undefined });
				}
			}
		});
	};

	// Redirect to signup (this doesn't work yet)
	notLoggedInHandler = () => {
		this.setState({
			confirm: {
				text: [`Please Log in to add a review`, 'Cancel', 'Login'],
				cancel: event => {
					event.preventDefault();
					this.setState({ confirm: undefined });
				},
				submit: event => {
					event.preventDefault();
					this.setState(
						{
							//redirect: this.state.loginUrl,
							redirect: '/',
							loginRedirect: true
						},
						console.log(this.state.loginRedirect)
					);
				}
			}
		});
	};

	componentDidMount() {
		// Check if user is logged in, then get project and review_id if it exists
		// - Currently goes through three request/response cycles (once for login check, once for project data, once for review id) - can definitely by improved!
		this.props.loggedIn(
			project_ReviewId_Chain,
			this.props.match.params.project_id
		);
	}

	render() {
		// Evaluates to true if user is author of project
		const owner = this.props.project.user_id === this.props.userInfo.user_id;

		// Disable other buttons if there is an active form
		const disabled =
			this.state.gettingProject ||
			this.props.updatingProject ||
			this.state.projectToUpdate ||
			this.state.postToAdd ||
			this.state.postToUpdate ||
			this.state.postToDelete;

		return (
			<ProjectPageHeaderContainer>
				{/* Redirect functionality */}
				{this.state.redirect && <Redirect push to={this.state.redirect} />}

				<ScrollToTopOnMount />

				<Header history={this.props.history} />

				<ProjectPageContainer>
					<ProjectContainer>
						{/* Loading the project? */}
						{this.props.gettingUserInfo ||
						this.props.gettingReviewId ||
						(this.props.gettingProject &&
							!(
								this.props.updatingProject ||
								this.state.projectToUpdate ||
								this.state.postToAdd ||
								this.state.postToUpdate ||
								this.state.postToDelete
							)) ? (
							// Display loading status
							<React.Fragment>
								<StatusMessage>Loading project...</StatusMessage>
							</React.Fragment>
						) : // Error loading project?
						this.props.gettingUserInfoError ||
						  this.props.gettingProjectError ||
						  this.props.gettingReviewIdError ? (
							// Display error
							<React.Fragment>
								<StatusMessage>Failed to load project</StatusMessage>
								<StatusMessage error>
									{this.props.gettingUserInfoError ||
										this.props.gettingProjectError ||
										this.props.gettingReviewIdError}
								</StatusMessage>
							</React.Fragment>
						) : // Error deleting project?
						this.props.deletingProjectError ? (
							// Display error
							<React.Fragment>
								<StatusMessage>Failed to delete project</StatusMessage>
								<StatusMessage error>
									{this.props.gettingProjectError}
								</StatusMessage>
							</React.Fragment>
						) : (
							<React.Fragment>
								{/* Editing project? */}
								{this.state.projectToUpdate ? (
									// Display editable project
									<EditProject
										user_id={this.props.userInfo.user_id}
										project={this.props.project}
										willUpdateProject={value =>
											this.setState({ projectToUpdate: value })
										}
									/>
								) : (
									// Display project
									<Project
										project={this.props.project}
										owner={owner}
										willUpdateProject={value =>
											this.setState({ projectToUpdate: value })
										}
										deleteHandler={this.deleteHandler}
										disabled={disabled}
									/>
								)}

								{/* Any posts? */}
								{this.props.project.posts &&
									// Display posts
									this.props.project.posts.map(post =>
										// Is this post being edited?
										post.post_id === this.state.postToUpdate ? (
											// Display editable post
											<EditPost
												key={post.post_id}
												user_id={this.props.userInfo.user_id}
												project_id={this.props.project.project_id}
												post={post}
												willUpdatePost={value =>
													this.setState({ postToUpdate: value })
												}
											/>
										) : (
											// Display post
											<Post
												key={post.post_id}
												post={post}
												user_id={this.props.userInfo.user_id}
												project_id={this.props.project.project_id}
												owner={owner}
												willUpdatePost={value =>
													this.setState({ postToUpdate: value })
												}
												willDeletePost={value =>
													this.setState({ postToDelete: value })
												}
												postToDelete={post.post_id === this.state.postToDelete}
												disabled={disabled}
											/>
										)
									)}

								{/* Adding a new post? */}
								{this.state.postToAdd && (
									// Display newPost component
									<NewPost
										postType={this.state.postToAdd}
										user_id={this.props.userInfo.user_id}
										project_id={this.props.project.project_id}
										willAddPost={value => this.setState({ postToAdd: value })}
									/>
								)}

								{/* Is the user the author? */}
								{owner ? (
									// Display edit/delete buttons
									<ButtonContainer>
										<ProjectButton
											onClick={() => this.setState({ postToAdd: 'text' })}
											disabled={disabled}
										>
											Add Text Field
										</ProjectButton>
										<ProjectButton
											onClick={() => this.setState({ postToAdd: 'image' })}
											disabled={disabled}
										>
											Add Picture
										</ProjectButton>
									</ButtonContainer>
								) : // Has the user reviewed this post?
								this.props.reviewId ? (
									// Display button to view review
									<ReviewButton
										onClick={() =>
											this.setState({ reviewModal: this.props.reviewId })
										}
										disabled={this.props.gettingReviewId}
									>
										View Your Review
									</ReviewButton>
								) : (
									// Display button to add review
									<ReviewButton
										onClick={() =>
											this.props.userInfo.user_id
												? this.setState({ reviewModal: 'new' })
												: this.notLoggedInHandler()
										}
										disabled={this.props.gettingReviewId}
									>
										Review Project
									</ReviewButton>
								)}
							</React.Fragment>
						)}

						{/* Show the review modal? */}
						{this.state.reviewModal && (
							// Display review modal
							<ReviewModal
								review_id={this.props.reviewId}
								showReviewModal={value => this.setState({ reviewModal: value })}
								project={this.props.project}
							/>
						)}

						{/* Show the confirmation modal? */}
						{this.state.confirm && (
							// Display confirmation modal
							<ConfirmModal confirm={this.state.confirm} />
						)}
						{/* Deleting the project? */}
						{this.props.deletingProject && (
							// Display deleting status
							<ConfirmModal statusMessage={'Deleting project...'} />
						)}
					</ProjectContainer>
				</ProjectPageContainer>
			</ProjectPageHeaderContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state.loggedInReducer.userInfo,

		gettingUserInfo: state.loggedInReducer.gettingUserInfo,
		gettingUserInfoError: state.loggedInReducer.gettingUserInfoError,

		project: state.projectReducer.project,

		gettingProject: state.projectReducer.gettingProject,
		gettingProjectError: state.projectReducer.gettingProjectError,

		reviewId: state.reviewReducer.reviewId,

		gettingReviewId: state.reviewReducer.gettingReviewId,
		gettingReviewIdError: state.reviewReducer.gettingReviewIdError,

		deletingProject: state.projectReducer.deletingProject,
		deletingProjectError: state.projectReducer.deletingProjectError
	};
};

export default connect(
	mapStateToProps,
	{
		loggedIn,
		project_ReviewId_Chain,
		deleteProject
	}
)(ProjectPage);

// Styled components
const ProjectPageHeaderContainer = styled.div`
	width: 100%;
`;

const ProjectPageContainer = styled.div`
	display: flex;
	justify-content: center;
	margin: 100px auto;
	width: 100%;
`;

const ProjectContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	min-width: 20%;
	width: 50%;
	max-width: 750px;
`;

const StatusMessage = styled.p``;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 20px;
`;

const ProjectButton = styled.button`
	display: flex;
	max-height: 100px;
	max-width: 100px;
	height: 100px;
	width: 100px;
	border-radius: 50%;
	align-items: center;
	justify-content: center;
	border: 3px lightgray solid;
	:hover {
		background: purple;
	}
`;

const ReviewButton = styled.button`
	font-size: 1.25em;
	font-weight: 700;
	color: white;
	background-color: #254f8d;
	padding: 10px 15px 10px 15px;
	cursor: pointer;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

	&:hover {
		outline: 1px dotted #000;
		outline: -webkit-focus-ring-color auto 5px;
		background-color: #1c293b;
	}
`;