const mongoose = require('mongoose');  //importer mangoose

//schema de donnees  // pas besoin de champs pour l'id il est fournis par mangoose
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);  //exportee ce schema