// Import Dependencies
import React from 'react';
// import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import styled from 'styled-components';

// styled-components
const ReviewerTileWrapper = styled.div`
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
  max-height: 80%;

  @media (max-width: 500px) {
		width: 60%;
		height: 30vh;
		margin: 0 auto;
	}
`;

const ReviewerImage = styled.img`
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
	height: 20%;
	justify-content: flex-end;
`;

class ReviewerTile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false
		};

		this.toggle = this.toggle.bind(this);
	}

	searchReviewer = (e, username) => {
		e.preventDefault();
		console.log(username);
		this.props.getProjectsByReviewer(username);
	};
	// Sets state for the reactstrap modal
	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	render() {
		return (
			<ReviewerTileWrapper>
				{/* removed src="${https://someAWS.S3.URL}" */}
				<ImageHolder>
					<ReviewerImage
						alt="PLACEHOLDER! alt text"
						src={this.props.reviewer.img_url}
					/>
				</ImageHolder>
				<Details>
					<p className="project-name">
						<a
							onClick={e =>
								this.searchReviewer(e, this.props.reviewer.username)
							}
							href={`/search?query=${this.props.reviewer.username}`}
						>
							{this.props.reviewer.username}
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
							{this.props.reviewer.username}
						</ModalHeader>
						<ModalFooter>
							<Button color="primary" onClick={this.toggle}>
								Do Something
							</Button>{' '}
						</ModalFooter>
					</Modal>
					{/* React strap Modal */}
				</Details>
			</ReviewerTileWrapper>
		);
	}
}

export default ReviewerTile;
