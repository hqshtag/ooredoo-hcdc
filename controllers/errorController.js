const Error = require("../models/Error");



/**
 * CRUD
 */


exports.create = async (req, res) => {
    const { node, interface, code, type } = req.body;
    let newError = new Error({
        node, interface, code, type
    });
    await newError.save((err) => {
        if (err) {
            return res.status(400).json({
                status: "Error",
                message: "database err ",
            });
        } else {
            return res.status(200).json({
                status: "Success",
                message: "Error saved",
            });
        }
    })
}

exports.createMany = async (req, res) => {
    const { data } = req.body;
    //console.log(data.length);
    const result = [];
    data.forEach(async e => {
        error = new Error(e);
        result.push(await error.save())
    });

    //console.log(result);
    Promise.all(result).then(() => {
        return res.status(200).json({
            status: "success",
            message: "data saved"
        })
    }).catch(err => {
        return res.status(400).json({
            status: 'error',
            payload: err
        })
    })

}

exports.update = async (req, res) => {
    Error.findById(req.params.id, async (err, error) => {
        if (err) {
            return res.status(401).json({
                status: "Error",
                message: "Database error"
            })
        }
        else if (!error) {
            //console.log("ERROR : Error Not Found!");
            return res.status(404).json({
                status: "Error",
                message: "Error Not Found!",
            });
        } else {
            if (req.body.node) error.node = req.body.node;
            if (req.body.interface) error.interface = req.body.interface;
            if (req.body.code) error.code = req.body.code;
            if (req.body.type) error.type = req.body.type;


            await error.save((err) => {
                if (err) {
                    console.log(err);
                    //console.log("ERROR : Car is Not Saved!");
                    return res.status(400).json({
                        status: "Error",
                        message: "SAVING ERROR",
                    });
                } else {
                    return res.status(200).json({
                        status: "Success",
                        message: "Error updated",
                    });
                }
            })
        }
    }
    );

}

exports.getOne = async (req, res) => {

    const error = await Error.findById(req.params.id)
    if (error) {
        res.status(200).json({
            status: 'success',
            payload: error
        })
    } else res.status(404).json({ status: 'error', message: 'not found' })
}

exports.getAll = async (req, res) => {
    Error.find((err, docs) => {
        if (err) {
            return res.status(401).json({
                status: "Error",
                message: "Database error"
            })
        } else if (!docs || docs.length == 0) {
            return res.status(404).json({
                status: "Error",
                message: "No data"
            })
        } else {
            return res.status(200).json({
                status: "Success",
                message: `Loaded ${docs.length} Errors`,
                payload: docs
            })
        }
    })
}

exports.delete = async (req, res) => {
    Error.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                message: "Database error"
            })
        } else {
            return res.status(200).json({
                status: "Succces",
                message: 'Error data Deleted'
            })
        }
    })
}

exports.deleteAll = async (req, res) => {
    Error.deleteMany({}, (err) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                message: "Database error"
            })
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'Cleared Errors datasets'
            })
        }
    })
}