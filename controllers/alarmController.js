const Alarm = require("../models/Alarm");



/**
 * CRUD
 */


exports.create = async (req, res) => {
    const { type, message, node, interface, status } = req.body;
    let newAlarm = new Alarm({
        type, message, node, interface, status
    });
    await newAlarm.save((err) => {
        if (err) {
            return res.status(400).json({
                status: "Error",
                message: "database err ",
            });
        } else {
            return res.status(200).json({
                status: "Success",
                message: "Alarm saved",
            });
        }
    })
}



exports.getOne = async (req, res) => {

    Alarm.findById(req.params.id, (err, doc) => {
        if (doc) {
            res.status(200).json({
                status: 'success',
                payload: doc
            })
        } else res.status(404).json({ status: 'error', message: 'not found' })
    }
    ).populate("node").populate("interface")
}


exports.getAll = async (req, res) => {
    Alarm.find((err, docs) => {
        if (err) {
            return res.status(401).json({
                status: "Error",
                message: "Database error"
            })
        } else if (!docs || docs.length == 0) {
            return res.status(200).json({
                status: "Success",
                message: "No data"
            })
        } else {
            return res.status(200).json({
                status: "Success",
                message: `Loaded ${docs.length} alarms`,
                payload: docs
            })
        }
    }).populate("node").populate("interface")
}

exports.delete = async (req, res) => {
    Alarm.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                message: "Database error"
            })
        } else {
            return res.status(200).json({
                status: "Succces",
                message: 'Alarm data Deleted'
            })
        }
    })
}

exports.deleteAll = async (req, res) => {
    Alarm.deleteMany({}, (err) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                message: "Database error"
            })
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'Cleared Alarm datasets'
            })
        }
    })
}