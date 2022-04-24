const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  videoUrl: { type: String, required: true },
  nomVideo: { type: String, required: true },
  idUser: { type: String, required: true },
  description: { type: String, required: false },
  pays: { type: String, required: true },
  date: { type: Date, required: false },
  aLaUne: { type: Boolean, reuired: true },
});

module.exports = mongoose.model("Video", videoSchema);
