const userId = sessionStorage.getItem("userId");

let userLoot = null;
let championsInventory = [];
let skinsInventory = [];
let iconsInventory = [];
let materialsInventory = {};

let ownedChampions = [];
let ownedSkins = [];
let ownedIcons = [];
let activableSkins = [];

async function loadOwnedCollections() {
  if (!userId) return;

  try {
    const results = await Promise.allSettled([
      apiChampions.getUserChampions(userId),
      apiSkins.getUserSkins(userId),
      apiSkins.getUserSkinsToPurchase(userId),
      apiIcons.getUserIcons(userId),
    ]);

    const [championsRes, skinsRes, skinsToPurchaseRes, iconsRes] = results.map(
      (r) => (r.status === "fulfilled" ? r.value : { data: [] })
    );

    ownedChampions = championsRes.data || [];
    ownedSkins = skinsRes.data || [];
    activableSkins = skinsToPurchaseRes.data || [];
    ownedIcons = iconsRes.data || [];

    console.log("ownedChampions", ownedChampions);
    console.log("ownedSkins", ownedSkins);
    console.log("activableSkins", activableSkins);
    console.log("ownedIcons", ownedIcons);
  } catch (err) {
    console.error("❌ Error cargando colecciones del usuario:", err);
  }
}

async function loadLootItems() {
  if (!userId) {
    alert("No se encontró el usuario");
    return;
  }

  try {
    const { data, status } = await apiLoot.getUserLoot(userId, false);
    if (status !== 200) throw new Error("Error cargando loot del usuario");

    userLoot = data || {};
    console.log("userLoot", userLoot);

    championsInventory = userLoot.championsInventory || [];
    skinsInventory = userLoot.skinsInventory || [];
    iconsInventory = userLoot.iconsInventory || [];
    materialsInventory = {
      chests: userLoot.chests,
      masterChests: userLoot.masterChests,
      keys: userLoot.keys,
      orangeEssence: userLoot.orangeEssence,
    };

    renderMaterials(materialsInventory);
    renderBottomBarMaterials(materialsInventory);
    renderLootGrid("championContainer", championsInventory, "champion");
    renderLootGrid("skinContainer", skinsInventory, "skin");
    renderLootGrid("iconContainer", iconsInventory, "icon");
  } catch (err) {
    alert("Error cargando loot del usuario: " + err.message);
  }

  applyCurrentFilter();
}

async function loadUserProfile() {
  const userId = sessionStorage.getItem("userId");
  console.log("userId:", userId);
  if (!userId) return;

  try {
    const res = await apiOut.getProfileDetailed(userId); // 👈 reemplaza el fetch

    if (res.status >= 200 && res.status < 300) {
      const data = res.data;
      console.log("res.ok", res.status);

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
    } else {
      throw new Error(res.data?.message || "Error cargando perfil");
    }
  } catch (err) {
    // console.error(err);
  }
}
async function handleOpenChest(type) {
  try {
    const realType = type === "chest" ? "normal" : "master";

    const res = await apiLoot.openChest(realType, userId);

    if (res.status >= 200 && res.status < 300) {
      console.log(`[HANDLE OPEN CHEST] Resultado recibido:`, res.data);
      return res.data;
    } else {
      throw new Error(res.data?.message || "Error abriendo cofre");
    }
  } catch (err) {
    console.error("Error abriendo cofre:", err);
    throw err;
  }
}

async function handleEnchantItem(item, type, enchant = true) {
  const userId = sessionStorage.getItem("userId");
  if (!userId) throw new Error("No se encontró el usuario");

  try {
    const res = await apiLoot.unlockOrRefundItem(type, item.id, enchant);

    if (res.status >= 200 && res.status < 300) {
      const data = res.data;

      if (enchant) {
        // Desbloquear -> mostrar modal
        createNewItemModal(data);
      } else {
        // Desencantar -> recargar todo
        await loadUserProfile();
        await loadOwnedCollections();
        await loadLootItems();
      }

      return data;
    } else {
      throw new Error(res.data?.message || "Error desbloqueando item");
    }
  } catch (err) {
    console.error("Error en handleEnchantItem:", err);
    throw err;
  }
}

async function handleRoll(type, selectedItems) {
  if (!userId) {
    alert("No se encontró el usuario");
    return;
  }

  if (!selectedItems || selectedItems.length !== 3) {
    alert("Debes seleccionar 3 items para hacer el roll");
    return;
  }

  try {
    const ids = selectedItems.map((item) => item.id);

    // Llamamos a la API modularizada
    const { data } = await apiLoot.reRollItems(type, ids);

    // Esperar a que se cierre el modal del roll antes de abrir el new item modal
    await new Promise((resolve) => closeLootRollModal(resolve));

    // Ahora sí abrimos el modal del nuevo item
    createNewItemModal(data);
  } catch (err) {
    console.error(err);
    alert("Error haciendo roll: " + err.message);
  }
}

