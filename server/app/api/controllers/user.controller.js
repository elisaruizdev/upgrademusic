const User = require("../models/User.model");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken"); //Tenemos que instalar la libreria 'npm i jsonwebtoken' para poder generar los tokens y comprobar que este token existe.

const HTTPSTATUSCODE = require("../../../utils/httpStatusCode");

const register = async (req, res, next) => {
  try {
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.name;
    newUser.password = req.body.password;
    newUser.favMusic = [];

    const userDb = await newUser.save();

    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: userDb.name,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ email: req.body.email }); //Aqui buscamos el usuario por email para saber si esta registrado o no.

    //Comparamos la contraseña que ha metido el usuario con la de la base de datos del usuario.
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      userInfo.password = null;
      const token = jwt.sign(
        {
          id: userInfo._id,
          name: userInfo.name,
        },
        req.app.get("secretKey"), //Recupero la clave secreta.
        { expiresIn: "1h" } //El tiempo que va a durar.
      );
      return res.json({
        status: 201,
        message: HTTPSTATUSCODE[201],
        data: { user: userInfo.name, token: token }, //Devolvemos el nombre de usuario y el token para poder consumirlo.
      });
    } else {
      return res.json({ status: 401, message: HTTPSTATUSCODE[401], data: {} }); //Si no funciona que devuelva el mensaje de error Unauthorized y un objeto vacio para que no sea null y rompa el código.
    }
  } catch (error) {
    return next(error);
  }
};

const logout = (req, res, next) => {
  try {
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      token: null,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
};
