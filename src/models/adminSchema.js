const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    userID: String,
    userName: String,
})

const model = mongoose.model("admins", adminSchema);
module.exports = model;