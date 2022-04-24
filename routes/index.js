var express = require("express");
const { append } = require("express/lib/response");
var router = express.Router();
const { db } = require("../models/video");
const User = require("../models/user");
var sess;
var sessionID;
var connected;
let username;
let password;
var utilisateur;
var connected = false;

/* GET home page. */
router.get("/", function (req, res, next) {
  sess = req.session;
  res.render("index", { connected });
});

/* GET page toutes les vidéos. */
router.get("/all_videos", function (req, res, next) {
  sess = req.session;
  //Recherche des vidéos
  db.collection("videos")
    .find()
    .toArray()
    .then((lesVideos) => {
      res.render("all_videos", { lesVideos, connected });
    })
    .catch((error) => console.error(error));
  sess = req.session;
});

/* POST Page toutes les vidéos */
router.post("/search_videos", (req, res) => {
  sess = req.session;
  var laRecherche = req.body.recherche.toString();
  db.collection("videos")
    .find({ $or: [{ nomVideo: laRecherche }, { pays: laRecherche }] })
    .toArray()
    .then((lesVideos) => {
      res.render("all_videos", { lesVideos, connected });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

/* GET page vidéos à la une. */
router.get("/spotlight_videos", function (req, res, next) {
  sess = req.session;
  db.collection("videos")
    .find({
      aLaUne: true,
    })
    .toArray()
    .then((lesVideos) => {
      res.render("spotlight_videos", { lesVideos, connected });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

/* GET page profil. */
router.get("/profile", function (req, res, next) {
  sess = req.session;
  if (connected == true) {
    console.log(utilisateur._id.toString());
    db.collection("videos")
      .find({
        idUser: utilisateur._id.toString(),
      })
      .toArray()
      .then((Videos) => {
        res.render("profile", { Videos, utilisateur });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  } else {
    res.render("index", { connected });
  }
});

/* GET page connexion. */
router.get("/connexion", function (req, res, next) {
  sess = req.session;
  if (connected == false) {
    res.render("connexion");
  }
  res.render("index", { connected });
});

/* POST connexion */
router.post("/login", (req, res) => {
  username = req.body.username;
  password = req.body.password;
  db.collection("users")
    .find()
    .toArray()
    .then((Users) => {
      Users.forEach((user) => {
        if (user.adresseMail == username && user.mdp == password) {
          sess = req.session;
          sessionID = req.body.username;
          connected = true;
          utilisateur = user;
          res.redirect("/");
        }
      });
      res.redirect("/connexion");
    })
    .catch((error) => console.error(error));
});

/* GET page inscription. */
router.get("/inscription", function (req, res, next) {
  sess = req.session;
  if (connected == false) {
    res.render("inscription");
  }
  res.render("index", { connected });
});

/* GET page d'ajout d'une vidéo. */
router.get("/addVideo", function (req, res, next) {
  if (connected == false) {
    res.render("index", { connected });
  }
  res.render("addVideo", { utilisateur });
});

/* GET page de modification du profil. */
router.get("/modifProfile", function (req, res, next) {
  if (connected == false) {
    res.render("index", { connected });
  }
  res.render("modifProfile", { utilisateur });
});

//Pour se déconnecter
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    connected = false;
    res.redirect("/");
  });
});

module.exports = router;
