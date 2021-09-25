const models = require('../models');

const createMarker = (req, res) => {
    const markers = req.body.markersArr
    models.Markers.bulkCreate(markers).then(response => {
        res.json(response);
    }).catch(err => {
        res.json(err);
    })
}


const getMarkers = (req, res) => {
    models.Markers.findAll({
        where: { tripId: req.params.tripId }
    })
        .then((marker) => {
            if (marker.length === 0) {
                res.status(422).json({ "error": "Trip has no markers" })
                return
            }
            res.json({ marker })
        })
        .catch(err => {
            res.status(423).json({ "error": err })
        })
};

module.exports = { createMarker, getMarkers }