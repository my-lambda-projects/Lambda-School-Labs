import red from '@material-ui/core/colors/red';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';

const styles = theme => ({
	card: {
		width: '31%',
		height: '300px',
		'min-width': '300px',
		margin: '0 0 15px 1.75%',
		fontSize: '24px',
		backgroundColor: theme.palette.secondary.light,
		color: theme.palette.secondary.main,
		// border: '1px solid lightgray',
		cursor: 'pointer',
		position: 'relative',

		// Unnecessarily computed property ['@media (max-width: 1000px)'] found
		// ['@media (max-width: 1000px)']: {
		// 	width: '47%',
		// 	marginLeft: '2%'
		// },
		// Unnecessarily computed property ['@media (max-width: 500px)'] found
		// ['@media (max-width: 500px)']: {
		// 	width: '90%',
		// 	margin: '25px auto 30px'
		// }
	},
	media: {
		height: 0,
		paddingTop: '100%' // 16:9
	},
	actions: {
		display: 'flex'
	},
	avatar: {
		backgroundColor: red[500]
	}
});

const ReviewerInfo = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	width: 100%;
	padding: 6px 0 0;
`;

class ReviewerCard extends React.Component {
	state = { expanded: false };

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};

	searchReviewer = (e, username) => {
		e.preventDefault();
		console.log(username);
		this.props.getProjectsByReviewer(username);
	};

	render() {
		const { classes } = this.props;

		return (
			<Card
				className={classes.card}
				onClick={e => this.searchReviewer(e, this.props.reviewer.username)}
			>
				<CardMedia
					className={classes.media}
					image={this.props.reviewer.img_url}
				/>

				<CardContent
					style={{
						position: 'absolute',
						bottom: '0',
						width: '100%',
						right: '0',
						// margin: '0 11px 8px 0',
						// alignSelf: 'center',
						padding: '8px 10px 14px',
						background: 'rgba(0, 0, 0, 0.6)'
					}}
				>
					<ReviewerInfo>
						<h1
							style={{
								fontSize: '2rem',
								color: 'white'
							}}
						>
							{this.props.reviewer.username}
						</h1>
						<p
							style={{
								fontSize: '1.2rem',
								lineHeight: '1.5rem',
								color: 'white'
							}}
						>
							{this.props.reviewer.review_count}{' '}
							{this.props.reviewer.review_count === `1` ? `review` : `reviews`}
						</p>
					</ReviewerInfo>
				</CardContent>

				<CardActions className={classes.actions} disableActionSpacing />
			</Card>
		);
	}
}

ReviewerCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReviewerCard);
