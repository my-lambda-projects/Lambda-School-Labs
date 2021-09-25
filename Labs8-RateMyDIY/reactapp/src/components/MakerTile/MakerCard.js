import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarRatings from 'react-star-ratings';

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

const MakerInfo = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	width: 100%;
`;

const MakerName = styled.h1`
	padding: 6px 0 0;
`;

const MakerInfo2 = styled.div`
	display: flex;
	width: 100%;
	padding: 8px 0 0;
`;

const SubInfo1 = styled.div`
	width: 50%;
	font-size: 1.2rem;
	padding-left: 2px;
`;

const SubInfo2 = styled.div`
	width: 50%;
	font-size: 1.2rem;
	text-align: right;
	padding-right: 3px;
`;

class MakerCard extends React.Component {
	state = { expanded: false };

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};
	searchMaker = (e, username) => {
		e.preventDefault();
		console.log(username);
		this.props.fetchSearchResults(username);
	};
	render() {
		const { classes } = this.props;

		return (
			//To do: add info about maker to this card
			<Card
				className={classes.card}
				onClick={e => this.searchMaker(e, this.props.maker.username)}
			>
				<CardMedia className={classes.media} image={this.props.maker.img_url} />

				<CardContent
					style={{
						position: 'absolute',
						bottom: '0',
						width: '100%',
						right: '0',
						// margin: '0 11px 8px 0',
						// alignSelf: 'center',
						padding: '4px 10px 10px',
						background: 'rgba(0, 0, 0, 0.6)'
					}}
				>
					<MakerInfo>
						<MakerName>
							<h1
								style={{
									fontSize: '2rem',
									color: 'white'
								}}
							>
								{this.props.maker.username}
							</h1>
						</MakerName>

						<StarRatings
							rating={Number(this.props.maker.user_rating)}
							starDimension="19px"
							starSpacing="1px"
							starRatedColor="gold"
							starEmptyColor="gray"
						/>
					</MakerInfo>
					<MakerInfo2>
						<SubInfo1>{/* Recent Activity: *date here* */}</SubInfo1>
						<SubInfo2>
							{this.props.maker.project_count}{' '}
							{this.props.maker.project_count === `1` ? `project` : `projects`}
						</SubInfo2>
					</MakerInfo2>
				</CardContent>

				<CardActions className={classes.actions} disableActionSpacing />
			</Card>
		);
	}
}

MakerCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MakerCard);
