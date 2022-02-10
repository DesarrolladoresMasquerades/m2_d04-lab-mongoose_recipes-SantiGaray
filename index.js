const mongoose = require('mongoose');
require('dotenv').config(); //require('dotenv/config')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = `mongodb+srv://${process.env.MG_USERNAME}:${process.env.MG_PWD}@cluster0.6fts6.mongodb.net/recipe-app`;

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`)
    Recipe.deleteMany()
    .then(() => {
      //data.forEach((recipe) => {console.log(recipe.title)})
      Recipe.insertMany(data)
      .then(() => {
        Recipe.findOneAndUpdate(
         {title: "Rigatoni alla Genovese"}, 
         {$set: {duration: 100}},
         { new: true }
       )
      //  .then(response=>console.log(response))
      //  .catch(error => console.log(error))
        .then(() => {
          Recipe.deleteOne({title: "Carrot Cake"})
          .then(()=>mongoose.connection.close())
          // .then(response=>console.log(response))
        })
      })
    })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
 })
 
 
 
 
 
 
 /*
  Recipe.create({
    title: "Asian Glazed Chicken Thighs",
    level: "Amateur Chef",
    ingredients: [
      "1/2 cup rice vinegar",
      "5 tablespoons honey",
      "1/3 cup soy sauce (such as Silver Swan®)",
      "1/4 cup Asian (toasted) sesame oil",
      "3 tablespoons Asian chili garlic sauce",
      "3 tablespoons minced garlic",
      "salt to taste",
      "8 skinless, boneless chicken thighs"
    ],
    cuisine: "Asian",
    dishtype: "main_course",
    image: "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
    duration: 160,
    creator: "Chef John",
  });
  */