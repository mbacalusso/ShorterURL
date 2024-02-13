const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shortURLSchema = new Schema({
  shortURL: { type: String, required: true, unique: true },
  originalURL: { type: String, required: true },
});

module.exports = mongoose.model("ShortURL", shortURLSchema);
