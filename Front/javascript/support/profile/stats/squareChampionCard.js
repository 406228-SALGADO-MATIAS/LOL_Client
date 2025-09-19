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
  name.innerHTML = `<strong>${champion.champion}</strong>`;

  card.appendChild(imgContainer);
  card.appendChild(name);

  card.dataset.champion = champion.champion;
  card.dataset.championId = champion.id; // <-- así lo tenés disponible

  card.addEventListener("click", async () => {
    const uid =
      sessionStorage.getItem("tempUserId") || sessionStorage.getItem("userId");

    if (selectedChampion === champion.champion) {
      // Deseleccionamos
      selectedChampion = null;
      lastSelectedChampion = null;
      await loadStats(uid, gameFilter.value, roleFilter.value);
    } else {
      selectedChampion = champion.champion;
      lastSelectedChampion = champion.champion;

      // renderizamos el contenedor con "all/all" ---
      // Usamos snapshot inicial de la carga completa
      if (window.defaultChampionsData) {
        championList.innerHTML = "";
        (window.defaultChampionsData.championsUsed || []).forEach((c) => {
          const cardElem = createChampionCard(c);
          championList.appendChild(cardElem);
        });
      }

      //  load específico del champion seleccionado ---
      await loadSelectedChampionStats(
        uid,
        selectedChampion,
        gameFilter.value,
        roleFilter.value
      );

      applySelectionStyles();
    }

    console.log("Champion clicked:", selectedChampion);
    console.log("Champion last:", lastSelectedChampion);
  });

  return card;
}

// Función global que aplica el estado actual
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
