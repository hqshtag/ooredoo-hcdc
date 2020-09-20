const router = require('express').Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/bootstrap", async (req, res) => {
    User.find({}, (err, docs) => {
        if (err) return res.status(400).json({ status: 'Error', message: 'Database error' })
        else if (!docs || docs.length === 0) {
            let username = "admin";
            let password = "000000";
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        return res.status(411).json({
                            status: "Error",
                            payload: "Hashing password error"
                        })
                    }
                    let superAdmin = new User({
                        username: username,
                        password: hash,
                        role: "admin"
                    })
                    superAdmin.save((err) => {
                        if (err) {
                            console.log(err);
                            return res.status(410).json({
                                status: "Error",
                                payload: "Saving error",
                            });
                        } else return res.status(200).json({
                            status: "Success",
                            payload: "Super admin saved to DB"
                        })
                    })
                })
            })
        } else {
            //console.log("gogo");
            return res.status(202).send();
        }
    })
});


module.exports = router;

