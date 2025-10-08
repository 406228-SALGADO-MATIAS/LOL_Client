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
let lastGameType = null; // fuera de funciones, global

async function loadMatches(gameType = null, role = null, style = null) {
  const userId = getActiveUserId();
  if (!userId) {
    console.warn("No hay userId activo");
    return;
  }

  const animate = gameType !== lastGameType; // solo animar si cambió de tab
  lastGameType = gameType;

  try {
    const data = await fetchUserMatchesHistory(userId, gameType, role, style);
    renderSidebar(data, animate); // <--- pasamos animate
    renderMatchCards(data.matches);

    const query = searchChampion.value.trim();
    if (query) {
      filterCardsByChampion(query);
    }
  } catch (err) {
    console.error("Error cargando matches:", err);
  }
}

// ----------------- Render Sidebar -----------------
function renderSidebar(data, animate = true) {
  // Top 3 champions
  const topChampsContainer = sidebar.querySelector(
    ".top-champions .champions-row"
  );
  topChampsContainer.innerHTML = "";

  let topChamps = data.top3Champions || [];
  topChamps.sort((a, b) => (b.useRatio || 0) - (a.useRatio || 0));
  while (topChamps.length < 3) {
    topChamps.push({
      name: "-",
      imageSquare:
        "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/refs/heads/main/Front/images/profileIcons/none.jpg",
      useRatio: 0,
    });
  }

  topChamps.forEach((champ, index) => {
    const div = document.createElement("div");
    div.classList.add("champion");
    div.innerHTML = `
      <img src="${champ.imageSquare}" alt="${champ.name}" />
      <p>${champ.name}</p>
      <span>${champ.useRatio}%</span>
    `;
    topChampsContainer.appendChild(div);

    // Animación solo si corresponde
    const img = div.querySelector("img");
    if (animate) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          img.classList.add("show");
        }, index * 150);
      });
    } else {
      // Si no animamos, aseguramos que aparezca
      img.classList.add("show");
    }
  });

  // -------------------------------
  // Roles
  // -------------------------------
  const roles = data.rolesPlayed;
  const roleKeys = [
    "topRatio",
    "jgRatio",
    "midRatio",
    "adcRatio",
    "supportRatio",
  ];
  const roleBars = sidebar.querySelectorAll(".roles-bars .bar");

  if (roles) {
    roleKeys.forEach((key, i) => {
      const value = roles[key] || 0;
      const fill = roleBars[i].querySelector(".fill");
      fill.style.height = `${value}%`;
      roleBars[i].title = `${value}%`;
    });
  }

  // -------------------------------
  // Styles
  // -------------------------------
  const styles = data.stylesPlayed;
  const styleKeys = [
    "fighterRatio",
    "marksmanRatio",
    "mageRatio",
    "assassinRatio",
    "tankRatio",
    "supportRatio",
  ];
  const styleBars = sidebar.querySelectorAll(".styles-bars .bar");

  if (styles) {
    styleKeys.forEach((key, i) => {
      const value = styles[key] || 0;
      const fill = styleBars[i].querySelector(".fill");
      fill.style.height = `${value}%`;
      styleBars[i].title = `${value}%`;
    });
  }
}

// ----------------- Render Cards -----------------
function renderMatchCards(matches) {
  const existingCards = Array.from(
    cardsSection.querySelectorAll(".match-card")
  );

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

  attachCardEvents();

  // Solo animar appear si el input está vacío
  if (!searchChampion.value.trim()) {
    animateCards(newCards, "appear", existingCards, matches);
  }
}

// ----------------- Vincular eventos de las cards -----------------
function attachCardEvents() {
  const userId = getActiveUserId();
  if (!userId) {
    console.warn("No hay userId activo para abrir modales");
    return;
  }

  // Esperar a que el script de modal esté cargado (por si se carga después)
  if (typeof openMatchModal !== "function") {
    console.error("openMatchModal no está disponible");
    return;
  }

  document.querySelectorAll(".match-card").forEach((card) => {
    card.addEventListener("click", () => {
      const matchId = card.dataset.matchId;
      openMatchModal(matchId, userId);
    });
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

// Integración con searchUser.js
window.onUserSelected = async function (userId) {
  window.searchedUserId = userId; // persistencia
  const { role, style } = getCurrentFilters();
  await loadMatches(currentGameType, role, style);
};
