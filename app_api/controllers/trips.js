
const mongoose = require('mongoose');
const Model = mongoose.model('trips');

// GET: Retrieve all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Model.find({}).exec();
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET: Retrieve one trip
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Model.findOne({
      code: req.params.tripCode
    }).exec();

    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST: Add a new trip
const tripsAddTrip = async (req, res) => {
  try {
    const trip = await Model.create(req.body);
    return res.status(201).json(trip);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// PUT: Update an existing trip
const tripsUpdateTrip = async (req, res) => {
  try {
    const trip = await Model.findOneAndUpdate(
      { code: req.params.tripCode },
      req.body,
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// DELETE: Remove a trip
const tripsDeleteTrip = async (req, res) => {
  try {
    const trip = await Model.findOneAndDelete({
      code: req.params.tripCode
    });

    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    return res.status(200).json({
      message: 'Trip deleted successfully'
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
