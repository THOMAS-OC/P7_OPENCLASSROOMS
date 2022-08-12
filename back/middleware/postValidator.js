module.exports = (req, res, next) => {

    let title = req.body.title.trim()
    let content = req.body.content

    if (!title || !content) {
        res.status(400).json({message : "Champs vides"})
    }
    
    else if (title.length < 70 && !title.includes("<") && content.length < 800 && !content.includes("<")) {
        next()
    } 

    else res.status(400).json({message : "Données non sécurisées"})
            
};