const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: String,
    year: Number,
    image:String,
    createdBy: String,
}, {
    versionKey: false
})

const MovieModel = mongoose.model("movie", movieSchema);

module.exports = {
    MovieModel
}