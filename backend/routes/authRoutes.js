const { Router } = require("express");
const router = Router();
const { loginController, registerController, logoutController } = require("../controller/authController");
const { validateLogin, validateRegister } = require("../middlewares/authValdition");

router.post("/login",   validateLogin, loginController);
router.post("/register", validateRegister, registerController);
// router.post("/logout", logoutController);

module.exports = router;
