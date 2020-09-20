const router = require("express").Router();
const controller = require("../controllers/alarmController");



router.get("/", controller.getAll);
router.post("/create", controller.create);
router.delete("/clear", controller.deleteAll);
router.delete("/delete/:id", controller.delete);
router.get("/:id", controller.getOne);

module.exports = router;