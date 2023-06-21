const express = require('express');
const router = express.Router()
const postsServices = require('../services/posts');
const { jwt } = require('../middleware/middleware')

router.post('/login', postsServices.loginUser);
router.post('/usuarios', postsServices.addUser);
router.get('/usuarios', jwt, postsServices.getUsuarios);



module.exports = router;