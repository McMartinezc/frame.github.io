import { URL_IMG } from "./api.js";
import { getColorScore } from "./utils.js";
import { setList } from "./utils.js";

//Template info
export async function createTemplateInfo(data) {
  const response = await fetch("templates.html");

  if (response.ok) {
    const templates = document.createElement("template");
    templates.innerHTML = await response.text();
    const infoTemplate =
      templates.content.querySelector("#template-info").content;

    const infoInstance = document.importNode(infoTemplate, true);
    infoInstance.querySelector(".poster").src = URL_IMG + data.poster_path;
    infoInstance.querySelector(".poster").alt = data.title || data.name;
    infoInstance.querySelector(".title").textContent = data.title || data.name;
    infoInstance.querySelector(".data").textContent =
      data.release_date || data.first_air_date;

    let genres = "";
    data.genres.forEach((genre) => {
      genres += genre.name + ", ";
    });
    genres = genres.slice(0, -2);
    infoInstance.querySelector(".genere").textContent = `Gènere: ${genres}`;
    infoInstance.querySelector(".vote").textContent =
      data.vote_average.toFixed(1);
    infoInstance.querySelector(".overview").textContent =
      data.overview || data.tagline;
    infoInstance.querySelector(".idioma").textContent = `Idioma original: ${
      data.spoken_languages[0].name || data.origin_country
    }`;

    const score = data.vote_average;
    const colorScore = getColorScore(score);
    infoInstance.querySelector(".vote").style.color = colorScore;

    let companies = "";
    data.production_companies.forEach((company) => {
      companies += company.name + ", ";
    });
    companies = companies.slice(0, -2);
    infoInstance.querySelector(
      ".companie"
    ).textContent = `Production companies: ${companies}`;
    infoInstance.querySelector(".time").textContent = data.runtime
      ? `Durada: ${data.runtime} min.`
      : `Nombre d'episodis: ${data.number_of_episodes}`;
    infoInstance.querySelector(".plataforma").textContent = data.homepage;
    infoInstance.querySelector(".plataforma").href = data.homepage;

    const container = document.querySelector("#resultado");
    container.textContent = "";
    container.appendChild(infoInstance);
  }
}

//Template footer
export async function createTemplateFooter() {
  const response = await fetch("templates.html");
  if (response.ok) {
    const templates = document.createElement("template");
    templates.innerHTML = await response.text();
    const footerTemplate =
      templates.content.querySelector("#template-footer").content;
    document.querySelector(".footer").appendChild(footerTemplate);
  }
}

//Template header
export async function createTemplateHeader() {
  const response = await fetch("templates.html");
  if (response.ok) {
    const templates = document.createElement("template");
    templates.innerHTML = await response.text();
    const headerTemplate =
      templates.content.querySelector("#template-header").content;
    document.querySelector(".inici").appendChild(headerTemplate);
  }
}
export async function createTemplateCard(cardData) {
  try {
    const response = await fetch("templates.html");

    if (response.ok) {
      const templates = document.createElement("template");
      templates.innerHTML = await response.text();
      const cardTemplate =
        templates.content.querySelector("#template-card").content;

      cardData.forEach((data) => {
        const cardInstance = document.importNode(cardTemplate, true);
        cardInstance.querySelector("article").setAttribute("id", data.id);
        cardInstance
          .querySelector("article")
          .setAttribute("tipo", data.media_type);
        cardInstance.querySelector(".poster").src = URL_IMG + data.poster_path;
        cardInstance.querySelector(".poster").alt = data.title || data.name;
        cardInstance.querySelector(".card-title").textContent =
          data.title || data.name;
        cardInstance.querySelector("p").textContent =
          data.release_date || data.first_air_date;
        cardInstance.querySelector("span").textContent = data.vote_average;
        const score = data.vote_average;
        const colorScore = getColorScore(score);
        cardInstance.querySelector("span").style.color = colorScore;

        // Agregar la tarjeta al contenedor correspondiente según el tipo de media
        if (data.media_type === "movie") {
          const container = ".llista-pelis";
          document.querySelector(container).appendChild(cardInstance);
        } else if (data.media_type === "tv") {
          const container = ".llista-series";
          document.querySelector(container).appendChild(cardInstance);
        }
      });

    }
  } catch (err) {
    console.log(err);
  }
}

