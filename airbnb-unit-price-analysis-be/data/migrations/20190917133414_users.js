exports.up = function(knex) {
  return knex.schema
  .createTable('listings', listings => {
    listings.increments();
    listings.string('picture_url', 500)
        .notNullable()
    listings.string('name', 255)
        .notNullable()
    listings.string('city', 255)
        .notNullable()
    listings.string('state', 255)
        .notNullable()
    listings.string('room_type', 255)
        .notNullable()
    listings.integer('guests_included')
        .notNullable()
    listings.integer('bedrooms')
        .notNullable()
    listings.integer('beds')
        .notNullable()
    listings.integer('bathrooms')
        .notNullable()
    listings.string('user_email', 255)
        .notNullable()
        //-------------
    listings.string('url', 255 )
        .notNullable()
    listings.integer('review_scores_accuracy')
        .notNullable()
    listings.integer('review_scores_checkin')
        .notNullable()
    listings.integer('review_scores_cleanliness')
        .notNullable()
    listings.integer('review_scores_communication')
        .notNullable()
    listings.integer('review_scores_location')
        .notNullable()
    listings.integer('review_scores_rating')
        .notNullable()
    listings.integer('review_scores_value')
        .notNullable()
    listings.string('property_type', 255 )
        .notNullable()
        //-------------
    listings.string('amenities', 255 )
        .notNullable()
    listings.integer('price')
        .notNullable()
    listings.string('access', 255 )
        .notNullable()
    listings.string('notes', 255)
        .notNullable
    listings.string('space', 255)
        .notNullable
    listings.string('summary', 255)
        .notNullable
    listings.string('transit', 255)
        .notNullable
    listings.integer('zipcode')
        .notNullable
});
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("listings");
};

// *********** N E W  R O U T E S *************
// url - string
// review_scores_accuracy - #
// review_scores_checkin - #
// review_scores_cleanliness - #
// review_scores_communication - #
// review_scores_location - #
// review_scores_rating - #
// review_scores_value - #
// property_type - string

//##########################################
//  O R I G I N A L   D O W N   B E L O W 
//##########################################


// exports.up = function(knex) {
//     return knex.schema
//     .createTable('listings', listings => {
//       listings.increments();
//       listings.string('picture_url', 500)
//           .notNullable()
//       listings.string('name', 255)
//           .notNullable()
//       listings.string('city', 255)
//           .notNullable()
//       listings.string('room_type', 255)
//           .notNullable()
//       listings.integer('guests_included')
//           .notNullable()
//       listings.integer('bedrooms')
//           .notNullable()
//       listings.integer('beds')
//           .notNullable()
//       listings.integer('bathrooms')
//           .notNullable()
//       listings.string('user_email', 255)
//           .notNullable()
//     });
//   };
  
//   exports.down = function(knex) {
//     return knex.schema
//       .dropTableIfExists("listings");
//   };
