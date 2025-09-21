// stats.js

// IDs de sesión → pasamos a global
window.originalUserId = sessionStorage.getItem("userId") || null;
window.searchedUserId = sessionStorage.getItem("tempUserId") || null; // persiste si existe

window.onUserSelected = async function (userId) {
  // Actualizamos el snapshot del usuario activo
  const uid = userId;
  const data = await fetchStats(uid, gameFilter.value, roleFilter.value);
  window.defaultChampionsData = data; // snapshot actualizado
  window.searchedUserId = uid; // aseguramos que sea el user activo
  await loadStats(uid, gameFilter.value, roleFilter.value);
};

// IDs de sesión → pasamos a global para que searchUser.js pueda acceder
window.originalUserId = sessionStorage.getItem("userId") || null;
window.searchedUserId = sessionStorage.getItem("tempUserId") || null;

const championsTitle = document.querySelector(
  ".champions-title-center h5.stats-title"
);

// Selects
const gameFilter = document.getElementById("game-filter");
const roleFilter = document.getElementById("role-filter");

// Win stats DOM
const wonCount = document.getElementById("won-count");
const lostCount = document.getElementById("lost-count");
const winRatio = document.getElementById("win-ratio");

// Totals, Max, Avg DOM
const totalKills = document.getElementById("total-kills");
const totalDeaths = document.getElementById("total-deaths");
const totalAssists = document.getElementById("total-assists");
const totalFarm = document.getElementById("total-farm");
const totalGold = document.getElementById("total-gold");
const totalDamage = document.getElementById("total-damage");
const totalTime = document.getElementById("total-time");

const maxKills = document.getElementById("max-kills");
const maxDeaths = document.getElementById("max-deaths");
const maxAssists = document.getElementById("max-assists");
const maxFarm = document.getElementById("max-farm");
const maxGold = document.getElementById("max-gold");
const maxDamage = document.getElementById("max-damage");
const maxTime = document.getElementById("max-time");

const avgKills = document.getElementById("avg-kills");
const avgDeaths = document.getElementById("avg-deaths");
const avgAssists = document.getElementById("avg-assists");
const avgFarm = document.getElementById("avg-farm");
const avgGold = document.getElementById("avg-gold");
const avgDamage = document.getElementById("avg-damage");
const avgTime = document.getElementById("avg-time");

// Champions container
const championList = document.getElementById("champion-list");

// Principal
async function loadStats(
  userId,
  gameType = "all",
  role = "all",
  triggeredByFilter = false
) {
  if (!userId) return;

  try {
    // Si hay campeón seleccionado, cargamos solo ese
    if (window.selectedChampion) {
      await loadSelectedChampionStats(
        userId,
        window.selectedChampion,
        gameType,
        role
      );
      return;
    }

    // Fetch de stats
    const data = await fetchStats(userId, gameType, role);
    window.defaultChampionsData = data; // snapshot

    updateChampionCards(data.championsUsed, triggeredByFilter);
    updateWinStats(data, gameType);
    renderStats(data);

    persistSelectedChampion();
    applySelectionStyles();
    filterChampionCards(championSearchInput.value.toLowerCase());
  } catch (err) {
    console.error("Error cargando stats:", err);
  }
}

// ----------------- Funciones auxiliares -----------------

function updateChampionCards(championsUsed, triggeredByFilter) {
  const championsTitle = document.querySelector(
    ".champions-title-center h5.stats-title"
  );

  if (!championsUsed || championsUsed.length === 0) {
    animateRemoveAllCards(triggeredByFilter);
    championList.innerHTML = "";
    championsTitle.textContent = "Champions Used (0)";
    return;
  }

  // Render normal
  championList.innerHTML = "";
  championsUsed.forEach((c) => {
    const card = createChampionCard(c);
    if (triggeredByFilter) animateCardAppear(card);
    championList.appendChild(card);
  });

  championsTitle.textContent = `Champions Used (${championsUsed.length})`;
}

function updateWinStats(data, gameType) {
  const { games, wins, winrate } = getWinStats(data, gameType);
  wonCount.textContent = wins;
  lostCount.textContent = games - wins;
  winRatio.textContent = winrate + "%";
}

function persistSelectedChampion() {
  window.selectedChampion = null;
  if (window.lastSelectedChampion) {
    const found = Array.from(document.querySelectorAll(".champion-card")).find(
      (c) => c.dataset.champion === window.lastSelectedChampion
    );
    if (found) window.selectedChampion = window.lastSelectedChampion;
  }
}