//Template modal info
export async function createTemplateModalInfo(movieData) {
  try {
    //Creem la finestra modal
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const response = await fetch("templates.html");
    if (response.ok) {
      const templates = document.createElement("template");
      templates.innerHTML = await response.text();
      const infoTemplate =
        templates.content.querySelector("#template-modal").content;

      const infoInstance = document.importNode(infoTemplate, true);
      infoInstance.querySelector(".poster").src =
        URL_IMG + movieData.poster_path;
      infoInstance.querySelector(".poster").alt =
        movieData.title || movieData.name;
      infoInstance.querySelector(".title").textContent =
        movieData.title || movieData.name;
      infoInstance.querySelector(".data").textContent =
        movieData.release_date || movieData.first_air_date;

      let genres = "";
      movieData.genres.forEach((genre) => {
        genres += genre.name + ", ";
      });
      genres = genres.slice(0, -2);
      infoInstance.querySelector(".genere").textContent = `Gènere: ${genres}`;
      infoInstance.querySelector(".vote").textContent =
        movieData.vote_average.toFixed(1);
      infoInstance.querySelector(".overview").textContent =
        movieData.overview || movieData.tagline;
      infoInstance.querySelector(".idioma").textContent = `Idioma original: ${
        movieData.spoken_languages[0].name || movieData.origin_country
      }`;
      const score = movieData.vote_average;
      const colorScore = getColorScore(score);
      infoInstance.querySelector(".vote").style.color = colorScore;

      let companies = "";
      movieData.production_companies.forEach((company) => {
        companies += company.name + ", ";
      });
      companies = companies.slice(0, -2);
      infoInstance.querySelector(
        ".companie"
      ).textContent = `Production companies: ${companies}`;
      infoInstance.querySelector(".time").textContent = movieData.runtime
        ? `Durada: ${movieData.runtime} min.`
        : `Nombre d'episodis: ${movieData.number_of_episodes}`;
      infoInstance.querySelector(".plataforma").textContent =
        movieData.homepage;
      infoInstance.querySelector(".plataforma").href = movieData.homepage;

      // Agreguem el contingut del template a la finestra modal
      modal.appendChild(infoInstance);

      // Mostrar la finestra modal en la pantalla
      const modalContainer = document.querySelector(".modal-container");
      modalContainer.appendChild(modal);

      //Agreguem event listener per tancar finestra modal
      const btnTancar = document.querySelector(".btn-tancar");
      btnTancar.addEventListener("click", () => {
        modal.remove();
      });

      //Agreguem event listener per afegir a la llista
      const btnAdd = document.querySelector(".btn-afegir");
      btnAdd.addEventListener("click", () => {
        setList(movieData);
        modal.remove();
      });
    }
  } catch (err) {
    console.log(err);
  }
}

//Template llista
export async function createTemplateLlista(data) {
  try {
    const response = await fetch("templates.html");

    if (response.ok) {
      const templates = document.createElement("template");
      templates.innerHTML = await response.text();
      const infoTemplate =
        templates.content.querySelector("#template-llista").content;
      data.forEach((data) => {
        const infoInstance = document.importNode(infoTemplate, true);
        infoInstance.querySelector(".poster").src = URL_IMG + data.poster_path;
        infoInstance.querySelector(".poster").alt = data.title || data.name;
        infoInstance.querySelector(".title").textContent =
          data.title || data.name;
        infoInstance.querySelector(".data").textContent =
          data.release_date || data.first_air_date;
        infoInstance.querySelector(".vote").textContent =
          data.vote_average.toFixed(1);
        infoInstance.querySelector(".overview").textContent =
          data.overview || data.tagline;
        const score = data.vote_average;
        const colorScore = getColorScore(score);
        infoInstance.querySelector(".vote").style.color = colorScore;

        const container = document.querySelector("#results");
        container.appendChild(infoInstance);
      });
      container.textContent = ""; // Limpiamos el contenedor
    }
  } catch (err) {
    console.log(err);
  }
}
