const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

//un midddleware => objet; req res next
router.post('/', auth, multer, stuffCtrl.createThing); 
  
//route pour supprimer un objet
router.delete('/:id', auth, stuffCtrl.deleteThing);
  
//route modifier un objet
router.put('/:id', auth, multer, stuffCtrl.modifyThing); //ajout de multer a post
  
//route pour recuperer un seul objet
router.get('/:id', auth, stuffCtrl.getOneThing);
  
//route pour recuperer tout les objets
router.get('/', auth, stuffCtrl.getAllThing);

module.exports = router;