function createHoverModal(item, type) {
  const modal = document.createElement("div");
  modal.classList.add("loot-hover-modal");

  // Mini-sección arriba
  const topInfo = document.createElement("div");
  topInfo.classList.add("modal-info");
  topInfo.style.marginBottom = "0.3rem";
  topInfo.style.textAlign = "center";

  const topName = document.createElement("div");
  topName.classList.add("name"); // <-- esto aplica el color blanco
  topName.style.fontWeight = "bold";
  topName.style.fontSize = "0.85rem";
  topName.textContent = "Activable";

  topInfo.appendChild(topName);
  modal.appendChild(topInfo); // antes de la imagen

  // Imagen
  const img = document.createElement("img");
  img.src = item.imageUrl;
  img.alt = item.championName || item.skinName || item.iconName || "Item";
  img.style.width = "100%";
  img.style.borderRadius = "4px";

  // Aquí agregas las líneas para limitar altura y mantener proporción
  img.style.maxHeight = "19vh"; // evita que sobresalga del modal
  img.style.objectFit = "contain"; // mantiene la proporción y no recorta

  modal.appendChild(img);

  // Info debajo de la imagen
  const info = document.createElement("div");
  info.classList.add("modal-info");
  info.style.display = "flex";
  info.style.flexDirection = "column";
  info.style.padding = "0.3rem 0";

  // Nombre
  const name = document.createElement("div");
  name.classList.add("name");
  name.style.fontWeight = "bold";
  if (type === "champion") name.textContent = item.championName;
  else if (type === "skin") name.textContent = item.skinName;
  else if (type === "icon") name.textContent = item.iconName;
  info.appendChild(name);

  const originalCost = document.createElement("div");
  originalCost.classList.add("name");
  originalCost.style.fontWeight = "bold";
  if (type === "champion" || type === "icon") {
    originalCost.textContent = `Coste original: ${item.blueEssenceCost * 2}`;
    info.appendChild(originalCost);
  }

  // Coste de desbloqueo
  const unlock = document.createElement("div");
  unlock.classList.add("cost"); // <--- esto lo hace visible con tu CSS
  if (type === "champion" || type === "icon") {
    unlock.textContent = `Desbloquear:  - BE ${item.blueEssenceCost}`;
  } else if (type === "skin") {
    unlock.textContent = `Desbloquear:  - OE ${item.orangeEssenceCost}`;
  }
  info.appendChild(unlock);

  // Desencantar
  const disenchant = document.createElement("div");
  if (type === "skin") {
    disenchant.textContent = `Desencantar:  + OE ${item.disenchantRefund}`;
  } else {
    disenchant.textContent = `Desencantar:  + BE ${item.disenchantRefund}`;
  }
  disenchant.classList.add("cost"); // <--- también
  info.appendChild(disenchant);

  modal.appendChild(info);

  // Lo añadimos al body para flotar sobre todo
  document.body.appendChild(modal);

  return modal;
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

window.attachHoverModal = attachHoverModal;
