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
async function renderSearchedUserPreview(userId, gameType = "default") {
  if (!userId) {
    searchedUserPreview.innerHTML = "";
    searchedUserPreview.style.display = "none";
    return;
  }

  try {
    const { data: user, status } = await apiOut.getProfileDetailed(userId);
    if (status !== 200) throw new Error("Error al traer perfil de usuario");

    const rankImg =
      user.rankImage ||
      "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339061/Unranked_ydrybu.webp";
    const rankName = user.rank || "Unranked";
    const defaultIcon =
      "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761336571/none_ep19ag.jpg";

    // 🔹 Preview con estilos en línea sin fondo hardcodeado
    searchedUserPreview.innerHTML = `
      <div class="searched-user-preview-inner" style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 0px;
        border: 3.5px solid transparent;
        border-image: linear-gradient(180deg, #585858, #e4e4e4a2, #303030);
        border-image-slice: 1;
        padding: 0.2rem 0.6rem;
        max-height: 50px;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        margin-left: 35px;
        margin-top: -5px;
        margin-bottom: -5px;
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

    // 🔹 Aplicar gradiente dinámico
    const innerDiv = searchedUserPreview.querySelector(
      ".searched-user-preview-inner"
    );
    if (innerDiv) {
      innerDiv.style.background =
        gameType === "aram" ? GRADIENTS.aram : GRADIENTS.default;
    }

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
  const currentGameType = document.body.dataset.currentGameType || "all";

  cards.forEach((card) => {
    const name = card.dataset.champion;

    if (name.includes(query)) {
      card.style.display = "";
      card.classList.remove("card-appear");
      void card.offsetWidth;
      card.classList.add("card-appear");

      // 🔹 Reasigna el gradiente correcto a cada card visible
      applyGradientToElement(card, currentGameType);

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

// ===============================
// CAMBIO DE BACKGROUND POR GAME TYPE
// ===============================

const GRADIENTS = {
  aram: "linear-gradient(90deg, rgba(0, 71, 99, 0.55), rgba(0, 23, 43, 0.664))",
  default:
    "linear-gradient(90deg, rgba(56, 90, 0, 0.54), rgba(37, 29, 0, 0.65))",
};

function changeBackgroundByGameType(gameType) {
  document.body.dataset.currentGameType = gameType; // 🔹 para recordar
  const body = document.body;
  const overlay = document.getElementById("bg-overlay");
  if (!overlay) return;

  // URLs de fondo por tipo de juego
  const backgrounds = {
    ranked:
      "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761893023/rift_h6gd6j.webp",
    normal:
      "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761893023/rift_h6gd6j.webp",
    aram: "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761881922/c-o-runeterra-freljord-04_exbcqo.jpg",
    all: "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761893023/rift_h6gd6j.webp",
  };

  const newBg = backgrounds[gameType] || backgrounds.all;

  // Evitar cambio innecesario
  if (body.dataset.currentBg === newBg) return;

  overlay.style.opacity = "0.45";

  setTimeout(() => {
    body.style.backgroundImage = `url("${newBg}")`;
    body.dataset.currentBg = newBg;

    changeSectionGradients(gameType);
    updatePreviewGradient(gameType);

    overlay.style.opacity = "0";
  }, 100);
}

// 🔹 Cambia el fondo de stats y cards según el tipo de juego
function changeSectionGradients(gameType) {
  const newGradient = gameType === "aram" ? GRADIENTS.aram : GRADIENTS.default;

  document
    .querySelectorAll(".stats-container, .stats-pill, .champion-card")
    .forEach((el) => {
      el.style.transition = "background 0.3s ease";
      el.style.background = newGradient;
    });
}

// 🔹 Aplicar gradiente a un solo elemento
function applyGradientToElement(el, gameType) {
  const newGradient = gameType === "aram" ? GRADIENTS.aram : GRADIENTS.default;
  el.style.background = newGradient;
}

// 🔹 Actualiza el fondo del preview según el gameType
function updatePreviewGradient(gameType) {
  const innerDiv = searchedUserPreview.querySelector(
    ".searched-user-preview-inner"
  );
  if (innerDiv) {
    innerDiv.style.transition = "background 0.3s ease";
    innerDiv.style.background =
      gameType === "aram" ? GRADIENTS.aram : GRADIENTS.default;
  }
}
