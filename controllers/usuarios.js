const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 10, desde = 0 } = req.query;

  //const usuarios= await Usuario.find().limit(limite).skip(desde);
  //const total= await Usuario.countDocuments();
  console.log("usuriosGet", request);
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ state: true }),
    Usuario.find().limit(limite).skip(desde),
    // { state: true }
  ]);
  res.status(200).json({
    total,
    usuarios,
  });
};

const usuarioPost = async (req = request, res) => {
  const { name, email, dni, password, role } = req.body;
  const usuario = new Usuario({ name, email, dni, password, role });

  console.log("usuarioPost", request);
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);
  usuario.role = "USER_ROLE";

  await usuario.save();

  res.status(201).json({
    message: "Usuario creado",
    usuario, //toJSON
  });
};

const usuarioPut = async (req = request, res) => {
  const { id } = req.params;

  const { password, _id, l, ...resto } = req.body;

  if (password != null) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.status(200).json({
    message: "Usuario actualizado",
    usuario,
  });
};

const usuarioDelete = async (req, res) => {
  const { id } = req.params;

  //const usuarioBorrado = await Usuario.findByIdAndDelete(id);
  const usuarioBorrado = await Usuario.findByIdAndUpdate(
    id,
    {
      state: false,
    },
    { new: true }
  );
  res.status(200).json({
    message: "Usuario eliminado",
    usuarioBorrado,
  });
};
const getUserById = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await Usuario.findById(id);
  res.json({ user });
};

module.exports = {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
  getUserById,
};
