const collectionsContainer = document.getElementById("collectionsContainer");
const userId = sessionStorage.getItem("userId");

const modal = document.getElementById("skinModal"); // suponiendo que tenés un modal en el HTML
const modalImg = document.getElementById("modalImage");
const closeModal = document.getElementById("modalClose");
const unlockButton = document.getElementById("unlockButton");

let ownedSkins = [];
let notOwnedSkins = [];

// Orden alfabético
function sortSkinsAlphabetically(skins) {
  return skins.slice().sort((a, b) => {
    // 1️⃣ Primero comparo el nombre del campeón
    const champCompare = a.championName.localeCompare(b.championName, "en", {
      sensitivity: "base",
    });
    if (champCompare !== 0) return champCompare; // si son distintos, ese es el orden final

    // 2️⃣ Si el campeón es el mismo, comparo el nombre de la skin
    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  });
}

// Cargar skins desde backend
async function loadSkins(activeFilter = null) {
  collectionsContainer.innerHTML = "";

  try {
    const [ownedRes, notOwnedRes] = await Promise.all([
      fetch(`http://localhost:8080/skins/getUserSkins/${userId}`),
      fetch(`http://localhost:8080/skins/getUserSkins/NotPossess/${userId}`),
    ]);

    ownedSkins = ownedRes.ok ? await ownedRes.json() : [];
    if (!notOwnedRes.ok) {
      collectionsContainer.innerHTML = `<p class="text-center text-danger">Error cargando skins no adquiridas</p>`;
      return;
    }
    notOwnedSkins = await notOwnedRes.json();

    updateSkinCounters();

    if (activeFilter) {
      applyFilter(activeFilter);
    } else {
      renderSkins();
    }
  } catch (err) {
    collectionsContainer.innerHTML = `<p class="text-center text-danger">${err.message}</p>`;
  }
}

let ownedChampions = [];

async function loadUserChampions() {
  try {
    const res = await fetch(
      `http://localhost:8080/champions/userChampions/${userId}`
    );
    if (res.ok) {
      ownedChampions = await res.json();
    } else {
      ownedChampions = [];
    }
  } catch (err) {
    console.error("Error cargando campeones del usuario:", err);
    ownedChampions = [];
  }
}

// Actualizar contadores
function updateSkinCounters() {
  const total = ownedSkins.length + notOwnedSkins.length;
  const posesion = ownedSkins.length;

  const totalEl = document.getElementById("counter-total");
  const posesionEl = document.getElementById("counter-posesion");

  if (totalEl) totalEl.textContent = total;
  if (posesionEl) posesionEl.textContent = posesion;
}

// Filtrado por nombre skin
function filterByQuery(skins, query) {
  if (!query) return skins;

  // Normalizamos query: reemplazamos ´ por '
  const normalizedQuery = query.replace(/´/g, "'").toLowerCase();

  return skins.filter((s) =>
    // Normalizamos también los nombres de skins
    s.name.replace(/´/g, "'").toLowerCase().includes(normalizedQuery)
  );
}

// Filtrado por nombre de campeón
function filterByChampionName(skins, query) {
  if (!query) return skins;

  const normalizedQuery = query.replace(/´/g, "'").toLowerCase();

  return skins.filter((s) =>
    s.championName.replace(/´/g, "'").toLowerCase().includes(normalizedQuery)
  );
}

function filterByOwnership(ownedData, showNotOwned, notOwnedData) {
  return [
    ...ownedData.map((s) => ({ ...s, owned: true })),
    ...(showNotOwned ? notOwnedData.map((s) => ({ ...s, owned: false })) : []),
  ];
}

// En getFilteredSkins(), agregamos la parte del campeón
function getFilteredSkins({ ignoreSearch = false } = {}) {
  const showNotOwned = document.getElementById("showNotOwned").checked;

  let skins = filterByOwnership(ownedSkins, showNotOwned, notOwnedSkins);

  if (!ignoreSearch) {
    const skinQuery = document
      .getElementById("searchSkin")
      .value.trim()
      .toLowerCase();
    const champQuery = document
      .getElementById("searchChampion")
      .value.trim()
      .toLowerCase();

    skins = filterByQuery(skins, skinQuery); // filtro por nombre de skin
    skins = filterByChampionName(skins, champQuery); // filtro por nombre de campeón
  }

  return sortSkinsAlphabetically(skins);
}
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
  card.addEventListener("click", () => openModal(skin));

  return col;
}

