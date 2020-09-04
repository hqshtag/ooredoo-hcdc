const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    const token = req.header("Authorization").split(" ")[1];
    //console.log(token);
    if (!token) {
        return res.status(401).json({
            status: "Error",
            message: "Access Denied"
        })
    } else {
        try {
            const verified = jwt.verify(token, process.env.SECRET || "SECRET42");
            // console.log(verified);
            res.locals.tokenPayload = verified;
            next();
        } catch (err) {
            res.status(400).json({ message: "Invalid Token" })
        }
    }
}

const verifySuperAdmin = (req, res, next) => {

    const token = req.header("Authorization") ? req.header("Authorization").split(" ")[1] : null;
    // console.log(token);
    if (!token) {
        return res.status(401).json({
            status: "Error",
            message: "Access Denied"
        })
    } else {
        try {
            const verified = jwt.verify(token, process.env.SECRET || "SECRET42");
            // console.log(verified);
            if (verified.role !== "admin") {
                return res.status(400).json({ status: "Error", message: "You don't have access rights" })
            }
            res.locals.tokenPayload = verified;
            next();
        } catch (err) {
            res.status(400).json({ status: "Error", message: "Invalid Token" })
        }
    }
}


module.exports = { verifyToken, verifySuperAdmin }