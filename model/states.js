const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    name: String,
    stateCode: {
        type: String,
        required: true,
        unique: true
    },
    funfacts: {
        type: Array,
    },
});

module.exports = mongoose.model("State", stateSchema);