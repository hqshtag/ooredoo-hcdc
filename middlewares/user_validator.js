const User = require("../models/User");

const verifyUserExistance = async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        res.locals.user = user;
        next();
    } else {
        res.status(404).json({
            status: "Error",
            message: "User doesn't exist"
        })
    }
};

const verifyUniqueUsername = async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        res.status(400).json({
            status: "Error",
            message: "Username already in use"
        })
    } else {
        next();
    }
};


module.exports = { verifyUserExistance, verifyUniqueUsername }