const multer = require("multer"); //Requrimos multer.
let fs = require("fs");
const imageToUri = require('image-to-uri');

const path = require("path"); //Esta librería viene implícita en Node.

//Definimos tanto el storage como el nombre de los archivos, sus propiedades y el destino a través del path.

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
});

//Aquí filtramos los tipos de archivos que podremos subir.

const VALID_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

const fileFilter = (req, file, cb) => {
  if (!VALID_FILE_TYPES.includes(file.mimetype)) {
    cb(new Error("Invalid file type"));
  } else {
    cb(null, true);
  }
};

//Aquí definimos los parámetros que va a utilizar multer.

const upload = multer({
  storage,
  fileFilter,
});

module.exports = { upload: upload };
