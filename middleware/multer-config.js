const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({  //indiquer a multer la logique pour enregistree les fichiers 
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => { //utiliser le nom dorigine/ remplacer les espaces par underscores
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];  //constante dictionnaires = mime = résoudre l'extension de fichier appropriée ;
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');  //only telechargements de fichier image