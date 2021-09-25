import React from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import AddReviewModal from './AddReviewModal';
import { backendLink } from '../assets/config';
import NavBar from './NavBar';
import Stars from './Stars';
import image from '../assets/white-waves.png';
import map from '../assets/map.svg';
import phone from '../assets/phone.svg';
import calendar from '../assets/calendar.svg';
import web from '../assets/web.svg';

const API_KEY = process.env.REACT_APP_API_KEY;

const StyledBusiness = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	background-image: url(${image});
	line-height: 1.2;
	padding-bottom: 50px;
	font-family: Roboto;

	.card {
		background: white;
		border-radius: 5px;
		width: 60%;
		margin-top: 40px;
		padding: 15px;
		display: flex;
		flex-flow: column wrap;
		@media (max-width: 900px) {
			width: 100%;
		}
		@media (max-width: 600px) {
			padding-left: 2rem;
			padding-right: 0.8rem;
		}
		.image__container {
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			height: 400px;
			@media (max-width: 900px) {
				height: 300px;
			}
			@media (max-width: 600px) {
				height: 150px;
			}
			.image__container--img {
				flex-shrink: 0;
				min-width: 100%;
				min-height: 100%;
			}
		}
		.business__name {
			font-family: 'Patua One';
			font-size: 4rem;
			@media (max-width: 900px) {
				font-size: 3rem;
			}
			@media (max-width: 600px) {
				font-size: 2rem;
				margin-bottom: 1rem;
			}
		}
		.business__rating {
			margin-top: -3.1rem;
			font-size: 4rem;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: -5rem;
			@media (max-width: 900px) {
				font-size: 3rem;
			}
			@media (max-width: 600px) {
				font-size: 2rem;
				margin-top: 0;
			}
			.business__rating--number {
				margin-left: 2rem;
			}
		}
		.business__details--address {
			display: flex;
			align-items: center;
			margin-bottom: 1rem;
			@media (max-width: 900px) {
				font-size: 1rem;
			}
			@media (max-width: 600px) {
				font-size: 0.75rem;
			}
		}
		.business__details--phone {
			display: flex;
			align-items: center;
			margin-bottom: 1rem;
			@media (max-width: 900px) {
				font-size: 1rem;
			}
			@media (max-width: 600px) {
				font-size: 0.75rem;
			}
		}
		.business__details--hours {
			display: flex;
			align-items: start;
			margin-bottom: 1rem;

			@media (max-width: 900px) {
				font-size: 1rem;
			}
			@media (max-width: 600px) {
				font-size: 0.75rem;
			}
			.business__details--hours--week {
				display: flex;
				flex-direction: column;
				align-self: start;
			}
		}
		.business__details--website {
			display: flex;
			/* align-items: center; */
			margin-bottom: 1rem;
			padding-right: 2rem;
			.business__website--text {
				text-decoration: none;
				@media (max-width: 900px) {
					font-size: 1rem;
				}
				@media (max-width: 600px) {
					font-size: 0.75rem;
				}
			}
		}

		.reviews {
			display: flex;
			flex-direction: column;
		}

		.review-container {
			display: flex;
			flex-direction: column;
			width: 100%;
			flex-flow: row wrap;
			margin-top: 4rem;

			.review__header {
				display: flex;
				flex-direction: row;
				align-items: center;

				@media (max-width: 1050px) {
					flex-direction: column;
					align-items: flex-start;
				}

				.reviews__header--text {
					font-family: Patua One;
					margin-right: 3rem;
				}

				.reviews__header--btn {
					margin-bottom: 1rem;
				}
			}

			.reviews {
				width: 100%;
				display: flex;
				justify-content: start;
				padding: 3px;
				/* margin-top: 5rem; */

				.review {
					display: flex;
					flex-direction: row;
					margin: 1rem 0;

					.review__gravatar {
						display: flex;
						flex-direction: row;
						margin-right: 2rem;

						.review__gravatar--img {
							height: 95px;
							width: 95px;
							border-radius: 50%;
						}
					}

					.review__text {
						line-height: 0.8;

						.review__text--title {
							font-family: Patua One;
							font-style: bold;
							font-size: 1.8rem;
							text-transform: uppercase;
						}

						.review__text--body {
							font-style: italic;
							font-size: 1.5rem;
						}

						.review__text--rating {
							margin-top: -1.3rem;
						}
					}

					// reviewer stars
					.emptyStar,
					.halfStar,
					.fullStar {
						height: 1.5rem;
						width: 1.5rem;
					}
				}
			}
		}

		.svg {
			height: 35px;
			width: 35px;
			margin-right: 1.7rem;
			@media (max-width: 900px) {
				height: 25px;
				width: 25px;
				margin-right: 1.2rem;
			}
			@media (max-width: 600px) {
				height: 20px;
				width: 20px;
				margin-right: 1rem;
			}
		}

		.link {
			border-bottom: 1px solid black;
			border-top: 0px;
			border-left: 0px;
			border-right: 0px;
			height: 40px;
			width: 100px;
			font-family: Roboto;
			font-weight: bold;
			text-transform: uppercase;
		}

		.open {
			text-transform: uppercase;
			font-size: 1rem;
			font-weight: bold;
			color: limegreen;
		}
		.closed {
			text-transform: uppercase;
			font-size: 1rem;
			font-weight: bold;
			color: red;
		}
		.fullStar,
		.halfStar,
		.emptyStar {
			height: 50px;
			width: 50px;
			@media (max-width: 900px) {
				height: 35px;
				width: 35px;
			}
			@media (max-width: 600px) {
				height: 20px;
				width: 20px;
			}
		}
		.grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			row-gap: 40px;
			column-gap: 20px;
			@media (max-width: 1250px) {
				grid-template-columns: repeat(1, 1fr);
			}
		}
	}
