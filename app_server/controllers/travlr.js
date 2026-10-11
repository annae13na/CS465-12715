
const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000'
};

/* GET travel page - display all trips */
const travel = (req, res) => {
    const path = '/api/trips';

    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };

    request(requestOptions, (err, response, body) => {
        if (err || !response || response.statusCode !== 200) {
            return res.status(500).send('Unable to load trips.');
        }

        res.render('travel', {
            title: 'Travlr Getaways',
            trips: body
        });
    });
};

/* GET individual trip details */
const travelDetails = (req, res) => {
    const tripCode = req.params.tripCode;
    const path = `/api/trips/${encodeURIComponent(tripCode)}`;

    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };

    request(requestOptions, (err, response, body) => {
        if (err || !response || response.statusCode !== 200 || !body) {
            return res.status(404).send('Trip not found.');
        }

        // The API returns an array, so select the first trip.
        const trip = Array.isArray(body) ? body[0] : body;

        if (!trip) {
            return res.status(404).send('Trip not found.');
        }

        res.render('travel-details', {
            title: trip.name,
            trip: trip
        });
    });
};

module.exports = {
    travel,
    travelDetails
};
