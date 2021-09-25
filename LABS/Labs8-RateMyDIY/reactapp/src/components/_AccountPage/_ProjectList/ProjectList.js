import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AccountSideBar } from '../../../components';
import { Header } from '../../../components';
import { ProjectTile } from '../../../components';
import styled from 'styled-components';
import { EmptyCard }from '../../../components';
import './ProjectList.css';

import {
	loggedIn,
	fetchMyProjects,
	fetchSearchResults,
	fetchCategoryResults
} from '../../../actions';

const AddButton = styled.div`
	background-color: ${props => props.theme.mui.palette.primary.dark};
`;

class ProjectList extends Component {
	constructor(props) {
		super(props);
		this.state = { input: '' };
	}

	handleChange = e => {
		this.setState({ ...this.state, input: e.target.value });
	};

	handleSearch = e => {
		e.preventDefault();
		const searchTerm = this.state.input;
		console.log(searchTerm);
		//call featch search results action
		//push to search page
		this.props.fetchSearchResults(searchTerm);
		this.props.history.push(`/search?query=${searchTerm}`);
	};

	componentDidMount() {
		this.props.loggedIn(fetchMyProjects);
	}
	render() {
		return (
			<div className='projectPage'>
				<Header
					handleChange={this.handleChange}
					handleSearch={this.handleSearch}
				/>
				<div className='projectContainer'>
				{window.innerWidth <= 500 ? null : <AccountSideBar />}
				{window.innerWidth <= 500 ? 
				<AddButton className='addButton'>
					<Link to='/newproject' style={{ color: 'white' }}>
						New Project
					</Link>
				</AddButton>
				:
				null}

					<div className="myProjectsDisplay">
						{this.props.myProjects.map((myProject, index) => {
							if (window.innerWidth <= 500) {
								return <ProjectTile
									key={myProject.project_id}
									project={myProject}
								/>
							}
							if (index === 0) {
								return (
								<Fragment>
								<EmptyCard addNew style={{ margin: '3%' }}/>
								<ProjectTile 
									key={myProject.project_id}
									project={myProject}
								/>
								</Fragment>
								)
							} else {
								return <ProjectTile
									key={myProject.project_id}
									project={myProject}
								/>
							}
						})}
					</div>
				</div>
			</div>
		);
	}
}

// ProjectList.propTypes = {
// 	classes: PropTypes.object.isRequired
// };

const mapStateToProps = state => {
	return {
		myProjects: state.myProjectReducer.myProjects,
		userInfo: state.loggedInReducer.userInfo
	};
};

export default connect(
	mapStateToProps,
	{ loggedIn, fetchSearchResults, fetchCategoryResults, fetchMyProjects }
)(ProjectList);
