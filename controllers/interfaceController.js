const Interface = require("../models/Interface");

/**
 * CRUD with create many ;)
 */


exports.create = async (req, res) => {
    const { ip, interface, Rx, Tx, BW, Input_taille, Output_taille } = req.body;
    let newInterface = new Interface({ ip, interface, Rx, Tx, BW, Input_taille, Output_taille });
    newInterface["Switch Name"] = req.body["Switch Name"];
    if (req.body.state) newInterface.state = req.body.state;
    await newInterface.save((err) => {
        if (err) {
            //  console.log("ERROR : Load balancer is Not Saved!");
            return res.status(400).json({
                status: "Error",
                message: "database err ",
            });
        } else {
            //console.log("SUCCESS");
            return res.status(200).json({
                status: "Success",
                message: "New Interface saved",
            });
        }
    })

}

exports.createMany = async (req, res) => {
    const { data } = req.body;
    const result = [];
    data.forEach(async e => {
        interfacee = new Interface(e);
        result.push(await interfacee.save());
    })
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
    Interface.findById(req.params.id, async (err, doc) => {
        if (err) {
            return res.status(401).json({
                status: "Error",
                message: "Database error"
            })
        }
        else if (!doc) {
            console.log("ERROR : Load balancer is Not Not Found!");
            return res.status(404).json({
                status: "Error",
                message: "Interface Not Found!",
            });
        } else {
            if (req.body["Switch Name"]) doc["Switch Name"] = req.body["Switch Name"];
            if (req.body.ip) doc.ip = req.body.ip;
            if (req.body.interface) doc.interface = req.body.interface;
            if (req.body.state) doc.state = req.body.state;
            if (req.body.Rx) doc.Rx = req.body.Rx;
            if (req.body.Tx) doc.Tx = req.body.Tx;
            if (req.body.BW) doc.BW = req.body.BW;
            if (req.body.Input_taille) doc.Input_taille = req.body.Input_taille;
            if (req.body.Output_taille) doc.Output_taille = req.body.Output_taille;

            await doc.save((err) => {
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
                        message: "Interface updated",
                    });
                }
            })
        }
    })
}


exports.getOne = async (req, res) => {
    const found = await Interface.findById(req.params.id);
    if (found) {
        res.status(200).json({
            status: 'success',
            payload: found
        })
    } else res.status(404).json({ stats: 'error', message: 'not found' })
}

exports.getAll = async (req, res) => {
    Interface.find((err, docs) => {
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
                message: `Loaded ${docs.length} interfaces`,
                payload: docs
            })
        }
    })
}


exports.delete = async (req, res) => {
    Interface.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                message: "Database error"
            })
        } else {
            return res.status(200).json({
                status: "Succces",
                message: 'Interface data Deleted'
            })
        }
    })
}

exports.deleteAll = async (req, res) => {
    Interface.deleteMany({}, (err) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                message: "Database error"
            })
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'Cleared interfaces datasets'
            })
        }
    })
}