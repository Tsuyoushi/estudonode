//Parecido como chamada de função a uma variavel
exports.userMiddleware = (req, res, next) => {
    
    let oInfo = {
        name: "Adriano",
        id: 123
    };

    req.userInfo = oInfo;
    
    next();
};

exports.index = (req, res) => {
    let oDados = {
        pageTitle: "Adriano",
        userInfo: req.userInfo
    };

    //Renderizar a VIEW MST
    res.render('home', oDados);
};