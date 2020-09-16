const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loadBalancerSchema = new Schema(
    {
        hostname: {
            type: String,
            // required: true
        },
        ip: {
            type: String,
            //  required: true
        },
        virtual_server: String,
        vs_availability: { type: String, enum: ["available", "offline"], default: "available" },
        destination: String,
        pool: String,
        member1: String,
        mbr1_availability: { type: String, enum: ["available", "offline"], default: "available" },
        node1_availability: { type: String, enum: ["available", "offline"], default: "available" },
        member2: String,
        mbr2_availability: { type: String, enum: ["available", "offline"], default: "available" },
        node2_availability: { type: String, enum: ["available", "offline"], default: "available" },

    },
    {
        timestamps: true,
    }
);

const LoadBalancer = mongoose.model('LoadBalancer', loadBalancerSchema);
module.exports = LoadBalancer;
