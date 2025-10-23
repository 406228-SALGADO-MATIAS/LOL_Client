// ----------------- Filtrar cards por campeón -----------------

window.originalUserMatches = []; // almacenará los IDs de partidas del usuario original

async function preloadOriginalUserMatches() {
  const userId = window.originalUserId;
  if (!userId) return;

  try {
    const res = await fetch(
      `http://localhost:8080/matches/getUserHistory/${userId}`
    );
    if (!res.ok)
      throw new Error("Error al cargar partidas del usuario original");
    const data = await res.json();
    window.originalUserMatches = (data.matches || []).map((m) => m.idMatch);
    console.log("Partidas originales cargadas:", window.originalUserMatches);
  } catch (err) {
    console.error("No se pudieron cargar las partidas originales:", err);
    window.originalUserMatches = [];
  }
}

function highlightSharedMatches() {
  const searchedId = window.searchedUserId;
  const originalMatches = window.originalUserMatches || [];
  if (!searchedId || originalMatches.length === 0) return; // si no hay usuario buscado o no hay partidas originales → nada

  const cards = document.querySelectorAll(".match-card");
  cards.forEach((card) => {
    const matchId = parseInt(card.dataset.matchId, 10);
    if (originalMatches.includes(matchId)) {
      card.classList.add("shared-match");
    } else {
      card.classList.remove("shared-match");
    }
  });
}

function filterCardsByChampion(query) {
  query = query.toLowerCase().replace(/['´]/g, ""); // normalizar acentos y comillas
  const cards = document.querySelectorAll(".match-card");

  cards.forEach((card) => {
    const champEl = card.querySelector(".champ-name");
    if (!champEl) return;

    let champName = champEl.textContent.toLowerCase().replace(/['´]/g, "");

    if (!query || champName.includes(query)) {
      // mostrar
      card.style.display = "flex";
      card.classList.remove("disappear");
      card.classList.add("appear");
    } else {
      // ocultar
      card.style.display = "none";
      card.classList.remove("appear");
      card.classList.add("disappear");
    }
  });
}

// ----------------- Navbar values -----------------
function toggleRoleSelectByGameType(gameType) {
  if (gameType === "ARAM") {
    selectRole.value = ""; // reset a Any Role
    selectRole.disabled = true; // lo apaga
  } else {
    selectRole.disabled = false; // lo habilita de nuevo
  }
}

// ----------------- Animación de cards -----------------
function animateCards(cards, type = "appear", oldCards = [], newMatches = []) {
  if (!cards || cards.length === 0) return;

  if (type === "appear") {
    const oldIds = oldCards.map((c) => Number(c.dataset.matchId));
    const newIds = newMatches.map((m) => m.idMatch);

    const isSame =
      oldIds.length === newIds.length &&
      oldIds.every((id, i) => id === newIds[i]);

    if (isSame) {
      cards.forEach((card) => (card.style.opacity = 1));
      return;
    }

    // Primeros 10 cards con animación escalonada
    const firstBatch = cards.slice(0, 7);
    firstBatch.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add("appear");
      }, i * 100);
    });

    // Resto de las cards: aparecerán al final de la animación de los 10 primeros
    const restCards = cards.slice(7);
    if (restCards.length > 0) {
      // Duración total aproximada de la animación de los primeros 10
      const delay = 10 * 8
      setTimeout(() => {
        restCards.forEach((card) => {
          card.classList.add("appear");
        });
      }, delay);
    }
  } else if (type === "disappear") {
    let completed = 0;
    cards.forEach((card) => {
      card.classList.add("disappear");
      card.addEventListener(
        "animationend",
        () => {
          card.remove();
          completed++;
          if (completed === cards.length) {
            cardsSection.innerHTML = "<p>No hay partidas registradas.</p>";
          }
        },
        { once: true }
      );
    });
  }
}

//Navbar
document.querySelectorAll(".matches-tabs li a").forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();

    // sacar "active" de todos
    document.querySelectorAll(".matches-tabs li a").forEach((t) => {
      t.classList.remove("active");
    });

    // poner "active" al cliqueado
    tab.classList.add("active");

    // acá podés meter lógica de cambiar contenido según el data-tab
    const selected = tab.dataset.tab;
    console.log("Seleccionado:", selected);
  });
});
