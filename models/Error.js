const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const errorSchema = new Schema(
    {
        node: {
            type: String,
            required: true
        },
        interface: {
            type: String,
            required: true
        },
        code: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Error = mongoose.model('error', errorSchema);
module.exports = Error;
