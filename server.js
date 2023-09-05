require('dotenv').config();
const express = require("express");
const jsxEngine = require("jsx-view-engine");
const mongoose = require('mongoose');
const Pokemon = require('./models/pokemon')
const app = express();
const PORT = 3000;

app.set("view engine", "jsx"); 
app.engine("jsx", jsxEngine());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to the Pokemon App!");
});


app.get("/pokemon", async (req, res) => {
  const pokemonFromDB = await Pokemon.find({});
  res.render("Index", {
    pokemonData: pokemonFromDB,
  });
});

app.get('/pokemon/new', (req, res) => {
  res.render('New')
});

app.post('/pokemon', async (req, res) => {
  try {
    const createdPokemon = await Pokemon.create(req.body);
    console.log(createdPokemon);;
    res.redirect('/pokemon');
  } catch (error) {
    console.log(error);
  }
});

app.get("/pokemon/:id", async (req, res) => {
  const { id } = req.params;
  const pokemon = await Pokemon.findById(id)
  console.log("Found!");

  res.render("Show", {
    pokemon: pokemon,
  });
  
});


mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', ()  => {
  console.log('Connected to Mongo');
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});