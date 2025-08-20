const collectionsContainer = document.getElementById("collectionsContainer");
const userId = sessionStorage.getItem("userId");

let ownedData = [];
let notOwnedData = [];

//  Método para ordenar campeones alfabéticamente por nombre
function sortChampionsAlphabetically(champions) {
  return champions.slice().sort((a, b) => {
    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  });
}

// Función que carga desde el backend
async function loadChampions(activeFilter = null) {
  collectionsContainer.innerHTML = "";

  try {
    const [ownedRes, notOwnedRes] = await Promise.all([
      fetch(`http://localhost:8080/champions/userChampions/${userId}`),
      fetch(
        `http://localhost:8080/champions/userChampions/NotPossess/${userId}`
      ),
    ]);

    ownedData = ownedRes.ok ? await ownedRes.json() : [];
    if (!notOwnedRes.ok) {
      collectionsContainer.innerHTML = `<p class="text-center text-danger">Error cargando campeones no adquiridos</p>`;
      return;
    }
    notOwnedData = await notOwnedRes.json();

    updateChampionCounters();

    // Aplicamos filtro si se pasó, sino render normal
    if (activeFilter) {
      applyFilter(activeFilter);
    } else {
      renderChampions();
    }
  } catch (err) {
    collectionsContainer.innerHTML = `<p class="text-center text-danger">${err.message}</p>`;
  }
}

// Función que pisa los valores en el HTML
function updateChampionCounters() {
  const total = ownedData.length + notOwnedData.length;
  const posesion = ownedData.length;

  const totalEl = document.getElementById("counter-total");
  const posesionEl = document.getElementById("counter-posesion");

  if (totalEl) totalEl.textContent = total;
  if (posesionEl) posesionEl.textContent = posesion;
}

function filterByQuery(champions, query) {
  if (!query) return champions;
  return champions.filter((c) => c.name.toLowerCase().includes(query));
}

function filterByOwnership(ownedData, showNotOwned, notOwnedData) {
  return [
    ...ownedData.map((c) => ({ ...c, owned: true })),
    ...(showNotOwned ? notOwnedData.map((c) => ({ ...c, owned: false })) : []),
  ];
}

function getFilteredChampions() {
  const showNotOwned = document.getElementById("showNotOwned").checked;
  const query = document
    .getElementById("searchChampion")
    .value.trim()
    .toLowerCase();

  let champions = filterByOwnership(ownedData, showNotOwned, notOwnedData);
  champions = filterByQuery(champions, query);

  return sortChampionsAlphabetically(champions);
}

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

