const express = require('express');
const router = express.Router();  //creer router

const userCtrl = require('../controllers/user');

//routes post fournis => prevues par le frontend
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;  //exporter router pour l'importer dans app.js