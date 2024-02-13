const express = require("express");
const router = express.Router();
const OriginalURL = require("../models/originalURL");
const ShortURL = require("../models/shortURL");

function generateShortURL() {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let shortURL = "";
  do {
    shortURL = "";
    for (let i = 0; i < 6; i++) {
      shortURL += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
  } while (OriginalURL.hasOwnProperty(shortURL));

  return shortURL;
}

function isValidURL(originalURL) {
  // Expresión regular para validar la URL
  const urlPattern =
    /^(https?:\/\/)?([\w-]+\.)*([\w-]+\.[\w-]{2,})(\/[\w .-]*)*(\?.*)?$/;
  return urlPattern.test(originalURL);
}

// Ruta para acortar una URL original
router.post("/shorten", async (req, res) => {
  const { originalURL } = req.body;
  try {
    if (!isValidURL(originalURL)) {
      return res.status(400).json({ message: "URL is not valid" });
    }
    // Buscar la URL original en la base de datos
    let originalURLDoc = await OriginalURL.findOne({ originalURL });

    // Si la URL original ya existe en la base de datos, devolver la URL corta asociada
    if (originalURLDoc) {
      return res.status(200).json({ shortURL: originalURLDoc.shortURL }); // Devolver la URL corta encontrada
    } else {
      const shortURL = generateShortURL(); // Generar una URL corta única

      // Guardar la asociación en la base de datos
      originalURLDoc = await OriginalURL.create({ originalURL, shortURL });
      await ShortURL.create({ shortURL, originalURL });

      res.status(201).json({ shortURL });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Ruta para redirigir a la URL original asociada a la URL corta
router.get("/:shortURL", async (req, res) => {
  try {
    // Buscar la URL original asociada a la URL corta en la base de datos
    const { shortURL } = req.params;
    const originalURLDoc = await OriginalURL.findOne({ shortURL });

    // Si se encuentra la URL original, redirigir al usuario a ella
    if (originalURLDoc) {
      res.redirect(originalURLDoc.originalURL);
    } else {
      // Si no se encuentra la URL original, devolver un error 404
      res.status(404).json({ message: "URL not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