function getSkinZoom(name) {
  name = name.replace(/´/g, "'");

  // Valor por defecto
  let zoom = 1.0;

  // +7%
  const smallZoom = [
    "Ashen Lord Aurelion Sol",
    "Dragonslayer Braum",
    "Sheriff Caitlyn",
    "Corporate Mundo",
    "Pool Party Mundo",
    "Primetime Draven",
    "Soaring Sword Fiora",
    "Tundra Fizz",
    "Commando Galio",
    "Gatekeeper Galio",
    "Gragas, Esq.",
    "Pool Party Graves",
    "Riot Graves",
    "Arcade Hecarim",
    "Elderwood Hecarim",
    "Astronaut Ivern",
    "Dunkmaster Ivern",
    "Darkforge Jarvan IV",
    "Battle Cat Jinx",
    "Odyssey Jinx",
    "Traditional Karma",
    "High Noon Lucian",
    "Glacial Malphite",
    "Rain Shepherd Milio",
    "Lord Mordekaiser",
    "PROJECT: Mordekaiser",
    "Choo-Choo Ornn",
    "Elderwood Ornn",
    "Blackfrost Rek'Sai",
    "Eternum Rek'Sai",
    "Prestige La Ilusión Renata",
    "Outback Renekton",
    "Pool Party Renekton",
    "Prestige True Damage Senna",
    "Warlord Shen",
    "Sandscourge Skarner",
    "Constable Trundle",
    "Traditional Trundle",
    "Warring Kingdoms",
    "Underworld Twisted Fate",
    "PROJECT: Vi",
    "Battlecast Urgot",
    "Soulstealer Vladimir",
    "Tundra Hunter Warwick",
    "Empyrean Zac",
    "Special Weapon Zac",
    "Empyrean Zed",
    "Sugar Rush Zilean",
    "The Magnificent Twisted Fate",
    "Arcana Xerath",
  ];

  // +15%
  const mediumZoom = [
    "Blood Moon Aatrox",
    "Santa Braum",
    "Gentleman Cho'Gath",
    "Arcane Caitlyn",
    "Soul Reaver Draven",
    "Warring Kingdoms Jarvan IV",
    "Admiral Glasc",
    "Coral Reef Malphite",
    "High Noon Senna",
    "Giant Enemy Crabgot",
    "Neon Strike Vi",
    "Scorched Earth Xerath",
    "Shockblade Zed",
    "Withered Rose Zeri",
    "Demonblade Tryndamere",
    "Headmistress Fiora",
    "Headhunter Rengar",
    "Heavenscale Kai'Sa",
    "Slay Belle Katarina",
    "Kitty Cat Katarina",
    "PROJECT Lucian",
  ];

  // +25%
  const largeZoom = ["Time Machine Zilean", "Surfer Singed"];

  // +35%
  const veryLargeZoom = [
    "Longhorn Alistar",
    "Moo Cow Alistar",
    "Blood Lord Vladimir",
    "Augmented Singed",
    "Jurassic Cho'Gath",
    "Tranquility Dragon Karma",
  ];

  // +50%
  const superZoom = ["Snow Day Bard"];

  if (smallZoom.includes(name)) zoom = 1.07;
  else if (mediumZoom.includes(name)) zoom = 1.15;
  else if (largeZoom.includes(name)) zoom = 1.25;
  else if (veryLargeZoom.includes(name)) zoom = 1.35;
  else if (superZoom.includes(name)) zoom = 1.5;

  return zoom;
}

