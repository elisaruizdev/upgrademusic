const express = require("express");
const router = express.Router();
const { isAuth } = require("../../../middlewares/auth.middleware");
const {
  createMusic,
  getAllMusic,
  getMusicById,
} = require("../controllers/music.controller");
//Aquí importamos el middleware de subida:
const fileMiddleware = require("../../../middlewares/file.middleware");

router.post("/create", [fileMiddleware.upload.single("cover")], createMusic);
//Le hemos dicho que el campo donde va a recoger la imagen es el campo cover del modelo de Music en este caso.
router.get("/", getAllMusic);
router.get("/:musicId", getMusicById);

module.exports = router;
