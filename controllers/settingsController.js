const Settings = require("../models/Settings");


exports.get = async (req, res) => {
    Settings.findOne({}, async (err, doc) => {
        if (err) res.status(400).json({ status: 'Error', message: 'Database Error' });
        else if (doc) res.status(200).json({ status: 'Success', payload: doc });
        else {
            let defaultSettings = new Settings();
            try {
                await defaultSettings.save();
                res.status(201).json({ status: 'Success', message: "No settings found, reset to default" })

            } catch (err) {
                res.status(400).json({ status: 'Error', message: 'Database Error' });
            }
        }
    })
}


exports.update = async (req, res) => {
    const { ol, oc, version } = req.body;
    Settings.findOne({}, (err, doc) => {
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