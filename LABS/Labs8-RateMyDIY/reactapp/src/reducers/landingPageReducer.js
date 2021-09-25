import {
	GETTING_FEATURED_PROJECTS,
	GOT_FEATURED_PROJECTS,
	GETTING_FEATURED_PROJECTS_ERROR,
	GETTING_POPULAR_MAKERS,
	GOT_POPULAR_MAKERS,
	GETTING_POPULAR_MAKERS_ERROR,
	GETTING_POPULAR_REVIEWERS,
	GOT_POPULAR_REVIEWERS,
	GETTING_POPULAR_REVIEWERS_ERROR
} from '../actions/landingPageActions';

const initialState = {
	featuredProjects: [],
	popularMakers: [],
	popularReviewers: [],

	gettingFeaturedProjects: false,
	featuredProjectsError: null,

	gettingPopularMakers: false,
	popularMakersError: null,

	gettingPopularReviewers: false,
	popularReviewersError: null,
};

const landingPageReducer = (state = initialState, action) => {
	switch (action.type) {

		// getFeaturedProjects
		case GETTING_FEATURED_PROJECTS:
			return {
				...state,
				gettingFeaturedProjects: true
			};

		case GOT_FEATURED_PROJECTS:
			return {
				...state,
				gettingFeaturedProjects: false,
				featuredProjects: action.payload
			};

		case GETTING_FEATURED_PROJECTS_ERROR:
			return {
				...state,
				gettingFeaturedProjects: false,
				featuredProjectsError: `${action.payload}`
			};

		// getPopularMakers
		case GETTING_POPULAR_MAKERS:
			return {
				...state,
				gettingPopularMakers: true
			};

		case GOT_POPULAR_MAKERS:
			return {
				...state,
				gettingPopularMakers: false,
				popularMakers: action.payload
			};

		case GETTING_POPULAR_MAKERS_ERROR:
			return {
				...state,
				gettingPopularMakers: false,
				popularMakersError: `${action.payload}`
			};

		// getPopularReviewers
		case GETTING_POPULAR_REVIEWERS:
			return {
				...state,
				gettingPopularReviewers: true
			};

		case GOT_POPULAR_REVIEWERS:
			return {
				...state,
				gettingPopularReviewers: false,
				popularReviewers: action.payload
			};

		case GETTING_POPULAR_REVIEWERS_ERROR:
			return {
				...state,
				gettingPopularReviewers: false,
				popularReviewersError: `${action.payload}`
			};

		default:
			return state;
	}
};

export default landingPageReducer;
