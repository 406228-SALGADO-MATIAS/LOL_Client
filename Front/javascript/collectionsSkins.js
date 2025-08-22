const collectionsContainer = document.getElementById("collectionsContainer");
const userId = sessionStorage.getItem("userId");

let ownedSkins = [];
let notOwnedSkins = [];

// Cargar skins desde backend
async function loadSkins(activeFilter = null) {
  collectionsContainer.innerHTML = "";

  try {
    const [ownedRes, notOwnedRes] = await Promise.all([
      fetch(`http://localhost:8080/skins/getUserSkins/${userId}`),
      fetch(`http://localhost:8080/skins/getUserSkins/NotPossess/${userId}`),
    ]);

    ownedSkins = ownedRes.ok ? await ownedRes.json() : [];
    if (!notOwnedRes.ok) {
      collectionsContainer.innerHTML = `<p class="text-center text-danger">Error cargando skins no adquiridas</p>`;
      return;
    }
    notOwnedSkins = await notOwnedRes.json();

    updateSkinCounters();

    if (activeFilter) {
      applyFilter(activeFilter);
    } else {
      renderSkins();
    }
  } catch (err) {
    collectionsContainer.innerHTML = `<p class="text-center text-danger">${err.message}</p>`;
  }
}

let ownedChampions = [];

async function loadUserChampions() {
  try {
    const res = await fetch(
      `http://localhost:8080/champions/userChampions/${userId}`
    );
    if (res.ok) {
      ownedChampions = await res.json();
    } else {
      ownedChampions = [];
    }
  } catch (err) {
    console.error("Error cargando campeones del usuario:", err);
    ownedChampions = [];
  }
}

// Actualizar contadores
function updateSkinCounters() {
  const total = ownedSkins.length + notOwnedSkins.length;
  const posesion = ownedSkins.length;

  const totalEl = document.getElementById("counter-total");
  const posesionEl = document.getElementById("counter-posesion");

  if (totalEl) totalEl.textContent = total;
  if (posesionEl) posesionEl.textContent = posesion;
}

async function handleUnlockSkin(skin) {
  // Guardamos la posición actual
  const prevScroll = window.scrollY;
  try {
    const res = await fetch(
      `http://localhost:8080/UserXSkin/unlockSkin?idUser=${userId}&idSkin=${skin.id}`,
      { method: "POST" }
    );

    if (res.ok) {
      await res.json();
      alert(`✅ ${skin.name} desbloqueada con éxito!`);
      await loadUserProfile(); // 👈 primero actualizamos el RP
      await loadSkins(document.getElementById("filterSelect").value); // 👈 luego recargamos las skins
      // asi se actualiza la categoria de skins obtenibles para la compra
      window.hideModalSkin();

      // Volvemos a la posición anterior
      window.scrollTo({ top: prevScroll, behavior: "auto" });
    } else {
      const errText = await res.text();
      alert(`❌ Error al desbloquear ${skin.name}: ${errText}`);
    }
  } catch (err) {
    alert(`⚠️ Error de red: ${err.message}`);
  }
}

function updateUnlockButtonSkin(skin, championName) {
  const userRP = parseInt(document.getElementById("userRP").textContent, 10);

  // Verificar si el usuario tiene el campeón
  const hasChampion = ownedChampions.some((c) => c.name === championName);

  if (skin.owned) {
    unlockButtonSkin.textContent = "DESBLOQUEADO";
    unlockButtonSkin.style.backgroundColor = "#999";
    unlockButtonSkin.style.cursor = "not-allowed";
    unlockButtonSkin.onclick = null;
  } else if (!hasChampion) {
    unlockButtonSkin.textContent = "NECESITA EL CAMPEÓN";
    unlockButtonSkin.style.backgroundColor = "#999";
    unlockButtonSkin.style.cursor = "not-allowed";
    unlockButtonSkin.onclick = null;
  } else if (userRP >= skin.rpCost) {
    unlockButtonSkin.textContent = `DESBLOQUEAR: RP ${skin.rpCost}`;
    unlockButtonSkin.style.backgroundColor = "#bf6c00ff";
    unlockButtonSkin.style.cursor = "pointer";
    unlockButtonSkin.onclick = () => handleUnlockSkin(skin);
  } else {
    unlockButtonSkin.textContent = `NECESITA RP ${skin.rpCost}`;
    unlockButtonSkin.style.backgroundColor = "#999";
    unlockButtonSkin.style.cursor = "not-allowed";
    unlockButtonSkin.onclick = null;
  }
}

async function loadUserProfile() {
  const userId = sessionStorage.getItem("userId");
  if (!userId) return;

  try {
    const res = await fetch(
      `http://localhost:8080/users/getProfileById/${userId}`
    );
    if (!res.ok) throw new Error("Error cargando perfil");

    const data = await res.json();

    const nicknameEl = document.getElementById("userNickname");
    let serverShort = "";
    if (data.server) {
      const match = data.server.match(/\(([^)]+)\)/);
      if (match) serverShort = match[1];
    }

    nicknameEl.innerHTML = `${
      data.nickname || "Sin nick"
    }<span style="font-weight: normal; font-size: 1.3rem">#${serverShort}</span>`;

    document.getElementById("userBE").textContent = data.blueEssence ?? 0;
    document.getElementById("userRP").textContent = data.riotPoints ?? 0;

    const userIcon = document.getElementById("userIcon");
    userIcon.src = data.iconImage || "/assets/default-icon.png";
    userIcon.style.width = "auto";
    userIcon.style.height = "100%";
    userIcon.style.objectFit = "cover";
  } catch (err) {
    console.error(err);
  }
}

function applyFilter(filter) {
  // Scroll arriba al aplicar filtro
  window.scrollTo({ top: 0, behavior: "smooth" });

  switch (filter) {
    case "ownership":
      renderSkinsByOwnership(); // Ya filtra por posesión en getFilteredSkins
      break;
    case "tier":
      renderSkinsByRPCost(); // Falta implementar
      break;
    case "champion":
      renderSkinsByChampion(); // Falta implementar
      break;
    case "availableness":
      renderSkinsByAvailableness(); // ← nuevo filtro
      break;
    default:
      renderSkins();
  }
}

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
  await loadUserChampions(); // 👈 primero traemos campeones
  await loadSkins(); // 👈 después las skins
});

// Checkbox “No obtenidas”
document.getElementById("showNotOwned").addEventListener("change", () => {
  applyFilter(document.getElementById("filterSelect").value);
});

// Dropdown filtros
document.getElementById("filterSelect").addEventListener("change", (e) => {
  applyFilter(e.target.value);
});

// Input de búsqueda
document.getElementById("searchSkin").addEventListener("input", () => {
  applyFilter(document.getElementById("filterSelect").value);
});

document.getElementById("searchChampion").addEventListener("input", () => {
  applyFilter(document.getElementById("filterSelect").value);
});

// Click en el nav → recarga de skins si se hace click en “Skins”
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (e.target.innerText === "Skins") {
      e.preventDefault();

      // Limpiar filtros
      document.getElementById("filterSelect").value = "all"; // o el valor por defecto si tenés uno
      document.getElementById("showNotOwned").checked = false;
      document.getElementById("searchSkin").value = "";
      document.getElementById("searchChampion").value = "";

      // Cargar skins sin filtros
      loadSkins();
    }
  });
});
