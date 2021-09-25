// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { ConfirmModal } from '../../components';

// Actions
import { addReview } from '../../actions';

// Styles
import styled from 'styled-components';

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

const CloseModalButton = styled.button`
	align-self: flex-end;
`;

const ReviewForm = styled.form`
	display: flex;
	flex-direction: column;
`;

const StarContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-self: center;
	width: 100px;
	margin: 20px 0;
`;

const Img = styled.img`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 250px;
	height: 250px;
	background: #cceeee;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const ProjectTitle = styled.h2``;

const Reviewer = styled.h3``;

const TextArea = styled.textarea`
	height: 160px;
	resize: none;
	margin-bottom: 20px;
`;

const StatusMessage = styled.p``;

const CancelButton = styled.button``;

const SubmitInput = styled.input`
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

class NewReview extends Component {
	state = {
		rating: null,
		text: ''
	};

	// Keep form data in the state
	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// Submit new review
	submitHandler = event => {
		event.preventDefault();

		this.props.addReview({
			user_id: this.props.user_id,
			project_id: this.props.project.project_id,
			rating: this.state.rating,
			text: this.state.text
		});
	};

	// Cancel new review (with confirmation prompt)
	cancelHandler = event => {
		event.preventDefault();

		if (this.state.rating || this.state.text) {
			this.setState({
				confirm: {
					text: ['Do you want to discard these changes?'],
					cancel: event => {
						event.preventDefault();
						this.setState({ confirm: undefined });
					},
					submit: event => {
						event.preventDefault();
						this.props.showReviewModal(false);
					}
				}
			});
		} else {
			this.props.showReviewModal(false);
		}
	};

	render() {
		const disabled = this.props.addingReview || this.props.gettingReview;

		return (
			<ModalShade
				onClick={event => {
					event.stopPropagation();
					if (!this.state.confirm) this.cancelHandler(event);
				}}
			>
				<ModalBox onClick={event => event.stopPropagation()}>
					<CloseModalButton onClick={this.cancelHandler}>x</CloseModalButton>

					{/* todo: click outside modal to trigger cancelHandler */}
					<ReviewForm onSubmit={this.submitHandler}>
						<ProjectTitle>{`@${this.props.project.username}'s ${
							this.props.project.project_name
						}`}</ProjectTitle>

						<Reviewer>{`Review by: @${this.props.username}`}</Reviewer>

						<Img
							src={this.props.project.img_url}
							alt={this.props.project.img_url || 'project image'}
						/>

						<StarContainer>
							<input
								type="radio"
								name="rating"
								value="1"
								onChange={this.changeHandler}
								required
							/>
							<input
								type="radio"
								name="rating"
								value="2"
								onChange={this.changeHandler}
								required
							/>
							<input
								type="radio"
								name="rating"
								value="3"
								onChange={this.changeHandler}
								required
							/>
							<input
								type="radio"
								name="rating"
								value="4"
								onChange={this.changeHandler}
								required
							/>
							<input
								type="radio"
								name="rating"
								value="5"
								onChange={this.changeHandler}
								required
							/>
						</StarContainer>

						<TextArea
							name="text"
							type="text"
							placeholder="review text"
							value={this.state.text}
							onChange={this.changeHandler}
							required
							autoFocus
						/>

						{(this.props.addingReview || this.props.gettingReview) && (
							<StatusMessage>Adding review...</StatusMessage>
						)}
						{this.props.addingReviewError && (
							<StatusMessage>{this.props.addingReviewError}</StatusMessage>
						)}

						<ButtonContainer>
							<CancelButton onClick={this.cancelHandler} disabled={disabled}>
								Cancel
							</CancelButton>
							<SubmitInput
								type="submit"
								value="Submit Review"
								disabled={disabled}
							/>
						</ButtonContainer>

						{this.state.confirm && (
							<ConfirmModal confirm={this.state.confirm} />
						)}
					</ReviewForm>
				</ModalBox>
			</ModalShade>
		);
	}
}

const mapStateToProps = state => {
	return {
		gettingReview: state.reviewReducer.gettingReview,

		addingReview: state.reviewReducer.addingReview,
		addingReviewError: state.reviewReducer.addingReviewError,

		reviewModal: state.reviewReducer.reviewModal
	};
};

export default connect(
	mapStateToProps,
	{
		addReview
	}
)(NewReview);
