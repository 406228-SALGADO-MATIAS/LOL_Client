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
  await updateButtons();
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
  await updateButtons();
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
  await updateButtons();
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
  await updateButtons();
}

async function handleEnchantItem(item, type, enchant = true) {
  const userId = sessionStorage.getItem("userId");
  if (!userId) throw new Error("No se encontró el usuario");

  // 🔹 Mostrar modal de estado según la acción
  if (enchant) {
    openStatusModal("Desbloquear ítem", "Procesando la adquisición...");
  } else {
    openStatusModal("Reembolsar ítem", "Procesando el reembolso...");
  }

  try {
    const res = await apiLoot.unlockOrRefundItem(type, item.id, enchant);

    if (res.status >= 200 && res.status < 300) {
      const data = res.data;

      if (enchant) {
        // Desbloquear -> mostrar modal
        createNewItemModal(data);
      } else {
        // Desencantar -> recargar todo (en paralelo)
        await Promise.all([
          loadUserProfile(),
          loadOwnedCollections(),
          loadLootItems(),
        ]);
        await updateButtons();

        closeStatusModal();
      }

      return data;
    } else {
      throw new Error(res.data?.message || "Error desbloqueando ítem");
    }
  } catch (err) {
    console.error("Error en handleEnchantItem:", err);
    updateStatusModal("Error", err.message || "Fallo al procesar el ítem");
    setTimeout(() => closeStatusModal(), 2000);
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
    await updateButtons();
  } catch (err) {
    console.error(err);
    alert("Error haciendo roll: " + err.message);
  }
}

async function handleUnlockAll(lootType) {
  const userId = sessionStorage.getItem("userId");
  if (!userId) throw new Error("No se encontró el usuario");

  openStatusModal("Desbloquear todos", "Procesando...");

  try {
    const res = await apiLoot.enchantAll(userId, lootType, false);

    if (res.status >= 200 && res.status < 300) {
      const itemsList = res.data?.itemsEnchanted || [];

      updateStatusModal(
        "Completado",
        `Se desbloquearon ${itemsList.length} ítems`
      );

      // 🔹 Esperamos un poco antes de cerrar el status modal y mostrar los ítems
      setTimeout(() => closeStatusModal(), 800);

      // 🔹 Esperar lo mismo antes de mostrar los ítems (para que no se superpongan)
      setTimeout(() => {
        showItemsSequentiallyEnchantAll(itemsList);
      }, 800);
    } else {
      throw new Error(res.data?.message || "Error desbloqueando ítems");
    }
    await updateButtons();
  } catch (err) {
    console.error("Error en handleUnlockAll:", err);
    updateStatusModal(
      "Error",
      err.message || "Fallo al procesar el desbloqueo"
    );
    setTimeout(() => closeStatusModal(), 2000);
  }
}

async function updateButtons() {
  updateEnchantAllButtonState("champion");
  updateEnchantAllButtonState("skin");
  updateEnchantAllButtonState("icon");

  updateRollButtonState("champion");
  updateRollButtonState("skin");
  updateRollButtonState("icon");
}

// 🔹 Controla los botones "UNLOCK ALL"
function updateEnchantAllButtonState(type) {
  let inventory = [];
  let button = null;
  let essenceAvailable = 0;

  switch (type) {
    case "champion":
      inventory = championsInventory;
      button = document.getElementById("unlockChampions");
      essenceAvailable = userLoot?.userBlueEssence ?? 0;
      break;
    case "skin":
      inventory = skinsInventory;
      button = document.getElementById("unlockSkins");
      essenceAvailable = userLoot?.orangeEssence ?? 0;
      break;
    case "icon":
      inventory = iconsInventory;
      button = document.getElementById("unlockIcons");
      essenceAvailable = userLoot?.userBlueEssence ?? 0;
      break;
    default:
      return;
  }

  if (!button) return;

  const hasUnlockable = inventory.some((item) => {
    const status = getItemStatus(item, type);

    if (status !== "ACTIVABLE") return false;

    if (type === "champion" || type === "icon") {
      return (item.blueEssenceCost || 0) <= essenceAvailable;
    } else if (type === "skin") {
      return (item.orangeEssenceCost || 0) <= essenceAvailable;
    }
    return false;
  });

  if (hasUnlockable) {
    button.disabled = false;
    button.classList.remove("disabled");
    button.onclick = () => handleUnlockAll(type.toUpperCase() + "S");
  } else {
    button.disabled = true;
    button.classList.add("disabled");
    button.onclick = null;
  }
}

