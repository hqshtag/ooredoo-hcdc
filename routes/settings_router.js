const router = require('express').Router();
const controller = require("../controllers/settingsController");


router.patch("/", controller.update);


module.exports = router;