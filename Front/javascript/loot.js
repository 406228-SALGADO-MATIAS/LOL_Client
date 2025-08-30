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
    renderBottomBarMaterials(materialsInventory); // la barra inferior
    renderLootGrid("championContainer", championsInventory, "champion");
    renderLootGrid("skinContainer", skinsInventory, "skin");
    renderLootGrid("iconContainer", iconsInventory, "icon");
  } catch (err) {
    alert("Error cargando loot del usuario: " + err.message);
  }
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
    console.error(err);
  }
}

async function handleOpenChest(type) {
  const endpoint =
    type === "chest"
      ? `http://localhost:8080/userLoot/openChests/normal/${userId}`
      : `http://localhost:8080/userLoot/openChests/master/${userId}`;

  const res = await fetch(endpoint, { method: "PUT" });

  if (!res.ok) throw new Error("Error abriendo cofre");

  return await res.json(); // devuelve NewItemDTO
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

    // Solo si estamos desbloqueando, mostramos el modal
    if (enchant) {
      createNewItemModal(data); 
      // la recarga de los tres métodos se hace dentro del closeAndReload
    } else {
      // Si es desencantar, recargamos todo directamente
      await loadUserProfile();
      await loadOwnedCollections();
      await loadLootItems();
    }

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Inicialización
document.addEventListener("DOMContentLoaded", async () => {
  await loadUserProfile();
  await loadOwnedCollections();
  await loadLootItems();
});

console.log("championsInventory", championsInventory);
console.log(
  "container championContainer",
  document.getElementById("championContainer")
);
