import { TOP_TV, TOP_MOV } from "./api.js";
import {
  createTemplateInfo,
  createTemplateHeader,
  createTemplateFooter,
} from "./render.js";
import { fetchDetails } from "./fetch.js";

//Crida funció main
main();

//Execució de see
async function main() {
  try {
    // Seleccionem els elements del DOM
    const btnPeliculas = document.querySelector("#btn-pelis");
    const btnSeries = document.querySelector("#btn-series");
    const resultado = document.querySelector("#resultado");

    //header
    createTemplateHeader();
    //footer
    createTemplateFooter();

    // Afegim events dels botons
    btnPeliculas.addEventListener("click", () => getRandomMedia("movie"));
    btnSeries.addEventListener("click", () => getRandomMedia("tv"));
  } catch (error) {
    console.error(error);
  }
}

//Funció que dona el random i busca la peli o serie corresponent amb el id
async function getRandomMedia(category) {
  const url = category === "movie" ? TOP_MOV : TOP_TV;
  const response = await fetch(url);
  const data = await response.json();
  const mediaList = data.results;
  const randomIndex = Math.floor(Math.random() * mediaList.length);
  const randomMedia = mediaList[randomIndex];
  const media = await fetchDetails(category, randomMedia.id);
  createTemplateInfo(media);
  resultado.textContent = "";
}
