const mongoose = require('mongoose');

//Comunicação Mongo e Aplicação
mongoose.Promise = global.Promise;

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

module.exports = mongoose.model('Post', postSchema);