//import mongoose to creare the database schema
let mongoose = require('mongoose');

//stducture of the movie document in MongoDB database
let movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: String, required: true },
    genre: { type: String, required: true },
    rating: { type: String, required: true }
});

//make the file can be used in the route file
module.exports = mongoose.model('Movie', movieSchema);