const { db } = require("../models/video");
const Video = require("../models/video");

//Création d'une vidéo
exports.createVideo = (req, res, next) => {
  var titreVideoUrl = req.body.nomVideo.replace(/ /g, "_");
  var titreVideoUrlSansCaracteresSpeciaux = titreVideoUrl.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\{{content}}amp;"
  );
  const videoUrl =
    "/videos/" +
    titreVideoUrlSansCaracteresSpeciaux +
    "_" +
    req.body.idUser +
    "_" +
    req.body.date +
    ".mp4";
  const aLaUne = true;
  const video = new Video({
    videoUrl,
    nomVideo: req.body.nomVideo,
    idUser: req.body.idUser,
    description: req.body.description,
    pays: req.body.pays,
    date: req.body.date,
    aLaUne,
  });
  video
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
