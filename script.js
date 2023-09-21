const inputSearch = document.getElementById("inputSearch");
const inputRange = document.getElementById("inputRange");
const inputSpan = document.getElementById("inputSpan");
const inputButton = document.querySelector("button");
const animeDisplay = document.querySelector("section");

let watchanime = [];
let sortMethod;

//Faire le lien vers l'API 
const fetchAnime = async () => {
    const result = await fetch(`https://api.jikan.moe/v4/anime?q=${inputSearch.value}`);
    const data = await result.json();
    watchanime = data.data;
    displayAnime();
}

//Faire Afficher les cartes
const displayAnime = () => {
    animeDisplay.innerHTML = "";
    watchanime
    .sort((a, b) => {
        if (sortMethod === "Descendant") {
            return a.score - (b.score)
        } else if (sortMethod === "Ascendant") {
            return b.score - (a.score)
        }
    })
    .slice(0, inputRange.value)
    .map((manga) => {
        animeDisplay.innerHTML += `
        <div class="card">
        <div class="title">${manga.title}</div>
        <img src=${manga.images.jpg.image_url}>
        <div class="synopsis">${manga.synopsis}</div>
        <div class="score">score: ${manga.score}</div>
        <a href=${manga.trailer.url}>Watch trailer</a>
    </div>`;
    })
}

//Faire fonctionner la barre de recherche
inputSearch.addEventListener("change", (e) => {
    fetchAnime();
})

//Faire fonctionner le span et le range
inputRange.addEventListener("input", (e) => {
    inputSpan.textContent = inputRange.value;
    displayAnime();
})

//Faire fonctionner le bouton 
inputButton.addEventListener("click", () => {
    if (sortMethod === "Descendant") {
        sortMethod = "Ascendant"
        inputButton.textContent = "Descendant"
    } else {
        sortMethod = "Descendant"
        inputButton.textContent = "Ascendant"
    }
    displayAnime();
})


fetchAnime();
