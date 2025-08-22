// Crear tarjeta
function createSkinCard(skin) {
  const col = document.createElement("div");
  col.classList.add("col-md-2", "text-center");
  col.style.flex = "0 0 20%";
  col.style.maxWidth = "20%";

  const card = document.createElement("div");
  card.classList.add("card", "mb-2");
  card.style.width = "108%";
  card.style.height = "340px";
  card.style.overflow = "hidden";
  card.style.display = "flex";
  card.style.flexDirection = "column"; // 🟢 Igual que champions, columna flexible

  // Contenedor para la imagen
  const imgContainer = document.createElement("div");
  imgContainer.style.height = "300px"; // 🟢 Mantener proporción mayor
  imgContainer.style.overflow = "hidden";
  imgContainer.style.display = "flex";
  imgContainer.style.alignItems = "center";
  imgContainer.style.justifyContent = "center";

  const img = document.createElement("img");
  img.src = skin.image;
  img.alt = `${skin.name} - ${skin.championName}`;
  img.style.width = "108%";
  img.style.height = "100%"; // 🟢 Ocupa todo el contenedor
  img.style.objectFit = "cover";
  img.style.objectPosition = getSkinObjectPosition(skin.name); // 🟢 Posición específica
  img.style.transform = `scale(${getSkinZoom(skin.name)})`;

  // Si quieres zoom o posición específica como en campeones
  // img.style.objectPosition = getSkinObjectPosition(skin.name);
  // img.style.transform = `scale(${getSkinZoom(skin.name)})`;

  if (!skin.owned) {
    img.style.filter = "grayscale(95%)";
    img.style.opacity = "0.7";
  }

  imgContainer.appendChild(img);

  // Nombre de la skin
  const name = document.createElement("div");
  name.classList.add("card-body", "p-2");
  name.style.flex = "0 0 32px"; // 🟢 Reducimos el espacio del área blanca
  name.innerHTML = `<strong>${skin.name.replace(/´/g, "'")}</strong>`;

  card.appendChild(imgContainer);
  card.appendChild(name);
  col.appendChild(card);

  // Click para abrir modal
  card.addEventListener("click", () => openModalSkin(skin));

  return col;
}

// Crea un <div class="col-md-2"> con la tarjeta de un campeón
function createChampionCard(champ) {
  const col = document.createElement("div");
  col.classList.add("col-md-2", "text-center");
  col.style.flex = "0 0 20%";
  col.style.maxWidth = "20%";

  const card = document.createElement("div");
  card.classList.add("card", "mb-2");
  card.style.width = "108%";
  card.style.height = "340px";
  card.style.overflow = "hidden";
  card.style.display = "flex";
  card.style.flexDirection = "column";

  // Contenedor para la imagen
  const imgContainer = document.createElement("div");
  imgContainer.style.height = "300px"; // Más alto, menos margen blanco
  imgContainer.style.overflow = "hidden";
  imgContainer.style.display = "flex";
  imgContainer.style.alignItems = "center";
  imgContainer.style.justifyContent = "center";

  const img = document.createElement("img");
  img.src = champ.imageUrl;
  img.alt = champ.name;
  img.style.width = "108%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  img.style.objectPosition = getChampionObjectPosition(champ.name);
  img.style.transform = `scale(${getChampionZoom(champ.name)})`;

  if (!champ.owned) {
    img.style.filter = "grayscale(95%)";
    img.style.opacity = "0.70";
  }

  imgContainer.appendChild(img);

  // Nombre con menos alto
  const name = document.createElement("div");
  name.classList.add("card-body", "p-2");
  name.style.flex = "0 0 32px"; // Más chico el área blanca
  name.innerHTML = `<strong>${champ.name.replace(/´/g, "'")}</strong>`;

  card.appendChild(imgContainer);
  card.appendChild(name);
  col.appendChild(card);

  card.addEventListener("click", () => {
    openModal(champ);
  });

  return col;
}

function appendSkinRows(container, skins) {
  let row;
  skins.forEach((skin, index) => {
    if (index % 5 === 0) {
      row = document.createElement("div");
      row.classList.add("row", "mb-2");
      container.appendChild(row);
    }
    row.appendChild(createSkinCard(skin));
  });
}

function appendChampionRows(container, champions, cardsPerRow = 5) {
  let row;
  champions.forEach((champ, index) => {
    if (index % cardsPerRow === 0) {
      row = document.createElement("div");
      row.classList.add("row", "mb-2");
      container.appendChild(row);
    }
    row.appendChild(createChampionCard(champ));
  });
}
