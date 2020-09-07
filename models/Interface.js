const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const interfaceSchema = new Schema(
    {
        "Switch Name": {
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
        Rx: String,
        Tx: String,
        BW: String,
        Input_taille: String,
        Output_taille: String,

    },
    {
        timestamps: true,
    }
);

const Interface = mongoose.model('Interface', interfaceSchema);
module.exports = Interface;
