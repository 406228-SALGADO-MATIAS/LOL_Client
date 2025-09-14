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
      fetch(`http://localhost:8080/ProfileIcon/getAll`),
      fetch(`http://localhost:8080/UserXIcon/findByUserId/${userId}`),
    ]);

    const allIcons = allRes.ok ? await allRes.json() : [];
    ownedIcons = ownedRes.ok ? await ownedRes.json() : [];

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
  const userBE = parseInt(document.getElementById("userBE").textContent, 10);

  if (icon.owned) {
    // Icono ya adquirido
    unlockButtonIcon.textContent = "USAR";
    unlockButtonIcon.style.backgroundColor = "#125823ff"; // verde
    unlockButtonIcon.style.cursor = "pointer";
    unlockButtonIcon.onclick = () => handleUseIcon(icon); // función que luego implementes
  } else if (userBE >= icon.blueEssencePrice) {
    // Puede comprar
    unlockButtonIcon.textContent = `DESBLOQUEAR: BE ${icon.blueEssencePrice}`;
    unlockButtonIcon.style.backgroundColor = "#4a0077ff"; // morado
    unlockButtonIcon.style.cursor = "pointer";
    unlockButtonIcon.onclick = () => handleUnlockIcon(icon); // función que luego implementes
  } else {
    // No tiene BE suficiente
    unlockButtonIcon.textContent = `NECESITA BE ${icon.blueEssencePrice}`;
    unlockButtonIcon.style.backgroundColor = "#500000ff"; // gris
    unlockButtonIcon.style.cursor = "not-allowed";
    unlockButtonIcon.onclick = null;
  }
}

// Función temporal para desbloquear icono
async function handleUnlockIcon(icon) {
  const prevScroll = window.scrollY;
  try {
    const res = await fetch(
      `http://localhost:8080/UserXIcon/unlockIcon?idUser=${userId}&idIcon=${icon.id}`,
      { method: "POST" }
    );

    if (res.ok) {
      const data = await res.json(); // UserXIconDTO
      alert(`✅ Icono "${icon.icon}" desbloqueado con éxito!`);

      // Actualizamos el perfil y los íconos
      await loadUserProfile();
      await loadIcons(document.getElementById("filterSelect").value);

      // Cerramos el modal
      hideModalIcon();

      // Volvemos a la posición anterior
      window.scrollTo({ top: prevScroll, behavior: "auto" });
    } else {
      const errText = await res.text();
      alert(`❌ Error al desbloquear icono "${icon.name}": ${errText}`);
    }
  } catch (err) {
    alert(`⚠️ Error de red: ${err.message}`);
  }
}

// Función temporal para usar icono
async function handleUseIcon(userXIcon) {
  const prevScroll = window.scrollY;

  try {
    const profileIconId = userXIcon.idIcon ?? userXIcon.id; // si es UserXIconDTO usa idIcon, si es ProfileIcon usa id

    const res = await fetch(
      `http://localhost:8080/users/${userId}/icon/${profileIconId}`,
      { method: "PUT" }
    );

    if (res.ok) {
      const data = await res.json(); // UserProfileDTO
      alert(`✅ Icono "${userXIcon.icon}" aplicado con éxito!`);

      await loadUserProfile();
      hideModalIcon();
      window.scrollTo({ top: prevScroll, behavior: "auto" });
    } else {
      const errText = await res.text();
      alert(`❌ Error al aplicar icono "${userXIcon.icon}": ${errText}`);
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
