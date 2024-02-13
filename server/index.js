// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const urlRoutes = require("./routes/urlRoutes");

// Configuración de Express
const app = express();
app.use(express.json());

// Middleware para configurar las cabeceras CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Reemplaza con el dominio de tu aplicación Next.js
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Conexión a la base de datos MongoDB
mongoose
  .connect("mongodb://localhost:27017/url_shortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Rutas de la aplicación
app.use("/api/url", urlRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
