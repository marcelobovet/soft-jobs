const { decode } = require('jsonwebtoken');

const jwt = (req, res, next )  => {
    const header = req.headers.authorization;
    if(!header) return res.status(403).send({ mensaje: 'error al logear' });

    const token = header.split(' ')[1]
    const payload = decode(token, process.env.SECRET_KEY)
    req.user = payload;
    next();
}

module.exports = { jwt };