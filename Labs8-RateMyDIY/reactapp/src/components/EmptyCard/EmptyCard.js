import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import red from '@material-ui/core/colors/red';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

const styles = theme => ({
	card: {
		width: '31%',
		height: '387px',
		'min-width': '300px',
		margin: '0 0 15px 1.75%',
		fontSize: '24px',
		// '&:hover': {
		// 	color: theme.palette.secondary.main,
		// 	boxShadow: '4px 4px 4px'
		// },
		backgroundColor: theme.palette.secondary.light,
		// borderRadius: '35px',
		color: theme.palette.secondary.main
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	actions: {
		display: 'flex'
	},
	avatar: {
		backgroundColor: red[500]
	}
});

class ProjectCard extends React.Component {
	state = { expanded: false };

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};

	render() {
		const { classes } = this.props;
		return (
			<Card className={classes.card} style={{ border: '1px solid lightgray' }}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						padding: '10px 0 10px 10px'
					}}
				>
					<div
						style={{
							width: '40px',
							height: '40px',
							background: '#bfbfbf',
							borderRadius: '50%'
						}}
					/>
					<CardContent style={{ padding: '0 14px 7px 0', alignSelf: 'center' }}>
						<StarRatings
							rating={0}
							starDimension="19px"
							starSpacing="1px"
							starRatedColor="#cc0000"
							starEmptyColor="#bfbfbf"
						/>
					</CardContent>
				</div>

				{this.props.addNew ? 
					<div style={{ width: '100%', height: '220px', background: '#bfbfbf', textAlign: 'center', verticalAlign: 'middle', lineHeight: '220px' }}>
						{this.props.review ? 
						<Link to={`/project/${this.props.featured_id}`}>
							Add New
						</Link>
						:
						<Link to='/newproject'>
							Add New
						</Link>
						}
					</div>
					: 
					<div style={{ width: '100%', height: '220px', background: '#bfbfbf' }} />
				}
			</Card>
		);
	}
}

ProjectCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectCard);
