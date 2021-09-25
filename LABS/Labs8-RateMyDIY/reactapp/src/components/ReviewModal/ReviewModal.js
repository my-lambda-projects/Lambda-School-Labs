// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Assets
import thumbup from '../../assets/images/thumbup.png';
import thumbupBlue from '../../assets/images/thumbup-blue.png';
import thumbdown from '../../assets/images/thumbdown.png';
import thumbdownRed from '../../assets/images/thumbdown-red.png';

// Components
import { NewReview, EditReview, ConfirmModal } from '../../components';

// Actions
import { getReview, deleteReview, likeReview } from '../../actions';

// Styles
import styled, { css } from 'styled-components';
import StarCount from '../StarCount/StarCount';

const ReviewModalContainer = styled.div``;

const ModalShade = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(200, 200, 200, 0.75);
`;

const ModalBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	top: 50%;
	left: 50%;
	width: 440px;
	height: 590px;
	background: white;
	padding: 20px;
	border: 2px solid #9a9a9a;
	transform: translate(-50%, -50%);
`;

const Img = styled.img`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 250px;
	height: 250px;
	background: #cceeee;
	margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
`;

const ReviewContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const CloseModalButton = styled.button`
	align-self: flex-end;
`;

const ProjectTitle = styled.h2``;

const Reviewer = styled.h3``;

const ReviewText = styled.p`
	width: 100%;
	height: 160px;
	background: #cceeee;
	margin: 16px 0 20px;
	resize: none;
`;

const EditButton = styled.button``;

const DeleteButton = styled.button``;

const LikeContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	font-size: 1.6rem;
`;

const HelpfulText = styled.p`
	padding-top: 8px;
`;

const Like = styled.img`
	height: 30px;
	width: 24px;
	padding-bottom: 6px;
	margin-right: 16px;
	cursor: pointer;
	${props =>
		props.small &&
		css`
			padding: 2px 2px 8px;
		`};
`;

const Dislike = styled.img`
	height: 30px;
	width: 24px;
	padding-top: 6px;
	margin-left: 16px;
	cursor: pointer;
	${props =>
		props.small &&
		css`
			padding: 8px 2px 2px;
		`};
`;

const StatusMessage = styled.p``;

class ReviewModal extends Component {
	state = {};

	// Delete project (with confirmation prompt)
	deleteHandler = event => {
		event.preventDefault();

		this.setState({
			confirm: {
				text: [
					'Are you sure? This cannot be undone.',
					'Cancel',
					'Delete Review'
				],
				cancel: event => {
					event.preventDefault();
					this.setState({ confirm: undefined });
				},
				submit: event => {
					event.preventDefault();

					this.props.deleteReview(
						this.props.userInfo.user_id,
						this.props.review.review_id,
						() => this.props.showReviewModal(false)
					);
					this.setState({ confirm: undefined });
				}
			}
		});
	};

	// Like, dislike, or remove like from review
	likeHandler = like => {
		this.props.likeReview({
			user_id: this.props.userInfo.user_id,
			review_id: this.props.review_id,
			like: like === this.props.review.like ? undefined : like
		});
	};

	componentDidMount() {
		if (this.props.review_id)
			this.props.getReview(this.props.review_id, this.props.userInfo.user_id);
	}

	// Todo:
	// Don't close EditReview until !gettingReview.

	render() {
		return (
			<ReviewModalContainer>
				{this.props.review_id && !this.state.reviewToUpdate ? (
					<ModalShade
						onClick={event => {
							event.stopPropagation();
							if (!this.state.confirm) this.props.showReviewModal(false);
						}}
					>
						<ModalBox onClick={event => event.stopPropagation()}>
							<CloseModalButton
								onClick={() => this.props.showReviewModal(false)}
							>
								x
							</CloseModalButton>
							<ReviewContainer>
								{this.props.gettingReview ? (
									<StatusMessage>Loading review...</StatusMessage>
								) : this.props.gettingReviewError ? (
									<StatusMessage>{this.props.gettingReviewError}</StatusMessage>
								) : (
									<React.Fragment>
										<ProjectTitle>{`@${this.props.review.maker_name}'s ${
											this.props.review.project_name
										}`}</ProjectTitle>
										<Reviewer>{`Review by: @${
											this.props.review.reviewer_name
										}`}</Reviewer>
										<Img
											src={this.props.review.img_url}
											alt={this.props.review.img_url || 'project image'}
										/>
										<StarCount rating={this.props.review.rating} />
										<ReviewText>{this.props.review.text}</ReviewText>

										{this.props.deletingReviewError && (
											<StatusMessage error>
												{this.props.deletingReviewError}
											</StatusMessage>
										)}
										{this.props.likingReviewError && (
											<StatusMessage>
												Error: could not update like data
											</StatusMessage>
										)}

										{this.props.review.reviewer_id ===
										this.props.userInfo.user_id ? (
											<ButtonContainer>
												<EditButton
													onClick={() =>
														this.setState({ reviewToUpdate: true })
													}
												>
													Edit Review
												</EditButton>
												<DeleteButton onClick={this.deleteHandler}>
													Delete Review
												</DeleteButton>
											</ButtonContainer>
										) : (
											<LikeContainer>
												<Like
													src={
														this.props.review.like === 1 ? thumbupBlue : thumbup
													}
													small={this.props.likingReview}
													alt="thumbup"
													onClick={() => {
														if (!this.props.likingReview) this.likeHandler(1);
													}}
												/>
												<HelpfulText>Helpful?</HelpfulText>
												<Dislike
													src={
														this.props.review.like === -1
															? thumbdownRed
															: thumbdown
													}
													small={this.props.likingReview}
													alt="thumbdown"
													onClick={() => {
														if (!this.props.likingReview) this.likeHandler(-1);
													}}
												/>
											</LikeContainer>
										)}
									</React.Fragment>
								)}
							</ReviewContainer>
						</ModalBox>
					</ModalShade>
				) : this.state.reviewToUpdate ? (
					<EditReview
						user_id={this.props.userInfo.user_id}
						review={this.props.review}
						willUpdateReview={value => this.setState({ reviewToUpdate: value })}
						showReviewModal={this.props.showReviewModal}
					/>
				) : this.props.project && this.props.userInfo.user_id ? (
					<NewReview
						user_id={this.props.userInfo.user_id}
						username={this.props.userInfo.username}
						project={this.props.project}
						showReviewModal={this.props.showReviewModal}
					/>
				) : (
					<StatusMessage>How did you get here? Tell Max.</StatusMessage>
				)}
				{this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
				{this.props.deletingReview && (
					<ConfirmModal statusMessage={'Deleting review...'} />
				)}
			</ReviewModalContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state.loggedInReducer.userInfo,

		review: state.reviewReducer.review,

		gettingReview: state.reviewReducer.gettingReview,
		gettingReviewError: state.reviewReducer.gettingReviewError,

		deletingReview: state.reviewReducer.deletingReview,
		deletingReviewError: state.reviewReducer.deletingReviewError,

		likingReview: state.reviewReducer.likingReview,
		likingReviewError: state.reviewReducer.likingReviewError
	};
};

export default connect(
	mapStateToProps,
	{
		getReview,
		deleteReview,
		likeReview
	}
)(ReviewModal);
