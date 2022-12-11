const mongoose = require("mongoose");

const slowmodeSchema = mongoose.Schema({
    slowmodeDuration: Number,
    supporterSlowmodeDuration: Number,
});

const model = mongoose.model("slowmode", slowmodeSchema);
module.exports = model;
