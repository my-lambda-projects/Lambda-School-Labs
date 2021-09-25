// Import Dependencies
import React from 'react';
// import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
// styled-components
const MakerTileWrapper = styled.div`
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
	max-height: 70%;

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
	height: 30%;
	justify-content: flex-end;
`;

class MakerTile extends React.Component {
	constructor(props) {
		super(props);
		// React strap Modal \\
		this.state = {
			modal: false
		};

		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
		// React strap Modal \\
	}

	searchMaker = (e, username) => {
		e.preventDefault();
		console.log(username);
		this.props.fetchSearchResults(username);
	};
	render() {
		return (
			<MakerTileWrapper>
				{/* removed src="${https://someAWS.S3.URL}" */}
				<ImageHolder>
					<ProjectImage
						alt="PLACEHOLDER! alt text"
						src={this.props.maker.img_url}
					/>
				</ImageHolder>
				<Details>
					<div className="star-rating">
						<StarRatings
							rating={Number(this.props.maker.user_rating)}
							starDimension="14px"
							starSpacing="4px"
							starRatedColor="black"
						/>
					</div>

					<p onClick={this.showMakerProjects} className="project-name">
						<a
							onClick={e => this.searchMaker(e, this.props.maker.username)}
							href={`/search?query=${this.props.maker.username}`}
						>
							{this.props.maker.username}
						</a>
					</p>
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
							{this.props.maker.username}
						</ModalHeader>
						<ModalBody>
							<StarRatings
								rating={Number(this.props.maker.user_rating)}
								starDimension="14px"
								starSpacing="4px"
								starRatedColor="black"
							/>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.toggle}>
								Do Something
							</Button>{' '}
						</ModalFooter>
					</Modal>
					{/* React strap Modal */}
				</Details>
			</MakerTileWrapper>
		);
	}
}

export default MakerTile;
