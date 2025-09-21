let selectedChampion = null; // para este render
let lastSelectedChampion = null; // persistente entre renders

function createChampionCard(champion) {
  const card = document.createElement("div");
  card.classList.add("card", "champion-card", "card-appear");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("champion-img-container");

  const img = document.createElement("img");
  img.src = champion.image;
  img.alt = champion.champion;
  img.classList.add("champion-img");

  imgContainer.appendChild(img);

  const name = document.createElement("div");
  name.classList.add("card-body", "p-1", "champion-name");

  // Reemplaza ´ por ' para mostrar
  const displayName = champion.champion.replace(/´/g, "'");
  name.innerHTML = `<strong>${displayName}</strong>`;

  card.appendChild(imgContainer);
  card.appendChild(name);

  // Normalizamos ambos caracteres en dataset para filtrar
  const normalizedName = champion.champion.replace(/[´']/g, "'").toLowerCase();
  card.dataset.champion = normalizedName;
  card.dataset.championId = champion.id;

  return card;
}
function applySelectionStyles() {
  const allCards = document.querySelectorAll(".champion-card");
  allCards.forEach((c) => {
    const cImg = c.querySelector("img");

    if (selectedChampion && c.dataset.champion !== selectedChampion) {
      cImg.style.filter = "grayscale(95%)";
      cImg.style.opacity = "0.7";
      c.classList.remove("selected");
    } else if (selectedChampion && c.dataset.champion === selectedChampion) {
      cImg.style.filter = "none";
      cImg.style.opacity = "1";
      c.classList.add("selected");
    } else {
      cImg.style.filter = "none";
      cImg.style.opacity = "1";
      c.classList.remove("selected");
    }
  });
}
