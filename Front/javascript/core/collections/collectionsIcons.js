const collectionsContainer = document.getElementById("collectionsContainer");
const userId = sessionStorage.getItem("userId");

let ownedIcons = [];
let notOwnedIcons = [];

// Cargar íconos desde backend
async function loadIcons(activeFilter = null) {
  collectionsContainer.innerHTML = "";
  try {
    // Llamo en paralelo: todos los íconos y los que tiene el usuario
    const [allRes, ownedRes] = await Promise.all([
      apiIcons.getAllIcons(), // devuelve { data, status, url }
      apiIcons.getUserIcons(userId), // devuelve { data, status, url }
    ]);

    const allIcons = allRes.data ?? [];
    ownedIcons = ownedRes.data ?? [];

    // Saco los no adquiridos comparando IDs
    const ownedIds = new Set(ownedIcons.map((icon) => icon.idIcon));
    notOwnedIcons = allIcons.filter((icon) => !ownedIds.has(icon.id));

    updateIconCounters();

    if (activeFilter) {
      applyFilter(activeFilter);
    } else {
      renderIcons();
    }
  } catch (err) {
    collectionsContainer.innerHTML = `<p class="text-center text-danger">${err.message}</p>`;
  }
}

// Actualizar contadores
function updateIconCounters() {
  const total = ownedIcons.length + notOwnedIcons.length;
  const posesion = ownedIcons.length;

  const totalEl = document.getElementById("counter-total");
  const posesionEl = document.getElementById("counter-posesion");

  if (totalEl) totalEl.textContent = total;
  if (posesionEl) posesionEl.textContent = posesion;
}

// ==========================
// Actualizar botón de desbloqueo de iconos
// ==========================
function updateUnlockButtonIcon(icon) {
  const unlockButtonIcon = document.getElementById("unlockButtonIcon");
  const userBE = parseInt(document.getElementById("userBE").textContent, 10);

  // Ícono de esencia azul
  const beIcon =
    '<img class="be-icon" src="https://res.cloudinary.com/dzhyqelnw/image/upload/v1761338998/blueEssence_m9dbsd.png" alt="BE">';

  if (icon.owned) {
    // Icono ya adquirido
    unlockButtonIcon.textContent = "USAR";
    unlockButtonIcon.style.backgroundColor = "#125823ff"; // verde
    unlockButtonIcon.style.cursor = "pointer";
    unlockButtonIcon.onclick = () => handleUseIcon(icon); // función que luego implementes
  } else {
    const cost = icon.blueEssencePrice || 0;
    const faltante = cost - userBE;

    if (faltante > 0) {
      // No tiene BE suficiente
      unlockButtonIcon.innerHTML = `Necesita +${beIcon} ${faltante}`;
      unlockButtonIcon.style.backgroundColor = "#500000ff"; // gris
      unlockButtonIcon.style.cursor = "not-allowed";
      unlockButtonIcon.onclick = null;
    } else {
      // Puede comprar
      unlockButtonIcon.innerHTML = `Desbloquear (-${beIcon} ${cost})`;
      unlockButtonIcon.style.backgroundColor = "#4a0077ff"; // morado
      unlockButtonIcon.style.cursor = "pointer";
      unlockButtonIcon.onclick = () => handleUnlockIcon(icon); // función que luego implementes
    }
  }
}

// Función para desbloquear un ícono
async function handleUnlockIcon(icon) {
  const prevScroll = window.scrollY;
  try {
    // Llamada al endpoint vía API
    const res = await apiIcons.unlockIcon(userId, icon); // devuelve { data, status, url }

    if (res.status >= 200 && res.status < 300) {
      const data = res.data; // UserXIconDTO
      alert(`✅ Icono "${icon.icon}" desbloqueado con éxito!`);

      // Actualizamos el perfil y los íconos
      await loadUserProfile();
      await loadIcons(document.getElementById("filterSelect").value);

      // Cerramos el modal
      hideModalIcon();

      // Volvemos a la posición anterior
      window.scrollTo({ top: prevScroll, behavior: "auto" });
    } else {
      alert(
        `❌ Error al desbloquear icono "${icon.name}": ${
          data?.message || "Desconocido"
        }`
      );
    }
  } catch (err) {
    alert(`⚠️ Error de red: ${err.message}`);
  }
}

// Función para usar un ícono
async function handleUseIcon(userXIcon) {
  const prevScroll = window.scrollY;

  try {
    const profileIconId = userXIcon.idIcon ?? userXIcon.id; // soporta UserXIconDTO o ProfileIcon

    // Llamada al endpoint vía API
    const res = await apiIcons.useIcon(userId, profileIconId); // devuelve { data, status, url }

    if (res.status >= 200 && res.status < 300) {
      const data = res.data; // UserProfileDTO
      alert(`✅ Icono "${userXIcon.icon}" aplicado con éxito!`);

      await loadUserProfile();
      hideModalIcon();
      window.scrollTo({ top: prevScroll, behavior: "auto" });
    } else {
      alert(
        `❌ Error al aplicar icono "${userXIcon.icon}": ${
          res.data?.message || "Desconocido"
        }`
      );
    }
  } catch (err) {
    alert(`⚠️ Error de red: ${err.message}`);
  }
}

// Filtros (placeholder, igual que con skins)
function applyFilter(filter) {
  switch (filter) {
    case "ownership":
      renderIconsByOwnership(ownedIcons);
      break;
    case "notOwned":
      renderIcons(notOwnedIcons);
      break;
    default:
      renderIcons();
  }
}

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  loadIcons();
});

document.getElementById("showNotOwned").addEventListener("change", () => {
  applyFilter(document.getElementById("filterSelect").value);
});

document.getElementById("filterSelect").addEventListener("change", (e) => {
  applyFilter(e.target.value);
});

document.getElementById("searchIcon").addEventListener("input", () => {
  applyFilter(document.getElementById("filterSelect").value);
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (e.target.innerText === "Icons") {
      e.preventDefault();
      document.getElementById("filterSelect").value = "all";
      document.getElementById("showNotOwned").checked = false;
      document.getElementById("searchIcon").value = "";
      loadIcons();
    }
  });
});
