const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //importer pacakage de validation pour pre valider les informations

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },  //unique pour s'assurer que deux utilisateur n'utilise pas le meme email
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

//terminer