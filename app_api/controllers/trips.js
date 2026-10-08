const mongoose = require('mongoose');
const Model = mongoose.model('trips');

// GET: /trips
// Returns all trips
const tripsList = async (req, res) => {
    const q = await Model
        .find({})
        .exec();

    if (!q) {
        return res
            .status(404)
            .json({ "message": "trips not found" });
    } else {
        return res
            .status(200)
            .json(q);
    }
};

// GET: /trips/:tripCode
// Returns a single trip
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode })
        .exec();

    if (!q || q.length === 0) {
        return res
            .status(404)
            .json({ "message": "trip not found" });
    } else {
        return res
            .status(200)
            .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};