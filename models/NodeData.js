const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        node: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: "Node",
        },
        cpu: {
            type: [[Number, Date.now()]], //[[CPU, timestamp], [CPU, timestamp] ....]
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const NodeData = mongoose.model('nodedata', schema);
module.exports = NodeData;
