function renderLootGrid(containerId, items, type) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const grid = createGrid();

  let groupedItems;
  if (type === "material") {
    groupedItems = items;
  } else {
    groupedItems = groupItems(items, type);
  }

  groupedItems.forEach((item) => {
    // Para materiales, cada item ya trae su type: "chest" | "masterChest" | "key" | "orangeEssence"
    // Para lo demás, usá el `type` del parámetro ("champion" | "skin" | "icon")
    const resolvedType = type === "material" ? item.type : type;

    const card = createLootCard(item, resolvedType);
    attachHoverModal(card, item, resolvedType);
    attachClickModal(card, item, resolvedType); // <--- esto falta
    grid.appendChild(card);
  });

  // 🔥 Este era el missing piece
  container.appendChild(grid);
}

// 🚀 Render de materiales (chests, keys, esencias, etc.)
function renderMaterials(materials) {
  const items = buildMaterialItems(materials).filter(
    (item) => item.quantity > 0
  );
  if (items.length === 0) return; // No renderiza nada si no hay materiales
  renderLootGrid("materialContainer", items, "material");
}

function renderBottomBarMaterials(materials) {
  // Mapeamos los ids de los elementos en la barra con los tipos
  const idMap = {
    chest: { img: "chestImg", count: "chestCount" },
    masterChest: { img: "masterChestImg", count: "masterChestCount" },
    key: { img: "keyImg", count: "keyCount" },
    orangeEssence: { img: "essenceImg", count: "essenceCount" },
  };

  // Generamos los items desde buildMaterialItems
  const items = buildMaterialItems(materials);

  items.forEach((item) => {
    const elem = idMap[item.type];
    if (!elem) return;

    const imgEl = document.getElementById(elem.img);
    const countEl = document.getElementById(elem.count);

    // Actualizamos imagen y cantidad
    if (imgEl) imgEl.src = item.imageUrl;
    if (countEl) countEl.textContent = item.quantity;
  });
}


function createGrid() {
  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(4, 1fr)";
  grid.style.gap = "1rem";
  return grid;
}

// Normaliza el objeto a { name, ... }
function normalizeItem(item, type) {
  let name;
  if (type === "champion") name = item.championName;
  else if (type === "skin") name = item.skinName;
  else if (type === "icon") name = item.iconName;
  else if (type === "material") name = item.materialName;
  else name = "Loot";

  return { ...item, name , type};
}

// Agrupa por nombre y suma cantidad
function groupItems(items, type) {
  const map = new Map();

  items.forEach((rawItem) => {
    const item = normalizeItem(rawItem, type);
    const key = item.name;

    if (!map.has(key)) {
      map.set(key, { ...item, quantity: 1 });
    } else {
      map.get(key).quantity++;
    }
  });

  return Array.from(map.values());
}

// Convierte tu objeto DTO de materiales en un array
function buildMaterialItems(materials) {
  return [
    {
      materialName: "Chest",
      imageUrl:
        "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/lootMaterials/chest.png?raw=true",
      quantity: materials.chests,
      type: "chest",
    },
    {
      materialName: "Master Chest",
      imageUrl:
        "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/lootMaterials/masterChest.png?raw=true",
      quantity: materials.masterChests,
      type: "masterChest",
    },
    {
      materialName: "Key",
      imageUrl:
        "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/lootMaterials/key.png?raw=true",
      quantity: materials.keys,
      type: "key",
    },
    {
      materialName: "Orange Essence",
      imageUrl:
        "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/lootMaterials/orangeEssence.png?raw=true",
      quantity: materials.orangeEssence,
      type: "orangeEssence",
    },
  ];
}
