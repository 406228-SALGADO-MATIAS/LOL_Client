async function loadTopProfile() {
  const userId = sessionStorage.getItem("userId");
  if (!userId) {
    console.warn("No se encontró userId en sessionStorage");
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:8080/users/getProfileById/${userId}`
    );
    if (!res.ok) throw new Error("Error al traer perfil de usuario");

    const profile = await res.json();

    // User Icon
    const userIcon = document.getElementById("userIcon");
    if (profile.iconImage && profile.iconImage !== "") {
      userIcon.src = profile.iconImage;
    }

    // Nickname
    const userNickname = document.getElementById("userNickname");
    if (profile.nickname) userNickname.textContent = profile.nickname;

    // Server
    const userServer = document.getElementById("userServer");
    if (profile.server) userServer.textContent = `#${profile.server}`;

    // Background Image
    const imageContainer = document.querySelector(".image-container");
    if (profile.userBackground && profile.userBackground !== "") {
      imageContainer.style.backgroundImage = `url(${profile.userBackground})`;
      imageContainer.style.backgroundSize = "cover";
      imageContainer.style.backgroundPosition = "center";
    }
  } catch (err) {
    console.error("Error cargando perfil:", err);
  }
}

async function loadTopChampions() {
  const userId = sessionStorage.getItem("userId");
  if (!userId) {
    console.warn("No se encontró userId en sessionStorage");
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:8080/usersMatches/${userId}/stats`
    );
    if (!res.ok) throw new Error("Error al traer stats de usuario");

    const data = await res.json();
    const champions = data.championsUsed || [];

    // Calcular total de partidas y ordenar
    champions.forEach((champ) => {
      champ.totalGames =
        (champ.normalGames || 0) +
        (champ.aramGames || 0) +
        (champ.rankedGames || 0);
    });

    champions.sort((a, b) => {
      if (b.totalGames !== a.totalGames) return b.totalGames - a.totalGames; // mayor primero
      return a.champion.localeCompare(b.champion); // desempate por nombre
    });

    // --- TOP 3 ---
    const top3 = champions.slice(0, 3);
    const topContainer = document.querySelector(
      "#championsCarousel .carousel-item.active"
    );
    topContainer.innerHTML = ""; // limpiar antes de rellenar

    // Orden top: 2do más alto → 1er más alto → 3er más alto
    const topOrder = [1, 0, 2];
    topOrder.forEach((index) => {
      if (!top3[index]) return;
      const champ = top3[index];
      const div = document.createElement("div");
      div.className = "d-inline-block mx-3";
      div.innerHTML = `
        <img src="${champ.image}" class="mx-2" width="100" />
        <div class="champion-name">${champ.champion}</div>
      `;
      topContainer.appendChild(div);
    });

    // --- OTHERS ---
    const others = champions.slice(3); // los que quedaron
    const othersContainer = document.querySelector(
      "#championsCarousel .carousel-item:not(.active)"
    );
    othersContainer.innerHTML = ""; // limpiar antes de rellenar

    if (others.length > 0) {
      // Crear filas de hasta 4 campeones
      let rowDiv = null;
      others.forEach((champ, idx) => {
        if (idx % 4 === 0) {
          // nueva fila
          rowDiv = document.createElement("div");
          rowDiv.className = "row text-center mb-2";
          othersContainer.appendChild(rowDiv);
        }

        const colDiv = document.createElement("div");
        colDiv.className = "col-3";
        colDiv.innerHTML = `
          <img src="${champ.image}" class="img-fluid" />
          <div class="champion-name-small">${champ.champion}</div>
        `;
        rowDiv.appendChild(colDiv);
      });
    }
  } catch (err) {
    console.error("Error cargando Top Champions:", err);
  }
}

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

// Obtener rango según stats
function getRankByStats(wins, takedowns, farm, gameType) {
  const rankTable = gameType === "ARAM" ? RANKS_ARAM : RANKS_NORMAL;

  console.log(
    `[DEBUG] Calculando rank para ${gameType} → Wins: ${wins}, Takedowns: ${takedowns}, Farm: ${farm}`
  );

  for (const r of rankTable) {
    const inWins = wins >= r.wins[0] && wins <= r.wins[1];
    const inTakedowns =
      takedowns >= r.takedowns[0] && takedowns <= r.takedowns[1];
    const inFarm = farm >= r.farm[0] && farm <= r.farm[1];

    console.log(
      ` → Rank ${r.name} | Wins(${r.wins})=${inWins}, Tak(${r.takedowns})=${inTakedowns}, Farm(${r.farm})=${inFarm}`
    );

    if (inWins || inTakedowns || inFarm) {
      console.log(`[DEBUG] → Match con rank: ${r.name}`);
      return r;
    }
  }

  console.log("[DEBUG] Ningún match → devolviendo Unranked");
  return rankTable[0];
}

// Setear métricas y asignar imágenes correctas
function setSlideMetrics(slideEl, stats, gameType, ranksJson) {
  let takedowns = 0,
    wins = 0,
    farm = 0;

  if (stats && stats.totalStats) {
    const [k = 0, , a = 0] = stats.totalStats.kdaSum || [0, 0, 0];
    takedowns = k + a;
    wins = gameType === "NORMAL" ? stats.normalWins || 0 : stats.aramWins || 0;
    farm = stats.totalStats.totalFarm || 0;
  }

  const rankObj = getRankByStats(wins, takedowns, farm, gameType);
  const rankData = ranksJson.find(
    (r) => r.rank.toLowerCase() === rankObj.name.toLowerCase()
  ) || {
    image:
      "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/ranks/Unranked.png?raw=true",
    rank: "Unranked",
  };

  // stats
  const smallTextEls = slideEl.querySelectorAll(".small-text-number");
  if (smallTextEls.length >= 3) {
    smallTextEls[0].textContent = takedowns;
    smallTextEls[1].textContent = wins;
    smallTextEls[2].textContent = farm;
  }

  // texto grande
  const largeTextEl = slideEl.querySelector(".large-text");
  if (largeTextEl) {
    if (slideEl.classList.contains("rank-slide-single")) {
      // Solo en el primer slide se muestra el nombre del rango
      largeTextEl.textContent = rankObj.name;
    } else {
      // En los demás slides (NORMAL, ARAM) mantenemos el texto fijo (ej: "WINS")
      // no tocamos el contenido del HTML
    }
  }

  // imagen principal
  const rankImgEl = slideEl.querySelector(".rank-img");
  if (rankImgEl) rankImgEl.src = rankData.image;

  // imágenes pequeñas
  const smallImgs = slideEl.querySelectorAll(".rank-img-small");
  smallImgs.forEach((img) => (img.src = rankData.image));
}

async function loadRanks() {
  const userId = sessionStorage.getItem("userId");
  if (!userId) return console.warn("No se encontró userId en sessionStorage");

  try {
    const [profileRes, ranksRes, normalStatsRes, aramStatsRes] =
      await Promise.all([
        fetch(`http://localhost:8080/users/getProfileById/${userId}`),
        fetch("http://localhost:8080/ranks/all"),
        fetch(
          `http://localhost:8080/usersMatches/${userId}/stats?gameType=NORMAL`
        ),
        fetch(
          `http://localhost:8080/usersMatches/${userId}/stats?gameType=ARAM`
        ),
      ]);

    const profile = await profileRes.json();
    const ranksJson = await ranksRes.json();
    const normalStats = await normalStatsRes.json();
    const aramStats = await aramStatsRes.json();

    // Slide 1 → Rank actual (perfil)
    const rankSlideSingle = document.querySelector(
      "#ranksCarousel .rank-slide-single"
    );
    if (rankSlideSingle) {
      const userRank = ranksJson.find(
        (r) => r.rank.toLowerCase() === profile.rank.toLowerCase()
      ) || {
        image:
          "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/ranks/Unranked.png?raw=true",
        rank: "Unranked",
      };

      const rankImg = rankSlideSingle.querySelector(".rank-img");
      if (rankImg) rankImg.src = userRank.image;

      const smallImgs = rankSlideSingle.querySelectorAll(".rank-img-small");
      smallImgs.forEach((img) => (img.src = userRank.image));

      const rankText = rankSlideSingle.querySelector(".large-text");
      if (rankText) rankText.textContent = userRank.rank;
    }

    // Slides 2 y 3 → NORMAL y ARAM
    const slides = document.querySelectorAll(
      "#ranksCarousel .carousel-item.rank-slide-three"
    );
    const normalSlide = slides[0];
    const aramSlide = slides[1];

    if (normalSlide) {
      setSlideMetrics(normalSlide, normalStats, "NORMAL", ranksJson);
    }
    if (aramSlide) {
      setSlideMetrics(aramSlide, aramStats, "ARAM", ranksJson);
    }
  } catch (err) {
    console.error("Error cargando ranks:", err);
  }
}

