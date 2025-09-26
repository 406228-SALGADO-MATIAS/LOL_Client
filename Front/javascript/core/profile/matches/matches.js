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
  cardsSection.innerHTML = "";

  if (!matches || matches.length === 0) {
    cardsSection.innerHTML = "<p>No hay partidas registradas.</p>";
    return;
  }

  matches.forEach((match) => {
    const card = createMatchCard({
      championName: match.champion,
      squareChampion: match.squareChampion,
      win: match.win,
      matchType: match.matchType,
      items: match.items.map((i) => ({
        image: i.image,
        itemName: i.itemName, // no 'name'
      })),
      kda: `${match.kills}/${match.deaths}/${match.assists}`,
      totalFarm: match.totalFarm,
      totalGold: match.totalGold,
      map: match.map,
      date: new Date(match.date).toLocaleString(),
      duration: match.duration,
    });
    cardsSection.appendChild(card);
  });
}

// ----------------- Listeners -----------------
function getCurrentFilters() {
  const role = selectRole.value || null;
  const style = selectStyle.value || null;
  return { role, style };
}

tabGeneral.addEventListener("click", () => {
  const { role, style } = getCurrentFilters();
  loadMatches(null, role, style);
});

tabRanked.addEventListener("click", () => {
  const { role, style } = getCurrentFilters();
  loadMatches("RANKED", role, style);
});

tabNormal.addEventListener("click", () => {
  const { role, style } = getCurrentFilters();
  loadMatches("NORMAL", role, style);
});

tabAram.addEventListener("click", () => {
  const { role, style } = getCurrentFilters();
  loadMatches("ARAM", role, style);
});

searchChampion.addEventListener("input", (e) => {
  console.log("Buscar campeón:", e.target.value);
  // Filtrar las cards después
});

selectRole.addEventListener("change", () => {
  const { style } = getCurrentFilters();
  loadMatches(null, selectRole.value || null, style);
});

selectStyle.addEventListener("change", () => {
  const { role } = getCurrentFilters();
  loadMatches(null, role, selectStyle.value || null);
});

// ----------------- Init -----------------
document.addEventListener("DOMContentLoaded", () => {
  console.log("matches.js inicializado");
  loadMatches(); // Primera carga sin filtros
});
