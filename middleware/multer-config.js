const multer = require('multer'); //importer multer pour gerer les fichiers entrantes dans les requetes 

const MIME_TYPES = { //dictionaires => les trois differents mimetypes qu'on peut avoir depuis le front
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({  //indiquer a multer la logique pour enregistree les fichiers => dans diskstorage
  destination: (req, file, callback) => {
    callback(null, 'images');  //destination => le dossier image qu'on a cree
  },
  filename: (req, file, callback) => { //utiliser le nom d'origine/ remplacer les espaces par underscore
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];  //constante dictionnaires = mime = résoudre l'extension de fichier appropriée ;
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');  //fichier unique= single, telechargements de fichier image