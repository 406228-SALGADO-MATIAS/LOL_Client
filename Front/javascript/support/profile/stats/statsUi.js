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
    searchedUserPreview.innerHTML =
      searchedUserPreview.innerHTML =
      searchedUserPreview.innerHTML =
        `
  <div style="
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(108,117,125,0.5);
    border-radius: 50px;
    padding: 0.2rem 0.6rem;  /* menos padding vertical y horizontal */
    max-height: 50px;        
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    margin-left: 35px;       /* mantenemos como estaba */
    margin-top: -5px;        /* elevamos un poco */
    margin-bottom: -5px;     /* tiramos hacia arriba el contenido siguiente */
  ">
    <div style="display: flex; align-items: center; gap: 8px;">
      <img 
        src="${user.iconImage || defaultIcon}" 
        width="36" height="36"
        alt="icon"
        style="border-radius: 50%;"
      />
      <div style="display: flex; flex-direction: column; line-height: 1;">
        <span style="font-weight: bold; font-size: 1rem; color: #fff;">
          ${user.nickname}
        </span>
        <span style="font-weight: bold; font-size: 0.85rem; color: #ccc;">
          ${formatServer(user.server)}
        </span>
      </div>
    </div>

    <img 
      src="${rankImg}" 
      width="40" height="40"
      alt="${rankName}" 
      title="${rankName}"
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

function formatServer(server) {
  const match = server?.match(/\(([^)]+)\)/);
  return match ? `#${match[1]}` : "";
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
