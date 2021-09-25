import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
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
		color: theme.palette.secondary.main,
    
		// Unnecessarily computed property ['@media (max-width: 1000px)'] found
		// ['@media (max-width: 1000px)']: {
		// 	width: '47%',
		// 	// margin: '25px 25px 25px 0px'
		// 	marginLeft: '2%'
		// },
		
		// Unnecessarily computed property ['@media (max-width: 500px)'] found
		// ['@media (max-width: 500px)']: {
		// 	width: '90%',
		// 	// margin: '25px 25px 25px 0px'
		// 	margin: '25px auto 30px'
		// }

		// [theme.breakpoints.down('1000px')]: {
		// 	width: '44%',
		// 	marginLeft: '4%'
		// }
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

const LinkToProject = styled(Link)`
	&:hover {
		background: none;
		text-decoration: none;
	}
`;

const CardTitle = styled.h1`
	width: 100%;
	padding: 16px 20px 8px;
	/* margin: 16px 0 8px; */
	font-size: 1.9rem;
	/* display: inline-block; */
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	@media (max-width: 500px) {
		width: 100%;
	}
`;

class ProjectCard extends React.Component {
	state = { expanded: false };

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};

	render() {
		const { classes } = this.props;
		return (
			<Card className={classes.card} style={{ border: '1px solid lightgray' }}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<CardHeader
						style={{
							fontSize: '18px',
							padding: '10px 10px'
						}}
						avatar={
							<Link
								style={{
									fontSize: '1.5rem',
									background: 'none',
									textDecoration: 'none'
								}}
								to={`/search?query=${this.props.project.username}`}
							>
								<Avatar
									src={this.props.project.maker_photo_url}
									className={classes.avatar}
									// Used negative margin because I can't access the parent element's margin
									style={{ marginRight: '-5px', background: '#bfbfbf' }}
								/>
							</Link>
						}
						action={null}
						subheader={
							<Link
								style={{
									fontSize: '1.5rem',
									background: 'none',
									textDecoration: 'none'
								}}
								onClick={e => {
									e.stopPropagation();
								}}
								to={`/search?query=${this.props.project.username}`}
							>
								{this.props.project.username}
							</Link>
						}
					/>
					<CardContent
						style={{
							marginRight: '14px',
							alignSelf: 'center',
							padding: '0 0 7px 0'
						}}
					>
						<Link
							to={`/project/${this.props.project.project_id}/reviews`}
							style={{ padding: '0 0 7px 0', background: 'none' }}
						>
							<StarRatings
								rating={Number(this.props.project.project_rating)}
								starDimension="19px"
								starSpacing="1px"
								starRatedColor="#cc0000"
								starEmptyColor="#bfbfbf"
								numberOfStars={5}
							/>
						</Link>
					</CardContent>
				</div>

				<LinkToProject to={`/project/${this.props.project.project_id}`}>
					<img
						// className={classes.media}
						src={this.props.project.img_url}
						alt=""
						// title={this.props.project.project_name}
						style={{
							width: '100%',
							height: '220px',
							objectFit: 'cover',
							background: '#bfbfbf'
						}}
					/>

					<CardTitle to={`/project/${this.props.project.project_id}`}>
						{this.props.project.project_name}
					</CardTitle>

					<CardContent style={{ padding: '2px 20px 16px' }}>
						<Typography
							style={{
								fontSize: '1.5rem',
								lineHeight: '2rem',
								background: 'none',
								height: '40px',
								overflow: 'hidden'
							}}
							component="p"
						>
							{this.props.project.text}
						</Typography>
					</CardContent>
				</LinkToProject>
			</Card>
		);
	}
}

ProjectCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectCard);
