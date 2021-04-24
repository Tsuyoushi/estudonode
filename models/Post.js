const mongoose = require('mongoose');
const slug = require('slug');

//Comunicação Mongo e Aplicação
mongoose.Promise = global.Promise;

//Schema do Model
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true, // "Retira Espaço do começo e fim string"
        required: 'O Post precisa de um titulo'
    },
    slug: String,
    body: {
        type: String,
        trim: true
    },
    tags: [String]
});

postSchema.pre('save', function (next) {
    if(this.isModified('title')) {
        this.slug = slug( this.title, {
            lower: true
        });
    }
    

    next();
});

module.exports = mongoose.model('Post', postSchema);