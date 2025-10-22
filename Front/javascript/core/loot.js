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
    // Campeones desbloqueados
    const championsRes = await fetch(
      `http://localhost:8080/champions/userChampions/${userId}`
    );
    if (championsRes.ok) {
      ownedChampions = await championsRes.json();
    }

    // Skins desbloqueadas
    const skinsRes = await fetch(
      `http://localhost:8080/skins/getUserSkins/${userId}`
    );
    if (skinsRes.ok) {
      ownedSkins = await skinsRes.json();
    }

    // Skins que puede comprar (activables)
    const skinsToPurchaseRes = await fetch(
      `http://localhost:8080/skins/getUserSkins/toPurchase/${userId}`
    );
    if (skinsToPurchaseRes.ok) {
      activableSkins = await skinsToPurchaseRes.json();
    }

    // Iconos desbloqueados
    const iconsRes = await fetch(
      `http://localhost:8080/ProfileIcon/getUserIcons/${userId}`
    );
    if (iconsRes.ok) {
      ownedIcons = await iconsRes.json();
    }

    console.log("ownedChampions", ownedChampions);
    console.log("ownedSkins", ownedSkins);
    console.log("activableSkins", activableSkins);
    console.log("ownedIcons", ownedIcons);
  } catch (err) {
    console.error("Error cargando colecciones del usuario:", err);
  }
}

async function loadLootItems() {
  if (!userId) {
    alert("No se encontró el usuario");
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:8080/userLoot/${userId}?showInactives=false`
    );

    if (!res.ok) throw new Error("Error cargando loot del usuario");

    userLoot = await res.json();
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
    const res = await fetch(
      `http://localhost:8080/users/getProfileById/${userId}`
    );
    if (!res.ok) throw new Error("Error cargando perfil");

    const data = await res.json();
    console.log("res.ok", res.ok);

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
    //console.error(err);
  }
}

async function handleOpenChest(type) {
  const endpoint =
    type === "chest"
      ? `http://localhost:8080/userLoot/openChests/normal/${userId}`
      : `http://localhost:8080/userLoot/openChests/master/${userId}`;

  const res = await fetch(endpoint, { method: "PUT" });

  if (!res.ok) throw new Error("Error abriendo cofre");

  const json = await res.json();
  console.log(`[HANDLE OPEN CHEST] Resultado recibido:`, json);
  return json;
}

async function handleEnchantItem(item, type, enchant = true) {
  const userId = sessionStorage.getItem("userId");
  if (!userId) throw new Error("No se encontró el usuario");

  let endpoint = "";
  let idParam = 0;

  switch (type) {
    case "champion":
      idParam = item.id;
      endpoint = `http://localhost:8080/userLoot/unlockOrRefund/champion/${idParam}?enchant=${enchant}`;
      break;
    case "skin":
      idParam = item.id;
      endpoint = `http://localhost:8080/userLoot/unlockOrRefund/skin/${idParam}?enchant=${enchant}`;
      break;
    case "icon":
      idParam = item.id;
      endpoint = `http://localhost:8080/userLoot/unlockOrRefund/icon/${idParam}?enchant=${enchant}`;
      break;
    default:
      throw new Error("Tipo de item desconocido: " + type);
  }

  try {
    const res = await fetch(endpoint, { method: "PUT" });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || "Error desbloqueando item");
    }

    const data = await res.json();

    // solo si estamos desbloqueando, mostramos el modal
    if (enchant) {
      createNewItemModal(data);
    } else {
      // si es desencantar, recargamos todo directamente
      await loadUserProfile();
      await loadOwnedCollections();
      await loadLootItems();
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
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
    let endpoint = "";

    switch (type) {
      case "champion":
        endpoint = `http://localhost:8080/userLoot/reRoll/champions?idLootChampion1=${ids[0]}&idLootChampion2=${ids[1]}&idLootChampion3=${ids[2]}`;
        break;
      case "skin":
        endpoint = `http://localhost:8080/userLoot/reRoll/skins?idLootSkin1=${ids[0]}&idLootSkin2=${ids[1]}&idLootSkin3=${ids[2]}`;
        break;
      case "icon":
        endpoint = `http://localhost:8080/userLoot/reRoll/icons?idLootIcon1=${ids[0]}&idLootIcon2=${ids[1]}&idLootIcon3=${ids[2]}`;
        break;
      default:
        throw new Error("Tipo desconocido: " + type);
    }

    const res = await fetch(endpoint, { method: "PUT" });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || "Error haciendo roll");
    }

    const data = await res.json();

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
    const res = await fetch(
      `http://localhost:8080/userLoot/disenchantOwnedItems?idUser=${userId}&showInactives=true`,
      { method: "PUT" }
    );

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || "Error desencantando ítems");
    }

    const updatedLoot = await res.json();
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
