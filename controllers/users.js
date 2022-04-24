const User = require("../models/user");

//Création d'un utilisateur
exports.createUser = (req, res, next) => {
  const user = new User({
    adresseMail: req.body.adresseMail,
    mdp: req.body.mdp,
    nom: req.body.nom,
    prenom: req.body.prenom,
    idVideos: req.body.idVideos,
    pays: req.body.pays,
    description: req.body.description,
    nbVideosPartagees: req.body.nbVideosPartagees,
  });
  user
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//Modification d'un utilisateur
exports.modifyUser = (req, res, next) => {
  const user = new User({
    _id: req.params.id,
    adresseMail: req.body.adresseMail,
    mdp: req.body.mdp,
    nom: req.body.nom,
    prenom: req.body.prenom,
    idVideos: req.body.idVideos,
    pays: req.body.pays,
    description: req.body.description,
    nbVideosPartagees: req.body.nbVideosPartagees,
  });
  User.updateOne({ _id: req.params.id }, user)
    .then(() => {
      User.findOne({
        _id: req.params.id,
      })
        .then(() => {
          connected = true;
          res.redirect("/profile");
        })
        .catch((error) => {
          res.status(404).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
