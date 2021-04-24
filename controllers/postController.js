const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.add = (req, res) => {
    res.render('postAdd');
};

exports.addAction = async (req, res) => {
    const post = new Post( req.body );

    //Comando para esperar o retorno asyncrono do SAVE
    try {
        await post.save();
    } catch (error) {
        req.flash('error', 'Erro: ' + error.message);
        return res.redirect('/');
    }
    
    
    req.flash('success', 'Post salvo com sucesso!');

    res.redirect('/');
    // res.json( req.body );
};

exports.edit = async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug });

    res.render('postEdit', { post: post});
};

exports.editAction = async (req, res) => {
    try {
        const post = await Post.findOneAndUpdate(
            { slug: req.params.slug }, 
            req.body,
            {
                new: true, // Retornar novo item atualizado
                runValidators: true
            }
        );

    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('/');
    }
    
    req.flash('success', 'Post atualizado com sucesso');
    res.redirect('/');
    
};