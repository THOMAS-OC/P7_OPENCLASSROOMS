module.exports = (req, res, next) => {
    
    let email = req.body.email || false
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email || !email.trim().toLowerCase().match(emailRegex)) res.status(400).json({message : "Email invalide ou inexistant"})

    else next()
            
};