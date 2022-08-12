module.exports = (req, res, next) => {

    console.log(req.body);

    console.log("validateur register");

    let name = req.body.name || false
    let nameRegex = /^[A-Za-zéàèêëï]{3,30}$/

    let firstName = req.body.firstname || false
    let FirstNameRegex = /^[A-Za-zéàèêëï]{3,20}$/
    
    let email = req.body.email || false
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


    if (!email || !email.trim().toLowerCase().match(emailRegex)) res.status(400).json({message : "Email invalide ou inexistant"})

    else if (!name || !name.trim().toLowerCase().match(nameRegex)) res.status(400).json({message : "Nom invalide ou inexistant"})
    
    else if (!firstName || !firstName.trim().toLowerCase().match(FirstNameRegex)) res.status(400).json({message : "Prénom invalide ou inexistant"})

    else next()
            
};