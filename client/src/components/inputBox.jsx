"use client";
import React, { useState } from "react";
import { shortenURL } from "../utils/api"; // Importa la función para acortar URLs

const InputBox = () => {
  const [originalURL, setOriginalURL] = useState(""); // Estado para almacenar la URL original
  const [shortenedURL, setShortenedURL] = useState(""); // Estado para almacenar la URL corta

  // Función para manejar el cambio en el input de la URL original
  const handleInputChange = (event) => {
    setOriginalURL(event.target.value);
  };

  // Función para manejar el clic en el botón "Short"
  const handleShortenClick = async () => {
    try {
      if (originalURL.trim() !== "") {
        // Verifica si la URL original no está vacía
        const shortURL = await shortenURL(originalURL); // Acorta la URL original utilizando la función del utilitario
        setShortenedURL(shortURL); // Almacena la URL corta en el estado
      }
    } catch (error) {
      console.error("Error al acortar la URL:", error.message);
    }
  };

  // Función para manejar el clic en el botón "Redirect"
  const handleRedirectClick = async () => {
    try {
      if (shortenedURL.trim() !== "") {
        const originalURL = await getOriginalURL(shortenedURL); // Obtiene la URL original asociada a la URL corta
        window.location.href = originalURL; // Redirige al usuario a la URL original
      }
    } catch (error) {
      console.error("Error al obtener la URL original:", error.message);
    }
  };

  return (
    <div>
      <input
        value={originalURL}
        onChange={handleInputChange}
        placeholder="Enter URL to shorten"
      />
      <button onClick={handleShortenClick}>Shorten</button>
      {shortenedURL && (
        <div>
          <p>http://localhost:3001/api/url/{shortenedURL}</p>
        </div>
      )}
    </div>
  );
};

export default InputBox;
