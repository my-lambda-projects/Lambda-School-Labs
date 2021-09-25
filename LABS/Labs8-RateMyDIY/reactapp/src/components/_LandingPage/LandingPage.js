// Import Dependencies
import React, { Component } from 'react';
// import { NavLink, Link, Route } from "react-router-dom";
import styled from 'styled-components';
//Added Redux imports
import {
	fetchSearchResults,
	fetchProjectsByReviewer
} from '../../actions/index';
import { connect } from 'react-redux';
import MenuDrawer from '../MenuDrawer/MenuDrawer';
import { Link } from 'react-router-dom';

import plusIcon from '../../assets/images/plus-icon.svg';

// ReactStrap
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

//Import components
import {
	Nav,
	ScrollToTopOnMount,
	FeaturedProjects,
	PopularMakers,
	PopularReviewers,
	SearchBar,
	// Twillio,
	Footer,
	LogInPopUp,
	SearchTags
} from '../../components';

// styled-components
const LandingPageContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 30px auto;
	max-width: 1000px;
	background-color: ${props => props.theme.mui.palette.primary.main};

	@media (max-width: 1000px) {
		max-width: 700px;
		/* margin: 30px 2%; */
	}
`;
const LandingPageWrapper = styled.div`
	width: 100%;
	background-color: ${props => props.theme.mui.palette.primary.main};

	@media (max-width: 680px) {
		width: 100vw;
	}
`;

const imgUrl =
	'http://talebgroup.wwwnlssr4.supercp.com/wp-content/uploads/2018/01/carpentary-3-1-1024x648.jpg';

const HeroImageContainer = styled.div`
	width: 100%;
	height: 460px;
	background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
		url(${imgUrl});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;

const HeroSearchContainer = styled.div`
	width: 60%;
	position: absolute;
	top: 240px;
	left: 50%;
	transform: translate(-50%, -50%);
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const HeroTitle = styled.h1`
	text-align: center;
	font-weight: bolder;
	color: white;
	font-size: 32px;
	margin-bottom: 30px;
`;

const NewProjectLink = styled(Link)`
	display: flex;
	align-items: center;
	position: absolute;
	top: 21px;
	left: 24px;
	/* top: 355px;
	left: 50%;
	transform: translate(-50%, -50%); */
	height: 30px;
	font-size: 2.2rem;
	color: white;

	&:hover {
		text-decoration: none;
		color: white;
		background: none;
	}
`;

class LandingPage extends Component {
	constructor() {
		super();
		this.state = { input: '', modal: false, toggleLogInPopUp: false };
		this.toggle = this.toggle.bind(this);
	}

	componentDidMount() {}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	handleChange = e => {
		this.setState({ ...this.state, input: e.target.value });
	};

	handleSearch = e => {
		const searchTerm = this.state.input;
		e.preventDefault();
		//Check if user is signed in
		if (!this.props.loggedInObject.userInfo.user_id) {
			//this.toggle();
			//toggle loginpopup on
			this.setState({
				...this.state,
				toggleLogInPopUp: !this.state.toggleLogInPopUp
			});
		} else {
			//push to search page with query
			this.props.history.push(`/search?query=${searchTerm}`);
		}
	};

	searchWithoutLogin = () => {
		//call featch search results action
		const searchTerm = this.state.input;
		this.props.fetchSearchResults(this.state.input);

		//push to search page
		this.props.history.push(`/search?query=${searchTerm}`);
	};

	searchClick = input => {
		//call fetch search results action
		this.props.fetchSearchResults(input);

		//push to search page
		this.props.history.push(`/search?query=${input}`);
	};

	getProjectsByReviewer = username => {
		console.log('search for this reviewer : ' + username);
		this.props.fetchProjectsByReviewer(username);

		//push to search page
		this.props.history.push(`/search?user=${username}`);
	};

	render() {
		return (
			<LandingPageWrapper>
				<ScrollToTopOnMount />
				<HeroImageContainer>
					{window.innerWidth <= 500 ? <MenuDrawer /> : <Nav />}

					<NewProjectLink to={`/newproject`}>
						<img src={plusIcon} style={{ width: '30px', height: '30px' }} alt="Button to add new project" />
						<p style={{ margin: '1px 0 0 8px' }}>Submit a new project</p>
					</NewProjectLink>

					<HeroSearchContainer>
						<HeroTitle>Find a project to build or review</HeroTitle>
						<SearchBar
							handleChange={this.handleChange}
							handleSearch={this.handleSearch}
						/>
						<SearchTags tags={['carpentry', 'home', 'garden', 'tech']} />
					</HeroSearchContainer>
				</HeroImageContainer>
				<LandingPageContentWrapper>
					{this.state.toggleLogInPopUp ? (
						<LogInPopUp
							searchWithoutLogin={this.searchWithoutLogin}
							toggleLogInPopUp={this.state.toggleLogInPopUp}
						/>
					) : (
						//  'hey please log in'
						''
					)}
					<FeaturedProjects history={this.props.history} />
					<PopularMakers fetchSearchResults={this.searchClick} />
					<PopularReviewers
						getProjectsByReviewer={this.getProjectsByReviewer}
					/>
					<Footer />
				</LandingPageContentWrapper>
			</LandingPageWrapper>
		);
	}
}

const mapStateToProps = state => ({
	projects: state.searchReducer.projects,
	loggedInObject: state.loggedInReducer
});

export default connect(
	mapStateToProps,
	{ fetchSearchResults, fetchProjectsByReviewer }
)(LandingPage);
