// Import Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';

// styled-components
const ProjectTileWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 20px;
	overflow: hidden;
	width: 200px;
	height: 200px;

	@media (max-width: 500px) {
		width: 100%;
		height: 200px;
		margin: 10% auto;
	}
`;

const ImageHolder = styled.div`
	max-width: 200px;
	/* this needs to be changed if there are more or less lines on the tile */
	max-height: 65%;

	@media (max-width: 500px) {
		width: 60%;
		height: 30vh;
		margin: 0 auto;
	}
`;

const ProjectImage = styled.img`
	display: block;
	max-width: 100%;
	max-height: 100%;
	width: auto;
	height: auto;
	background: #fee;

	@media (max-width: 500px) {
		width: 100%;
		height: 100%;
	}
`;

const Details = styled.div`
	background: rgba(255, 255, 238, 0.7);
	display: flex;
	flex-direction: column;
	/* this needs to be changed if there are more or less lines on the tile */
	height: 40%;
	justify-content: flex-end;
`;

class ProjectTile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false
		};
		this.toggle = this.toggle.bind(this);
	}

	// Sets state for the reactstrap modal
	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	//Search for projects by that user
	// searchUser = (e, username) => {
	// 	e.preventDefault();
	// 	this.props.fetchSearchResults(username);
	// };

	render() {
		return (
			<ProjectTileWrapper>
				{/* removed src="${https://someAWS.S3.URL}" */}
				<ImageHolder>
					<ProjectImage
						alt="PLACEHOLDER! alt text"
						src={this.props.project.img_url}
					/>
				</ImageHolder>
				<Details>
					<StarRatings
						rating={Number(this.props.project.project_rating)}
						starDimension="14px"
						starSpacing="4px"
						starRatedColor="black"
					/>
					<a
						href={`/project/${this.props.project.project_id}`}
						className="project-name"
					>
						{this.props.project.project_name}
					</a>
					<a
					// onClick={e => this.searchMaker(e, this.props.project.username)}
					// href={`/search?query=${this.props.project.username}`}
					>
						{this.props.project.username}
					</a>
					{/* React strap Modal */}
					<Button color="danger" onClick={this.toggle}>
						{' '}
						<h3>Review</h3>
						{this.props.buttonLabel}{' '}
					</Button>
					<Modal
						isOpen={this.state.modal}
						toggle={this.toggle}
						className={this.props.className}
						dialogClassName="my-modal"
					>
						<ModalHeader toggle={this.toggle}>
							{this.props.project.project_name}
						</ModalHeader>
						<ModalBody>
							<StarRatings
								rating={Number(this.props.project.project_rating)}
								starDimension="14px"
								starSpacing="4px"
								starRatedColor="black"
							/>
						</ModalBody>
						<ModalBody>{this.props.project.user_id}</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.toggle}>
								Do Something
							</Button>{' '}
						</ModalFooter>
					</Modal>
					{/* React strap Modal */}
				</Details>
			</ProjectTileWrapper>
		);
	}
}

export default ProjectTile;

// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import red from '@material-ui/core/colors/red';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

// const styles = theme => ({
//   card: {
//     maxWidth: 400,
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
//   actions: {
//     display: 'flex',
//   },
//   avatar: {
//     backgroundColor: red[500],
//   },
// });

// class RecipeReviewCard extends React.Component {
//   state = { expanded: false };

//   handleExpandClick = () => {
//     this.setState(state => ({ expanded: !state.expanded }));
//   };

//   render() {
//     const { classes } = this.props;

//     return (
//       <Card className={classes.card}>
//         <CardHeader
//           avatar={
//             <Avatar aria-label="Recipe" className={classes.avatar}>
//               R
//             </Avatar>
//           }
//           action={
//           null
//           }
//           title="Shrimp and Chorizo Paella"
//           subheader="September 14, 2016"
//         />
//         <CardMedia
//           className={classes.media}
//           image="/static/images/cards/paella.jpg"
//           title="Paella dish"
//         />
//         <CardContent>
//           <Typography component="p">
//             This impressive paella is a perfect party dish and a fun meal to cook together with your
//             guests. Add 1 cup of frozen peas along with the mussels, if you like.
//           </Typography>
//         </CardContent>
//         <CardActions className={classes.actions} disableActionSpacing>
//         </CardActions>
//       </Card>
//     );
//   }
// }

// RecipeReviewCard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(RecipeReviewCard);
