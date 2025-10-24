// función principal
function createHoverModal(item, type) {
  switch (type) {
    case "orangeEssence":
      return createHoverOrangeEssenceModal(item);
    case "key":
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
      return createHoverItemModal(item);
  }
}

function attachHoverModal(card, item, type) {
  const modal = createHoverModal(item, type);

  let scrollHandler = null;
  // Buscamos el contenedor scrollable más cercano (sidebar o window)
  const scrollParent = card.closest(".sidebar") || window;

  card.addEventListener("mouseenter", () => {
    modal.classList.add("show");
    const rect = card.getBoundingClientRect();

    // --- ajustar top según el tipo usando proporciones vh ---
    let offsetTop;
    switch (type) {
      case "champion":
      case "skin":
        offsetTop = 20; // 7vh desde la parte superior
        break;
      case "icon":
        offsetTop = 17; // 17vh desde la parte superior
        break;
      default:
        offsetTop = 10; // fallback
    }

    modal.style.top = `${
      window.scrollY + rect.top - (offsetTop * window.innerHeight) / 100
    }px`;
    modal.style.left = `${rect.right + 10 + window.scrollX}px`;

    scrollHandler = () => modal.classList.remove("show");
    scrollParent.addEventListener("scroll", scrollHandler, { passive: true });
  });

  card.addEventListener("mouseleave", () => {
    modal.classList.remove("show");
    if (scrollHandler) {
      scrollParent.removeEventListener("scroll", scrollHandler);
      scrollHandler = null;
    }
  });
}

function getItemStatus(item, type) {
  if (type === "champion") {
    return ownedChampions.some(
      (c) => c.name === item.name || c.name === item.championName
    )
      ? "OWNED"
      : "ACTIVABLE";
  }

  if (type === "skin") {
    if (
      ownedSkins.some((s) => s.name === item.name || s.name === item.skinName)
    ) {
      return "OWNED";
    }
    if (
      activableSkins.some(
        (s) => s.name === item.name || s.name === item.skinName
      )
    ) {
      return "ACTIVABLE";
    }
    return "NEEDS_CHAMPION";
  }

  if (type === "icon") {
    return ownedIcons.some(
      (i) => i.icon === item.name || i.icon === item.iconName
    )
      ? "OWNED"
      : "ACTIVABLE";
  }

  if (type === "chest" || type === "masterChest") {
    return materialsInventory.keys > 0 ? "OPENABLE" : "NEEDS_KEY";
  }

  if (type === "key" || type === "orangeEssence") {
    return "MATERIAL";
  }

  if (type === "material") {
    const itemName = (item.name || item.materialName || "").toLowerCase();
    if (itemName.includes("chest")) {
      return materialsInventory.keys > 0 ? "OPENABLE" : "NEEDS_KEY";
    }
    return "MATERIAL";
  }

  return "UNKNOWN";
}

