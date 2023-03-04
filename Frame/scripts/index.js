import { fetchContent, fetchDetails } from "./fetch.js";
import {
  createTemplateCard,
  createTemplateFooter,
  createTemplateHeader,
  createTemplateModalInfo,
} from "./render.js";
import { POP_MOVIE, POP_TV } from "./api.js";
import { handleSearch } from "./utils.js";

//Crida funció main
main();

//Execució de index
async function main() {
  try {
    // Agregar títols de les llistes
    const pelisTitle = document.createElement("h3");
    pelisTitle.textContent = "Pel·lícules: ";
    document.querySelector(".llista-pelis").before(pelisTitle);

    const seriesTitle = document.createElement("h3");
    seriesTitle.textContent = "Sèries: ";
    document.querySelector(".llista-series").before(seriesTitle);

    const dataMovies = await fetchContent(POP_MOVIE);
    const dataTv = await fetchContent(POP_TV);
    createTemplateHeader();
    createTemplateFooter();
    createTemplateCard(dataMovies, "movie");
    createTemplateCard(dataTv, "tv");

    const listCards = document.querySelector(".container");
    listCards.addEventListener("click", handleCardClick);

    // Seleccionem els elements del DOM
    const form = document.getElementById("form");
    form.addEventListener("submit", handleSearch);
  } catch (error) {
    console.error(error);
  }
}

//Funció finestra modal
function handleCardClick(e) {
  const article = e.target.closest("article");
  if (article) {
    const movieId = article.getAttribute("id");
    const mediaType = article.getAttribute("tipo");
    fetchDetails(mediaType, movieId)
      .then((response) => createTemplateModalInfo(response))
      .catch((error) => console.error(error));
  }
}
