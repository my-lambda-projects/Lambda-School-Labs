const db = require('../config/dbConfig');
// const Promise = require('bluebird');

module.exports = {
	getReview,
	getReviewID,
	addReview,
	editReview,
	removeReview,
	likeReview
};

function getReview(review_id, user_id) {
	return db('reviews')
		.where({ review_id })
		.join('users as reviewers', 'reviewers.user_id', 'reviews.user_id')
		.join('projects', 'projects.project_id', 'reviews.project_id')
		.join('users as makers', 'makers.user_id', 'projects.user_id')
		.select(
			'reviews.review_id',
			'makers.user_id as maker_id',
			'makers.username as maker_name',
			'reviews.project_id',
			'projects.project_name',
			'reviews.user_id as reviewer_id',
			'reviewers.username as reviewer_name',
			'projects.img_url',
			'reviews.rating',
			'reviews.text'
		)
		.first()
		.then(review => {
			// Is the user logged in?
			if (user_id) {
				console.log(`Checking if user ${user_id} liked review ${review_id}`);
				// Return the review with like state
				return db('likes')
					.where({ review_id, user_id })
					.select('like')
					.first()
					.then(like =>
						// This could be cleaned up a bit
						like === undefined ? review : { ...review, like: like.like }
					);
			} else {
				// Return the review without like state
				return review;
			}
		});
}

function getReviewID(project_id, user_id) {
	return db('reviews')
		.where({ project_id, user_id })
		.first()
		.then(review => (review ? review.review_id : undefined));
}

// This is big and ugly but it works. It would be easier to read with async/await
function addReview({ user_id, project_id, rating, text }) {
	return db('projects')
		.where({ project_id })
		.first()
		.then(project => {
			// Does this project exist?
			if (!project) {
				// Project not found
				return { projectNotFound: true };
			}
			// Are you the author of this project?
			else if (project.user_id === user_id) {
				// Can't review your own project
				return { ownProject: true };
			} else {
				return db('reviews')
					.where({ user_id, project_id })
					.first()
					.then(review => {
						// Have you already reviewed this project?
						if (review) {
							// Can't leave multiple reviews for the same project
							return { alreadyReviewed: true };
						} else {
							return db.transaction(trx => {
								return trx('reviews')
									.insert({ user_id, project_id, rating, text }, 'review_id')
									.then(([review_id]) => {
										if (!review_id) {
											trx.rollback;
										} else {
											return trx('projects')
												.where({ project_id })
												.select(
													'user_id as maker_id',
													'rating_sum as project_rating_sum',
													'rating_count as project_rating_count'
												)
												.first()
												.then(
													({
														maker_id,
														project_rating_sum,
														project_rating_count
													}) => {
														project_rating_sum += rating;
														project_rating_count++;
														return trx('projects')
															.where({ project_id })
															.update(
																{
																	// This returns whole stars
																	// project_rating: Math.round(
																	// 	project_rating_sum / project_rating_count
																	// ),
																	// This returns half stars
																	project_rating: (
																		Math.round(
																			(project_rating_sum /
																				project_rating_count) *
																				2
																		) / 2
																	).toFixed(1),
																	rating_sum: project_rating_sum,
																	rating_count: project_rating_count
																},
																'project_id'
															)
															.then(([project_updated]) => {
																if (!project_updated) {
																	trx.rollback;
																} else {
																	return trx('users')
																		.where({ user_id: maker_id })
																		.select(
																			'rating_sum as user_rating_sum',
																			'rating_count as user_rating_count'
																		)
																		.first()
																		.then(
																			({
																				user_rating_sum,
																				user_rating_count
																			}) => {
																				user_rating_sum += rating;
																				user_rating_count++;
																				return db('users')
																					.where({ user_id: maker_id })
																					.update(
																						{
																							// // This returns whole stars
																							// user_rating: Math.round(
																							// 	user_rating_sum /
																							// 		user_rating_count
																							// ),
																							// This returns half stars
																							user_rating: (
																								Math.round(
																									(user_rating_sum /
																										user_rating_count) *
																										2
																								) / 2
																							).toFixed(1),
																							rating_sum: user_rating_sum,
																							rating_count: user_rating_count
																						},
																						'user_id'
																					);
																			}
																		);
																}
															});
													}
												)
												.then(([user_updated]) => {
													if (!user_updated) {
														trx.rollback;
													} else {
														console.log(
															`Average ratings updated for project ${project_id} and user ${user_updated}`
														);
														return { review_id };
													}
												})
												.catch(error => {
													console.error(error);
													return {};
												});
										}
									});
							});
						}
					});
			}
		});
}

