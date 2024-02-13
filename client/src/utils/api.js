// Importa la función fetch para realizar solicitudes HTTP

// Función para acortar la URL
export const shortenURL = async (url) => {
  try {
    // Realiza una solicitud POST al endpoint del backend
    const response = await fetch("http://localhost:3001/api/url/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indica que el cuerpo de la solicitud es JSON
      },
      body: JSON.stringify({ originalURL: url }), // Envía la URL original como JSON en el cuerpo de la solicitud
    });

    // Verifica si la solicitud fue exitosa (código de estado 2xx)
    if (response.ok) {
      // Extrae la respuesta JSON del cuerpo de la respuesta
      const data = await response.json();
      // Retorna la URL corta generada por el backend
      return data.shortURL;
    } else {
      // Si la solicitud no fue exitosa, lanza un error con el mensaje de error del backend
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    // Si ocurre un error durante la solicitud, lanza una excepción con el mensaje de error
    throw new Error("Error al acortar la URL: " + error.message);
  }
};

export const getOriginalURL = async (shortenedURL) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/url/${shortenedURL}`
    );
    if (response.ok) {
      return await response.text();
    } else {
      throw new Error("URL not found");
    }
  } catch (error) {
    throw new Error("Error al obtener la URL original: " + error.message);
  }
};
