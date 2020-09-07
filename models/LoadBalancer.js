const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loadBalancerSchema = new Schema(
    {
        hostname: {
            type: String,
            // required: true
        },
        IP: {
            type: String,
            //  required: true
        },
        "Virtuel Server": String,
        VS_Availability: { type: String, enum: ["available", "offline"], default: "available" },
        Destination: String,
        Pool: String,
        Member1: String,
        Mbr1_Availability: { type: String, enum: ["available", "offline"], default: "available" },
        Node1_Availability: { type: String, enum: ["available", "offline"], default: "available" },
        Member2: String,
        Mbr2_Availability: { type: String, enum: ["available", "offline"], default: "available" },
        Node2_Availability: { type: String, enum: ["available", "offline"], default: "available" },

    },
    {
        timestamps: true,
    }
);

const LoadBalancer = mongoose.model('LoadBalancer', loadBalancerSchema);
module.exports = LoadBalancer;