function createHoverKeyModal(item) {
  const modal = document.createElement("div");
  modal.classList.add("loot-hover-modal");
  modal.style.maxWidth = "10vw";
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

// modal para chests y masterChests
function createHoverChestModal(item, type) {
  const modal = document.createElement("div");
  modal.classList.add("loot-hover-modal");
  modal.style.width = "15vw";
  modal.style.height = "auto"; // altura automática según contenido
  modal.style.textAlign = "center"; // todo centrado

  // --- Arriba: tipo de cofre ---
  const chestTypeDiv = document.createElement("div");
  chestTypeDiv.classList.add("chest-type");
  chestTypeDiv.style.fontWeight = "bold";
  chestTypeDiv.style.fontSize = "1.2rem";
  chestTypeDiv.style.color = "white"; // color blanco
  chestTypeDiv.style.marginBottom = type === "chest" ? "-1rem" : "0"; // <-- margen condicional
  chestTypeDiv.textContent = type === "chest" ? "Chest" : "Master Chest";

  modal.appendChild(chestTypeDiv);

  // --- Imagen del cofre ---
  const img = document.createElement("img");
  img.src = item.imageUrl;
  img.alt = type === "chest" ? "Chest" : "Master Chest";
  img.style.width = "100%";
  img.style.borderRadius = "4px";
  img.style.objectFit = "contain";
  img.style.marginBottom = "-1rem";

  modal.appendChild(img);

  // --- Abajo: estado (Abrir / Necesita llave) ---
  const statusDiv = document.createElement("div");
  const status = getItemStatus(item, type);
  statusDiv.style.fontWeight = "bold";
  statusDiv.style.fontSize = "1.1rem";

  switch (status) {
    case "OPENABLE":
      statusDiv.textContent = "Abrir";
      statusDiv.style.color = "limegreen";
      break;
    case "NEEDS_KEY":
      statusDiv.textContent = "Necesita llave";
      statusDiv.style.color = "orange";
      break;
    default:
      statusDiv.textContent = "Desconocido";
      statusDiv.style.color = "white";
  }

  modal.appendChild(statusDiv);

  document.body.appendChild(modal);
  return modal;
}

// modal para campeones, skins e iconos
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

  if (type === "icon") {
    modal.width = "5vw";
  }

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
  img.style.objectFit = "contain";

  // Imagen de esencia azul (BE)
  const beIcon =
    '<img class="hbe-icon" src="https://res.cloudinary.com/dzhyqelnw/image/upload/v1761338998/blueEssence_m9dbsd.png" alt="BE">';

  // Imagen de esencia naranja
  const oeIcon =
    '<img class="hoe-icon" src="https://res.cloudinary.com/dzhyqelnw/image/upload/v1761338997/orangeEssence_esacqj.webp" alt="OE">';

  if (type === "icon") {
    img.style.maxHeight = "22vh";
  }

  modal.appendChild(img);

  const info = document.createElement("div");
  info.classList.add("modal-info");
  info.style.display = "flex";
  info.style.flexDirection = "column";
  info.style.padding = "0.3rem 0";

  if (type === "champion" && item.blueEssenceCost != null) {
    // nombre y coste juntos en una línea
    const nameAndCost = document.createElement("div");
    nameAndCost.classList.add("name");
    nameAndCost.style.fontWeight = "bold";
    nameAndCost.innerHTML = `${item.championName} - Coste: ${beIcon} ${
      item.blueEssenceCost * 2
    }`;
    info.appendChild(nameAndCost);

    const unlock = document.createElement("div");
    unlock.classList.add("cost");
    unlock.innerHTML = `Desbloquear: - ${beIcon} ${item.blueEssenceCost}`;
    info.appendChild(unlock);
  } else {
    const name = document.createElement("div");
    name.classList.add("name");
    name.style.fontWeight = "bold";
    if (type === "skin") name.textContent = item.skinName;
    else if (type === "icon") name.textContent = item.iconName;
    info.appendChild(name);

    if (type === "skin" && item.orangeEssenceCost != null) {
      const unlock = document.createElement("div");
      unlock.classList.add("cost");
      unlock.innerHTML = `Desbloquear: - ${oeIcon} ${item.orangeEssenceCost}`;
      info.appendChild(unlock);
    }

    if (type === "icon" && item.blueEssenceCost != null) {
      const originalCost = document.createElement("div");
      originalCost.classList.add("name");
      originalCost.style.fontWeight = "bold";
      originalCost.innerHTML = `Coste: ${beIcon} ${item.blueEssenceCost * 2}`;
      info.appendChild(originalCost);

      const unlock = document.createElement("div");
      unlock.classList.add("cost");
      unlock.innerHTML = `Desbloquear: - ${beIcon} ${item.blueEssenceCost}`;
      info.appendChild(unlock);
    }
  }

  // Refund (igual que antes)
  if (item.disenchantRefund != null) {
    const disenchant = document.createElement("div");
    disenchant.classList.add("cost");
    disenchant.innerHTML =
      type === "skin"
        ? `Desencantar: + ${oeIcon} ${item.disenchantRefund}`
        : `Desencantar: + ${beIcon} ${item.disenchantRefund}`;
    info.appendChild(disenchant);
  }

  modal.appendChild(info);
  document.body.appendChild(modal);
  return modal;
}

function createHoverOrangeEssenceModal(item) {
  const modal = document.createElement("div");
  modal.classList.add("loot-hover-modal");
  modal.style.maxWidth = "10vw";
  modal.style.textAlign = "center";

  // Imagen
  const img = document.createElement("img");
  img.src = item.imageUrl;
  img.alt = "Orange Essence";
  img.style.width = "100%";
  img.style.borderRadius = "4px";
  img.style.maxHeight = "19vh";
  img.style.objectFit = "contain";
  img.style.marginTop = "-2rem";

  // Texto naranja
  const label = document.createElement("div");
  label.textContent = "Orange Essence";
  label.style.color = "orange";
  label.style.fontWeight = "bold";
  label.style.marginTop = "-2rem";

  modal.appendChild(img);
  modal.appendChild(label);
  document.body.appendChild(modal);
  return modal;
}

function closeAllHoverModals() {
  document.querySelectorAll(".loot-hover-modal.show").forEach((modal) => {
    modal.classList.remove("show");
  });
}

window.closeAllHoverModals = closeAllHoverModals;

window.attachHoverModal = attachHoverModal;
