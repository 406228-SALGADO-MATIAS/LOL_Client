async function loadTopProfile(
  userId,
  options = { resume: true, topSection: true }
) {
  if (!userId) return;

  try {
    const res = await fetch(
      `http://localhost:8080/users/getProfileById/${userId}`
    );
    if (!res.ok) throw new Error("Error al traer perfil");

    const profile = await res.json();

    // === Resume ===
    if (options.resume) {
      const profileName = document.getElementById("resumeUserNickname");
      const profileIcon = document.getElementById("resumeUserIcon");
      const profileBE = document.getElementById("resumeUserBE");
      const profileRP = document.getElementById("resumeUserRP");

      if (profileName) profileName.textContent = profile.nickname || "Sin nick";
      if (profileBE) profileBE.textContent = profile.blueEssence ?? 0;
      if (profileRP) profileRP.textContent = profile.riotPoints ?? 0;

      if (profileIcon) {
        profileIcon.src =
          profile.iconImage && profile.iconImage.trim() !== ""
            ? profile.iconImage
            : "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/profileIcons/none.jpg?raw=true";
        profileIcon.style.width = "auto";
        profileIcon.style.height = "100%";
        profileIcon.style.objectFit = "cover";
      }
    }

    // === Top Section ===
    if (options.topSection) {
      const userIcon = document.getElementById("topUserIcon");
      const userNickname = document.getElementById("topUserNickname");
      const userServer = document.getElementById("topUserServer");
      const imageContainer = document.querySelector(".image-container");

      if (userIcon) {
        userIcon.src =
          profile.iconImage && profile.iconImage.trim() !== ""
            ? profile.iconImage
            : "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/profileIcons/none.jpg?raw=true";
      }

      if (userNickname) userNickname.textContent = profile.nickname || "";

      if (userServer) {
        if (profile.server) {
          const match = profile.server.match(/\(([^)]+)\)/);
          userServer.textContent = match
            ? profile.server.replace(/\(([^)]+)\)/, `(#${match[1]})`)
            : profile.server;
        }
      }

      if (imageContainer && profile.userBackground) {
        imageContainer.style.backgroundImage = `url(${profile.userBackground})`;
        imageContainer.style.backgroundSize = "cover";
      }
    }
  } catch (err) {
    console.error("Error cargando perfil:", err);
  }
}

async function loadTopChampions(userId) {
  if (!userId) {
    console.warn("No se encontró userId");
    return;
  }

  const placeholderImage =
    "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/profileIcons/none.jpg?raw=true";
  const placeholderText = "-";

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
      if (b.totalGames !== a.totalGames) return b.totalGames - a.totalGames;
      return a.champion.localeCompare(b.champion);
    });

    // --- TOP 3 ---
    let top3 = champions.slice(0, 3);

    // Ordenar por totalGames descendente
    top3.sort((a, b) => b.totalGames - a.totalGames);

    // Reordenar para la visual: [2do, 1ero, 3ero] -> índice 1 es big
    const displayOrder = [1, 0, 2]; // medio = más jugado
    const arrangedTop3 = displayOrder.map((i) => top3[i] || {}).filter(Boolean);

    const topContainer = document.querySelector(
      "#championsCarousel .carousel-item.active"
    );
    topContainer.innerHTML = ""; // limpiar antes de rellenar

    const placeholderImage =
      "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/profileIcons/none.jpg?raw=true";
    const placeholderText = "-";

    arrangedTop3.forEach((champ, idx) => {
      const div = document.createElement("div");
      div.className = "d-inline-block mx-3";

      // Asignamos clase según la posición en la visual: medio = big
      let imgClass = idx === 1 ? "champion-big" : "champion-medium";

      div.innerHTML = `
    <img src="${champ.image || placeholderImage}" class="${imgClass}" />
    <div class="champion-name">${champ.champion || placeholderText}</div>
  `;
      topContainer.appendChild(div);
    });

    // --- OTHERS ---
    const others = champions.slice(3);
    const othersContainer = document.querySelector(
      "#championsCarousel .carousel-item:not(.active)"
    );
    othersContainer.innerHTML = ""; // limpiar

    const totalOthers = 8; // siempre 8 elementos visibles
    const championsPerRow = 4;

    // Contenedor central para todas las filas
    const wrapperDiv = document.createElement("div");
    wrapperDiv.style.display = "inline-block"; // ancho según contenido
    wrapperDiv.style.textAlign = "center"; // centrado general
    othersContainer.appendChild(wrapperDiv);

    for (let row = 0; row < 2; row++) {
      const rowDiv = document.createElement("div");
      rowDiv.className = "row justify-content-center text-center mb-2"; // centramos columnas
      wrapperDiv.appendChild(rowDiv);

      for (let col = 0; col < championsPerRow; col++) {
        const idx = row * championsPerRow + col;
        const champ = others[idx] || {
          image: placeholderImage,
          champion: placeholderText,
        };

        const colDiv = document.createElement("div");
        colDiv.className = "col-2 text-center"; // ancho fijo, centrado interno
        colDiv.innerHTML = `
      <img src="${champ.image}" class="champion-small img-fluid" />
      <div class="champion-name-small">${champ.champion}</div>`;
        rowDiv.appendChild(colDiv);
      }
    }
  } catch (err) {
    console.error("Error cargando Top Champions:", err);
  }
}

async function loadRanks(userId) {
  if (!userId) {
    console.warn("No se encontró userId");
    return;
  }

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

      // Texto chico → LP
      const lpText = rankSlideSingle.querySelector(".small-text-number");
      if (lpText) lpText.textContent = `LP: ${profile.lp ?? 0}`;
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
async function loadResume(userId, isTempUser = false) {
  if (!userId) return;

  // Si es usuario temporal, actualizamos solo Resume
  if (isTempUser) {
    await loadTopProfile(userId, { resume: true, topSection: true });
  } else {
    // Usuario de sesión → actualizamos todo
    await loadTopProfile(userId, { resume: true, topSection: true });
  }

  await loadTopChampions(userId);
  await loadRanks(userId);
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const userId = sessionStorage.getItem("userId");
  loadResume(userId, false); // no es temp
  setupChampionCarouselTitle();
  setupRanksCarouselTitle();
});
