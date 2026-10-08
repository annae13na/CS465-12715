const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

/* GET travel view */
const travel = (req, res) => {
    const path = '/api/trips';
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };

    request(
        requestOptions,
        (err, response, body) => {
            res.render('travel', {
                title: 'Travlr Getaways',
                trips: body
            });
        }
    );
};

module.exports = {
    travel
};