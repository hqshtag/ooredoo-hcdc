const Interface = require("../models/Interface");
const InterfaceData = require("../models/InterfaceData");
const Settings = require("../models/Settings");
const { create_bw_overload_alarm } = require("./alarmController");
/**
 * CRUD with create many ;)
 */

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
const bw_usage = (bw, x, y) => {
    /* let bandwidth = bw * 8;
    //let deltaTime = 1800 //seconds or 30mintues
    const input = x * 100 // * 100 / bandwidth;
    const output = y * 100 // * 10000 / bandwidth; */

    return (x + y) / (bw * 1024) * 100;
}



exports.create = async (req, res) => {
    const { node, ip, interface, Rx, Tx, BW, input_size, output_size } = req.body; // if we have this interface already, we 
    Interface.findOne({ node, ip, interface }, async (err, doc) => { //update it  and send previous data to interfaceData;)

        if (doc) {
            //check for bandwidth overload
            try {
                Settings.findOne({}, async (err, res) => {
                    if (err) throw err;
                    else {
                        const { ol } = res;
                        if (cpu >= ol) {
                            let newAlarm = new Alarm({ type: "BANDWIDTH-OL", node: doc._id, value: cpu })
                            await newAlarm.save();
                        }
                    }
                });
            } catch (err) {
                res.status(400).json({ status: 'Error', message: 'database error' });
            }


            let data = await InterfaceData.findOne({ interface: doc._id });
            //console.log(data);
            if (!data) {
                data = new InterfaceData();
                data.interface = doc._id;
                data.bw.push([[doc.input_size, doc.output_size], Date.now()]);
                await data.save();
            } else {
                data.interface = doc._id;
                data.bw.push([[doc.input_size, doc.output_size], Date.now()]);
                await data.save();
            }



            if (Rx) doc.Rx = Rx;
            if (Tx) doc.Tx = Tx;
            if (input_size) doc.input_size = input_size;
            if (output_size) doc.output_size = output_size;
            doc.usage = bw_usage(BW * 100, input_size, output_size);


            doc.save((err) => {
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
        } else {
            let newInterface = new Interface({ node, ip, interface, Rx, Tx, BW, input_size, output_size });
            if (req.body.state) newInterface.state = req.body.state;
            newInterface.usage = bw_usage(BW * 100, input_size, output_size)

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
    })

}

exports.createMany = async (req, res) => {
    const { data } = req.body;
    const result = [];
    data.forEach(async e => {
        const { node, ip, interface, Rx, Tx, BW, input_size, output_size, state } = e;
        Interface.findOne({ node, ip, interface }, async (err, doc) => {

            if (doc) {
                //check for bandwidth overload

                create_bw_overload_alarm(doc._id, bw_usage(BW, input_size, output_size))

                let data = await InterfaceData.findOne({ interface: doc._id });
                console.log(data);
                if (!data || data.length === 0) {
                    data = new InterfaceData();
                    data.interface = doc._id;
                    data.bw.push([[doc.input_size, doc.output_size], Date.now()]);
                    await data.save();
                } else {
                    data.interface = doc._id;
                    data.bw.push([[doc.input_size, doc.output_size], Date.now()]);
                    await data.save();
                }



                if (Rx) doc.Rx = Rx;
                if (Tx) doc.Tx = Tx;
                if (input_size) doc.input_size = input_size;
                if (output_size) doc.output_size = output_size;
                if (state) doc.state = state;
                doc.usage = bw_usage(BW, input_size, output_size)
                console.log(doc);
                result.push(await doc.save())
            } else {
                interfacee = new Interface(e);
                interfacee.usage = bw_usage(BW, input_size, output_size)
                create_bw_overload_alarm(interfacee._id, bw_usage(BW, input_size, output_size));
                result.push(await interfacee.save());
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
            if (req.body.node) doc.node = req.body.node;
            if (req.body.ip) doc.ip = req.body.ip;
            if (req.body.interface) doc.interface = req.body.interface;
            if (req.body.state) doc.state = req.body.state;
            if (req.body.Rx) doc.Rx = req.body.Rx;
            if (req.body.Tx) doc.Tx = req.body.Tx;
            if (req.body.BW) doc.BW = req.body.BW;
            if (req.body.input_size) doc.input_size = req.body.input_size;
            if (req.body.output_size) doc.output_size = req.body.output_size;

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
            return res.status(404).json({
                status: "Error",
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
    Interface.findByIdAndDelete(req.params.id, async (err) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                message: "Database error"
            })
        } else {
            await InterfaceData.findOneAndDelete({ interface: req.params.id });
            return res.status(200).json({
                status: "Succces",
                message: 'Interface data Deleted'
            })
        }
    })
}

exports.deleteAll = async (req, res) => {
    Interface.deleteMany({}, async (err) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                message: "Database error"
            })
        } else {
            await InterfaceData.deleteMany({});
            return res.status(200).json({
                status: 'success',
                message: 'Cleared interfaces datasets'
            })
        }
    })
}