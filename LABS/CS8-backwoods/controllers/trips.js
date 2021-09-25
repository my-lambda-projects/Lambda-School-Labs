const models = require('../models');

const createTrip = (req, res) => {
    models.Trips.create({
        tripName: req.body.tripName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        email: req.body.email,
        slug: req.body.slug
    }).then(response => {
        res.json(response);
    }).catch(err => {
        res.json(err);
    })
}

const archiveTrip = (req, res) => {
    models.Trips.update(req.body, {
        where: { id: req.body.id },
    })
        .then(trip => {
            res.json(trip)
        }).catch(err => {
            res.json(err)
        })
}

const getOneTripBySlug = (req, res) => {
    models.Trips.findOne({
        where: {email: req.params.user, slug: req.params.slug}
    })
    .then((trip) => {
        if (trip === null) {
            res.status(421).json({"error":"trip doesn't exist"})
        }
        res.json({ trip})
    })
    .catch(err => {
        res.status(420).json(err)
    })
}

const getTrip = (req, res) => {
    models.Trips.findAll({
        where: { email: req.params.user, archived: false }
    })
        .then((trips) => {
            if (trips.length === 0) {
                res.status(422).json({ "error": "User doesn't have trips" })
                return
            }
            res.json({ trips })
        })
        .catch(err => {
            res.json(err)
        })
};

const getTripAchived = (req, res) => {
    models.Trips.findAll({
        where: { email: req.params.user, archived: true }
    })
        .then((trips) => {
            if (trips.length === 0) {
                res.status(422).json({ "error": "User doesn't have trips" })
                return
            }
            res.json({ trips })
        })
        .catch(err => {
            res.json(err)
        })
};

module.exports = { createTrip, getTrip, archiveTrip, getTripAchived, getOneTripBySlug }