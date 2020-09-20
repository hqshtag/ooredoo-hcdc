const router = require("express").Router();
const controller = require("../controllers/dataController");


router.get("/interfaces", controller.getAllInterfaceData);

router.get("/nodes", controller.getAllNodeData);

router.delete("/clear", controller.clearDataSets);

module.exports = router;