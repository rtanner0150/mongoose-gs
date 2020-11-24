const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    //your tutorial and new code go here. 
    console.log("We're connected");

    const kittySchema = new mongoose.Schema({
        name: String
    });
    kittySchema.methods.speak = function(){
        const greeting = this.name ? 'Meow name is ' + this.name : 'I don\'t have a name';
        console.log(greeting);
    };

    const Kitten = mongoose.model('Kitten', kittySchema);

    const oscar = new Kitten({name: 'Oscar'});
    //console.log(oscar.name);

    const bandit = new Kitten({name: 'Bandit'});
    bandit.save(function(err, bandit){
        if (err) return console.error(err);
        bandit.speak();
        //console.log('saved');
    });

    Kitten.find(function(err, kittens){
        if (err) return console.error(err);
        console.log(kittens);
    });

});

