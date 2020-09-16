const LoadBalancer = require("../models/LoadBalancer");



/**
 * CRUD
 */


exports.create = async (req, res) => {
    const { hostname, ip, virtual_server, destination, pool, member1, member2 } = req.body;
    let f5 = new LoadBalancer({
        hostname, ip, virtual_server, destination, pool, member1, member2
    });


    if (req.body.vs_availability) f5.vs_availability = req.body.vs_availability;
    if (req.body.mbr1_availability) f5.mbr1_availability = req.body.mbr1_availability;
    if (req.body.node1_availability) f5.node1_availability = req.body.node1_availability;
    if (req.body.mbr2_availability) f5.mbr2_availability = req.body.mbr2_availability;
    if (req.body.node2_availability) f5.node2_availability = req.body.node2_availability;


    await f5.save((err) => {
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
                message: "F5 Load Balancer saved",
            });
        }
    })
}

exports.createMany = async (req, res) => {
    const { data } = req.body;
    //console.log(data.length);
    const result = [];
    data.forEach(async e => {
        f5 = new LoadBalancer(e);
        result.push(await f5.save())
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
    LoadBalancer.findById(req.params.id, async (err, f5) => {
        if (err) {
            return res.status(401).json({
                status: "Error",
                message: "Database error"
            })
        }
        else if (!f5) {
            console.log("ERROR : Load balancer is Not Not Found!");
            return res.status(404).json({
                status: "Error",
                message: "Load balancer Not Found!",
            });
        } else {
            if (req.body.hostname) f5.hostname = req.body.hostname;
            if (req.body.ip) f5.ip = req.body.ip;
            if (req.body.virtual_server) f5.virtual_server = req.body.virtual_server;
            if (req.body.destination) f5.destination = req.body.destination;
            if (req.body.pool) f5.pool = req.body.pool;
            if (req.body.member1) f5.member1 = req.body.member1;
            if (req.body.member2) f5.member2 = req.body.member2;
            if (req.body.vs_availability) f5.vs_availability = req.body.vs_availability;
            if (req.body.mbr1_availability) f5.mbr1_availability = req.body.mbr1_availability;
            if (req.body.node1_availability) f5.node1_availability = req.body.node1_availability;
            if (req.body.mbr2_availability) f5.mbr2_availability = req.body.mbr2_availability;
            if (req.body.node2_availability) f5.node2_availability = req.body.node2_availability;

            await f5.save((err) => {
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
                        message: "F5 updated",
                    });
                }
            })
        }
    }
    );

}

exports.getOne = async (req, res) => {

    const f5 = await LoadBalancer.findById(req.params.id)
    if (f5) {
        res.status(200).json({
            status: 'success',
            payload: f5
        })
    } else res.status(404).json({ status: 'error', message: 'not found' })
}

exports.getAll = async (req, res) => {
    LoadBalancer.find((err, docs) => {
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
                message: `Loaded ${docs.length} F5's`,
                payload: docs
            })
        }
    })
}

exports.delete = async (req, res) => {
    LoadBalancer.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                message: "Database error"
            })
        } else {
            return res.status(200).json({
                status: "Succces",
                message: 'Loadbalancer data Deleted'
            })
        }
    })
}

exports.deleteAll = async (req, res) => {
    LoadBalancer.deleteMany({}, (err) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                message: "Database error"
            })
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'Cleared Loadbalancer datasets'
            })
        }
    })
}