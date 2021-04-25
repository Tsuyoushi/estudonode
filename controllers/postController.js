const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const slug = require('slug');

exports.add = (req, res) => {
    res.render('postAdd');
};

exports.addAction = async (req, res) => {
    let oSplitTags = req.body.tags.split(',');
    oSplitTags = oSplitTags.map( (tags) => {return tags.trim();});
    //.map(t => t.trim());
    req.body.tags = oSplitTags;

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
    
    req.body.slug = slug(req.body.title, {lower: true});
    
    let tes = req.body.tags.split(',').map( (tags) => {return tags.trim();});
    req.body.tags = tes;
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
        return res.redirect('/post/' + req.params.slug + '/edit');
    }
    
    req.flash('success', 'Post atualizado com sucesso');
    res.redirect('/');
    
};

exports.view = async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug });
    res.render('view', {post: post} );
};