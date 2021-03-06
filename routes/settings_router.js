const router = require('express').Router();
const controller = require("../controllers/settingsController");


router.patch("/", controller.update);
router.get("/", controller.get);


module.exports = router;