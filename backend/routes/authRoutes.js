const { Router } = require("express");
const router = Router();
const { loginController, registerController, logoutController } = require("../controllers/authController");
const { validateLogin, validateRegister } = require("../middlewares/authValidation");

router.post("/login",   validateLogin, loginController);
router.post("/register", validateRegister, registerController);
// router.post("/logout", logoutController);

module.exports = router;
