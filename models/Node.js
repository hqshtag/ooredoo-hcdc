const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const nodeSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        ip: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        version: String,
        serial: String,
        cpu: {
            type: Number,
            default: 30
        }

    },
    {
        timestamps: true,
    }
);

const Node = mongoose.model('Node', nodeSchema);
module.exports = Node;
