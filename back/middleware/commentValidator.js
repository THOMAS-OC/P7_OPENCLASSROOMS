module.exports = (req, res, next) => {

    let comment = req.body.comment
    
    if (comment.length < 280 && !comment.includes("<")) next()

    else res.status(400).json({message : "Données non sécurisées"})
            
};