const input = document.getElementById("searchInput");
const serverSelect = document.getElementById("serverSelect");
const results = document.getElementById("results");

let timer;
const MAX_RESULTS = 6;

// helper para extraer el server entre paréntesis
function formatServer(server) {
  const match = server?.match(/\(([^)]+)\)/);
  return match ? `#${match[1]}` : "";
}

// renderiza un resultado de usuario con rank
function renderUserResult(user, ranks) {
  const item = document.createElement("div");
  item.className =
    "list-group-item list-group-item-action d-flex align-items-center justify-content-between";

  // encontrar la imagen de rank
  const rankData = ranks.find(
    (r) => r.rank.toLowerCase() === (user.rank || "").toLowerCase()
  ) || {
    image:
      "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/ranks/Unranked.png?raw=true",
    rank: "Unranked",
  };

  item.innerHTML = `
    <div class="d-flex align-items-center">
      <img src="${
        user.iconImage ||
        "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/profileIcons/none.jpg?raw=true"
      }" 
        alt="icon" 
        class="rounded-circle me-3" 
        width="32" height="32">
      <span class="fw-bold">${user.nickname}</span>
      <small class="text-muted ms-2">${formatServer(user.server)}</small>
    </div>
    <img 
  src="${rankData.image}" 
  alt="${rankData.rank}" 
  width="45" 
  height="45" 
  title="${rankData.rank}"
>
  `;

  item.addEventListener("click", () => {
    selectSearchedUser(user); // carga ese usuario
    results.style.display = "none"; // oculta dropdown
  });

  return item;
}

// renderiza mensaje "sin coincidencias"
function renderNoResults() {
  const item = document.createElement("div");
  item.className = "list-group-item text-center text-muted";
  item.textContent = "Sin coincidencias";
  return item;
}

// 1️⃣ Cache para los ranks
let ranksCache = [];

// 2️⃣ Función para inicializar los ranks al cargar la página
async function initRanks() {
  try {
    const res = await fetch("http://localhost:8080/ranks/all");
    if (!res.ok) throw new Error("Error al traer ranks");
    ranksCache = await res.json();
  } catch (err) {
    console.error(err);
    ranksCache = [];
  }
}

// initRanks cuando se carga el DOM
document.addEventListener("DOMContentLoaded", initRanks);

// 👉 función para ejecutar la búsqueda 
async function doSearch() {
  const query = input.value.trim();
  results.innerHTML = "";

  if (query.length < 1) {
    results.style.display = "none";
    return;
  }

  try {
    // Ver qué server está seleccionado
    const selectedServer = serverSelect.value;

    let url;
    if (selectedServer) {
      // 👉 Con server elegido
      url = `http://localhost:8080/users/findUsers/nicknameAndserver?nickname=${encodeURIComponent(
        query
      )}&serverOption=${selectedServer}`;
    } else {
      // 👉 Sin server (búsqueda general)
      url = `http://localhost:8080/users/findUsers/nickname/${encodeURIComponent(
        query
      )}`;
    }

    const res = await fetch(url);

    if (!res.ok) throw new Error("Error al buscar usuarios");
    let usuarios = await res.json();

    // filtrar usuario original
    usuarios = usuarios.filter((u) => String(u.id) !== String(originalUserId));

    if (usuarios.length > 0) {
      usuarios
        .slice(0, MAX_RESULTS)
        .forEach((u) => results.appendChild(renderUserResult(u, ranksCache)));
    } else {
      results.appendChild(renderNoResults());
    }

    results.style.display = "block";
  } catch (err) {
    console.error("Error en búsqueda:", err);
    results.style.display = "none";
  }
}

// escuchar input con debounce (0.1 seg)
input.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(doSearch, 100);
});

// 👉 escuchar cambio en el serverSelect
serverSelect.addEventListener("change", () => {
  // si hay algo escrito, relanzamos búsqueda con el nuevo filtro
  if (input.value.trim().length > 0) {
    doSearch();
  }
});

// escuchar input con debounce (0.1 seg)

input.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(doSearch, 100);
});

// SEARCH USER TEMPORAL SESSION

window.btnReturnProfile = document.getElementById("btnReturnProfile");
window.originalUserId = sessionStorage.getItem("userId") || null;
window.searchedUserId = sessionStorage.getItem("tempUserId") || null;

updateReturnButton();
if (searchedUserId) loadProfileById(searchedUserId);

// Función para cargar un perfil por userId (original o temporal)
async function loadProfileById(userId) {
  sessionStorage.setItem("tempUserId", userId);
  try {
    const res = await fetch(
      `http://localhost:8080/users/getProfileById/${userId}`
    );
    if (!res.ok) throw new Error("Error al cargar perfil");
    const profile = await res.json();
  } catch (err) {
    console.error("Error cargando perfil:", err);
  }
}

// Mostrar botón solo si estamos en sesión temporal
function updateReturnButton() {
  const btns = document.querySelectorAll("#btnReturnProfile");
  if (!btns.length) return;

  btns.forEach((btn) => {
    if (
      window.searchedUserId &&
      window.searchedUserId !== window.originalUserId
    ) {
      btn.style.display = "inline-block";
    } else {
      btn.style.display = "none";
    }
  });
}

// Al hacer click en el botón “Regresar al perfil”
if (btnReturnProfile) {
  btnReturnProfile.addEventListener("click", () => {
    const transition = document.querySelector(".page-transition");
    transition.classList.remove("hidden");

    window.searchedUserId = null;
    sessionStorage.removeItem("tempUserId"); // borrar persistencia
    updateReturnButton();

    setTimeout(() => {
      // resume
      if (typeof loadTopProfile === "function") {
        const originalId = sessionStorage.getItem("userId");
        loadTopProfile(originalId);
        loadTopChampions(originalId);
        loadRanks(originalId);
      }

      // stats
      if (typeof loadStats === "function") {
        loadStats(window.originalUserId, gameFilter.value, roleFilter.value);
      }

      transition.classList.add("hidden");
    }, 200);
  });
}

window.onUserSelected =
  window.onUserSelected ||
  ((userId) => {
    loadResume(userId, true);
  });

// Al elegir un usuario del dropdown
function selectSearchedUser(user) {
  const transition = document.querySelector(".page-transition");
  transition.classList.remove("hidden");

  window.searchedUserId = user.id;
  sessionStorage.setItem("tempUserId", user.id);
  updateReturnButton();

  // update snapshot del usuario buscado para stats
  fetchStats(user.id, gameFilter.value, roleFilter.value)
    .then((data) => {
      window.defaultChampionsData = data;
    })
    .catch((err) => console.error("Error al traer stats del usuario:", err));

  setTimeout(() => {
    window.onUserSelected(user.id);
    transition.classList.add("hidden");
  }, 200);
}
