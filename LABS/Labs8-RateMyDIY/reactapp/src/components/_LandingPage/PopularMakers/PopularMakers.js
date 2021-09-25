// Import Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';
//Import components
import { MakerTile } from '../../../components';
// import connect for reducers
import { connect } from 'react-redux';
import { getPopularMakers } from '../../../actions/landingPageActions';

// styled components
const PopularMakersWrapper = styled.div`
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

const PopularMakerListTiles = styled.div`
	display: flex;
	flex-wrap: wrap;
	/* justify-content: space-between; */

	@media (max-width: 500px) {
		width: 100%;
		align-self: center;
	}
`;

const PopularMakersTitle = styled.h1`
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

class PopularMakers extends Component {
	componentDidMount() {
		this.props.getPopularMakers();
	}
	render() {
		return (
			<PopularMakersWrapper>
				<PopularMakerListTiles>
					<PopularMakersTitle>Popular Makers</PopularMakersTitle>
					{this.props.popularMakers.map(maker => (
						<MakerTile
							fetchSearchResults={this.props.fetchSearchResults}
							maker={maker}
							key={maker.user_id}
						/>
					))}
				</PopularMakerListTiles>
			</PopularMakersWrapper>
		);
	}
}

const mapStateToProps = state => ({
	popularMakers: state.landingPageReducer.popularMakers,
	gettingPopularMakers: state.landingPageReducer.gettingPopularMakers,
	popularMakersError: state.landingPageReducer.popularMakersError
});

export default connect(
	mapStateToProps,
	{ getPopularMakers }
)(PopularMakers);
