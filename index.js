const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)

  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Chocolate Cake',
      level: 'Easy Peasy',
      ingredients: ['1 cup flour', '1 cup sugar', '1/2 cup cocoa powder', '1 tsp baking powder', '1/2 cup milk'],
      cuisine: 'Dessert',
      dishType: 'dessert',
      duration: 30,
      creator: 'John Doe',
    });

  })

  .then((createdRecipe) => {
    console.log('Recipe created:', createdRecipe);

     // Insert multiple recipes from data.json into the database
     return Recipe.insertMany(data);

  })
  
  .then((createdRecipes) => {
    console.log('Multiple recipes created:', createdRecipes);
    

  // Update the duration of "Rigatoni alla Genovese" to 100
  return Recipe.findOneAndUpdate(
    { title: 'Rigatoni alla Genovese' },
    { $set: { duration: 100 } },
    { new: true }
  );
})

.then((updatedRecipe) => {
  console.log('Recipe updated:', updatedRecipe); 

  // Remove the "Carrot Cake" recipe from the database
  return Recipe.deleteOne({ title: 'Carrot Cake' });

})  

.then(() => {
  // Close the database connection
  return mongoose.connection.close();
})


.catch(error => {
     console.error('Error connecting to the database', error);
 });
