module.exports = (req, res, next) => {

    console.log(req.body);

    console.log("validateur register");

    let name = req.body.name.trim()
    let nameRegex = /^[A-Za-zéàèêëï]{3,30}$/

    let firstName = req.body.firstname.trim()
    let FirstNameRegex = /^[A-Za-zéàèêëï]{3,20}$/
    
    let email = req.body.email.trim()
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email.toLowerCase().match(emailRegex)) res.status(400).json({message : "Email invalide"})

    else if (!name.toLowerCase().match(nameRegex)) res.status(400).json({message : "Nom invalide"})
    
    else if (!firstName.toLowerCase().match(FirstNameRegex)) res.status(400).json({message : "Prénom invalide"})

    else next()
            
};