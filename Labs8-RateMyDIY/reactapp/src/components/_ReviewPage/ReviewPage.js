// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import {
	Header,
	ReviewCard,
	ReviewModal,
	ScrollToTopOnMount
} from '../../components';

// Actions
import { loggedIn, getProjectReviews } from '../../actions';

// Styles
import styled from 'styled-components';

const ReviewPageHeaderContainer = styled.div`
	width: 100%;
`;

const ReviewPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 106px auto 30px;
	max-width: 1000px;
`;

const StatusMessage = styled.p``;

const FeaturedProjectsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	/* background-color: ${props => props.theme.mui.palette.primary.light}; */
	background: white;
	padding: 12px 0;
	border: 1px solid lightgray;
	border-radius: 8px;

	@media (max-width: 500px) {
		width: 100%;
	}
`;

const FeaturedProjectListTiles = styled.div`
	display: flex;
	flex-wrap: wrap;
	/* justify-content: space-between; */

	@media (max-width: 500px) {
		width: 100%;
		align-self: center;
	}
`;

const FeaturedProjectTitle = styled.h1`
	font-size: 22px;
	font-weight: bold;
	width: 100%;
	color: ${props => props.theme.mui.palette.primary.dark};
	margin: 0 0 13px 2%;

	@media (max-width: 500px) {
		width: 80%;
		margin: 15px auto;
		text-align: center;
		font-weight: bold;
	}
`;

class ReviewPage extends Component {
	state = {};

	componentDidMount() {
		this.props.userInfo.user_id
			? this.props.getProjectReviews(
					this.props.userInfo.user_id,
					this.props.match.params.project_id
			  )
			: this.props.loggedIn(
					getProjectReviews,
					this.props.match.params.project_id
			  );
	}

	render() {
		return (
			<ReviewPageHeaderContainer>
				<ScrollToTopOnMount />
				<Header history={this.props.history} />
				<ReviewPageContainer>
					{this.props.gettingProjectReviews || this.props.gettingUserInfo ? (
						<StatusMessage>Loading reviews...</StatusMessage>
					) : this.props.gettingProjectReviewsError ||
					  this.props.gettingUserInfoError ? (
						<StatusMessage>{`Failed to load reviews\n${this.props
							.gettingProjectReviewsError ||
							this.props.gettingUserInfoError}`}</StatusMessage>
					) : (
						<FeaturedProjectsWrapper>
							{this.props.reviews && (
								<FeaturedProjectTitle>
									{this.props.reviews[0] ? (
										`Reviews for ${this.props.reviews[0].project_name} by ${
											this.props.reviews[0].maker_name
										}`
									) : (
										<React.Fragment>
											<p style={{ margin: '14px 0 20px' }}>
												No reviews to display
											</p>
											<Link
												to={`/project/${this.props.match.params.project_id}`}
												style={{
													background: 'none',
													textDecoration: 'none'
												}}
											>
												Go back
											</Link>
										</React.Fragment>
									)}
								</FeaturedProjectTitle>
							)}
							<FeaturedProjectListTiles>
								{this.props.reviews
									? this.props.reviews.map(review => (
											<ReviewCard
												review={review}
												key={review.review_id}
												showReviewModal={value =>
													this.setState({ reviewModal: value })
												}
											/>
									  ))
									: `falkjhgkljsad`}
							</FeaturedProjectListTiles>
						</FeaturedProjectsWrapper>
					)}
					{this.state.reviewModal && (
						<ReviewModal
							review_id={this.state.reviewModal}
							showReviewModal={value => this.setState({ reviewModal: value })}
						/>
					)}
				</ReviewPageContainer>
			</ReviewPageHeaderContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state.loggedInReducer.userInfo,

		gettingUserInfo: state.loggedInReducer.gettingUserInfo,
		gettingUserInfoError: state.loggedInReducer.gettingUserInfoError,

		reviews: state.projectReducer.reviews,

		gettingProjectReviews: state.projectReducer.gettingProjectReviews,
		gettingProjectReviewsError: state.projectReducer.gettingProjectReviewsError
	};
};

export default connect(
	mapStateToProps,
	{
		loggedIn,
		getProjectReviews
	}
)(ReviewPage);
