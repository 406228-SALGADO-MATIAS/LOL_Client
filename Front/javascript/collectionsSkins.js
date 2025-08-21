const collectionsContainer = document.getElementById("collectionsContainer");
const userId = sessionStorage.getItem("userId");

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

  // Imagen más protagonista
  const img = document.createElement("img");
  img.src = skin.image;
  img.alt = `${skin.name} - ${skin.championName}`;
  img.style.width = "108%";
  img.style.height = "90%"; // antes 360px, ahora ocupa más espacio
  img.style.objectFit = "cover";

  if (!skin.owned) {
    img.style.filter = "grayscale(95%)";
    img.style.opacity = "0.7";
  }

  // Contenedor de nombres
  const name = document.createElement("div");
  name.classList.add("card-body", "p-0"); // menos padding para que ocupe menos
  name.style.lineHeight = "0.9"; // reduce separación vertical
  name.innerHTML = `
    <strong style="font-size: 1rem;">${skin.championName.replace(
      /´/g,
      "'"
    )}</strong><br>
    <strong style="font-size: 0.7rem;">${skin.name.replace(/´/g, "'")}</strong>
  `;

  card.appendChild(img);
  card.appendChild(name);
  col.appendChild(card);

  // Click para abrir modal
  card.addEventListener("click", () => openModal(skin));

  return col;
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
    ignoreSearch: true, // 🔹 importante
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
    ignoreSearch: true, // 🔹 importante
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
    default:
      renderSkins();
  }
}

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => loadSkins());

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

// Click en el nav → recarga de skins si se hace click en “Skins”
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (e.target.innerText === "Skins") {
      e.preventDefault();
      loadSkins();
    }
  });
});
