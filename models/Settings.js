const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
    //overclock value, default 70%
    oc: {
        type: Number,
        required: true,
        default: 70
    },
    //overload value, default 70%
    ol: {
        type: Number,
        required: true,
        default: 70
    },
    version: {
        type: String,
        default: "0.0.1-alpha"
    }

})

const Settings = mongoose.model('Setting', schema);
module.exports = Settings;