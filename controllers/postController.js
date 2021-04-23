const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.add = (req, res) => {
    res.render('postAdd');
};

exports.addAction = async (req, res) => {
    const post = new Post( req.body );

    //Comando para esperar o retorno asyncrono do SAVE
    await post.save();
    
    res.redirect('/');
    // res.json( req.body );
};