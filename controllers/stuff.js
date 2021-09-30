const Thing = require('../models/thing'); //importee things

const fs = require('fs'); //package fs de node

exports.createThing = (req, res, next) => { //creer instance du modele thing
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id; //supprimer le faux id fournis par frontend => le nvx va etre fournis par mongoose
    const thing = new Thing({
      ...thingObject,   //operateur spread = raccourci
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()  //methode save pour enregistree thing dans la abse de donnees = renvoi une promise
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ?
    {
      ...JSON.parse(req.body.thing),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id }) //methode updateone pour mettre ajour
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => { 
    Thing.findOne({ _id: req.params.id })
        .then(thing => {
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => { //fonction unlink de fs
                Thing.deleteOne({ _id: req.params.id })  //methode delete
                    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneThing = (req, res, next) => { // :id pour recuper par l'id d'objet selectionnee
    Thing.findOne({ _id: req.params.id })  //methode findone pour renvoyer un tableau contenat un objet specifique 
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllThing = (req, res, next) => {  //argument /api/stuff = un string => correspondant a la route dasn la quelle on veut enregistree le middleware
    Thing.find() //methode find pour renvoyer un tableau contenant thins
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
};