const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('mongoose connected');

    //create ingredient schema
    const ingredientSchema = new mongoose.Schema({
        name: {type: String, required: true, maxlength: 50},
        measure: String,
        amount: Number
    });
    //create model from schema
    const Ingredient = mongoose.model('Ingredient', ingredientSchema);

    //create recipe schema
    const recipeSchema = new mongoose.Schema({
        name: { type: String, required: true, maxlength: 25 },
        description: { type: String, maxlength: 50 },
        instructions: { type: String, maxlength: 500 },
        ingredients: [ingredientSchema]
    });
    //create model from schema
    const Recipe = mongoose.model('Recipe', recipeSchema);

    //recipe objects
    let baconGravy = new Recipe({
        name: 'Bacon Gravy',
        description: 'The best gravy for biscuits',
        instructions: 'Whisk flour into grease, add milk and continue stirring until thick, add salt to taste',
        ingredients: [
            {name: 'bacon grease', measure: 'tablespoon', amount: 3}, 
            {name: 'flour', measure: 'cup', amount: 1}, 
            {name: 'milk', measure: 'cup', amount: 2}, 
            {name: 'salt', measure: 'teaspoon', amount: 2},
            {name: 'pepper', measure: 'teaspoon', amount:2}
        ]
    });
    let boiledEgg = new Recipe({
        name: 'Boiled Egg',
        description: 'A single boiled egg',
        instructions: 'Add egg to cold water. Bring water to boil. Cook.',
        ingredients: [{name: 'egg', measure: 'whole', amount: 1}]
    });

    //save function that logs name of recipe saved
    function saveRecipe(recipeObj){
        recipeObj.save(function(err){
            if (err) return console.error(err);
            console.log('recipe saved: ' + recipeObj.name);
        })
    }

    //using new custom logging function
    // saveRecipe(baconGravy);
    // saveRecipe(boiledEgg);

    //original save functions
    // baconGravy.save(function(err, baconGravy){
    //     if (err) return console.error(err);
    //     console.log('recipe saved: ' + baconGravy.name);
    // });
    // boiledEgg.save(function(err, boiledEgg){
    //     if (err) return console.error(err);
    //     console.log('recipe saved: ' + boiledEgg.name);
    // });

    //read
    //return all recipes, log to console
    Recipe.find(function(err, recipes){
        if (err) return console.error(err);
        console.log(recipes);
    })

    //delete
    //remove by id
    // Recipe.findById('5fbc86c8ef9328601d016526').remove().exec(function(err){
    //     if (err) return console.error(err);
    //     console.log('record removed!');
    // });

    //create
    //create() creates new object and saves to database in one
    // Recipe.create({
    //     name: 'Bowl of Cereal',
    //     description: 'It\'s just cereal',
    //     instructions: 'Combine cereal, milk, and a bowl. In whatever order you desire. YMMV',
    //     ingredients: [
    //         {name: 'cereal', measure: 'cup', amount: 3},
    //         {name: 'milk', measure: 'cup', amount: 1},
    //         {name: 'bowl', measure: 'whole', amount: 1}
    //     ]
    // }, function(err, bowlOfCereal){
    //     if (err) return console.error(err);
    //     console.log('bowlOfCereal created and saved!');
    // });

    //update
    //get cereal recipe from db
    // Recipe.find({'name': 'Bowl of Cereal'}).exec(function(err, bowlOfCereal){
    //     if (err) return console.error(err);
    //     //update bowlOfCereal to include extra ingredient
    //     bowlOfCereal[0].ingredients.push({name: 'spoon', measure: 'whole', amount: 1});
    //     //update db with new bowlOfCereal info
    //     bowlOfCereal[0].save(function(err){
    //         if (err) return console.error(err);
    //     });
    // });
    
    

});