// This is big and ugly but it works. It would be easier to read with async/await
function editReview({ user_id, review_id, project_id, rating, text }) {
	// Make sure the review exists and the user is the author
	return db('reviews')
		.where({ user_id, review_id })
		.first()
		.then(review => {
			if (!review) {
				// No review by that id and author
				return { reviewNotFound: true };
			} else {
				// Hold onto the previous rating for later.
				const previous_rating = review.rating;
				// Update the review
				return db.transaction(trx => {
					return trx('reviews')
						.where({ user_id, review_id })
						.update({ rating, text }, 'review_id')
						.then(([updated]) => {
							if (!updated) {
								// Something went wrong updating the review
								trx.rollback;
							} else {
								// Do we need to update the average ratings?
								if (rating == previous_rating) {
									// Nope, just had to update the review text
									return { review_id };
								} else {
									// Yep. Let's go update the averages
									return trx('projects')
										.where({ project_id })
										.select(
											'user_id as maker_id',
											'rating_sum as project_rating_sum',
											'rating_count as project_rating_count'
										)
										.first()
										.then(
											({
												maker_id,
												project_rating_sum,
												project_rating_count
											}) => {
												project_rating_sum += rating - previous_rating;
												return trx('projects')
													.where({ project_id })
													.update(
														{
															// // This returns whole stars
															// project_rating: Math.round(
															// 	project_rating_sum / project_rating_count
															// ),
															// This returns half stars
															project_rating: (
																Math.round(
																	(project_rating_sum / project_rating_count) *
																		2
																) / 2
															).toFixed(1),
															rating_sum: project_rating_sum
														},
														'project_id'
													)
													.then(([project_updated]) => {
														if (!project_updated) {
															trx.rollback;
														} else {
															return trx('users')
																.where({ user_id: maker_id })
																.select(
																	'rating_sum as user_rating_sum',
																	'rating_count as user_rating_count'
																)
																.first()
																.then(
																	({ user_rating_sum, user_rating_count }) => {
																		user_rating_sum += rating - previous_rating;
																		return db('users')
																			.where({ user_id: maker_id })
																			.update(
																				{
																					// // This returns whole stars
																					// user_rating: Math.round(
																					// 	user_rating_sum / user_rating_count
																					// ),
																					// This returns half stars
																					user_rating: (
																						Math.round(
																							(user_rating_sum /
																								user_rating_count) *
																								2
																						) / 2
																					).toFixed(1),
																					rating_sum: user_rating_sum
																				},
																				'user_id'
																			);
																	}
																);
														}
													});
											}
										)
										.then(([user_updated]) => {
											if (!user_updated) {
												trx.rollback;
											} else {
												console.log(
													`Average ratings updated for project ${project_id} and user ${user_updated}`
												);
												return { review_id };
											}
										})
										.catch(error => {
											console.error(error);
											return {};
										});
								}
							}
						});
				});
			}
		});
}