// --- Load específico para un campeón seleccionado ---
async function loadSelectedChampionStats(
  userId,
  champion,
  gameType = "all",
  role = "all"
) {
  try {
    const champCard = Array.from(
      document.querySelectorAll(".champion-card")
    ).find((c) => c.dataset.champion === champion);
    if (!champCard) return;

    const championId = champCard.dataset.championId;
    let url;
    if (role !== "all") {
      url = `http://localhost:8080/usersMatches/${userId}/stats/champion/${championId}/role/${role}`;
      if (gameType !== "all") url += `?gameType=${gameType.toUpperCase()}`;
    } else {
      url = `http://localhost:8080/usersMatches/${userId}/stats/champion/${championId}`;
      if (gameType !== "all") url += `?gameType=${gameType.toUpperCase()}`;
    }

    const res = await fetch(url);
    if (!res.ok)
      throw new Error("Error cargando stats del campeón seleccionado");
    const data = await res.json();

    const { games, wins, winrate } = getWinStats(data, gameType);
    wonCount.textContent = wins;
    lostCount.textContent = games - wins;
    winRatio.textContent = winrate + "%";

    renderStats(data);
    applySelectionStyles();
  } catch (err) {
    console.error("Error cargando stats del campeón seleccionado:", err);
  }
}

// --- Fetch general ---
async function fetchStats(userId, gameType, role) {
  let url = `http://localhost:8080/usersMatches/${userId}/stats`;
  if (role !== "all") url += `/role/${role}`;
  if (gameType !== "all") url += `?gameType=${gameType.toUpperCase()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al traer stats del usuario");
  return await res.json();
}

// --- Funciones auxiliares ---
function adjustFilters() {
  if (gameFilter.value === "aram") {
    roleFilter.value = "all";
    roleFilter.disabled = true;
  } else {
    roleFilter.disabled = false;
  }
}

// Cambios de filtro

gameFilter.addEventListener("change", () => {
  adjustFilters();
  const uid = window.searchedUserId || window.originalUserId;
  selectedChampion = null;
  lastSelectedChampion = null;
  applySelectionStyles();

  loadStats(uid, gameFilter.value, roleFilter.value, true);
});

roleFilter.addEventListener("change", () => {
  adjustFilters();
  const uid = window.searchedUserId || window.originalUserId;
  selectedChampion = null;
  lastSelectedChampion = null;
  applySelectionStyles();

  loadStats(uid, gameFilter.value, roleFilter.value, true);
});

async function initStatsPage() {
  adjustFilters();
  const uid = window.searchedUserId || window.originalUserId;

  // limpiamos el preview al inicio
  searchedUserPreview.innerHTML = "";
  searchedUserPreview.style.display = "none";

  if (!uid) return;

  if (window.searchedUserId) {
    await renderSearchedUserPreview(window.searchedUserId);
  }

  const initialData = await fetchStats(uid, "all", "all");
  window.defaultChampionsData = initialData;
  await loadStats(uid, "all", "all");
}

// Inicio
document.addEventListener("DOMContentLoaded", () => {
  initStatsPage();

  // listener champions card click
  championList.addEventListener("click", async (e) => {
    const card = e.target.closest(".champion-card");
    if (!card) return;

    const champion = card.dataset.champion;
    const uid = window.searchedUserId || window.originalUserId; // actualizar UID activo
    const currentData = window.defaultChampionsData; // snapshot del usuario activo

    if (selectedChampion === champion) {
      selectedChampion = null;
      lastSelectedChampion = null;

      // Render con snapshot correcto
      championList.innerHTML = "";
      (currentData.championsUsed || []).forEach((c) => {
        const cardElem = createChampionCard(c);
        championList.appendChild(cardElem);
      });

      await loadStats(uid, gameFilter.value, roleFilter.value);
    } else {
      selectedChampion = champion;
      lastSelectedChampion = champion;

      // Render snapshot del usuario activo antes de fetch del champion
      championList.innerHTML = "";
      (currentData.championsUsed || []).forEach((c) => {
        const cardElem = createChampionCard(c);
        championList.appendChild(cardElem);
      });

      await loadSelectedChampionStats(
        uid,
        selectedChampion,
        gameFilter.value,
        roleFilter.value
      );
    }

    applySelectionStyles();
    // Reaplicar filtro
    const currentQuery = championSearchInput.value.toLowerCase();
    filterChampionCards(currentQuery);
  });
});
