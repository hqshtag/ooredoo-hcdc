const Node = require("../models/Node");



exports.create = async (req, res) => {
    const { name, ip, type, version, serial } = req.body;
    let newNode = new Node({ name, ip, type, version, serial });


    await newNode.save((err) => {
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
                message: "New Node saved",
            });
        }
    })
}

exports.createMany = async (req, res) => {
    const { data } = req.body;
    const result = [];
    data.forEach(async e => {
        node = new Node(e);
        result.push(await node.save());
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
    Node.findById(req.params.id, async (err, doc) => {
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
            if (req.body.name) doc.name = req.body.name;
            if (req.body.ip) doc.ip = req.body.ip;
            if (req.body.serial) doc.serial = req.body.serial;
            if (req.body.type) doc.type = req.body.type;
            if (req.body.version) doc.version = req.body.version;

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
                        message: "Node updated",
                    });
                }
            })

        }
    })
}

exports.getOne = async (req, res) => {
    const found = await Node.findById(req.params.id);
    if (found) {
        res.status(200).json({
            status: 'success',
            payload: found
        })
    } else res.status(404).json({ stats: 'error', message: 'not found' })
}


exports.getAll = async (req, res) => {
    Node.find((err, docs) => {
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
                message: `Loaded ${docs.length} Nodes`,
                payload: docs
            })
        }
    })
}



exports.delete = async (req, res) => {
    Node.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                message: "Database error"
            })
        } else {
            return res.status(200).json({
                status: "Succces",
                message: 'Node data Deleted'
            })
        }
    })
}

exports.deleteAll = async (req, res) => {
    Node.deleteMany({}, (err) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                message: "Database error"
            })
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'Cleared nodes datasets'
            })
        }
    })
}