// This is big and ugly but it works. It would be easier to read with async/await
function removeReview(user_id, review_id) {
	// Make sure the review exists and the user is the author
	return db('reviews')
		.where({ user_id, review_id })
		.first()
		.then(review => {
			if (!review) {
				// No review by that id and author
				return { reviewNotFound: true };
			} else {
				console.log(
					`\nUser ${user_id} attempting to delete review ${review_id}\n...`
				);
				// Hold onto the rating for later.
				const { project_id, rating } = review;
				// Delete the review
				return db.transaction(trx => {
					return trx('reviews')
						.where({ user_id, review_id })
						.del()
						.then(deleted => {
							if (!deleted) {
								// Something went wrong deleting the review
								trx.rollback;
							} else {
								// Update the projects table
								return trx('projects')
									.where({ project_id })
									.select(
										'user_id as maker_id',
										'rating_sum as project_rating_sum',
										'rating_count as project_rating_count'
									)
									.first()
									.then(
										({
											maker_id,
											project_rating_sum,
											project_rating_count
										}) => {
											project_rating_sum -= rating;
											project_rating_count--;
											return trx('projects')
												.where({ project_id })
												.update(
													{
														// // This returns whole stars
														// project_rating: Math.round(
														// 	project_rating_sum / project_rating_count
														// ),
														// This returns half stars
														project_rating: project_rating_count
															? (
																	Math.round(
																		(project_rating_sum /
																			project_rating_count) *
																			2
																	) / 2
															  ).toFixed(1)
															: 0,
														rating_sum: project_rating_sum,
														rating_count: project_rating_count
													},
													'project_id'
												)
												.then(([project_updated]) => {
													if (!project_updated) {
														trx.rollback;
													} else {
														// Update the users table
														return trx('users')
															.where({ user_id: maker_id })
															.select(
																'rating_sum as user_rating_sum',
																'rating_count as user_rating_count'
															)
															.first()
															.then(
																({ user_rating_sum, user_rating_count }) => {
																	user_rating_sum -= rating;
																	user_rating_count--;
																	return db('users')
																		.where({ user_id: maker_id })
																		.update(
																			{
																				// // This returns whole stars
																				// user_rating: Math.round(
																				// 	user_rating_sum / user_rating_count
																				// ),
																				// This returns half stars
																				user_rating: user_rating_count
																					? (
																							Math.round(
																								(user_rating_sum /
																									user_rating_count) *
																									2
																							) / 2
																					  ).toFixed(1)
																					: 0,
																				rating_sum: user_rating_sum,
																				rating_count: user_rating_count
																			},
																			'user_id'
																		);
																}
															);
													}
												});
										}
									)
									.then(([user_updated]) => {
										if (!user_updated) {
											trx.rollback;
										} else {
											console.log(
												`Average ratings updated for project ${project_id} and user ${user_updated}`
											);
											console.log('deleted', deleted);
											return { deleted };
										}
									})
									.catch(error => {
										console.error(error);
										return {};
									});
							}
						});
				});
			}
		});
}

function likeReview({ user_id, review_id, like }) {
	console.log(
		`\nUser ${user_id} attempting to set like value to ${like} for review ${review_id}\n...`
	);
	return db('reviews')
		.where({ review_id })
		.first()
		.then(review => {
			// Does this review exist?
			if (!review) {
				// Review not found
				return { reviewNotFound: true };
			}
			// Are you the author of this review?
			else if (review.user_id === user_id) {
				// Can't like your own review
				return { ownReview: true };
			} else {
				return db('likes')
					.where({ user_id, review_id })
					.first()
					.then(previous_like => {
						previous_like = previous_like ? previous_like.like : undefined;
						// Has the like value not changed?
						if (like === previous_like) {
							// Don't update anything
							return { liked: { like } };
						} else {
							// Transaction time!
							return db
								.transaction(trx => {
									// This gets used later to update the totals
									const updateHelpfulness = difference => {
										// Update the review's helpfulness
										return trx('reviews')
											.where({ review_id })
											.increment('helpfulness', difference)
											.then(review_updated => {
												if (!review_updated) {
													trx.rollback;
												} else {
													// Update the user's helpfulness
													return trx('users')
														.where({ user_id: review.user_id })
														.increment('helpfulness', difference)
														.then(user_updated => {
															console.log(
																{ user_id: review.user_id },
																`updated:`,
																user_updated
															);
															if (!user_updated) {
																trx.rollback;
															} else {
																return difference;
															}
														});
												}
											});
									};

									// Are we adding a new like value?
									if (previous_like === undefined) {
										// Create the row
										return trx('likes')
											.insert({ user_id, review_id, like }, 'user_id')
											.then(([created]) => {
												if (!created) {
													trx.rollback;
												} else {
													// Return the difference
													return updateHelpfulness(like);
												}
											});
										// Are we removing the like value?
									} else if (like === undefined) {
										// Delete the row
										return trx('likes')
											.where({ user_id, review_id })
											.del()
											.then(deleted => {
												if (!deleted) {
													trx.rollback;
												} else {
													// Return the difference
													return updateHelpfulness(-previous_like);
												}
											});
									} else {
										// Update the row
										return trx('likes')
											.where({ user_id, review_id })
											.update({ like }, 'user_id')
											.then(([updated]) => {
												if (!updated) {
													trx.rollback;
												} else {
													// Return the difference
													return updateHelpfulness(like * 2);
												}
											});
									}
								})
								.then(difference => {
									console.log(
										`Helpfulness adjusted by ${difference} for project ${review_id} and user ${
											review.user_id
										}`
									);
									return { liked: { like } };
								})
								.catch(error => {
									console.error(`Transaction error:`, error);
									return error;
								});
						}
					});
			}
		});
}
