import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import StarRatings from 'react-star-ratings';

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

class ProjectRender extends React.Component {
	state = { expanded: false };

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};

	render() {
		const { classes } = this.props;

		return (
			<div className="myProjectDisplay" key={this.props.myProjectProject_id}>
				<CardLink
					className="project-card"
					href={`project/${this.props.myProjectProject_id}`}
				>
					<Card className={classes.card}>
						<CardHeader
							action={null}
							title={this.props.myProjectProject_name}
						/>
						{/* <div className="projectImg">
                  <img src={myProject.img_url} />
                </div> */}
						<CardMedia
							className={classes.media}
							image={this.props.myProjectImg_url}
							title={this.props.myProjectProject_name}
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
								{this.props.myProjectProject_text}
							</Typography>
						</CardContent>
						<CardContent>
							<StarRatings
								rating={Number(this.props.myProjectProject_rating)}
								// starRatedColor="yellow"
								starDimension="14px"
								starSpacing="4px"
								starRatedColor="black"
							/>
						</CardContent>
						<CardContent />
					</Card>
				</CardLink>
			</div>
		);
	}
}

ProjectRender.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectRender);
