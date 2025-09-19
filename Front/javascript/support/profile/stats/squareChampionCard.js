function createChampionCard(champion) {
  const card = document.createElement("div");
  card.classList.add("card", "champion-card", "card-appear");

  // Contenedor de la imagen
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("champion-img-container");

  const img = document.createElement("img");
  img.src = champion.image;
  img.alt = champion.champion;
  img.classList.add("champion-img");

  imgContainer.appendChild(img);

  // Footer con el nombre
  const name = document.createElement("div");
  name.classList.add("card-body", "p-1", "champion-name");
  name.innerHTML = `<strong>${champion.champion}</strong>`;

  card.appendChild(imgContainer);
  card.appendChild(name);

  // Evento futuro (ej: abrir modal de campeón)
  card.addEventListener("click", () => {
    console.log("Champion clicked:", champion.champion);
    // openModalChampion(champion) si querés agregarlo después
  });

  return card;
}
