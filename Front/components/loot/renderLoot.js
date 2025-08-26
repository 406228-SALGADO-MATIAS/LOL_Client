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
    const card = createLootCard(item, type);
    attachHoverModal(card, item, type);
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

  return { ...item, name };
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
    },
    {
      materialName: "Master Chest",
      imageUrl:
        "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/lootMaterials/masterChest.png?raw=true",
      quantity: materials.masterChests,
    },
    {
      materialName: "Key",
      imageUrl:
        "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/lootMaterials/key.png?raw=true",
      quantity: materials.keys,
    },
    {
      materialName: "Orange Essence",
      imageUrl:
        "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/lootMaterials/orangeEssence.png?raw=true",
      quantity: materials.orangeEssence,
    },
  ];
}

