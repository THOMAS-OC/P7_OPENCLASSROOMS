const dotenv = require("dotenv")
dotenv.config()

const connection = require("./db")


const queryPromise = () => {

    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT posts.ID FROM posts ORDER BY date DESC`,
            function(err, results) {
                if (err){
                    return reject(err)
                }
                return resolve(results)
            }
        )
    })

}


queryPromise()
.then(resultat => {
    // console.log(resultat);
    for (let id of resultat){
        console.log(id);
    }
})
.catch(error => {
    console.log("On log l'erreur");
    console.log(error);
})
