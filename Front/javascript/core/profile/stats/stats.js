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
async function loadStats(userId, gameType = "all", role = "all", triggeredByFilter = false) {
  if (!userId) return;

  try {
    // Si hay campeón seleccionado, cargamos solo ese
    if (window.selectedChampion) {
      await loadSelectedChampionStats(userId, window.selectedChampion, gameType, role);
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
  const championsTitle = document.querySelector(".champions-title-center h5.stats-title");

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

function animateRemoveAllCards(triggeredByFilter) {
  if (!triggeredByFilter) return;
  const existingCards = Array.from(championList.children);
  if (existingCards.length === 0) return;

  existingCards.forEach((card) => {
    card.classList.remove("card-appear");
    card.classList.add("card-disappear");
  });

  return Promise.all(
    existingCards.map(
      (card) =>
        new Promise((resolve) =>
          card.addEventListener("animationend", resolve, { once: true })
        )
    )
  );
}

function animateCardAppear(card) {
  card.classList.remove("card-appear");
  void card.offsetWidth; // fuerza reflow
  card.classList.add("card-appear");
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

// --- Win Stats ---
function getWinStats(data, gameType) {
  let games = 0,
    wins = 0,
    winrate = 0;

  switch (gameType) {
    case "ranked":
      games = data.rankedGames;
      wins = data.rankedWins;
      winrate = data.rankedWinRate;
      break;
    case "normal":
      games = data.normalGames;
      wins = data.normalWins;
      winrate = data.normalWinRate;
      break;
    case "aram":
      games = data.aramGames;
      wins = data.aramWins;
      winrate = data.aramWinRate;
      break;
    default:
      games = data.rankedGames + data.normalGames + data.aramGames;
      wins = data.rankedWins + data.normalWins + data.aramWins;
      winrate = games > 0 ? Math.round((wins / games) * 100) : 0;
  }

  return { games, wins, winrate };
}

// Función para animar números
function animateValue(element, endValue, duration = 600) {
  const startValue = parseFloat(element.dataset.current || 0);
  const diff = endValue - startValue;
  if (diff === 0) return; // no animar si no cambia

  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.round(startValue + diff * progress);
    element.textContent = formatNumber(value);
    element.dataset.current = value;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      // opcional: añadir efecto de pulso final
      element.classList.add("animated-number");
      setTimeout(() => element.classList.remove("animated-number"), 300);
    }
  }

  requestAnimationFrame(step);
}

// --- Render de stats ---
function renderStats(data) {
  const totals = data.totalStats ?? {};
  animateValue(totalKills, totals.kdaSum?.[0] || 0);
  animateValue(totalDeaths, totals.kdaSum?.[1] || 0);
  animateValue(totalAssists, totals.kdaSum?.[2] || 0);
  animateValue(totalFarm, totals.totalFarm ?? 0);
  animateValue(totalGold, totals.totalGoldEarned ?? 0);
  animateValue(totalDamage, totals.totalDamageDealt ?? 0);
  totalTime.textContent = totals.totalTimePlayed ?? "0"; // strings no animados

  const maxs = data.maxStats ?? {};
  animateValue(maxKills, maxs.kdaMax?.[0] || 0);
  animateValue(maxDeaths, maxs.kdaMax?.[1] || 0);
  animateValue(maxAssists, maxs.kdaMax?.[2] || 0);
  animateValue(maxFarm, maxs.maxFarm ?? 0);
  animateValue(maxGold, maxs.maxGoldEarned ?? 0);
  animateValue(maxDamage, maxs.maxDamageDealt ?? 0);
  maxTime.textContent = maxs.longestGame ?? "0";

  const avgs = data.averageStats ?? {};
  animateValue(avgKills, avgs.avgKda?.[0] || 0);
  animateValue(avgDeaths, avgs.avgKda?.[1] || 0);
  animateValue(avgAssists, avgs.avgKda?.[2] || 0);
  animateValue(avgFarm, avgs.avgFarm ?? 0);
  animateValue(avgGold, avgs.avgGoldEarned ?? 0);
  animateValue(avgDamage, avgs.avgDamageDealt ?? 0);
  avgTime.textContent = avgs.avgDurationGame ?? "0";
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

function formatNumber(value) {
  if (value == null) return "0";
  const num = typeof value === "number" ? value : parseFloat(value);
  if (isNaN(num)) return "0";
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

// Contenedor de preview
const searchedUserPreview = document.getElementById("searched-user-preview");

// Llenar preview del usuario buscado
async function renderSearchedUserPreview(userId) {
  if (!userId) {
    searchedUserPreview.innerHTML = "";
    searchedUserPreview.style.display = "none";
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:8080/users/getProfileById/${userId}`
    );
    if (!res.ok) throw new Error("Error al traer perfil de usuario");

    const user = await res.json();

    const rankImg =
      user.rankImage ||
      "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/ranks/Unranked.png?raw=true";
    const rankName = user.rank || "Unranked";
    const defaultIcon =
      "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/profileIcons/none.jpg?raw=true";

    // 🔹 Preview con estilos forzados en línea
    searchedUserPreview.innerHTML = `
  <div style="
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(108,117,125,0.5);
    border-radius: 50px;
    padding: 0.3rem 0.8rem;
    max-height: 60px;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    margin-left: 35px;   /* 👈 agregado */
  ">
    <div style="display: flex; align-items: center;">
      <img 
        src="${user.iconImage || defaultIcon}" 
        width="42" height="42"
        alt="icon"
        style="border-radius: 50%; margin-right: 12px;"
      />
      <div style="display: flex; flex-direction: column; line-height: 1.2;">
        <span style="font-weight: bold; font-size: 1.1rem; color: #fff;">${
          user.nickname
        }</span>
        <span style="font-weight: bold; font-size: 0.95rem; color: #ccc;">${formatServer(
          user.server
        )}</span>
      </div>
    </div>

    <img 
      src="${rankImg}" 
      width="48" height="48"
      alt="${rankName}" 
      title="${rankName}"
      style="margin-left: 10px;"
    />
  </div>
`;

    searchedUserPreview.style.display = "block";
  } catch (err) {
    console.error("Error cargando preview del usuario:", err);
    searchedUserPreview.innerHTML = "";
    searchedUserPreview.style.display = "none";
  }
}

//Listeners

const championSearchInput = document.getElementById("championSearch");

// Input listener
championSearchInput.addEventListener("input", () => {
  const query = championSearchInput.value.replace(/[´']/g, "'").toLowerCase();
  filterChampionCards(query);
});

function filterChampionCards(query) {
  const cards = document.querySelectorAll(".champion-card");

  cards.forEach((card) => {
    const name = card.dataset.champion;

    if (name.includes(query)) {
      // mostrar siempre con animación
      card.style.display = "";
      card.classList.remove("card-appear"); // reiniciamos animación
      void card.offsetWidth; // fuerza reflow
      card.classList.add("card-appear");

      card.addEventListener(
        "animationend",
        () => card.classList.remove("card-appear"),
        { once: true }
      );
    } else {
      card.style.display = "none";
    }
  });
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

function formatServer(server) {
  const match = server?.match(/\(([^)]+)\)/);
  return match ? `#${match[1]}` : "";
}

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