// 🔹 Controla los botones "ROLL 3x1"
function updateRollButtonState(type) {
  let inventory = [];
  let button = null;

  switch (type) {
    case "champion":
      inventory = championsInventory;
      button = document.getElementById("rollChampion");
      break;
    case "skin":
      inventory = skinsInventory;
      button = document.getElementById("rollSkin");
      break;
    case "icon":
      inventory = iconsInventory;
      button = document.getElementById("rollIcon");
      break;
    default:
      return;
  }

  if (!button) return;

  // Habilitar solo si hay 3 o más ítems en el inventario
  if (inventory.length >= 3) {
    button.disabled = false;
    button.classList.remove("disabled");
    button.onclick = () => createLootRollModal(type);
  } else {
    button.disabled = true;
    button.classList.add("disabled");
    button.onclick = null;
  }
}

// Inicialización

document.addEventListener("DOMContentLoaded", async () => {
  // 🔹 Mostrar modal de carga
  openStatusModal(
    "Cargando inventario",
    "Obteniendo el inventario del usuario..."
  );

  try {
    // Ejecutar todas las cargas en paralelo
    await Promise.all([
      loadUserProfile(),
      loadOwnedCollections(),
      loadLootItems(),
    ]);
    await updateButtons();

    // 🔹 Cerrar modal al finalizar correctamente
    closeStatusModal("Inventario cargado correctamente ✅");
  } catch (err) {
    console.error("Error cargando inventario:", err);
    updateStatusModal("Error", "No se pudo cargar el inventario del usuario.");
    setTimeout(() => closeStatusModal(), 2000);
  }

  // 🎚️ Listeners de filtros y búsqueda
  const filterSelect = document.getElementById("filterSelect");
  if (filterSelect) {
    filterSelect.addEventListener("change", applyCurrentFilter);
  }

  const searchInput = document.getElementById("searchLoot");
  if (searchInput) {
    searchInput.addEventListener("input", applyCurrentFilter);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const btnUnlockChampions = document.getElementById("unlockChampions");
  const btnUnlockSkins = document.getElementById("unlockSkins");
  const btnUnlockIcons = document.getElementById("unlockIcons");

  if (btnUnlockChampions)
    btnUnlockChampions.addEventListener("click", () =>
      handleUnlockAll("CHAMPIONS")
    );

  if (btnUnlockSkins)
    btnUnlockSkins.addEventListener("click", () => handleUnlockAll("SKINS"));

  if (btnUnlockIcons)
    btnUnlockIcons.addEventListener("click", () => handleUnlockAll("ICONS"));
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

  // 🔹 Mostrar modal de estado
  openStatusModal(
    "Desencantar",
    "Reembolsando los ítems repetidos y en colección..."
  );

  try {
    const { data: updatedLoot } = await apiLoot.disenchantOwnedItems(userId);
    console.log("Loot actualizado:", updatedLoot);

    // 🔹 Recargar perfil, colecciones y loot
    await Promise.all([
      loadUserProfile(),
      loadOwnedCollections(),
      loadLootItems(),
    ]);
    await updateButtons();

    // 🔹 Cerrar modal de desencantar
    disenchantModal.classList.remove("show");
    disenchantModal.style.display = "none";
    disenchantModal.setAttribute("aria-hidden", "true");
    disenchantModal.removeAttribute("aria-modal");

    // 🔹 Quitar backdrop si existe
    const backdrop = document.getElementById("modalBackdrop");
    if (backdrop) backdrop.remove();
  } catch (err) {
    console.error(err);
    alert("No se pudo desencantar: " + err.message);
  } finally {
    // 🔹 Cerrar modal de estado
    closeStatusModal();

    // 🔹 Cerrar modal de lootroll (por si sigue abierto)
    closeLootRollModal();
  }
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
