const express = require("express");

const router = express.Router();  //creer routeur express

const auth = require("../middleware/auth");

const multer = require("../middleware/multer-config");  //importer middleware multer

const saucesCtrl = require("../controllers/sauces"); //importer la logique de nos routes depuis controllers

//un midddleware => objet; req res next
router.post("/", auth, multer, saucesCtrl.createSauce);  // on protege les routes avec auth depuis le middleware/auth

//route pour supprimer un objet
router.delete("/:id", auth, saucesCtrl.deleteSauce);

//route modifier un objet
router.put("/:id", auth, multer, saucesCtrl.modifySauce); //ajout de multer a post

//route pour recuperer un seul objet
router.get("/:id", auth, saucesCtrl.getOneSauce);

//route pour recuperer tout les objets
router.get("/", auth, saucesCtrl.getAllSauce);

//route pour les likes
router.post("/:id/like", auth, saucesCtrl.likeDislikeSauces);

module.exports = router; 