const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        interface: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: "Interface",
        },
        bw: {
            type: [],   //[[[RX, TX], timestamp], [[RX, TX], timestamp] ...]
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const InterfaceData = mongoose.model('interfacedata', schema);
module.exports = InterfaceData;