`;

class SearchResult extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			business: [],
			reviewing: false,
			reviews: [],
			hours: []
		};
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		Axios.get(
			`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${id}`
		)
			.then((res) => this.setState({ business: res.data.result }))
			.catch((err) => console.log(err));
		Axios.get(`${backendLink}/api/business/${id}/reviews`)
			.then((res) => this.setState({ reviews: res.data }))
			.catch((err) => console.log(err));
	}

	addBusiness = () => {
		let imageCC = '';
		if (this.state.business.photos) {
			const photos = this.state.business.photos;
			const references = [];
			photos.map((photo) => references.push(photo.photo_reference));
			imageCC = references[0];
		}

		const { id } = this.props.match.params;
		Axios.post(`${backendLink}/api/business`, {
			id: `${id}`,
			name: this.state.business.name,
			rating: this.state.business.rating,
			image: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${imageCC}&key=${API_KEY}`
		})
			.then((res) => {
				console.log(res.status);
			})
			.catch((err) => console.log(err));
	};
	toggleReviewing = () => {
		this.setState({ reviewing: !this.state.reviewing });
	};

	render() {
		// creates a variable- imageCC- to store the Places ID for first image provided of the // // business from the Places API and then appends that ID to a string which is used for
		// the image href source
		let imageCC = '';
		let imageURL = '';
		if (this.state.business.photos) {
			const photos = this.state.business.photos;
			const references = [];
			photos.map((photo) => references.push(photo.photo_reference));
			imageCC = references[0];
			imageURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${imageCC}&key=${API_KEY}`;
		}
		// creates a boolean variable- isOpen- that determines if the business is open
		let isOpen;
		if (!this.state.business) return <p>Loading business...</p>;
		else {
			if (this.state.business && this.state.business.opening_hours !== undefined) {
				if (this.state.business.opening_hours.open_now === true) {
					isOpen = <span className="open">Open</span>;
				} else {
					isOpen = <span className="closed">Closed</span>;
				}
			}

			// confirms there is a rating coming back from the API call, will
			// display a loading message until a rating is received.
			if (!this.state.business.rating)
				return (
					<React.Fragment>
						<NavBar />
						<p>Loading rating...</p>
					</React.Fragment>
				);

			// creates an array- 'hours'- of hours for each day of the week
			let hours = [];
			if (this.state.business && this.state.business.opening_hours !== undefined) {
				hours = this.state.business.opening_hours.weekday_text;
			}

			return (
				<div>
					<NavBar />
					<StyledBusiness>
						<div className="card">
							<div className="image__container">
								<img className="image__container--img" src={imageURL} alt="Business" />
							</div>
							<h1 className="business__name">{this.state.business.name}</h1>
							<div className="business__rating">
								{/* passes the rating from state to the Stars component and, in turn, displays the rating in star SVGs */}
								<Stars rating={this.state.business.rating} className="business__rating--stars" />
								<p className="business__rating--number">{this.state.business.rating}</p>
							</div>
							<div className="grid">
								<div className="business__details--address">
									<img className="svg" src={map} alt="map" />
									{this.state.business.formatted_address}
								</div>
								<div className="business__details--phone">
									<img className="svg" src={phone} alt="phone" />
									{this.state.business.formatted_phone_number}
								</div>
								<div className="business__details--hours">
									<img className="svg" src={calendar} alt="calendar" />
									<div className="business__details--hours--week">
										<p className="business__details--currently">{isOpen}</p>
										{/* this will map out the hours for each day  */}
										{hours.map((hour) => {
											return <div key={hour}>{hour}</div>;
										})}
									</div>
								</div>
								<div className="business__details--website">
									<img className="svg" src={web} alt="web" />
									<a
										className="business__website--text"
										target="_blank"
										rel="noopener noreferrer"
										href={this.state.business.website}
									>
										Website
									</a>
								</div>
							</div>

							{/* other users' reviews */}
							<div className="review-container">
								<div className="review__header">
									<h1 className="reviews__header--text">Reviews</h1>
									<button className="reviews__header--btn link" onClick={this.toggleReviewing}>
										Add a Review
									</button>
								</div>

								<div className="reviews">
									{this.state.reviews.map(({ title, id, body, rating, gravatar }) => (
										<div key={id} className="review">
											<div className="review__gravatar">
												<img
													src={gravatar}
													alt="reviewed business"
													className="review__gravatar--img"
												/>
											</div>
											<div className="review__text">
												<p className="review__text--title">{title}</p>
												<p className="review__text--body">{body}</p>
												<Stars rating={rating} className="review__stars" />
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
						{this.state.reviewing ? (
							<AddReviewModal
								{...this.props}
								imageURL={imageURL}
								businessName={this.state.business.name}
								addBusiness={this.addBusiness}
								businessId={this.state.business.place_id}
								toggleReviewing={this.toggleReviewing}
							/>
						) : null}
					</StyledBusiness>
				</div>
			);
		}
	}
}

export default SearchResult;
