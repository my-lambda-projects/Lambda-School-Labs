const db = require("../data/dbConfig");

module.exports = {
  find,
  findByEmail,
  findByID,
  saveListing,
  deleteListing,
  updateListing
};

function find() {
  return db("listings");
}

function findByEmail(email) {
  return db("listings").where({ user_email: email });
}

function findByID(id) {
  return db("listings")
    .where({ id })
    .first();
}

function saveListing(listing) {
  return db("listings")
    .insert(listing)
    .then(() => {
      return findByEmail(listing.user_email);
    });
}

function deleteListing(id) {
  return db("listings")
    .where({ id: id })
    .then(listing => {
      console.log(listing);
      return db("listings")
        .where({ id: listing[0].id })
        .delete()
        .then(() => {
          return findByEmail(listing[0].user_email);
        });
    });
}

function updateListing(id, changes) {
  return db("listings")
    .where({ id })
    .update(changes);
}
