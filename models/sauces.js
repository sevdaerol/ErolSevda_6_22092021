const mongoose = require("mongoose"); //importer mongoose

//schema de donnees 
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: ["String <userId>"], required: false },
  usersDisliked: { type: ["String <userId>"], required: false },
});


module.exports = mongoose.model("sauce", sauceSchema); //exportee ce schema