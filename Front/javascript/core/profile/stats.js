// searchStats.js

// IDs de sesión
const originalUserId = sessionStorage.getItem("userId") || null;
let searchedUserId = sessionStorage.getItem("tempUserId") || null;

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

// Actualiza botón "Regresar" si es usuario temporal
function updateReturnButton() {
  const btnReturnProfile = document.getElementById("btnReturnProfile");
  if (searchedUserId && searchedUserId !== originalUserId) {
    btnReturnProfile.style.display = "inline-block";
  } else {
    btnReturnProfile.style.display = "none";
  }
}

// Carga stats por userId y filtros
async function loadStats(userId, gameType = "all", role = "all") {
  if (!userId) return;

  try {
    let url = `http://localhost:8080/usersMatches/${userId}/stats`;
    if (role !== "all") url += `/role/${role}`;
    if (gameType !== "all") url += `?gameType=${gameType.toUpperCase()}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al traer stats del usuario");

    const data = await res.json();

    // === Win Stats ===
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
        // Sumatoria general
        games = data.rankedGames + data.normalGames + data.aramGames;
        wins = data.rankedWins + data.normalWins + data.aramWins;
        winrate = games > 0 ? Math.round((wins / games) * 100) : 0;
    }

    wonCount.textContent = wins;
    lostCount.textContent = games - wins;
    winRatio.textContent = winrate + "%";

    // === Totals ===
    const totals = data.totalStats;
    totalKills.textContent = formatNumber(totals.kdaSum[0] || 0);
    totalDeaths.textContent = formatNumber(totals.kdaSum[1] || 0);
    totalAssists.textContent = formatNumber(totals.kdaSum[2] || 0);
    totalFarm.textContent = formatNumber(totals.totalFarm ?? 0);
    totalGold.textContent = formatNumber(totals.totalGoldEarned ?? 0);
    totalDamage.textContent = formatNumber(totals.totalDamageDealt ?? 0);
    totalTime.textContent = totals.totalTimePlayed ?? "0";

    // === Max ===
    const maxs = data.maxStats;
    maxKills.textContent = formatNumber(maxs.kdaMax[0] || 0);
    maxDeaths.textContent = formatNumber(maxs.kdaMax[1] || 0);
    maxAssists.textContent = formatNumber(maxs.kdaMax[2] || 0);
    maxFarm.textContent = formatNumber(maxs.maxFarm ?? 0);
    maxGold.textContent = formatNumber(maxs.maxGoldEarned ?? 0);
    maxDamage.textContent = formatNumber(maxs.maxDamageDealt ?? 0);
    maxTime.textContent = maxs.longestGame ?? "0";

    // === Averages ===
    const avgs = data.averageStats;
    avgKills.textContent = formatNumber(avgs.avgKda[0] || 0);
    avgDeaths.textContent = formatNumber(avgs.avgKda[1] || 0);
    avgAssists.textContent = formatNumber(avgs.avgKda[2] || 0);
    avgFarm.textContent = formatNumber(avgs.avgFarm ?? 0);
    avgGold.textContent = formatNumber(avgs.avgGoldEarned ?? 0);
    avgDamage.textContent = formatNumber(avgs.avgDamageDealt ?? 0);
    avgTime.textContent = avgs.avgDurationGame ?? "0";

    // === Champions usados ===
    championList.innerHTML = "";
    (data.championsUsed || []).forEach((c) => {
      const img = document.createElement("img");
      img.src = c.image;
      img.title = c.champion;
      img.className = "champion-thumb mx-1";
      championList.appendChild(img);
    });
  } catch (err) {
    console.error("Error cargando stats:", err);
  }
}

// Función para ajustar selects según reglas
function adjustFilters() {
  const selectedGame = gameFilter.value;
  const selectedRole = roleFilter.value;

  // Si el juego es ARAM, forzamos el rol a "all" y lo desactivamos
  if (selectedGame === "aram") {
    roleFilter.value = "all";
    roleFilter.disabled = true;
  } else {
    roleFilter.disabled = false;
  }
}

// Función para formatear números con separador de miles y hasta 2 decimales
function formatNumber(value) {
  if (value == null) return "0";
  if (typeof value === "number") {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
  // Si viene como string, intentamos parsear
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

// Cambios de filtro
gameFilter.addEventListener("change", () => {
  adjustFilters();
  const uid = searchedUserId || originalUserId;
  loadStats(uid, gameFilter.value, roleFilter.value);
});

roleFilter.addEventListener("change", () => {
  adjustFilters();
  const uid = searchedUserId || originalUserId;
  loadStats(uid, gameFilter.value, roleFilter.value);
});

// Cargar stats inicial
document.addEventListener("DOMContentLoaded", () => {
  adjustFilters(); // <--- Ajusta los selects según estado inicial
  const uid = searchedUserId || originalUserId;
  loadStats(uid, gameFilter.value, roleFilter.value);

  updateReturnButton();
});

// Manejo botón regresar perfil temporal
const btnReturnProfile = document.getElementById("btnReturnProfile");
if (btnReturnProfile) {
  btnReturnProfile.addEventListener("click", () => {
    searchedUserId = null;
    updateReturnButton();
    const uid = originalUserId;
    loadStats(uid, gameFilter.value, roleFilter.value);
  });
}

// Función auxiliar para setear un usuario temporal desde searchUser.js
function selectSearchedUser(user) {
  searchedUserId = user.id;
  updateReturnButton();
  loadStats(searchedUserId, gameFilter.value, roleFilter.value);
}
