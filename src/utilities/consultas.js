const { Pool } = require('pg')
const bcrypt = require('bcryptjs')

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    allowExitOnIdle: true
});


const registrarUsuario = async (usuario) => {
    let { email, password, rol, lenguage } = usuario;
    const passwordEncriptada = bcrypt.hashSync(password);
    password = passwordEncriptada;
    console.log(email, password, rol, lenguage);
    const consulta = 'INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)';
    const values = [email, password, rol, lenguage];
    await pool.query(consulta, values);
    return { mensaje: 'Usuario registrado con exito' };
};

const verificarCredenciales = async (email, password) => {
    const values = [email];
    const consulta = "select * from usuarios WHERE email = $1";
    const {
        rows: [usuario],
        rowCount,
    } = await pool.query(consulta, values);
    const { password: passwordEncriptada } = usuario;
    const passwordCorrecta = bcrypt.compareSync(password, passwordEncriptada);
    if (!passwordCorrecta || !rowCount)
        throw {
            code: 401,
            message: "email o password incorrecta"
        };
};

const obetenerUsuarios = async (email) => {
    const values = [email];
    const consulta = "select * from usuarios WHERE email = $1"
    const { rows: [usuario] } = await pool.query(consulta, values);
    return usuario;
};



module.exports = {
    registrarUsuario,
    verificarCredenciales,
    obetenerUsuarios
};