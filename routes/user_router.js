const router = require("express").Router();
const controller = require("../controllers/usersController");
const { verifyUserExistance, verifyUniqueUsername } = require("../middlewares/user_validator");
const { verifyToken, verifySuperAdmin } = require("../middlewares/token_validator");

router.get("/", verifySuperAdmin, controller.getAllUsers);
router.post("/login", verifyUserExistance, controller.login);
router.get("/check", verifyToken, (req, res) => {
    return res.status(200).json({ token: res.locals.token, payload: res.locals.tokenPayload })
})

router.post("/create", verifySuperAdmin, verifyUniqueUsername, controller.createUser);

//router.post("/secret/super_admin/signup", controller.createSuperAdmin);
router.patch("/changeme", verifyToken, controller.changeUserPassword);
router.patch("/update/:id", verifySuperAdmin, controller.updateUser);
router.delete("/delete/:id", verifySuperAdmin, controller.deleteUser);


module.exports = router;