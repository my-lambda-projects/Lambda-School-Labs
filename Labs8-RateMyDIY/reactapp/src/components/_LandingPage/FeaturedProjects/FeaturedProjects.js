// Import Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';
//Import components
import { ProjectTile, EmptyCard } from '../../../components';
// import connect for reducers
import { connect } from 'react-redux';
import { getFeaturedProjects } from '../../../actions/landingPageActions';

// styled components
const FeaturedProjectsWrapper = styled.div`
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
	margin: 4px 0 16px 2%;

	@media (max-width: 500px) {
		width: 80%;
		margin: 15px auto;
		text-align: center;
		font-weight: bold;
	}
`;

class FeaturedProjects extends Component {
	componentDidMount() {
		this.props.getFeaturedProjects();
	}

	render() {
		return (
			<FeaturedProjectsWrapper>
				<FeaturedProjectTitle>Featured Projects</FeaturedProjectTitle>
				<FeaturedProjectListTiles>
					{!this.props.featuredProjects[0] ? (
						<FeaturedProjectListTiles>
							<EmptyCard />
							<EmptyCard />
							<EmptyCard />
							<EmptyCard />
							<EmptyCard />
							<EmptyCard />
						</FeaturedProjectListTiles>
					) : (
						<FeaturedProjectListTiles>
							{this.props.featuredProjects.map(project => (
								<ProjectTile
									history={this.props.history}
									project={project}
									key={project.project_id}
								/>
							))}
						</FeaturedProjectListTiles>
					)}
				</FeaturedProjectListTiles>
			</FeaturedProjectsWrapper>
		);
	}
}

const mapStateToProps = state => ({
	featuredProjects: state.landingPageReducer.featuredProjects,
	gettingFeaturedProjects: state.landingPageReducer.fetchingFeaturedProjects,
	featuredProjectsError: state.landingPageReducer.featuredProjectsError
});

export default connect(
	mapStateToProps,
	{ getFeaturedProjects }
)(FeaturedProjects);
