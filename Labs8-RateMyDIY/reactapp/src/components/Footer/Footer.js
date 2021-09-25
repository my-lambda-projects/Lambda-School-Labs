// Import Dependencies
import React from 'react';
// import { NavLink, Link, Route } from "react-router-dom";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// styled-components
const FooterWrapper = styled.div`
	display: flex;
	max-width: 1280px;
	height: auto;
	background: #eff;
	margin: 10px auto;
`;

const Footer = () => {
	return (
		<FooterWrapper>
			<Link to="/about">About the Team</Link>
		</FooterWrapper>
	);
};

export default Footer;
