import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchSearchResults, fetchCategoryResults } from '../../actions';
import { connect } from 'react-redux';
import { SearchBar, Nav } from '../index';
import { MenuDrawer } from '../../components';

const HeaderContainer = styled.div`
	width: 100%;
	height: 76px;
	z-index: 999;
	position: fixed;
	background-color: #1c293b;
`;

const HeaderContainerWraper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const HeaderSearchContainer = styled.div`
	width: 50%;
	margin: 0 20px 12px;

	@media (max-width: 500px) {
		width: 90%;
	}
`;

const Logo = styled.img`
	cursor: pointer;

	@media (max-width: 500px) {
		display: none;
	}
`;

class Header extends React.Component {
	state = { input: '', searchTerm: this.props.searchTerm };

	componentDidUpdate(prevProps) {
		if (this.props.searchTerm !== prevProps.searchTerm) {
			this.setState({ searchTerm: this.props.searchTerm });
		}
	}
	handleChange = e => {
		this.setState({
			...this.state,
			input: e.target.value,
			searchTerm: e.target.value
		});
	};
	handleSearch = e => {
		e.preventDefault();
		const searchTerm = this.state.input;
		//call featch search results action
		//push to search page
		this.props.fetchSearchResults(searchTerm);
		this.props.history.push(`/search?query=${searchTerm}`);
	};
	render() {
		return (
			<HeaderContainer>
				<HeaderContainerWraper>
					<Link to="/">
						<Logo
							style={{ width: '60px', height: '60px', margin: '0 20px' }}
							src="https://ratemydiy.s3.amazonaws.com/1544565541530"
							alt="LOGO"
						/>
					</Link>

					<HeaderSearchContainer>
						<SearchBar
							handleChange={this.handleChange}
							handleSearch={this.handleSearch}
							searchTerm={this.state.searchTerm}
						/>
					</HeaderSearchContainer>

					{window.innerWidth <= 500 ? <MenuDrawer sidebar profile /> : <Nav />}
				</HeaderContainerWraper>
			</HeaderContainer>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

export default connect(
	mapStateToProps,
	{ fetchSearchResults, fetchCategoryResults }
)(Header);
