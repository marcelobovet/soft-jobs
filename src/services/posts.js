const jwt = require('jsonwebtoken')


const { registrarUsuario, verificarCredenciales, obetenerUsuarios } = require('../utilities/consultas')

async function getUsuarios (req, res) {
  const email = req.user.email
  const users = await obetenerUsuarios(email);
  return res.send(users)
}

async function addUser(req, res) {
  try {
    const usuario = await registrarUsuario(req.body)
    return res.send(usuario);
  } catch (error) {
    console.log(error)
    return res.status(500).send({ mensaje: 'error al registrar usuario' })
  }
};

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    await verificarCredenciales(email, password);
    const token = jwt.sign({ email }, process.env.SECRET_KEY);
    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  };
};

module.exports = {
  addUser,
  loginUser,
  getUsuarios
};