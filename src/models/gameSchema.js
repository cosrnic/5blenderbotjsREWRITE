const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
    name: String,
    game: String,
})

const model = mongoose.model("games", gameSchema);
module.exports = model;