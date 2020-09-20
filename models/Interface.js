const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const interfaceSchema = new Schema(
    {
        node: {
            type: String,
            //  required: true
        },
        ip: {
            type: String,
            //required: true
        },
        interface: String,
        state: {
            type: String,
            enum: ["up", "down"],
            default: "up",
        },
        Rx: Number,
        Tx: Number,
        BW: Number,
        input_size: Number,
        output_size: Number,
        usage: {
            type: Number,
            default: 0
        },

    },
    {
        timestamps: true,
    }
);

const Interface = mongoose.model('Interface', interfaceSchema);
module.exports = Interface;
