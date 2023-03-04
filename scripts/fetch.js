//Funcions fetch

export async function fetchContent(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Agregar la propietat media_type per poder diferenciar si es movie o tv
    const results = data.results.map((result) => {
      if (result.media_type) {
        return result;
      } else if (result.title) {
        return { ...result, media_type: "movie" };
      } else if (result.name) {
        return { ...result, media_type: "tv" };
      } else {
        return result;
      }
    });

    return results;
  } catch (error) {
    console.error(error);
  }
}

//Funció per obtenir detall de peli o serie
export async function fetchDetails(mediaType, id) {
  const API_KEY = "api_key=76ae581f1d594bc56d7dab63f40b4ed9";
  const API_BASE = "https://api.themoviedb.org/3";

  const url = `${API_BASE}/${mediaType}/${id}?${API_KEY}&language=ca`;
  const response = await fetch(url);
  const media = await response.json();
  return media;
}
