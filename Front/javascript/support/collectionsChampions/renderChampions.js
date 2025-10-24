// Función que decide qué mostrar
function renderChampions() {
  collectionsContainer.innerHTML = "";
  const champions = getFilteredChampions();

  let row;
  champions.forEach((champ, index) => {
    if (index % 5 === 0) {
      row = document.createElement("div");
      row.classList.add("row", "mb-2");
      collectionsContainer.appendChild(row);
    }
    row.appendChild(createChampionCard(champ));
  });
}

function renderChampionsByCategory({
  attribute,
  categories,
  formatTitle,
  includeEmptyGroup,
  emptyGroupTitle,
}) {
  collectionsContainer.innerHTML = "";
  const champions = getFilteredChampions();

  categories.forEach((cat) => {
    let group = champions.filter((c) => c[attribute] === cat);
    if (!group.length) return;

    const title = document.createElement("h3");

    // Creamos el contenido sin tocar los <img>
    let displayCat = formatTitle ? formatTitle(cat) : String(cat);

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = displayCat;

    tempDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = node.textContent.toUpperCase();
      }
    });

    title.innerHTML = `<strong>${tempDiv.innerHTML}</strong>`;
    title.classList.add("mt-3", "category-title");
    collectionsContainer.appendChild(title);

    appendChampionRows(collectionsContainer, group);
  });

  if (includeEmptyGroup) {
    let emptyGroup = champions.filter((c) => !c[attribute]);
    if (emptyGroup.length) {
      const title = document.createElement("h3");

      // Igual, no tocar los <img> si hay
      const tempDiv = document.createElement("div");
      tempDiv.textContent = emptyGroupTitle.toUpperCase();
      title.innerHTML = `<strong>${tempDiv.innerHTML}</strong>`;
      title.classList.add("mt-3", "category-title");
      collectionsContainer.appendChild(title);

      appendChampionRows(collectionsContainer, emptyGroup);
    }
  }
}

function renderChampionsByOwnership() {
  renderChampionsByCategory({
    attribute: "owned",
    categories: [true, false],
    formatTitle: (owned) => (owned ? "Adquiridos" : "No adquiridos"),
  });
}

function renderChampionsByDifficulty() {
  renderChampionsByCategory({
    attribute: "difficulty",
    categories: ["Easy", "Medium", "Hard"],
  });
}

function renderChampionsByRole() {
  renderChampionsByCategory({
    attribute: "mainRole",
    categories: ["TOP", "JUNGLE", "MID", "ADC", "SUPPORT"],
    formatTitle: (role) =>
      role.charAt(0).toUpperCase() + role.slice(1).toLowerCase(),
  });
}

function renderChampionsByStyle() {
  renderChampionsByCategory({
    attribute: "style",
    categories: ["Fighter", "Marksman", "Mage", "Assassin", "Tank", "Support"],
    formatTitle: (style) =>
      style.charAt(0).toUpperCase() + style.slice(1).toLowerCase(),
  });
}

function renderChampionsByRole2() {
  renderChampionsByCategory({
    attribute: "sideRole",
    categories: ["TOP", "JUNGLE", "MID", "ADC", "SUPPORT"],
    formatTitle: (role) =>
      role.charAt(0).toUpperCase() + role.slice(1).toLowerCase(),
    includeEmptyGroup: true,
    emptyGroupTitle: "Sin rol secundario",
  });
}

function renderChampionsByStyle2() {
  renderChampionsByCategory({
    attribute: "style2",
    categories: ["Fighter", "Marksman", "Mage", "Assassin", "Tank", "Support"],
    formatTitle: (style) =>
      style.charAt(0).toUpperCase() + style.slice(1).toLowerCase(),
    includeEmptyGroup: true,
    emptyGroupTitle: "Sin estilo secundario",
  });
}
function renderChampionsByBlueEssence() {
  const beImg =
    '<img class="be-icon-big" src="https://res.cloudinary.com/dzhyqelnw/image/upload/v1761338998/blueEssence_m9dbsd.png" alt="BE" style="width:24px; height:24px; vertical-align:middle; margin-right:4px;">';

  renderChampionsByCategory({
    attribute: "blueEssencePrice",
    categories: [450, 1350, 3150, 4800, 6300, 7800],
    formatTitle: (price) => `${beImg} ${price}`, // icono + número
    includeEmptyGroup: true,
    emptyGroupTitle: "Sin precio definido",
  });
}
