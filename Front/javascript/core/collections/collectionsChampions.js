const collectionsContainer = document.getElementById("collectionsContainer");
const userId = sessionStorage.getItem("userId");

let ownedData = [];
let notOwnedData = [];

// Función que carga desde el backend
async function loadChampions(activeFilter = null) {
  collectionsContainer.innerHTML = "";

  try {
    const [ownedRes, notOwnedRes] = await Promise.all([
      apiChampions.getUserChampions(userId),
      apiChampions.getUserChampionsNotOwned(userId),
    ]);

    ownedData = ownedRes?.data || [];
    notOwnedData = notOwnedRes?.data || [];

    updateChampionCounters();

    if (activeFilter) {
      applyFilter(activeFilter);
    } else {
      renderChampions();
    }

    // 🔹 Cerrar modal al finalizar
    closeStatusModal();
  } catch (err) {
    collectionsContainer.innerHTML = `<p class="text-center text-danger">${err.message}</p>`;

    // 🔹 Mostrar error en el modal antes de cerrarlo
    updateStatusModal("Error", "No se pudieron obtener los campeones.");
    setTimeout(() => closeStatusModal(), 2000);
  }
}

// Función que pisa los valores en el HTML
function updateChampionCounters() {
  const total = ownedData.length + notOwnedData.length;
  const posesion = ownedData.length;

  const totalEl = document.getElementById("counter-total");
  const posesionEl = document.getElementById("counter-posesion");

  if (totalEl) totalEl.textContent = total;
  if (posesionEl) posesionEl.textContent = posesion;
}

async function handleUnlock(champ) {
  const prevScroll = window.scrollY;

  // Abrimos el modal desde el inicio
  openStatusModal("Desbloquear campeón", "Procesando...");

  // Esperamos 1 segundo antes de llamar al API
  setTimeout(async () => {
    try {
      const res = await apiChampions.unlockChampion(userId, champ);

      // ✅ Éxito
      updateStatusModal(
        "Desbloquear campeón",
        `${champ.name} desbloqueado con éxito!`
      );

      // Esperamos un poco para mostrar el mensaje y luego cerramos
      setTimeout(async () => {
        await loadChampions(document.getElementById("filterSelect").value);
        await loadUserProfile();
        window.hideModalChamp?.(); // Cierra el modal de campeón si existe
        closeStatusModal();
        window.scrollTo({ top: prevScroll, behavior: "auto" });
      }, 1000);
    } catch (err) {
      // ❌ Error
      updateStatusModal(
        "Desbloquear campeón",
        `Error al desbloquear ${champ.name}.`
      );

      setTimeout(() => {
        closeStatusModal();
        window.scrollTo({ top: prevScroll, behavior: "auto" });
      }, 1500);

      console.error(`Error al desbloquear ${champ.name}:`, err);
    }
  }, 500);
}

function updateUnlockButton(champ) {
  const unlockButton = document.getElementById("unlockButton");
  const userBE = parseInt(document.getElementById("userBE").textContent, 10);

  // Ícono de esencia azul
  const beIcon =
    '<img class="be-icon" src="https://res.cloudinary.com/dzhyqelnw/image/upload/v1761338998/blueEssence_m9dbsd.png" alt="BE">';

  if (champ.owned) {
    unlockButton.textContent = "Desbloqueado";
    unlockButton.style.background =
      "linear-gradient(180deg, #5e5e5eff, #3f3f3fcc)";
    unlockButton.style.cursor = "not-allowed";
    unlockButton.disabled = true;
    unlockButton.onclick = null;
  } else {
    const cost = champ.blueEssencePrice || 0;
    const faltante = cost - userBE;

    if (faltante > 0) {
      unlockButton.innerHTML = `Necesita +${beIcon} ${faltante}`;
      unlockButton.style.background =
        "linear-gradient(180deg, #640000f6, #9200006b)";
      unlockButton.style.cursor = "not-allowed";
      unlockButton.disabled = true;
      unlockButton.onclick = null;
    } else {
      unlockButton.innerHTML = `Desbloquear (-${beIcon} ${cost})`;
      unlockButton.style.background =
        "linear-gradient(180deg, #490077e7, #2a0044c0)";
      unlockButton.style.cursor = "pointer";
      unlockButton.disabled = false;
      unlockButton.onclick = () => handleUnlock(champ);
    }
  }
}

// Función central que decide qué renderizar
// Y modificamos applyFilter para poder pasarle el filtro como parámetro
function applyFilter(filterValue = null) {
  const activeFilter =
    filterValue || document.getElementById("filterSelect").value;

  if (activeFilter === "difficulty") renderChampionsByDifficulty();
  else if (activeFilter === "role") renderChampionsByRole();
  else if (activeFilter === "style") renderChampionsByStyle();
  else if (activeFilter === "style2") renderChampionsByStyle2();
  else if (activeFilter === "role2") renderChampionsByRole2();
  else if (activeFilter === "price") renderChampionsByBlueEssence();
  else if (activeFilter === "ownership") renderChampionsByOwnership();
  else renderChampions();
  // Mover scroll al top después de renderizar

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Inicialización
document.addEventListener("DOMContentLoaded", async () => {
  // 🔹 Mostrar modal de carga
  openStatusModal("Cargando colección", "Obteniendo los campeones...");

  try {
    await loadChampions(); // Ejecuta la carga normal
  } catch (err) {
    console.error("Error al cargar campeones:", err);
    updateStatusModal("Error", "No se pudieron obtener los campeones.");
    setTimeout(() => closeStatusModal(), 2000);
    return;
  }

  // 🔹 Cerrar el modal al finalizar correctamente
  closeStatusModal();
});

// Checkbox para mostrar campeones no obtenidos
document.getElementById("showNotOwned").addEventListener("change", () => {
  applyFilter(document.getElementById("filterSelect").value);
});

// Dropdown filtros
document.getElementById("filterSelect").addEventListener("change", (e) => {
  applyFilter(e.target.value);
});

// Listener en tiempo real de la busqueda
document.getElementById("searchChampion").addEventListener("input", () => {
  applyFilter(document.getElementById("filterSelect").value);
});

// Si hacés click en el nav Champions → recarga
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (e.target.innerText === "Champions") {
      e.preventDefault();

      // Limpiar filtros
      document.getElementById("filterSelect").value = "all"; // o "Todos" si tu valor por defecto es ese
      document.getElementById("showNotOwned").checked = false;
      document.getElementById("searchChampion").value = "";

      // Cargar campeones sin filtros
      loadChampions();
    }
  });
});
