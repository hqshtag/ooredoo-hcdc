const NodeData = require("../models/NodeData");
const InterfaceData = require("../models/InterfaceData");



exports.getAllNodeData = async (req, res) => {
    NodeData.find((err, docs) => {
        if (err) res.status(400).json({ status: "Error", message: "Database Error!!" })
        if (docs && docs.length > 0) {
            res.status(200).json({
                status: "success",
                payload: docs
            })
        } else {
            res.status(404).json({ status: 'success', message: "empty dataset" })
        }
    })//.populate("node")
}

exports.getAllInterfaceData = async (req, res) => {
    InterfaceData.find((err, docs) => {
        if (err) res.status(400).json({ status: "Error", message: "Database Error!!" })
        if (docs && docs.length > 0) {
            res.status(200).json({
                status: "success",
                payload: docs
            })
        } else {
            res.status(404).json({ status: 'success', message: "empty dataset" })
        }
    })
}


exports.clearDataSets = async (req, res) => {
    InterfaceData.deleteMany({}, (err) => {
        if (err) {

            return res.status(400).json({
                status: 'Error',
                message: "Database error"
            })
        } else {
            NodeData.deleteMany({}, (err) => {
                if (err) {

                    return res.status(400).json({
                        status: 'Error',
                        message: "Database error"
                    })
                } else {
                    return res.status(200).json({
                        status: 'success',
                        message: 'Cleared datasets'
                    })
                }
            }
            )
        }
    })
}