const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    console.log("Loggin initiated");
    const { _id, role, username, password } = res.locals.user;
    const validPass = await bcrypt.compare(req.body.password, password);
    if (!validPass) {
        return res.status(400).json({
            status: "Error",
            message: "Invalid password"
        })
    }

    const payload = {
        _id,
        username,
        role,
    }
    const secret = process.env.SECRET || "SECRET42"

    const signOptions = {
        expiresIn: "1h"
    }

    const token = jwt.sign(payload, secret, signOptions);
    res.json({
        status: "Success",
        "auth-token": token,
        payload,
    })

    // res.send('success');
}


exports.getAllUsers = async (req, res) => {
    console.log("Checking if this is server admin");

    User.find((err, docs) => {
        if (err) {
            res.status(401).json({
                status: "Error",
                message: "Error loading Users"
            })
        } else if (docs) {
            let parsed = docs.filter(user => {
                user.password = undefined;
                if (user.role !== "admin") return user
            })
            res.status(200).json({
                status: "Success",
                message: `${parsed.length} users loaded`,
                payload: parsed
            })
        }
    })
}


exports.createUser = async (req, res) => {
    console.log('Creating a new user');

    const username = req.body.username;
    const password = req.body.password;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                return res.status(411).json({
                    status: "Error",
                    message: "Hashing password error"
                })
            }
            let newUser = new User({
                username: username,
                password: hash
            })
            newUser.save((err) => {
                if (err) {
                    console.log(err);
                    return res.status(410).json({
                        status: "Error",
                        message: "Saving error",
                    });
                } else {
                    newUser.password = undefined;
                    return res.status(200).json({
                        status: "Success",
                        message: `${username} user saved to DB`
                    })
                }
            })
        })
    })
}


exports.changeUserPassword = async (req, res) => {
    //res.locals.tokenPayload have the token payload;
    const userID = res.locals.tokenPayload._id;

    User.findById(userID, async (err, user) => {
        if (err) return res.status(404).json({ status: 'Error', message: "Error loading user" })
        else {
            console.log(user);

            const { oldPassword, newPassword } = req.body;
            const validPass = await bcrypt.compare(oldPassword, user.password)
            if (validPass) {
                const hash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
                user.password = hash;
                await user.save((err) => {
                    if (err) {
                        return res.status(401).json({
                            status: 'Error',
                            message: "Error updating User"
                        })
                    } else {
                        res.status(200).json({
                            status: 'Success',
                            message: 'User password updated'
                        })
                    }
                })

            } else {
                res.status(400).json({
                    status: "Error",
                    message: "Invalid Password"
                })
            }
        }
    })
}

/**Only super admin can updated all user infos ;) */

exports.updateUser = async (req, res) => {
    console.log("Updating User information");
    const userID = req.params.id;

    User.findById(userID, async (err, user) => {
        if (err) {
            return res.status(400).json({
                status: 'Error',
                message: "Database Error"
            })
        } else {
            if (req.body.username) user.username = req.body.username;
            if (req.body.password) {
                const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                user.password = hash;
            }

            await user.save((err) => {
                if (err) {
                    return res.status(401).json({
                        status: 'Error',
                        message: "Error updating User"
                    })
                } else {
                    res.status(200).json({
                        status: 'Success',
                        message: 'User updated'
                    })
                }
            })
        }
    })
}



exports.deleteUser = async (req, res) => {
    console.log("Deleting User");
    const userID = req.params.id;

    User.findByIdAndDelete(userID, (err) => {
        if (err) {
            console.log(err);
            res.status(401).json({
                status: "Error",
                message: "Error deleting user"
            })
        } else {
            res.status(200).json({
                statue: "Success",
                message: "User Deleted"
            })
        }
    })
}

exports.createSuperAdmin = async (req, res) => {
    console.log("### Creating SUPER ADMIN ###");

    //extracting values
    const username = req.body.username;
    const password = req.body.password;



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
            console.log(superAdmin);
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
}