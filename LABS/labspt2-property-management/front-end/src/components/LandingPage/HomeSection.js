import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../../assets/css/general.css';

const styles = {
	card: {
		minWidth: 275
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	}
};

function HomeSection(props) {
	// const { classes } = props;

	return (
		<div className="titleCenter">
			<h1>Take Control with One Solution</h1>
			<div className="sectionHome">
				<div className="left">
					<p>
						Tenantly strives to break down the barriers between tenants and landlords while building up the
						communication. The stress of property managing can disappear when you have the all of the tools you need in
						one easy to use app. Imagine getting paid on time and having happy tenants that get quick responses to
						maintanace requests.
					</p>
				</div>
				<div className="right">
					<img alt="arrows" src={require('../../assets/images/business.png')} />
				</div>
			</div>
		</div>
	);
}

HomeSection.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeSection);
