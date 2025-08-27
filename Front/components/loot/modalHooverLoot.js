// Crea modal para keys

// Función principal que decide qué modal crear
function createHoverModal(item, type) {
  switch (type) {
    case "key":
    case "orangeEssence":
      return createHoverKeyModal(item);
    case "chest":
    case "masterChest":
      return createHoverChestModal(item, type);
    case "champion":
    case "skin":
    case "icon":
      return createHoverItemModal(item, type);
    default:
      console.warn("Tipo de item desconocido:", type);
      return createHoverItemModal(item); // así nunca cae en itemModal y no aparece "Desconocido"
  }
}

function attachHoverModal(card, item, type) {
  const modal = createHoverModal(item, type);

  card.addEventListener("mouseenter", () => {
    modal.classList.add("show");
    const rect = card.getBoundingClientRect();

    modal.style.top = `${
      rect.top +
      window.scrollY +
      rect.height / 2 -
      rect.height / 2 -
      window.innerHeight * 0.065
    }px`;

    modal.style.left = `${rect.right + 10 + window.scrollX}px`;
  });

  card.addEventListener("mouseleave", () => modal.classList.remove("show"));
}

function createHoverKeyModal(item) {
  const modal = document.createElement("div");
  modal.classList.add("loot-hover-modal");

  const img = document.createElement("img");
  img.src = item.imageUrl;
  img.alt = "Key";
  img.style.width = "100%";
  img.style.borderRadius = "4px";
  img.style.maxHeight = "19vh";
  img.style.objectFit = "contain";

  modal.appendChild(img);
  document.body.appendChild(modal);
  return modal;
}

// Crea modal para chests y masterChests
function createHoverChestModal(item, type) {
  const modal = document.createElement("div");
  modal.classList.add("loot-hover-modal");

  const topInfo = document.createElement("div");
  topInfo.classList.add("modal-info");
  topInfo.style.marginBottom = "0.3rem";
  topInfo.style.textAlign = "center";

  const topName = document.createElement("div");
  topName.classList.add("name");
  topName.style.fontWeight = "bold";
  topName.style.fontSize = "0.85rem";

  const status = getItemStatus(item, type);
  switch (status) {
    case "OWNED":
      topName.textContent = "En colección";
      topName.style.color = "red";
      break;
    case "ACTIVABLE":
      topName.textContent = "Activable";
      topName.style.color = "limegreen";
      break;
    case "NEEDS_CHAMPION":
      topName.textContent = "Necesita el campeón";
      topName.style.color = "orange";
      break;
    case "OPENABLE":
      topName.textContent = "Abrir";
      topName.style.color = "limegreen";
      break;
    case "NEEDS_KEY":
      topName.textContent = "Necesita llave";
      topName.style.color = "orange";
      break;
    default:
      topName.textContent = "Desconocido";
      topName.style.color = "gray";
  }

  topInfo.appendChild(topName);
  modal.appendChild(topInfo);

  const img = document.createElement("img");
  img.src = item.imageUrl;
  img.alt = type === "chest" ? "Chest" : "Master Chest";
  img.style.width = "100%";
  img.style.borderRadius = "4px";
  img.style.maxHeight = "19vh";
  img.style.objectFit = "contain";

  modal.appendChild(img);
  document.body.appendChild(modal);
  return modal;
}

// Crea modal para campeones, skins e iconos
function createHoverItemModal(item, type) {
  const modal = document.createElement("div");
  modal.classList.add("loot-hover-modal");

  const topInfo = document.createElement("div");
  topInfo.classList.add("modal-info");
  topInfo.style.marginBottom = "0.3rem";
  topInfo.style.textAlign = "center";

  const topName = document.createElement("div");
  topName.classList.add("name");
  topName.style.fontWeight = "bold";
  topName.style.fontSize = "0.85rem";

  const status = getItemStatus(item, type);
  switch (status) {
    case "OWNED":
      topName.textContent = "En colección";
      topName.style.color = "red";
      break;
    case "ACTIVABLE":
      topName.textContent = "Activable";
      topName.style.color = "limegreen";
      break;
    case "NEEDS_CHAMPION":
      topName.textContent = "Necesita el campeón";
      topName.style.color = "orange";
      break;
    case "OPENABLE":
      topName.textContent = "Abrir";
      topName.style.color = "limegreen";
      break;
    case "NEEDS_KEY":
      topName.textContent = "Necesita llave";
      topName.style.color = "orange";
      break;
    default:
      topName.textContent = "Desconocido";
      topName.style.color = "gray";
  }

  topInfo.appendChild(topName);
  modal.appendChild(topInfo);

  const img = document.createElement("img");
  img.src = item.imageUrl;
  img.alt = item.championName || item.skinName || item.iconName || "Item";
  img.style.width = "100%";
  img.style.borderRadius = "4px";
  img.style.maxHeight = "19vh";
  img.style.objectFit = "contain";
  modal.appendChild(img);

  const info = document.createElement("div");
  info.classList.add("modal-info");
  info.style.display = "flex";
  info.style.flexDirection = "column";
  info.style.padding = "0.3rem 0";

  const name = document.createElement("div");
  name.classList.add("name");
  name.style.fontWeight = "bold";
  if (type === "champion") name.textContent = item.championName;
  else if (type === "skin") name.textContent = item.skinName;
  else if (type === "icon") name.textContent = item.iconName;
  info.appendChild(name);

  if (
    (type === "champion" || type === "icon") &&
    item.blueEssenceCost != null
  ) {
    const originalCost = document.createElement("div");
    originalCost.classList.add("name");
    originalCost.style.fontWeight = "bold";
    originalCost.textContent = `Coste original: ${item.blueEssenceCost * 2}`;
    info.appendChild(originalCost);

    const unlock = document.createElement("div");
    unlock.classList.add("cost");
    unlock.textContent = `Desbloquear:  - BE ${item.blueEssenceCost}`;
    info.appendChild(unlock);
  } else if (type === "skin" && item.orangeEssenceCost != null) {
    const unlock = document.createElement("div");
    unlock.classList.add("cost");
    unlock.textContent = `Desbloquear:  - OE ${item.orangeEssenceCost}`;
    info.appendChild(unlock);
  }

  if (item.disenchantRefund != null) {
    const disenchant = document.createElement("div");
    disenchant.classList.add("cost");
    disenchant.textContent =
      type === "skin"
        ? `Desencantar:  + OE ${item.disenchantRefund}`
        : `Desencantar:  + BE ${item.disenchantRefund}`;
    info.appendChild(disenchant);
  }

  modal.appendChild(info);
  document.body.appendChild(modal);
  return modal;
}

window.attachHoverModal = attachHoverModal;
