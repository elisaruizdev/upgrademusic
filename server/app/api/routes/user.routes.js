const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controllers/user.controller"); //Importamos el controlador de usuario

const { isAuth } = require("../../../middlewares/auth.middleware"); //Importamos el middleware

router.post("/register", register);

router.post("/login", login);

router.post("/logout", [isAuth], logout);

module.exports = router;
