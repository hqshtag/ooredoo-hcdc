const Settings = require("../models/Settings");





exports.update = async (req, res) => {
    const { ol, oc, version } = req.body;
    Settings.findOne({}, (err, doc) => {
        console.log(doc);
        if (err) res.status(400).json({ status: 'Error', message: 'Database Error' });
        else if (doc) {
            if (ol) doc.ol = ol;
            if (oc) doc.oc = oc;
            if (version) doc.version = version;
            doc.save((err, document) => {
                if (err) res.status(400).json({ status: 'Error', message: 'Database Error' });
                else res.status(201).json({ status: 'Success', message: 'Settings Updated', payload: document })
            });
        } else {
            console.log("here");
            let newSet = new Settings({ ol, oc, version });
            newSet.save((err, document) => {
                if (err) res.status(400).json({ status: 'Error', message: 'Database Error' });
                else res.status(201).json({ status: 'Success', message: 'Settings Created', payload: document })
            });
        }
    })

}