// Modal
const modal = document.getElementById("championModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.getElementById("modalClose");
const unlockButton = document.getElementById("unlockButton");

function showModal() {
  modal.style.display = "flex";
}

function hideModal() {
  modal.style.display = "none";
}

async function handleUnlock(champ) {
  try {
    const res = await fetch(
      `http://localhost:8080/UserXChampion/unlockChampion?idUser=${userId}&idChampion=${champ.id}`,
      { method: "POST" }
    );

    if (res.ok) {
      await res.json();
      alert(`✅ ${champ.name} desbloqueado con éxito!`);
      await loadChampions(document.getElementById("filterSelect").value);
      await loadUserProfile();
      hideModal();
    } else {
      const errText = await res.text();
      alert(`❌ Error al desbloquear ${champ.name}: ${errText}`);
    }
  } catch (err) {
    alert(`⚠️ Error de red: ${err.message}`);
  }
}

function updateUnlockButton(champ) {
  const userBE = parseInt(document.getElementById("userBE").textContent, 10);

  if (champ.owned) {
    unlockButton.textContent = "DESBLOQUEADO";
    unlockButton.style.backgroundColor = "#999";
    unlockButton.style.cursor = "not-allowed";
    unlockButton.onclick = null;
  } else if (userBE >= champ.blueEssencePrice) {
    unlockButton.textContent = `DESBLOQUEAR: BE ${
      champ.blueEssencePrice || "N/A"
    }`;
    unlockButton.style.backgroundColor = "#bf6c00ff";
    unlockButton.style.cursor = "pointer";
    unlockButton.onclick = () => handleUnlock(champ);
  } else {
    unlockButton.textContent = `NECESITA BE ${champ.blueEssencePrice}`;
    unlockButton.style.backgroundColor = "#999";
    unlockButton.style.cursor = "not-allowed";
    unlockButton.onclick = null;
  }
}

// Función para abrir modal
function openModal(champ) {
  modalImg.src = champ.imageUrl;
  updateUnlockButton(champ);
  applyFilter(); // refresca la lista si hace falta
  showModal();
}

// Cerrar modal
closeModal.addEventListener("click", hideModal);

// Click fuera del contenido cierra modal
modal.addEventListener("click", (e) => {
  if (e.target === modal) hideModal();
});

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

  const img = document.createElement("img");
  img.src = champ.imageUrl;
  img.alt = champ.name;
  img.style.width = "108%";
  img.style.height = "360px";
  img.style.objectFit = "cover";
  img.style.objectPosition = getChampionObjectPosition(champ.name);

  if (!champ.owned) {
    img.style.filter = "grayscale(95%)";
    img.style.opacity = "0.70";
  }

  const name = document.createElement("div");
  name.classList.add("card-body", "p-2");
  name.innerHTML = `<strong>${champ.name.replace(/´/g, "'")}</strong>`;

  card.appendChild(img);
  card.appendChild(name);
  col.appendChild(card);

  // Evento click para expandir
  card.addEventListener("click", () => {
    openModal(champ); // pasamos el objeto completo
  });

  return col;
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

function renderChampionsByCategory({
  attribute,
  categories,
  formatTitle,
  includeEmptyGroup,
  emptyGroupTitle,
}) {
  collectionsContainer.innerHTML = "";
  const champions = getFilteredChampions();

  // Render de cada categoría
  categories.forEach((cat) => {
    let group = champions.filter((c) => c[attribute] === cat);
    if (!group.length) return;

    const title = document.createElement("h3");
    title.innerHTML = `<strong>${(formatTitle
      ? formatTitle(cat)
      : cat
    ).toUpperCase()}</strong>`;
    title.classList.add("mt-3");
    collectionsContainer.appendChild(title);

    appendChampionRows(collectionsContainer, group); // <- función reutilizada
  });

  // Render del grupo vacío si aplica
  if (includeEmptyGroup) {
    let emptyGroup = champions.filter((c) => !c[attribute]);
    if (emptyGroup.length) {
      const title = document.createElement("h3");
      title.innerHTML = `<strong>${emptyGroupTitle.toUpperCase()}</strong>`;
      title.classList.add("mt-3");
      collectionsContainer.appendChild(title);

      appendChampionRows(collectionsContainer, emptyGroup); // <- función reutilizada
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
  renderChampionsByCategory({
    attribute: "blueEssencePrice",
    categories: [450, 1350, 3150, 4800, 6300, 7800],
    formatTitle: (price) => `BE: ${price}`, // le ponemos un prefijo para mostrarlo bonito
    includeEmptyGroup: true,
    emptyGroupTitle: "Sin precio definido",
  });
}

// Función central que decide qué renderizar
// Y modificamos applyFilter para poder pasarle el filtro como parámetro
function applyFilter(filterValue = null) {
  const activeFilter =
    filterValue || document.getElementById("filterSelect").value;

  if (activeFilter === "difficulty") renderChampionsByDifficulty();
  else if (activeFilter === "role") renderChampionsByRole();
  else if (activeFilter === "style") renderChampionsByStyle();
  else if (activeFilter === "style2") renderChampionsByStyle2();
  else if (activeFilter === "role2") renderChampionsByRole2();
  else if (activeFilter === "price") renderChampionsByBlueEssence();
  else if (activeFilter === "ownership") renderChampionsByOwnership();
  else renderChampions();
  // Mover scroll al top después de renderizar
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getChampionObjectPosition(name) {
  // Normalizamos las comillas
  name = name.replace(/´/g, "'");

  // Default
  let position = 50;

  const verySmallRight = [
    "Dr. Mundo",
    "Rek'Sai",
    "Zilean",
    "Skarner",
    "Ornn",
    "Zeri",
  ];
  const smallRight = [
    "Aatrox",
    "Aurelion Sol",
    "Renekton",
    "Senna",
    "Twitch",
    "Milio",
  ];
  const midRight = [
    "Cho'Gath",
    "Alistar",
    "Rengar",
    "Gragas",
    "Xerath",
    "Warwick",
    "Zac",
    "Bardo",
    "Katarina",
    "Renata",
    "Urgot",
    "Hecarim",
  ];
  const largeRight = [
    "Graves",
    "Fizz",
    "Fiora",
    "Kha'Zix",
    "Malphite",
    "Vladimir",
    "Trundle",
    "Singed",
  ];
  const veryLargeRight = [
    "Jinx",
    "Karma",
    "Shen",
    "Zed",
    "Lucian",
    "Twisted Fate",
    "Vi",
    "Jarvan IV",
    "Tryndamere",
  ];
  const superRight = ["Fizz", "Braum", "Draven", "Caitlyn"];
  const verySmallLeft = ["Kai'Sa", "Mordekaiser", "Ivern"];

  if (verySmallRight.includes(name)) position += 7;
  else if (smallRight.includes(name)) position += 15;
  else if (midRight.includes(name)) position += 22;
  else if (largeRight.includes(name)) position += 35;
  else if (veryLargeRight.includes(name)) position += 42;
  else if (superRight.includes(name)) position += 50;
  else if (verySmallLeft.includes(name)) position -= 7;

  return `${position}% center`;
}

// Inicialización
document.addEventListener("DOMContentLoaded", loadChampions);

// Checkbox para mostrar campeones no obtenidos
document.getElementById("showNotOwned").addEventListener("change", () => {
  applyFilter(document.getElementById("filterSelect").value);
});

// Dropdown filtros
document.getElementById("filterSelect").addEventListener("change", (e) => {
  applyFilter(e.target.value);
});

// Listener en tiempo real de la busqueda
document.getElementById("searchChampion").addEventListener("input", () => {
  applyFilter(document.getElementById("filterSelect").value);
});

// Si hacés click en el nav Champions → recarga
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (e.target.innerText === "Champions") {
      e.preventDefault();
      loadChampions();
    }
  });
});
