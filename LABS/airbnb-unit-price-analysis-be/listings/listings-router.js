const express = require("express");
const router = express.Router();

const Listings = require("./listings-model");

router.get("/", (req, res) => {
  Listings.find()
    .then(listings => res.status(200).json(listings))
    .catch(err => res.status(500).json({ error: "DOH!" }));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const listing = Listings.findByID(id)
    .then(listing => {
      if (!listing) {
        res
          .status(404)
          .json({ error: "A listing with this ID does not exist." });
      } else {
        res.status(200).json(listing);
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "Something went wrong while trying to retrieve the listing."
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Listings.deleteListing(id)
    .then(listings => {
      console.log(listings);
      if (listings) {
        res.status(200).json(listings);
      } else {
        res
          .status(404)
          .json({ error: " A listing with this ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "Something went wrong trying to delete this listing." });
    });
});

router.post("/retrieve", (req, res) => {
  const email = req.body.user_email;

  Listings.findByEmail(email)
    .then(listings => {
      // console.log(listings)
      res.status(200).json(listings)
    })
    .catch(err => {
      // console.log(err)
      res.status(500).json(err)
    });
});

router.post("/save", (req, res) => {
  const listing = req.body;

  const savedListing = {
    picture_url: listing.picture_url,
    name: listing.name,
    city: listing.city,
    state: listing.state,
    room_type: listing.room_type,
    guests_included: listing.guests_included,
    bedrooms: listing.bedrooms,
    beds: listing.beds,
    bathrooms: listing.bathrooms,
    user_email: listing.user_email,
    url: listing.url,
    review_scores_accuracy: listing.review_scores_accuracy,
    review_scores_checkin: listing.review_scores_checkin,
    review_scores_cleanliness: listing.review_scores_cleanliness,
    review_scores_communication: listing.review_scores_communication,
    review_scores_location: listing.review_scores_location,
    review_scores_rating: listing.review_scores_rating,
    review_scores_value: listing.review_scores_value,
    property_type: listing.property_type,
    amenities: listing.amenities,
    price: listing.price,
    access: listing.access,
    notes: listing.notes,
    space: listing.space,
    summary: listing.summary,
    transit: listing.transit,
    zipcode: listing.zipcode
  };



  Listings.saveListing(savedListing)
    .then(listings => res.status(200).json(listings))
    .catch(err => res.status(500).json({ error: "DOH!" }));
});

router.put("/:id/", (req, res) => {
  const listing = req.body;
  const id = req.params.id;
  console.log(listing);
  console.log(req.params.id);
  Listings.updateListing(id, listing)
    .then(listing =>
      res
        .status(200)
        .json({ message: "Your listing was updated successfully." })
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: "There was a problem updating the post description." })
    );
});

module.exports = router;
