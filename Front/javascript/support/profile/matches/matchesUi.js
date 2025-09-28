// ----------------- Filtrar cards por campeón -----------------
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
    // Comparar con las cards antiguas: si los idMatch son exactamente iguales → no animar
    const oldIds = oldCards.map((c) => Number(c.dataset.matchId));
    const newIds = newMatches.map((m) => m.idMatch);

    const isSame =
      oldIds.length === newIds.length &&
      oldIds.every((id, i) => id === newIds[i]);

    if (isSame) {
      // Cards iguales → simplemente mostrar sin animación
      cards.forEach((card) => (card.style.opacity = 1));
      return;
    }

    // Escalonado normal si son distintas
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add("appear");
      }, i * 100);
    });
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
