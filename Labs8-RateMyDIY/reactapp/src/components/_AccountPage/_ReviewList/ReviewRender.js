import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import StarRatings from 'react-star-ratings';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import './ReviewList.css';

const styles = theme => ({
	card: {
		width: '300px',
		margin: '25px',
		marginBottom: '30px',
		'&:hover': {
			backgroundColor: '0'
		},
		backgroundColor: theme.palette.secondary.light,
		borderRadius: '35px',
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

const CardLink = styled.a`
	text-decoration: none;
	color:black &:hover {
		text-decoration: none;
		color: black;
	}
`;

class ReviewRender extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className="myReviewsDisplay" key={this.props.myReview_id}>
				<CardLink
					className="project-card"
					href={`project/${this.props.myReview_id}`}
				>
					<Card className={classes.card}>
						<CardHeader action={null} title={this.props.projectName} />
						{/* <div className="projectImg">
                        <img src={myProject.img_url} />
                      </div> */}
						<CardMedia
							className={classes.media}
							image={this.props.myReviewsImg_url}
						/>
						<CardContent>
							{' '}
							<Typography
								style={{
									fontSize: '1.5rem',
									lineHeight: '2rem',
									background: 'none'
								}}
								component="p"
							>
								Review: {this.props.myReviewsText}
							</Typography>
						</CardContent>

						<CardContent>
							<StarRatings
								rating={Number(this.props.myReviewsRating)}
								// starRatedColor="yellow"
								starDimension="14px"
								starSpacing="4px"
								starRatedColor="black"
							/>
						</CardContent>
					</Card>
				</CardLink>
			</div>
		);
	}
}

ReviewRender.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReviewRender);
