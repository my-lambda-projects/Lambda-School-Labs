// Import Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';
// import { Link } from "react-router-dom";
//Import components
import { ReviewerTile } from '../../../components';
// import connect for reducers
import { connect } from 'react-redux';
import { getPopularReviewers } from '../../../actions/landingPageActions';

// styled-components

const PopularReviewersWrapper = styled.div`
	display: flex;
	flex-direction: column;
	/* background-color: ${props => props.theme.mui.palette.primary.light}; */
	background: white;
	padding: 12px 0 4px;
	border: 1px solid lightgray;
	border-radius: 4px;
	margin-bottom: 30px;

	@media (max-width: 500px) {
		width: 100%;
	}
`;

const PopularReviewersListTiles = styled.div`
	display: flex;
	flex-wrap: wrap;
	/* justify-content: space-between; */

	@media (max-width: 500px) {
		width: 100%;
		align-self: center;
	}
`;

const PopularReviewersTitle = styled.h1`
	font-size: 22px;
	font-weight: bold;
	width: 100%;
	color: ${props => props.theme.mui.palette.primary.dark};
	margin: 4px 0 16px 2%;

	@media (max-width: 500px) {
		width: 80%;
		margin: 15px auto;
		text-align: center;
		font-weight: bold;
	}
`;

class PopularReviewers extends Component {
	componentDidMount() {
		this.props.getPopularReviewers();
	}
	render() {
		return (
			<PopularReviewersWrapper>
				<PopularReviewersTitle>Popular Reviewers</PopularReviewersTitle>
				<PopularReviewersListTiles>
					{this.props.popularReviewers.map(reviewer => (
						<ReviewerTile
							getProjectsByReviewer={this.props.getProjectsByReviewer}
							reviewer={reviewer}
							key={reviewer.user_id}
						/>
					))}
				</PopularReviewersListTiles>
			</PopularReviewersWrapper>
		);
	}
}

const mapStateToProps = state => ({
	popularReviewers: state.landingPageReducer.popularReviewers,
	gettingPopularReviewers: state.landingPageReducer.fetchingPopularReviewers,
	popularReviewersError: state.landingPageReducer.popularReviewersError
});

export default connect(
	mapStateToProps,
	{ getPopularReviewers }
)(PopularReviewers);
