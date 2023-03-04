import {
  createTemplateHeader,
  createTemplateFooter,
  createTemplateLlista,
} from "./render.js";
import { listFavorits } from "./utils.js";
import { searchContent } from "./utils.js";

//Crida funció main
main();

//Execució de list
async function main() {
  try {
    // Seleccionem els elements del DOM
    const form = document.getElementById("form");
    form.addEventListener("submit", handleSearch);

    createTemplateHeader();
    createTemplateFooter();

    // Actualiza la llista d'afegits a favorits
    window.addEventListener("load", () => {
      listFavorits();
    });
  } catch (error) {
    console.error(error)
  }
}

//Funció que gestiona la cerca
async function handleSearch(event) {
  const search = document.getElementById("search");
  event.preventDefault();
  const searchTerm = search.value.trim();
  if (!searchTerm) return;
  const results = await searchContent(searchTerm);
  getResults(results);
}

//Funció mostra resultat de la cerca en forma de llista
function getResults(results) {
  const searchResults = document.getElementById("results");
  searchResults.textContent = "";
  if (results.length === 0) {
    const noResults = document.createElement("p");
    noResults.textContent = "No hi ha resultats";
    return searchResults.appendChild(noResults);
  }
  createTemplateLlista(results);
}
