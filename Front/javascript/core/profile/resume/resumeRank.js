// Tabla ORIGINAL → para NORMAL
const RANKS_NORMAL = [
  { name: "Unranked", wins: [0, 4], takedowns: [0, 79], farm: [0, 599] },
  { name: "Bronze", wins: [5, 9], takedowns: [80, 100], farm: [600, 900] },
  { name: "Silver", wins: [10, 14], takedowns: [101, 140], farm: [901, 1350] },
  { name: "Gold", wins: [15, 19], takedowns: [141, 200], farm: [1351, 1800] },
  {
    name: "Platinum",
    wins: [20, 24],
    takedowns: [201, 260],
    farm: [1801, 2250],
  },
  {
    name: "Emerald",
    wins: [25, 29],
    takedowns: [261, 320],
    farm: [2251, 2700],
  },
  {
    name: "Diamond",
    wins: [30, 34],
    takedowns: [321, 380],
    farm: [2701, 3150],
  },
  { name: "Master", wins: [35, 39], takedowns: [381, 420], farm: [3151, 3600] },
  {
    name: "Grandmaster",
    wins: [40, 44],
    takedowns: [421, 460],
    farm: [3601, 4050],
  },
  {
    name: "Challenger",
    wins: [45, 50],
    takedowns: [461, Infinity],
    farm: [4051, Infinity],
  },
];

// Tabla AJUSTADA → para ARAM
const RANKS_ARAM = [
  { name: "Unranked", wins: [0, 4], takedowns: [0, 100], farm: [0, 120] },
  { name: "Bronze", wins: [5, 9], takedowns: [101, 125], farm: [120, 180] },
  { name: "Silver", wins: [10, 14], takedowns: [126, 175], farm: [180, 270] },
  { name: "Gold", wins: [15, 19], takedowns: [176, 250], farm: [270, 360] },
  { name: "Platinum", wins: [20, 24], takedowns: [251, 325], farm: [360, 450] },
  { name: "Emerald", wins: [25, 29], takedowns: [326, 400], farm: [450, 540] },
  { name: "Diamond", wins: [30, 34], takedowns: [401, 475], farm: [540, 630] },
  { name: "Master", wins: [35, 39], takedowns: [476, 525], farm: [630, 720] },
  {
    name: "Grandmaster",
    wins: [40, 44],
    takedowns: [526, 575],
    farm: [720, 810],
  },
  {
    name: "Challenger",
    wins: [45, 50],
    takedowns: [576, Infinity],
    farm: [810, Infinity],
  },
];

let RANKS_TIER = [];

async function fetchRankTiers() {
  try {
    const res = await fetch("http://localhost:8080/ranks/all");
    if (!res.ok) throw new Error("Error al traer ranks");
    const data = await res.json();

    // Añadimos Unranked manualmente
    RANKS_TIER = [
      {
        id: 0,
        rank: "Unranked",
        image:
          "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/ranks/Unranked.png?raw=true",
        lp: 0,
      },
      ...data,
    ];
  } catch (err) {
    console.error("Error fetching ranks:", err);
    // fallback minimal
    RANKS_TIER = [
      {
        id: 0,
        rank: "Unranked",
        image:
          "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/ranks/Unranked.png?raw=true",
        lp: 0,
      },
    ];
  }
}

function getRankEntityByName(rankName) {
  return RANKS_TIER.find((r) => r.rank === rankName) || RANKS_TIER[0];
}

// Obtener rango según stats
function getRankByStats(wins, takedowns, farm, gameType) {
  const rankTable = gameType === "ARAM" ? RANKS_ARAM : RANKS_NORMAL;

  for (const r of rankTable) {
    const inWins = wins >= r.wins[0] && wins <= r.wins[1];
    const inTakedowns =
      takedowns >= r.takedowns[0] && takedowns <= r.takedowns[1];
    const inFarm = farm >= r.farm[0] && farm <= r.farm[1];

    if (inWins || inTakedowns || inFarm) {
      return r;
    }
  }

  return rankTable[0];
}

// Setear métricas y asignar imágenes correctas
function setSlideMetrics(slideEl, stats, userData, gameType) {
  let takedowns = 0,
    wins = 0,
    farm = 0;

  if (stats && stats.totalStats) {
    const [k = 0, , a = 0] = stats.totalStats.kdaSum || [0, 0, 0];
    takedowns = k + a;
    wins =
      gameType.toUpperCase() === "ARAM"
        ? stats.aramWins || 0
        : stats.normalWins || 0;
    farm = stats.totalStats.totalFarm || 0;
  }

  // Determinar rango dinámicamente usando getRankByStats
  const rankCalc = getRankByStats(wins, takedowns, farm, gameType);
  const rankEntity = getRankEntityByName(rankCalc.name);

  const rankName = rankEntity.rank;
  const rankImg = rankEntity.image;

  // --- Actualizamos métricas numéricas ---
  const smallTextEls = slideEl.querySelectorAll(".small-text-number");
  if (smallTextEls.length >= 3) {
    smallTextEls[0].textContent = takedowns;
    smallTextEls[1].textContent = wins;
    smallTextEls[2].textContent = farm;
  }

  // --- Large text (para slide Ranked) ---
  const largeTextEl = slideEl.querySelector(".large-text");
  if (largeTextEl && slideEl.classList.contains("rank-slide-single")) {
    largeTextEl.textContent = rankName;
    largeTextEl.title = rankName; // <-- agregado
  }

  // --- Imagen principal ---
  const rankImgEl = slideEl.querySelector(".rank-img");
  if (rankImgEl) rankImgEl.title = rankName; // <-- agregado
  if (rankImgEl) rankImgEl.src = rankImg;

  // --- Imágenes pequeñas ---
  const smallImgs = slideEl.querySelectorAll(".rank-img-small");
  smallImgs.forEach((img) => {
    img.src = rankImg;
    img.title = rankName; // <-- agregado
  });
}
