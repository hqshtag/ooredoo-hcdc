const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const nodeSchema = new Schema(
    {
        "Node Name": {
            type: String,
            required: true
        },
        "IP-adrress": {
            type: String,
            required: true
        },
        Type: {
            type: String,
            required: true
        },
        version: String,
        "Serial-nbr": String,

    },
    {
        timestamps: true,
    }
);

const Node = mongoose.model('Node', nodeSchema);
module.exports = Node;
