const express = require("express"); //importer express

const bodyParser = require("body-parser"); //importer body parser pour extraire l'objet json qui provien de frontend

const mongoose = require("mongoose"); //importee mongoose pour connecter a la base de donnee mongodb

const path = require("path");

const app = express();

const helmet = require("helmet"); //securiser express avec helmet

const saucesRoutes = require("./routes/sauces");

const userRoutes = require("./routes/user");

require('dotenv').config()

//importer l'adresse srv => env
mongoose
  .connect(
    process.env.SECRET_MDB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//ajout de helmet
app.use(helmet());
//ajout de headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // * = acceder a api depuis nimporte quel origin
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); //ajouter les header mentionnee au requete envoyer vers api
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); //mentinnee les methodes de requtes
  next(); //next pour passer au middleware suivant
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", saucesRoutes);

app.use("/api/auth", userRoutes);

module.exports = app;

//imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
