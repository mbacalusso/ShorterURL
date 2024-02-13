const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const originalURLSchema = new Schema({
  originalURL: { type: String, required: true },
  shortURL: { type: String, unique: true },
});

module.exports = mongoose.model("OriginalURL", originalURLSchema);
