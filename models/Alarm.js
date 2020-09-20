const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const alarmSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        node: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: "Node",
        },
        interface: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Interface",
        },
        status: {
            type: String,
            enum: ["on", "off"],
            default: "on"
        }
    },
    {
        timestamps: true,
    }
);

const Alarm = mongoose.model('alarm', alarmSchema);
module.exports = Alarm;
