const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('mongoose connected');

    const recipeSchema = new mongoose.Schema({
        name: { type: String, required: true, maxlength: 25 },
        description: { type: String, maxlength: 50 },
        instructions: { type: String, maxlength: 500 },
        ingredients: [String]
    });

    const Recipe = mongoose.model('Recipe', recipeSchema);

    const baconGravy = new Recipe({
        name: 'Bacon Gravy',
        description: 'The best gravy for biscuits',
        instructions: 'Whisk flour into grease, add milk and continue stirring until thick, add salt to taste',
        ingredients: ['bacon grease', 'flour', 'milk', 'salt']
    });

    const boiledEgg = new Recipe({
        name: 'Boiled Egg',
        description: 'A single boiled egg',
        instructions: 'Add egg to cold water. Bring water to boil. Cook.',
        ingredients: ['egg']
    });

    function saveRecipe(recipeObj){
        recipeObj.save(function(err, recipeObj){
            if (err) return console.error(err);
            console.log('recipe saved: ' + recipeObj.name);
        })
    }

    // saveRecipe(baconGravy);
    // saveRecipe(boiledEgg);

    // baconGravy.save(function(err, baconGravy){
    //     if (err) return console.error(err);
    //     console.log('recipe saved: ' + baconGravy.name);
    // });
    // boiledEgg.save(function(err, boiledEgg){
    //     if (err) return console.error(err);
    //     console.log('recipe saved: ' + boiledEgg.name);
    // });

    // baconGravy.ingredients.push('pepper');
    // saveRecipe(baconGravy);

    Recipe.find(function(err, recipes){
        if (err) return console.error(err);
        console.log(recipes);
    })

});