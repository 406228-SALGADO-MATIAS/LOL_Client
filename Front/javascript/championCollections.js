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
async function loadChampions() {
  collectionsContainer.innerHTML = "";

  try {
    const [ownedRes, notOwnedRes] = await Promise.all([
      fetch(`http://localhost:8080/champions/userChampions/${userId}`),
      fetch(
        `http://localhost:8080/champions/userChampions/NotPossess/${userId}`
      ),
    ]);

    // si ownedRes falla, lo dejamos como array vacío
    ownedData = ownedRes.ok ? await ownedRes.json() : [];

    // si notOwnedRes falla, sí mostramos error porque siempre debería haber
    if (!notOwnedRes.ok) {
      collectionsContainer.innerHTML = `<p class="text-center text-danger">Error cargando campeones no poseídos</p>`;
      return;
    }

    notOwnedData = await notOwnedRes.json();

    // 👉 actualizar los contadores
    updateChampionCounters();

    renderChampions(); // primera vez
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

// Función que decide qué mostrar
function renderChampions() {
  collectionsContainer.innerHTML = "";
  const showNotOwned = document.getElementById("showNotOwned").checked;

  //fijarse si tiene algo escrito el filtro por nombre
  const query = document
    .getElementById("searchChampion")
    .value.trim()
    .toLowerCase();

  // Combinamos campeones propios y, si está activo, los no obtenidos
  let champions = [
    ...ownedData.map((c) => ({ ...c, owned: true })),
    ...(showNotOwned ? notOwnedData.map((c) => ({ ...c, owned: false })) : []),
  ];

  //filtrar por busqueda de nombre
  if (query) {
    champions = champions.filter((c) => c.name.toLowerCase().includes(query));
  }
  // Orden alfabético
  champions = sortChampionsAlphabetically(champions);

  let row;
  champions.forEach((champ, index) => {
    if (index % 5 === 0) {
      row = document.createElement("div");
      row.classList.add("row", "mb-2"); // menos espacio entre filas
      collectionsContainer.appendChild(row);
    }

    // Reutilizamos la función que crea la tarjeta
    row.appendChild(createChampionCard(champ));
  });
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

  return col;
}

function renderChampionsByCategory({
  attribute,
  categories,
  formatTitle,
  includeEmptyGroup,
  emptyGroupTitle,
}) {
  collectionsContainer.innerHTML = "";
  const showNotOwned = document.getElementById("showNotOwned").checked;

  //fijarse si tiene algo escrito el filtro por nombre
  const query = document
    .getElementById("searchChampion")
    .value.trim()
    .toLowerCase();

  let champions = [
    ...ownedData.map((c) => ({ ...c, owned: true })),
    ...(showNotOwned ? notOwnedData.map((c) => ({ ...c, owned: false })) : []),
  ];

  //filtrar por busqueda de nombre
  if (query) {
    champions = champions.filter((c) => c.name.toLowerCase().includes(query));
  }

  categories.forEach((cat) => {
    let group = champions.filter((c) => c[attribute] === cat);
    group = sortChampionsAlphabetically(group);
    if (!group.length) return;

    const title = document.createElement("h3");
    title.textContent = formatTitle ? formatTitle(cat) : cat;
    title.innerHTML = `<strong>${(formatTitle
      ? formatTitle(cat)
      : cat
    ).toUpperCase()}</strong>`;
    title.classList.add("mt-3");
    collectionsContainer.appendChild(title);

    let row;
    group.forEach((champ, index) => {
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("row", "mb-2"); // menos espacio entre filas
        collectionsContainer.appendChild(row);
      }
      row.appendChild(createChampionCard(champ));
    });
  });

  // Campeones que no tienen ese atributo
  if (includeEmptyGroup) {
    let emptyGroup = champions.filter((c) => !c[attribute]);
    if (emptyGroup.length) {
      emptyGroup = sortChampionsAlphabetically(emptyGroup);

      const title = document.createElement("h3");
      title.innerHTML = `<strong>${emptyGroupTitle.toUpperCase()}</strong>`;
      title.classList.add("mt-3");
      collectionsContainer.appendChild(title);

      let row;
      emptyGroup.forEach((champ, index) => {
        if (index % 5 === 0) {
          row = document.createElement("div");
          row.classList.add("row", "mb-2"); // menos espacio entre filas
          collectionsContainer.appendChild(row);
        }
        row.appendChild(createChampionCard(champ));
      });
    }
  }
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
function applyFilter() {
  const activeFilter = document.getElementById("filterSelect").value;

  if (activeFilter === "difficulty") renderChampionsByDifficulty();
  else if (activeFilter === "role") renderChampionsByRole();
  else if (activeFilter === "style") renderChampionsByStyle();
  else if (activeFilter === "style2") renderChampionsByStyle2();
  else if (activeFilter === "role2") renderChampionsByRole2();
  else if (activeFilter === "price") renderChampionsByBlueEssence();
  else renderChampions();
}

function getChampionObjectPosition(name) {
  // Normalizamos las comillas raras
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
    "Caitlyn",
    "Karma",
    "Shen",
    "Zed",
    "Lucian",
    "Twisted Fate",
    "Vi",
    "Jarvan IV",
    "Tryndamere",
  ];
  const superRight = ["Fizz", "Braum", "Draven"];
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
document.getElementById("showNotOwned").addEventListener("change", applyFilter);

// Dropdown filtros
document.getElementById("filterSelect").addEventListener("change", applyFilter);

// Listener en tiempo real de la busqueda
document
  .getElementById("searchChampion")
  .addEventListener("input", applyFilter);

// Si hacés click en el nav Champions → recarga
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (e.target.innerText === "Champions") {
      e.preventDefault();
      loadChampions();
    }
  });
});
