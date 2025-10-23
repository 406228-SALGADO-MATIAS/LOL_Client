const collectionsContainer = document.getElementById("collectionsContainer");
const userId = sessionStorage.getItem("userId");

let ownedData = [];
let notOwnedData = [];

// Función que carga desde el backend
async function loadChampions(activeFilter = null) {
  collectionsContainer.innerHTML = "";

  try {
    const [ownedRes, notOwnedRes] = await Promise.all([
      fetch(`http://localhost:8080/champions/userChampions/${userId}`),
      fetch(
        `http://localhost:8080/champions/userChampions/NotPossess/${userId}`
      ),
    ]);

    ownedData = ownedRes.ok ? await ownedRes.json() : [];
    if (!notOwnedRes.ok) {
      collectionsContainer.innerHTML = `<p class="text-center text-danger">Error cargando campeones no adquiridos</p>`;
      return;
    }
    notOwnedData = await notOwnedRes.json();

    updateChampionCounters();

    // Aplicamos filtro si se pasó, sino render normal
    if (activeFilter) {
      applyFilter(activeFilter);
    } else {
      renderChampions();
    }
  } catch (err) {
    collectionsContainer.innerHTML = `<p class="text-center text-danger">${err.message}</p>`;
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
  // Guardamos la posición actual
  const prevScroll = window.scrollY;
  try {
    const res = await fetch(
      `http://localhost:8080/UserXChampion/unlockChampion?idUser=${userId}&idChampion=${champ.id}`,
      { method: "POST" }
    );

    if (res.ok) {
      await res.json();
      alert(`✅ ${champ.name} desbloqueado con éxito!`);
      await loadChampions(document.getElementById("filterSelect").value);
      await loadUserProfile();
      window.hideModalChamp(); // si es modal de campeones

      // Volvemos a la posición anterior
      window.scrollTo({ top: prevScroll, behavior: "auto" });
    } else {
      const errText = await res.text();
      alert(`❌ Error al desbloquear ${champ.name}: ${errText}`);
    }
  } catch (err) {
    alert(`⚠️ Error de red: ${err.message}`);
  }
}

function updateUnlockButton(champ) {
  const unlockButton = document.getElementById("unlockButton");
  const userBE = parseInt(document.getElementById("userBE").textContent, 10);

  // Ícono de esencia azul
  const beIcon =
    '<img class="be-icon" src="https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/refs/heads/main/Front/images/lootMaterials/blueEssence.png" alt="BE">';

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
document.addEventListener("DOMContentLoaded", loadChampions);

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
