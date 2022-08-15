module.exports = (req, res, next) => {
    
    let email = req.body.email || false
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email.trim().toLowerCase().match(emailRegex)) res.status(400).json({message : "Email invalide"})

    else next()
            
};