function setupChampionCarouselTitle() {
  const carousel = document.getElementById("championsCarousel");
  const title = document.getElementById("championsTitle");

  if (!carousel || !title) return;

  // Al cambiar de slide
  $(carousel).on("slid.bs.carousel", function () {
    const activeIndex = $(carousel).find(".carousel-item.active").index();
    if (activeIndex === 0) {
      title.textContent = "Top Champions";
    } else {
      title.textContent = "Others";
    }
  });

  // Inicialmente fijamos el título según el slide activo
  const initialIndex = $(carousel).find(".carousel-item.active").index();
  title.textContent = initialIndex === 0 ? "Top Champions" : "Others";
}

function setupRanksCarouselTitle() {
  const carousel = document.getElementById("ranksCarousel");
  const title = document.getElementById("ranksTitle");

  if (!carousel || !title) return;

  // Diccionario de títulos según índice
  const titlesByIndex = {
    0: "Ranked",
    1: "Normal",
    2: "Aram",
  };

  // Al cambiar de slide
  $(carousel).on("slid.bs.carousel", function () {
    const activeIndex = $(carousel).find(".carousel-item.active").index();
    title.textContent = titlesByIndex[activeIndex] || "Ranked";
  });

  // Inicialmente fijamos el título según el slide activo
  const initialIndex = $(carousel).find(".carousel-item.active").index();
  title.textContent = titlesByIndex[initialIndex] || "Ranked";
}

// Función principal de carga de la página
async function loadResume() {
  await loadTopProfile();
  await loadTopChampions();
  await loadRanks();
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  loadResume();
  setupChampionCarouselTitle();
  setupRanksCarouselTitle();
});
