const collectionsContainer = document.getElementById("collectionsContainer");
const userId = sessionStorage.getItem("userId");

let ownedSkins = [];
let notOwnedSkins = [];

// Cargar skins desde backend
async function loadSkins(activeFilter = null) {
  collectionsContainer.innerHTML = "";

  try {
    const [ownedRes, notOwnedRes] = await Promise.all([
      apiSkins.getUserSkins(userId),
      apiSkins.getUserSkinsNotOwned(userId),
    ]);

    ownedSkins = ownedRes.data ?? [];
    notOwnedSkins = notOwnedRes.data ?? [];

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
    const res = await apiChampions.getUserChampions(userId); // llama al API centralizado
    ownedChampions = res.data ?? [];
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
  const prevScroll = window.scrollY;

  // Abrimos el modal con mensaje inicial
  openStatusModal("Desbloquear skin", "Procesando...");

  // Esperamos 1 segundo para que se note el mensaje antes del fetch
  setTimeout(async () => {
    try {
      const res = await apiSkins.unlockSkin(userId, skin);

      if (res.status >= 200 && res.status < 300) {
        // ✅ Éxito
        updateStatusModal(
          "Desbloquear skin",
          `${skin.name} desbloqueada con éxito!`
        );

        // Esperamos un momento para que se vea el mensaje
        setTimeout(async () => {
          await loadUserProfile();
          await loadSkins(document.getElementById("filterSelect").value);
          window.hideModalSkin?.();
          closeStatusModal();
          window.scrollTo({ top: prevScroll, behavior: "auto" });
        }, 1000);
      } else {
        // ❌ Error desde el backend
        const errMsg = res.data?.message || "Error desconocido";
        updateStatusModal("Desbloquear skin", `Error: ${errMsg}`);

        setTimeout(() => {
          closeStatusModal();
          window.scrollTo({ top: prevScroll, behavior: "auto" });
        }, 1500);
      }
    } catch (err) {
      // ⚠️ Error de red u otro
      updateStatusModal(
        "Desbloquear skin",
        `Error al conectar con el servidor.`
      );

      setTimeout(() => {
        closeStatusModal();
        window.scrollTo({ top: prevScroll, behavior: "auto" });
      }, 1500);

      console.error(`Error al desbloquear ${skin.name}:`, err);
    }
  }, 500);
}

function updateUnlockButtonSkin(skin, championName) {
  const userRP = parseInt(document.getElementById("userRP").textContent, 10);

  // Verificar si el usuario tiene el campeón
  const hasChampion = ownedChampions.some((c) => c.name === championName);

  // Ícono de RP
  const rpIcon =
    '<img class="rp-icon" src="https://res.cloudinary.com/dzhyqelnw/image/upload/v1761340820/rp_avaiqa.png" alt="RP">';

  if (skin.owned) {
    unlockButtonSkin.textContent = "DESBLOQUEADO";
    unlockButtonSkin.style.backgroundColor = "#5e5e5ec2";
    unlockButtonSkin.style.cursor = "not-allowed";
    unlockButtonSkin.onclick = null;
  } else if (!hasChampion) {
    unlockButtonSkin.textContent = "NECESITA EL CAMPEÓN";
    unlockButtonSkin.style.backgroundColor = "#b69b00cb";
    unlockButtonSkin.style.cursor = "not-allowed";
    unlockButtonSkin.onclick = null;
  } else if (userRP >= skin.rpCost) {
    unlockButtonSkin.innerHTML = `DESBLOQUEAR: ${rpIcon}${skin.rpCost}`;
    unlockButtonSkin.style.backgroundColor = "#490077bd";
    unlockButtonSkin.style.cursor = "pointer";
    unlockButtonSkin.onclick = () => handleUnlockSkin(skin);
  } else {
    unlockButtonSkin.innerHTML = `NECESITA ${rpIcon}${skin.rpCost}`;
    unlockButtonSkin.style.backgroundColor = "#500000bb";
    unlockButtonSkin.style.cursor = "not-allowed";
    unlockButtonSkin.onclick = null;
  }
}

function applyFilter(filter) {
  // Scroll arriba al aplicar filtro
  window.scrollTo({ top: 0, behavior: "smooth" });

  switch (filter) {
    case "ownership":
      renderSkinsByOwnership();
      break;
    case "tier":
      renderSkinsByRPCost();
      break;
    case "champion":
      renderSkinsByChampion();
      break;
    case "availableness":
      renderSkinsByAvailableness();
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
