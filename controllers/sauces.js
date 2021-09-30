const sauces = require("../models/sauces"); //importee Sauces

const fs = require("fs"); //package fs de node

exports.createSauce = (req, res, next) => {
  //creer instance du modele Sauce
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id; //supprimer le faux id fournis par frontend => le nvx va etre fournis par mongoose
  const sauce = new sauces({
    ...sauceObject, //operateur spread = raccourci
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes: 0,  //likes
    dislikes: 0,  //dislikes
    usersLiked: [' '], //tableau de like 
    usersdisLiked: [' '], //tableau de dislike
  });
  sauce
    .save() //methode save pour enregistree Sauce dans la base de donnees = renvoi une promise
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  sauces
    .updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) //methode updateone pour mettre ajour
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  sauces
    .findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        //fonction unlink de fs
        sauces
          .deleteOne({ _id: req.params.id }) //methode delete
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.likeDislikeSauces = (req, res, next) => {
  let like = req.body.like
  let userId = req.body.userId
  let sauceId = req.params.id

 
}

exports.getOneSauce = (req, res, next) => {
  // :id pour recuper par id l'objet selectionnee
  sauces
    .findOne({ _id: req.params.id }) //methode findone pour renvoyer un tableau contenat un objet specifique
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  //argument /api/sauces = un string => correspondant a la route dans la quelle on veut enregistree le middleware
  sauces
    .find() //methode find pour renvoyer un tableau contenant sauces
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
