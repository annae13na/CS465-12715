const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

require('./travlr');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;
const Trip = mongoose.model('trips');

const seedDB = async () => {
    await mongoose.connect(dbURI);

    const tripsPath = path.join(__dirname, '../../data/trips.json');
    const trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

    await Trip.deleteMany({});
    await Trip.insertMany(trips);

    console.log('Database seeded successfully');
    await mongoose.connection.close();
};

seedDB();