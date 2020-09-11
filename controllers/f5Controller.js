const LoadBalancer = require("../models/LoadBalancer");



/**
 * CRUD
 */


exports.create = async (req, res) => {
    const { hostname, IP, Destination, Pool, Member1, Member2 } = req.body;
    let f5 = new LoadBalancer({
        hostname, IP, Destination, Pool, Member1, Member2
    });
    f5["Virtuel Server"] = req.body["Virtuel Server"];

    if (req.body.VS_Availability) f5.VS_Availability = req.body.VS_Availability;
    if (req.body.Mbr1_Availability) f5.Mbr1_Availability = req.body.Mbr1_Availability;
    if (req.body.Node1_Availability) f5.Node1_Availability = req.body.Node1_Availability;
    if (req.body.Mbr2_Availability) f5.Mbr2_Availability = req.body.Mbr2_Availability;
    if (req.body.Node2_Availability) f5.Node2_Availability = req.body.Node2_Availability;


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
    const result = [];
    data.forEach(async e => {
        f5 = new LoadBalancer(e);
        result.push(await f5.save())
    });

    console.log(result);
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
            if (req.body.IP) f5.IP = req.body.IP;
            if (req.body["Virtuel Server"]) f5["Virtuel Server"] = req.body["Virtuel Server"];
            if (req.body.Destination) f5.Destination = req.body.Destination;
            if (req.body.Pool) f5.Pool = req.body.Pool;
            if (req.body.Member1) f5.Member1 = req.body.Member1;
            if (req.body.Member2) f5.Member2 = req.body.Member2;
            if (req.body.VS_Availability) f5.VS_Availability = req.body.VS_Availability;
            if (req.body.Mbr1_Availability) f5.Mbr1_Availability = req.body.Mbr1_Availability;
            if (req.body.Node1_Availability) f5.Node1_Availability = req.body.Node1_Availability;
            if (req.body.Mbr2_Availability) f5.Mbr2_Availability = req.body.Mbr2_Availability;
            if (req.body.Node2_Availability) f5.Node2_Availability = req.body.Node2_Availability;

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