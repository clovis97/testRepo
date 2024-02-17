const bcrypt = require('bcrypt');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken')


/* exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        })
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  }; */

  exports.signup = (req, res, next) => {
    console.log("Début du processus d'inscription"); // Ajout d'un log au début

    // Vérifier si les données requises sont présentes
    if (!req.body.password || !req.body.email) {
        console.error("Données requises manquantes dans la requête");
        return res.status(400).json({ message: "Données requises manquantes" });
    }

    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        console.log("Mot de passe haché avec succès"); // Log après le hachage réussi
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => {
            console.log("Utilisateur enregistré avec succès"); // Log lorsque l'utilisateur est enregistré
            res.status(201).json({ message: 'Utilisateur créé !' })
          })
          .catch(error => {
            console.error("Erreur lors de l'enregistrement de l'utilisateur:", error); // Log en cas d'erreur d'enregistrement
            res.status(400).json({ error });
          });
      })
      .catch(error => {
        console.error("Erreur lors du hachage du mot de passe:", error); // Log en cas d'erreur de hachage
        res.status(500).json({ error });
      });
};


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };