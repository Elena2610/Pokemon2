const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: false
  }
})

const Pokemon = mongoose.model('Pokemon', pokemonSchema);
module.exports = Pokemon;