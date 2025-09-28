// matches.js

// IDs de sesión → globales
window.originalUserId = sessionStorage.getItem("userId") || null;
window.searchedUserId = sessionStorage.getItem("tempUserId") || null;

// --- DOM Elements ---
// Tabs
const tabGeneral = document.querySelector('[data-tab="general"]');
const tabRanked = document.querySelector('[data-tab="ranked"]');
const tabNormal = document.querySelector('[data-tab="normal"]');
const tabAram = document.querySelector('[data-tab="aram"]');

// Filtros
const searchChampion = document.getElementById("searchChampion");
const selectRole = document.getElementById("selectRole");
const selectStyle = document.getElementById("selectStyle");
let currentGameType = null; // null = general

// Containers
const cardsSection = document.querySelector(".cards-section");
const sidebar = document.querySelector(".sidebar");

// --- Obtener el userId activo (searched > original) ---
function getActiveUserId() {
  return window.searchedUserId || window.originalUserId;
}

// ----------------- Fetch principal -----------------
async function fetchUserMatchesHistory(userId, gameType, role, style) {
  let url = `http://localhost:8080/matches/getUserHistory/${userId}`;

  const params = new URLSearchParams();
  if (gameType) params.append("gameType", gameType);
  if (role) params.append("optionalRole", role);
  if (style) params.append("optionalStyle", style);

  if (params.toString()) url += "?" + params.toString();

  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al traer historial de partidas");
  return await res.json();
}

// ----------------- Carga de datos -----------------
async function loadMatches(gameType = null, role = null, style = null) {
  const userId = getActiveUserId();
  if (!userId) {
    console.warn("No hay userId activo");
    return;
  }

  try {
    const data = await fetchUserMatchesHistory(userId, gameType, role, style);

    // Sidebar
    renderSidebar(data);

    // Cards
    renderMatchCards(data.matches);

    // Aplicar filtro de campeón si hay texto en el input
    const query = searchChampion.value.trim();
    if (query) {
      filterCardsByChampion(query); // aquí ocurre la animación solo de los filtrados
    }
  } catch (err) {
    console.error("Error cargando matches:", err);
  }
}

// ----------------- Render Sidebar -----------------
function renderSidebar(data) {
  // Top 3 champions
  const topChampsContainer = sidebar.querySelector(
    ".top-champions .champions-row"
  );
  topChampsContainer.innerHTML = "";
  (data.top3Champions || []).forEach((champ) => {
    const div = document.createElement("div");
    div.classList.add("champion");
    div.innerHTML = `
      <img src="${champ.imageSquare}" alt="${champ.name}" />
      <p>${champ.name}</p>
      <span>Use ratio: ${champ.useRatio}%</span>
    `;
    topChampsContainer.appendChild(div);
  });

  // Roles
  const roles = data.rolesPlayed;
  const rolesItems = sidebar.querySelectorAll(
    ".recent-activity .ratios-group:nth-of-type(1) .ratio-item span"
  );
  if (roles) {
    rolesItems[0].textContent = `Top (${roles.topRatio}%)`;
    rolesItems[1].textContent = `Jg (${roles.jgRatio}%)`;
    rolesItems[2].textContent = `Mid (${roles.midRatio}%)`;
    rolesItems[3].textContent = `Adc (${roles.adcRatio}%)`;
    rolesItems[4].textContent = `Support (${roles.supportRatio}%)`;
  }

  // Styles
  const styles = data.stylesPlayed;
  const stylesItems = sidebar.querySelectorAll(
    ".recent-activity .ratios-group:nth-of-type(2) .ratio-item span"
  );
  if (styles) {
    stylesItems[0].textContent = `Fighter (${styles.fighterRatio}%)`;
    stylesItems[1].textContent = `Marksman (${styles.marksmanRatio}%)`;
    stylesItems[2].textContent = `Mage (${styles.mageRatio}%)`;
    stylesItems[3].textContent = `Assassin (${styles.assassinRatio}%)`;
    stylesItems[4].textContent = `Tank (${styles.tankRatio}%)`;
    stylesItems[5].textContent = `Support (${styles.supportRatio}%)`;
  }
}

// ----------------- Render Cards -----------------
function renderMatchCards(matches) {
  const existingCards = Array.from(cardsSection.querySelectorAll(".match-card"));

  // Si no hay matches → desaparecer las cards actuales
  if (!matches || matches.length === 0) {
    if (existingCards.length === 0) {
      cardsSection.innerHTML = "<p>No hay partidas registradas.</p>";
      return;
    }
    animateCards(existingCards, "disappear");
    return;
  }

  // Hay matches → limpiar antes de renderizar nuevas
  cardsSection.innerHTML = "";

  const newCards = matches.map((match) => {
    const card = createMatchCard(match);
    card.classList.add("match-card");
    cardsSection.appendChild(card);
    return card;
  });

  // Solo animar appear si el input está vacío
  if (!searchChampion.value.trim()) {
    animateCards(newCards, "appear", existingCards, matches);
  }
}

// ----------------- Listeners -----------------
function getCurrentFilters() {
  const role = selectRole.value || null;
  const style = selectStyle.value || null;
  return { role, style };
}

tabGeneral.addEventListener("click", () => {
  const { role, style } = getCurrentFilters();
  currentGameType = null; // General
  toggleRoleSelectByGameType(currentGameType);
  loadMatches(currentGameType, role, style);
});

tabRanked.addEventListener("click", () => {
  const { role, style } = getCurrentFilters();
  currentGameType = "RANKED";
  toggleRoleSelectByGameType(currentGameType);
  loadMatches(currentGameType, role, style);
});

tabNormal.addEventListener("click", () => {
  const { role, style } = getCurrentFilters();
  currentGameType = "NORMAL";
  toggleRoleSelectByGameType(currentGameType);
  loadMatches(currentGameType, role, style);
});

tabAram.addEventListener("click", () => {
  const { role, style } = getCurrentFilters();
  currentGameType = "ARAM";
  toggleRoleSelectByGameType(currentGameType);
  loadMatches(currentGameType, role, style);
});

searchChampion.addEventListener("input", (e) => {
  filterCardsByChampion(e.target.value);
});

selectRole.addEventListener("change", () => {
  const { style } = getCurrentFilters();
  loadMatches(currentGameType, selectRole.value || null, style);
});

selectStyle.addEventListener("change", () => {
  const { role } = getCurrentFilters();
  loadMatches(currentGameType, role, selectStyle.value || null);
});

// ----------------- Init -----------------
document.addEventListener("DOMContentLoaded", () => {
  console.log("matches.js inicializado");
  currentGameType = null; // default: general
  toggleRoleSelectByGameType(currentGameType);
  loadMatches();
});
