// Dependencies
import React from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

// Styles
import styled from 'styled-components';

const Project = props => {
	return (
		<ProjectContainer>
			<ProjectHeader>
				<ProjectNameAuthorCategoryContainer>
					<ProjectName>{props.project.project_name}</ProjectName>
					<ProjectAuthor>by {props.project.username}</ProjectAuthor>
					<CategoryContainer>
						{/* Any categories? */}
						{props.project.categories &&
							// Display categories
							props.project.categories.map(({ category_id, category_name }) => (
								// Needs category search!
								<Category
									to={`/make/search/queries/for/categories/please/${category_id}`}
									key={category_id}
								>
									{category_name}
								</Category>
							))}
					</CategoryContainer>
				</ProjectNameAuthorCategoryContainer>

				<ReviewsLink to={`/project/${props.project.project_id}/reviews`}>
					{props.project.project_rating && (
						<ProjectRatingTool
							rating={Number(props.project.project_rating)}
							starEmptyColor="#bfbfbf"
							starRatedColor="#cc0000"
							starDimension="24px"
							starSpacing="3px"
							numberOfStars={5}
						/>
					)}
					<ReviewsLinkText>View Reviews</ReviewsLinkText>
				</ReviewsLink>
			</ProjectHeader>

			<Img
				// small={props.project.img_url}
				// large={props.project.img_url}
				alt={props.project.project_name}
				src={props.project.img_url}
			/>
			<DescriptionContainer>
				{props.project.text}
				{/* Is user the author? */}
				{props.owner && (
					// Display edit/delete buttons
					<OptionsContainer>
						<EditLink
							onClick={() => props.willUpdateProject(true)}
							disabled={props.disabled}
						>
							edit
						</EditLink>
						<DeleteButton
							color="danger"
							onClick={props.deleteHandler}
							disabled={props.disabled}
						>
							delete
						</DeleteButton>
					</OptionsContainer>
				)}
			</DescriptionContainer>
		</ProjectContainer>
	);
};

export default Project;

// Styled-components
const ProjectContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 4px;
	width: 100%;
	border: 1px solid lightgray;
	padding: 18px 20px;
	margin: 0 0 30px 0;
`;

const ProjectHeader = styled.div`
	display: flex;
	position: 50%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const ProjectNameAuthorCategoryContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const ProjectName = styled.h2`
	display: flex;
	font-size: 32px;
	font-weight: bold;
	margin: 0 0 0 -2px;
`;

const ProjectAuthor = styled.div`
	padding: 4px 0 0;
	font-size: 1.6rem;
`;

const ReviewsLink = styled(Link)`
	margin: -10px 0 0 0;
	display: flex;
	flex-direction: column;
	/* align-self: flex-end; */
	align-items: flex-end;
	min-width: 160px;
	&:hover {
		text-decoration: none;
		background: none;
	}
`;

const ReviewsLinkText = styled.p`
	padding: 6px 0 0;
`;

const CategoryContainer = styled.div`
	font-size: 1.6rem;
	margin: 12px 0 0;
	display: flex;
`;

const Category = styled(Link)`
	min-width: 54px;
	margin: 0 4px 0 0;
	text-align: center;
	letter-spacing: 0.05rem;
	color: white;
	background: #254f8d;
	padding: 4px 5px 2px;
	border-radius: 4px;
	font-size: 12px;
	&:hover {
		text-decoration: none;
		color: white;
		background: #1c293b;
	}
`;

const Img = styled.img`
	background: #f6f6f6;
	max-height: 600px;
	width: 100%;
	margin: 20px 0 18px;
	object-fit: contain;
`;

const ProjectRatingTool = styled(StarRatings)``;

const DescriptionContainer = styled.div`
	width: auto;
	font-size: 1.4rem;
	line-height: 1.6rem;
`;

const OptionsContainer = styled.div`
	display: flex;
	margin: 8px 0 -6px 0;
	font-size: 1.4rem;
	width: auto;
	justify-content: flex-end;
`;

const EditLink = styled.button`
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
	margin-right: 12px;
`;

const DeleteButton = styled.button`
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
`;
