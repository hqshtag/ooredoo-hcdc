const router = require("express").Router();
const controller = require("../controllers/f5Controller");

router.get("/", controller.getAll);
router.post("/create", controller.create);
router.post("/create/many", controller.createMany);
router.patch("/update/:id", controller.update);
router.delete("/delete/:id", controller.delete);
router.get("/:id", controller.getOne);



module.exports = router;