const Alarm = require("../models/Alarm");
const Node = require("../models/Node");
const NodeData = require("../models/NodeData");
const Settings = require("../models/Settings");
const { create_cpu_overclock_alarm } = require("./alarmController");


exports.create = async (req, res) => {
    const { name, ip, type, version, cpu, serial } = req.body;
    let newNode = new Node({ name, ip, type, version, cpu, serial });

    Node.find({ name, ip, serial }, async (err, doc) => {
        if (doc && doc.length > 0) {
            let data = await NodeData.find({ node: doc[0]._id });
            console.log(data);
            if (!data || data.length === 0) {
                data = new NodeData();
                data.node = doc[0]._id;
                data.cpu.push([doc[0].cpu, Date.now()]);
                await data.save();
            } else {
                data[0].node = doc[0]._id;
                data[0].cpu.push([doc[0].cpu, Date.now()]);
                await data[0].save();
            }



            if (cpu) doc[0].cpu = cpu;

            doc[0].save((err) => {
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
        } else {
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
    })
}

exports.createMany = async (req, res) => {
    const { data } = req.body;
    const result = [];
    data.forEach(async e => {
        const { name, ip, serial, cpu } = e;
        //look for node in DB
        Node.findOne({ name, ip, serial }, async (err, doc) => {
            if (doc) { //if node found update and send old cpu usage to node datas & create alarm if needed
                //check if cpu overclock and create alarm of so
                console.log(doc);
                /*  try {
                     Settings.findOne({}, async (err, res) => {
                         if (err) throw err;
                         else {
                             const { oc } = res;
 
                             if (cpu >= oc) {
                                 let newAlarm = new Alarm({ type: "CPU-OC", node: doc._id, value: cpu })
                                 await newAlarm.save();
                             }
                         }
                     });
                 } catch (err) {
                     res.status(400).json({ status: 'Error', message: 'database error' });
                 } */


                create_cpu_overclock_alarm(doc._id, cpu);
                let data = await NodeData.findOne({ node: doc._id });
                if (!data || data.length === 0) {
                    data = new NodeData();
                    data.node = doc._id;
                    data.cpu.push([doc.cpu, Date.now()]);
                    await data.save();
                } else {
                    data.node = doc._id;
                    data.cpu.push([doc.cpu, Date.now()]);



                    await data.save();
                }
                if (cpu) doc.cpu = cpu;
                result.push(await doc.save());
            } else {
                node = new Node(e);
                create_cpu_overclock_alarm(node._id, e.cpu);
                result.push(await node.save());
            }
        })

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
            if (req.body.cpu) doc.cpu = req.body.cpu;



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
            return res.status(404).json({
                status: "Error",
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
    Node.findByIdAndDelete(req.params.id, async (err) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                message: "Database error"
            })
        } else {
            await NodeData.findOneAndDelete({ node: req.params.id })
            return res.status(200).json({
                status: "Succces",
                message: 'Node data Deleted'
            })
        }
    })
}

exports.deleteAll = async (req, res) => {
    Node.deleteMany({}, async (err) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                message: "Database error"
            })
        } else {
            await NodeData.deleteMany({});

            return res.status(200).json({
                status: 'success',
                message: 'Cleared nodes datasets'
            })
        }
    })

}