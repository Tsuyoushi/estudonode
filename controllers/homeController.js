const mongoose = require('mongoose');
const Post = mongoose.model('Post');
//Parecido como chamada de função a uma variavel
exports.userMiddleware = (req, res, next) => {
    
    let oInfo = {
        name: "Adriano",
        id: 123
    };

    req.userInfo = oInfo;
    
    next();
};

exports.index = async (req, res) => {
    let oDados = {    };

    const posts = await Post.find();
    oDados.posts = posts;

    //Renderizar a VIEW MST
    res.render('home', oDados);
};