function applySearchFilter() {
  const searchInput = document.getElementById("searchLoot");
  const searchValue = searchInput ? searchInput.value.trim() : "";

  const filteredChampions = filterItemsByName(
    championsInventory,
    "champion",
    searchValue
  );
  const filteredSkins = filterItemsByName(skinsInventory, "skin", searchValue);
  const filteredIcons = filterItemsByName(iconsInventory, "icon", searchValue);

  // Renderizar con los items filtrados
  renderLootGrid("championContainer", filteredChampions, "champion");
  renderLootGrid("skinContainer", filteredSkins, "skin");
  renderLootGrid("iconContainer", filteredIcons, "icon");
}

function applyCurrentFilter() {
  const filterSelect = document.getElementById("filterSelect");
  const filterValue = filterSelect ? filterSelect.value : "all";

  const searchInput = document.getElementById("searchLoot");
  const searchValue = searchInput ? searchInput.value.trim() : "";

  renderMaterials(materialsInventory);
  renderBottomBarMaterials(materialsInventory);

  renderLootGrid(
    "championContainer",
    championsInventory,
    "champion",
    filterValue,
    searchValue
  );
  renderLootGrid(
    "skinContainer",
    skinsInventory,
    "skin",
    filterValue,
    searchValue
  );
  renderLootGrid(
    "iconContainer",
    iconsInventory,
    "icon",
    filterValue,
    searchValue
  );
}

// Inicialización

document.addEventListener("DOMContentLoaded", async () => {
  await loadUserProfile();
  await loadOwnedCollections();
  await loadLootItems();

  // listener del select de filtros
  const filterSelect = document.getElementById("filterSelect");
  if (filterSelect) {
    filterSelect.addEventListener("change", () => {
      applyCurrentFilter();
    });
  }

  // listener del input de búsqueda
  const searchInput = document.getElementById("searchLoot");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      applyCurrentFilter();
    });
  }
});

const disenchantBtn = document.getElementById("disenchantBtn");
const disenchantModal = document.getElementById("disenchantModal");

// Abrir modal
disenchantBtn.addEventListener("click", () => {
  disenchantModal.classList.add("show");
  disenchantModal.style.display = "block";
  disenchantModal.removeAttribute("aria-hidden");
  disenchantModal.setAttribute("aria-modal", "true");

  // crear backdrop
  const backdrop = document.createElement("div");
  backdrop.classList.add("modal-backdrop", "fade", "show");
  backdrop.id = "modalBackdrop";
  document.body.appendChild(backdrop);
});

// Cerrar modal con la X o cancelar
const closeBtns = disenchantModal.querySelectorAll("[data-dismiss='modal']");
closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    disenchantModal.classList.remove("show");
    disenchantModal.style.display = "none";
    disenchantModal.setAttribute("aria-hidden", "true");
    disenchantModal.removeAttribute("aria-modal");

    // quitar backdrop
    const backdrop = document.getElementById("modalBackdrop");
    if (backdrop) backdrop.remove();
  });
});

const confirmDisenchantBtn = document.getElementById("confirmDisenchant");

confirmDisenchantBtn.addEventListener("click", async () => {
  if (!userId) {
    alert("No se encontró el usuario");
    return;
  }

  try {
    const { data: updatedLoot } = await apiLoot.disenchantOwnedItems(userId);
    console.log("Loot actualizado:", updatedLoot);

    // Recargar perfil, colecciones y loot
    await loadUserProfile();
    await loadOwnedCollections();
    await loadLootItems();

    // Cerrar modal
    disenchantModal.classList.remove("show");
    disenchantModal.style.display = "none";
    disenchantModal.setAttribute("aria-hidden", "true");
    disenchantModal.removeAttribute("aria-modal");

    // Quitar backdrop
    const backdrop = document.getElementById("modalBackdrop");
    if (backdrop) backdrop.remove();
  } catch (err) {
    console.error(err);
    alert("No se pudo desencantar: " + err.message);
  }

  closeLootRollModal();
  closeItemModal();
});

document.getElementById("rollChampion").addEventListener("click", () => {
  createLootRollModal("champion");
});

document.getElementById("rollSkin").addEventListener("click", () => {
  createLootRollModal("skin");
});

document.getElementById("rollIcon").addEventListener("click", () => {
  createLootRollModal("icon");
});

// Listener del input de búsqueda
const searchInput = document.getElementById("searchLoot");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    applyCurrentFilter();
  });
}
