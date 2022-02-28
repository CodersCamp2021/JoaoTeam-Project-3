const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    director: String,
    genres: [String],
    description: String,
    poster: String
})

module.exports = mongoose.model('Movie', movieSchema)
