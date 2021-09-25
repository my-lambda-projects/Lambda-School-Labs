import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

import thumbupBlue from '../../assets/images/thumbup-blue.png';
import thumbdownRed from '../../assets/images/thumbdown-red.png';

const styles = theme => ({
	card: {
		width: '31%',
		height: '388px',
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
		// Unnecessarily computed property ['@media (max-width: 500px)'] found
		// ['@media (max-width: 500px)']: {
		// 	margin: '25px auto 30px'
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

const CardTitle = styled(Link)`
	margin: 18px 20px 7px;
	font-size: 1.9rem;
	display: inline-block;

	&:hover {
		background: none;
		text-decoration: none;
	}
`;

const ViewReview = styled.div`
	text-align: center;
	padding: 5px 0 10px;
	font-size: 1.6rem;
	font-weight: bold;
	cursor: pointer;

	&:hover {
		color: #337799;
	}
`;

const Like = styled.img`
	position: relative;
	bottom: 20px;
	left: 84.5%;
	height: 28px;
	width: 24px;
	padding: 0 0 4px;
	cursor: pointer;
`;

const Dislike = styled.img`
	position: relative;
	bottom: 20px;
	left: 84.5%;
	height: 28px;
	width: 24px;
	padding: 3px 0 1px;
	cursor: pointer;
`;

class ReviewCard extends React.Component {
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
								to={`/search?query=${this.props.review.reviewer_name}`}
							>
								<Avatar
									src={this.props.review.reviewer_img}
									className={classes.avatar}
									// Used negative margin because I can't access the parent element's margin
									style={{ marginRight: '-5px' }}
								/>
							</Link>
						}
						action={null}
						subheader={
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<Link
									style={{
										fontSize: '1.5rem',
										background: 'none',
										textDecoration: 'none'
									}}
									onClick={e => {
										e.stopPropagation();
									}}
									to={`/search?query=${this.props.review.reviewer_name}`}
								>
									{this.props.review.reviewer_name}
								</Link>
								<p style={{ fontSize: '1.1rem' }}>Review</p>
							</div>
						}
					/>

					<CardContent style={{ padding: '0 14px 7px 0', alignSelf: 'center' }}>
						<StarRatings
							rating={Number(this.props.review.rating)}
							starDimension="19px"
							starSpacing="1px"
							// starRatedColor="e68a00" // yellow
							starRatedColor="#cc0000"
							starEmptyColor="#bfbfbf"
						/>
					</CardContent>
				</div>

				<CardMedia
					className={classes.media}
					image={this.props.review.img_url}
					onClick={() =>
						this.props.showReviewModal(this.props.review.review_id)
					}
					// title={this.props.project.project_name}
					style={{ height: '220px', cursor: 'pointer' }}
				/>

				<CardTitle to={`/project/${this.props.review.project_id}`}>
					{this.props.review.project_name}
				</CardTitle>

				<CardContent style={{ padding: '0 20px' }}>
					<Typography
						style={{
							fontSize: '1.4rem',
							background: 'none',
							height: '40px'
						}}
						component="div"
					>
						<span>{`by `}</span>
						<Link
							to={`/search?query=${this.props.review.maker_name}`}
							style={{ background: 'none', textDecoration: 'none' }}
						>
							{this.props.review.maker_name}
						</Link>
						<ViewReview
							onClick={() =>
								this.props.showReviewModal(this.props.review.review_id)
							}
						>
							View Review
						</ViewReview>
					</Typography>
				</CardContent>
				{this.props.review.like === 1 && (
					<Like
						src={thumbupBlue}
						alt="thumbup"
						onClick={() =>
							this.props.showReviewModal(this.props.review.review_id)
						}
					/>
				)}

				{this.props.review.like === -1 && (
					<Dislike
						src={thumbdownRed}
						alt="thumbdown"
						onClick={() =>
							this.props.showReviewModal(this.props.review.review_id)
						}
					/>
				)}

				{/* <CardActions className={classes.actions} disableActionSpacing /> */}
			</Card>
		);
	}
}

ReviewCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReviewCard);