function getSkinObjectPosition(name) {
  // Normalizamos las comillas
  name = name.replace(/´/g, "'");

  // Default
  let position = 50;

  // +7%
  const verySmallRight = [
    "Nurse Akali",
    "Ashen Lord Aurelion Sol",
    "Mecha Aurelion Sol",
    "Astronaut Bard",
    "Snow Day Bard",
    "Candy King Ivern",
    "Admiral Glasc",
    "Prestige La Ilusión Renata",
    "Battlecast Alpha Skarner",
    "Sandscourge Skarner",
    "Tundra Hunter Warwick",
    "Arcana Xerath",
    "Astronaut Ivern",
  ];

  // +15%
  const smallRight = [
    "Arcade Kai'Sa",
    "Giant Enemy Crabgot",
    "Sugar Rush Zilean",
  ];

  // +22%
  const midRight = [
    "Dragonslayer Braum",
    "Commando Galio",
    "Gatekeeper Galio",
    "Hillbilly Gragas",
    "Battle Cat Jinx",
    "Warring Kingdoms Jarvan IV",
    "High Noon Lucian",
    "Rain Shepherd Milio",
    "Lord Mordekaiser",
    "Elderwood Ornn",
    "Blackfrost Rek'Sai",
    "Eternum Rek'Sai",
    "Headhunter Rengar",
    "Yellow Jacket Shen",
    "Battlecast Urgot",
    "Empyrean Zac",
    "Special Weapon Zac",
    "Arcade Hecarim",
  ];

  // +30
  const midlargeRight = ["Night Hunter Rengar"];

  // +35%
  const largeRight = [
    "Longhorn Alistar",
    "Arcane Caitlyn",
    "Primetime Draven",
    "Soaring Sword Fiora",
    "Fisherman Fizz",
    "Elderwood Hecarim",
    "PROJECT: Mordekaiser",
    "Mecha Kha'Zix",
    "Warlord Shen",
    "Soulstealer Vladimir",
    "Shockblade Zed",
    "Santa Braum",
  ];

  // +42%
  const veryLargeRight = [
    "Mecha Aatrox",
    "Jurassic Cho'Gath",
    "Dunkmaster Ivern",
    "Riot Graves",
    "Kitty Cat Katarina",
    "Augmented Singed",
    "The Magnificent Twisted Fate",
    "Traditional Trundle",
    "Neon Strike Vi",
    "Crime City Twitch",
    "Warring Kingdoms Tryndamere",
    "Scorched Earth Xerath",
    "Pool Party Renekton",
    "Time Machine Zilean",
    "Pool Party Graves",
  ];

  // +50%
  const superRight = [
    "Gentleman Cho'Gath",
    "Pool Party Mundo",
    "Soul Reaver Draven",
    "Headmistress Fiora",
    "Gragas, Esq.",
    "Darkforge Jarvan IV",
    "Coral Reef Malphite",
    "Slay Belle Katarina",
    "Glacial Malphite",
    "Outback Renekton",
    "Constable Trundle",
    "Surfer Singed",
    "Demonblade Tryndamere",
    "Underworld Twisted Fate",
    "Blood Lord Vladimir",
    "Ocean Song Zeri",
    "Tundra Fizz",
    "PROJECT Lucian",
  ];

  // -7%
  const verySmallLeft = [
    "Corporate Mundo",
    "Odyssey Jinx",
    "Tranquility Dragon Karma",
    "Prestige True Damage Senna",
    "Empyrean Zed",
    "PROJECT: Vi",
  ];
  ("Hecarim");

  //-17%
  const smallLeft = ["Moo Cow Alistar", "Dragonslayer Twitch"];

  if (verySmallRight.includes(name)) position += 7;
  else if (smallRight.includes(name)) position += 15;
  else if (midRight.includes(name)) position += 22;
  else if (midlargeRight.includes(name)) position += 30;
  else if (largeRight.includes(name)) position += 35;
  else if (veryLargeRight.includes(name)) position += 42;
  else if (superRight.includes(name)) position += 50;
  else if (verySmallLeft.includes(name)) position -= 7;
  else if (smallLeft.includes(name)) position -= 17;

  return `${position}% center`;
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
    const displayCat = (formatTitle ? formatTitle(cat) : String(cat)).replace(
      /´/g,
      "'"
    );
    title.innerHTML = `<strong>${displayCat.toUpperCase()}</strong>`;
    title.classList.add("mt-3");
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
      title.classList.add("mt-3");
      collectionsContainer.appendChild(title);

      appendSkinRows(collectionsContainer, emptyGroup);
    }
  }
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
  renderSkinsByCategory({
    attribute: "rpCost",
    categories: [520, 750, 975, 1350, 1820, 3250],
    formatTitle: (rp) => {
      if (rp <= 520) return `BUDGET - RP ${rp}`;
      if (rp <= 750) return `STANDARD - RP ${rp}`;
      if (rp <= 975) return `DELUXE - RP ${rp}`;
      if (rp <= 1350) return `EPIC - RP ${rp}`;
      if (rp <= 1820) return `LEGENDARY - RP ${rp}`;
      return `MYTHIC - RP ${rp}`;
    },
    includeEmptyGroup: false,
    ignoreSearch: false, // 🔹 importante
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
    title.classList.add("mt-3");
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

async function handleUnlockSkin(skin) {
  // Guardamos la posición actual
  const prevScroll = window.scrollY;
  try {
    const res = await fetch(
      `http://localhost:8080/UserXSkin/unlockSkin?idUser=${userId}&idSkin=${skin.id}`,
      { method: "POST" }
    );

    if (res.ok) {
      await res.json();
      alert(`✅ ${skin.name} desbloqueada con éxito!`);
      await loadUserProfile(); // 👈 primero actualizamos el RP
      await loadSkins(document.getElementById("filterSelect").value); // 👈 luego recargamos las skins
      // asi se actualiza la categoria de skins obtenibles para la compra
      hideModal();

      // Volvemos a la posición anterior
      window.scrollTo({ top: prevScroll, behavior: "auto" });
    } else {
      const errText = await res.text();
      alert(`❌ Error al desbloquear ${skin.name}: ${errText}`);
    }
  } catch (err) {
    alert(`⚠️ Error de red: ${err.message}`);
  }
}

function updateUnlockButtonSkin(skin, championName) {
  const userRP = parseInt(document.getElementById("userRP").textContent, 10);

  // Verificar si el usuario tiene el campeón
  const hasChampion = ownedChampions.some((c) => c.name === championName);

  if (skin.owned) {
    unlockButton.textContent = "DESBLOQUEADO";
    unlockButton.style.backgroundColor = "#999";
    unlockButton.style.cursor = "not-allowed";
    unlockButton.onclick = null;
  } else if (!hasChampion) {
    unlockButton.textContent = "NECESITA EL CAMPEÓN";
    unlockButton.style.backgroundColor = "#999";
    unlockButton.style.cursor = "not-allowed";
    unlockButton.onclick = null;
  } else if (userRP >= skin.rpCost) {
    unlockButton.textContent = `DESBLOQUEAR: RP ${skin.rpCost}`;
    unlockButton.style.backgroundColor = "#bf6c00ff";
    unlockButton.style.cursor = "pointer";
    unlockButton.onclick = () => handleUnlockSkin(skin);
  } else {
    unlockButton.textContent = `NECESITA RP ${skin.rpCost}`;
    unlockButton.style.backgroundColor = "#999";
    unlockButton.style.cursor = "not-allowed";
    unlockButton.onclick = null;
  }
}

function openModal(skin) {
  modalImg.src = skin.image;
  updateUnlockButtonSkin(skin, skin.championName); // 👈 le pasamos también el campeón

  showModal();
}

function showModal() {
  modal.style.display = "flex"; // o "block", según tu CSS
}

function hideModal() {
  modal.style.display = "none";
}

async function loadUserProfile() {
  const userId = sessionStorage.getItem("userId");
  if (!userId) return;

  try {
    const res = await fetch(
      `http://localhost:8080/users/getProfileById/${userId}`
    );
    if (!res.ok) throw new Error("Error cargando perfil");

    const data = await res.json();

    const nicknameEl = document.getElementById("userNickname");
    let serverShort = "";
    if (data.server) {
      const match = data.server.match(/\(([^)]+)\)/);
      if (match) serverShort = match[1];
    }

    nicknameEl.innerHTML = `${
      data.nickname || "Sin nick"
    }<span style="font-weight: normal; font-size: 1.3rem">#${serverShort}</span>`;

    document.getElementById("userBE").textContent = data.blueEssence ?? 0;
    document.getElementById("userRP").textContent = data.riotPoints ?? 0;

    const userIcon = document.getElementById("userIcon");
    userIcon.src = data.iconImage || "/assets/default-icon.png";
    userIcon.style.width = "auto";
    userIcon.style.height = "100%";
    userIcon.style.objectFit = "cover";
  } catch (err) {
    console.error(err);
  }
}

function applyFilter(filter) {
  // Scroll arriba al aplicar filtro
  window.scrollTo({ top: 0, behavior: "smooth" });

  switch (filter) {
    case "ownership":
      renderSkinsByOwnership(); // Ya filtra por posesión en getFilteredSkins
      break;
    case "tier":
      renderSkinsByRPCost(); // Falta implementar
      break;
    case "champion":
      renderSkinsByChampion(); // Falta implementar
      break;
    case "availableness":
      renderSkinsByAvailableness(); // ← nuevo filtro
      break;
    default:
      renderSkins();
  }
}

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
  await loadUserChampions(); // 👈 primero traemos campeones
  await loadSkins(); // 👈 después las skins
});

// Checkbox “No obtenidas”
document.getElementById("showNotOwned").addEventListener("change", () => {
  applyFilter(document.getElementById("filterSelect").value);
});

// Dropdown filtros
document.getElementById("filterSelect").addEventListener("change", (e) => {
  applyFilter(e.target.value);
});

// Input de búsqueda
document.getElementById("searchSkin").addEventListener("input", () => {
  applyFilter(document.getElementById("filterSelect").value);
});

document.getElementById("searchChampion").addEventListener("input", () => {
  applyFilter(document.getElementById("filterSelect").value);
});

// Cerrar modal con la "X"
closeModal.addEventListener("click", hideModal);

// Cerrar modal al hacer click afuera del contenido
modal.addEventListener("click", (e) => {
  if (e.target === modal) hideModal();
});

// Click en el nav → recarga de skins si se hace click en “Skins”
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (e.target.innerText === "Skins") {
      e.preventDefault();

      // Limpiar filtros
      document.getElementById("filterSelect").value = "all"; // o el valor por defecto si tenés uno
      document.getElementById("showNotOwned").checked = false;
      document.getElementById("searchSkin").value = "";
      document.getElementById("searchChampion").value = "";

      // Cargar skins sin filtros
      loadSkins();
    }
  });
});
