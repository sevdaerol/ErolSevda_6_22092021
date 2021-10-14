const express = require("express"); //importer express

const bodyParser = require("body-parser"); //importer body parser pour extraire l'objet json qui provien de frontend

const mongoose = require("mongoose"); //importee mongoose pour connecter a la base de donnee mongodb

const path = require("path");  //importer path pour avoir accees au chemin de systeme de fichier

const app = express();

const helmet = require("helmet"); //securiser express avec helmet

const saucesRoutes = require("./routes/sauces");  //importer router depuis routes sauces

const userRoutes = require("./routes/user");  //importer router depuis routes user

require('dotenv').config() //dotenv pour stocker les donnees sensibles 

//importer l'adresse srv => depuis env 
mongoose
  .connect(
    process.env.SECRET_MDB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//ajout de helmet pour proteger l'app express => configure des entete http appropriee
app.use(helmet());
//ajout des headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // * = acceder a api depuis nimporte quel origin
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); //mentionner les methodes de requtes
  next(); //next pour passer au middleware suivant
});

app.use(bodyParser.json()); //definir la fonction json de body-parser globalement 

app.use("/images", express.static(path.join(__dirname, "images")));  //indiquer de se servis du dossier static images /path car on sait pa le chemin du systeme de fichier

//on enregistre le router avec la route attendu par le front
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes); 

module.exports = app;  //exporter app pour y acceder depuis les autres fichiers
