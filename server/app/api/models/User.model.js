const mongoose = require("mongoose");

const bcrypt = require("bcrypt"); //Instalar paquete 'npm i bcrypt' para poder encriptar los datos.

const saltRounds = 10; //Estas son las veces que 'baraja' la contraseña hasta que la cifra definitivamente.
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, trim: true, required: true }, //trim elimina espacios.
  email: { type: String, trim: true, required: true, unique: true }, //unique se asegura de que no haya dos e-mails iguales.
  password: { type: String, trim: true, required: true },
  favMusic: { type: Schema.Types.ObjectId, ref: "music" },
});

//Antes de hacer el save tenemos que encriptar la contraseña y cuantas veces con el saltRounds:
UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
