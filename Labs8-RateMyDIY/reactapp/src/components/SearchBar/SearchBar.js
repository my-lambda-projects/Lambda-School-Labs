import React from 'react';
// import { Link } from "react-router-dom";
import styled from 'styled-components';

import magnifier from '../../assets/images/magnifier.png';

//Apply styles
const SearchBarWrapper = styled.form`
	display: flex;
	width: 70%;
	height: 35px;

	@media (max-width: 500px) {
		width: 85%;
		position: relative;
	}
`;
// const SearchBarSearchButtonWrapper = styled.div`
// 	@media (max-width: 500px) {
// 		position: relative;
// 	}
// `;
const SearchBarInput = styled.input`
	width: 100%;
	height: 45px;
	outline: none;
	border: none;
	/* border-right: 0; */
	font-size: 14px;
	padding: 0px 15px;
	font-size: 18px;
	border-radius: 4px 0 0 4px;
`;

const SearchBarButton = styled.button`
	position: relative;
	right: 0;
	width: 11%;
	height: 45px;
	border: none;
	border-left: 0;
	background-color: white;
	border-radius: 0 4px 4px 0;

	@media (max-width: 500px) {
		text-align: right;
		box-shadow: none;
		z-index: 1;
		width: 20%;
	}
`;

const SearchBar = props => {
	return (
		<SearchBarWrapper>
			<SearchBarInput
				onChange={e => props.handleChange(e)}
				placeholder="Find a DIY project or maker"
				value={props.searchTerm}
			/>
			<SearchBarButton
				onClick={e => props.handleSearch(e)}
				className="search-button"
			>
				<img
					src={magnifier}
					alt="Search icon"
					style={{ width: '20px', height: '20px' }}
				/>
			</SearchBarButton>
		</SearchBarWrapper>
	);
};

export default SearchBar;
