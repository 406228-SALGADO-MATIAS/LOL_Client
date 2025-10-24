// Render básico
function renderSkins() {
  collectionsContainer.innerHTML = "";
  const skins = getFilteredSkins();

  let row;
  skins.forEach((skin, index) => {
    if (index % 5 === 0) {
      row = document.createElement("div");
      row.classList.add("row", "mb-2");
      collectionsContainer.appendChild(row);
    }
    row.appendChild(createSkinCard(skin));
  });
}

function renderSkinsByCategory({
  attribute,
  categories,
  formatTitle,
  includeEmptyGroup,
  emptyGroupTitle,
  ignoreSearch = false,
}) {
  collectionsContainer.innerHTML = "";
  const skins = getFilteredSkins({ ignoreSearch });

  categories.forEach((cat) => {
    const value = cat.value !== undefined ? cat.value : cat;

    const group = skins.filter((s) => {
      const attrValue = s[attribute];
      if (typeof attrValue === "string") {
        return (
          attrValue.replace(/´/g, "'") === String(value).replace(/´/g, "'")
        );
      }
      return attrValue === value; // booleanos o números
    });

    if (!group.length) return;

    const title = document.createElement("h3");

    // Generamos el contenido del título sin tocar el HTML de imágenes
    let displayCat = formatTitle ? formatTitle(cat) : String(cat);

    // Separamos texto de etiquetas <img> para solo aplicar mayúsculas al texto
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

    appendSkinRows(collectionsContainer, group);
  });

  if (includeEmptyGroup) {
    const emptyGroup = skins.filter((s) => {
      const attrValue = s[attribute];
      return !categories.some((cat) => {
        const value = cat.value !== undefined ? cat.value : cat;
        if (typeof attrValue === "string") return attrValue === String(value);
        return attrValue === value;
      });
    });

    if (emptyGroup.length) {
      const title = document.createElement("h3");
      title.innerHTML = `<strong>${emptyGroupTitle.toUpperCase()}</strong>`;
      title.classList.add("mt-3", "category-title");
      collectionsContainer.appendChild(title);

      appendSkinRows(collectionsContainer, emptyGroup);
    }
  }
}

function renderSkinsByOwnership() {
  renderSkinsByCategory({
    attribute: "owned",
    categories: [true, false],
    formatTitle: (owned) => (owned ? "ADQUIRIDOS" : "NO ADQUIRIDOS"),
    includeEmptyGroup: false,
    ignoreSearch: false, // 🔹 importante
  });
}

function renderSkinsByRPCost() {
  const rpIcon =
    '<img class="rp-icon-big" src="https://res.cloudinary.com/dzhyqelnw/image/upload/v1761340820/rp_avaiqa.png" alt="RP" style="width:24px; height:24px; vertical-align:middle; margin-left:4px;">';

  renderSkinsByCategory({
    attribute: "rpCost",
    categories: [520, 750, 975, 1350, 1820, 3250],
    formatTitle: (rp) => {
      let tier = "";
      if (rp <= 520) tier = "BUDGET";
      else if (rp <= 750) tier = "STANDARD";
      else if (rp <= 975) tier = "DELUXE";
      else if (rp <= 1350) tier = "EPIC";
      else if (rp <= 1820) tier = "LEGENDARY";
      else tier = "MYTHIC";

      // Retornamos texto + icono + número + tier
      return `${rpIcon} ${rp} - ${tier}`;
    },
    includeEmptyGroup: false,
    ignoreSearch: false,
  });
}

// Exclusivo de skins
function renderSkinsByAvailableness() {
  collectionsContainer.innerHTML = "";

  const userRP = parseInt(document.getElementById("userRP").textContent, 10);
  const skins = getFilteredSkins();

  // Definimos las categorías con su lógica
  const categories = [
    {
      title: "ADQUIRED",
      filter: (skin) => skin.owned,
    },
    {
      title: "OBTAINABLE",
      filter: (skin) =>
        !skin.owned &&
        ownedChampions.some((c) => c.name === skin.championName) &&
        userRP >= skin.rpCost,
    },
    {
      title: "NEED RP",
      filter: (skin) =>
        !skin.owned &&
        ownedChampions.some((c) => c.name === skin.championName) &&
        userRP < skin.rpCost,
    },
    {
      title: "NEED CHAMPION",
      filter: (skin) =>
        !skin.owned &&
        !ownedChampions.some((c) => c.name === skin.championName),
    },
  ];

  categories.forEach((cat) => {
    const group = skins.filter(cat.filter);
    if (!group.length) return;

    const title = document.createElement("h3");
    title.innerHTML = `<strong>${cat.title}</strong>`;
    title.classList.add("mt-3", "category-title");
    collectionsContainer.appendChild(title);

    appendSkinRows(collectionsContainer, group);
  });
}

function renderSkinsByChampion() {
  const skins = getFilteredSkins();

  // Obtener todos los nombres de campeones únicos
  const championNames = [...new Set(skins.map((s) => s.championName))];

  renderSkinsByCategory({
    attribute: "championName",
    categories: championNames,
    formatTitle: (name) => name.toUpperCase(), // opcional: mayúsculas
    includeEmptyGroup: false, // no hace falta grupo vacío
  });
}
