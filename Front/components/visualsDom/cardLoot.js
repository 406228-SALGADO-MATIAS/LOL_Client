// Card genérica para loot (champion, skin, icon, material)
function createLootCard(item, type) {
  const card = document.createElement("div");
  card.classList.add("card-loot");
  card.style.position = "relative";

  const img = document.createElement("img");
  img.src = item.imageUrl;
  img.alt = item.name;

  // Grayscale solo para loot inactivo (no materiales)
  if (type !== "material" && item.isActive === false) {
    img.style.filter = "grayscale(90%)";
    img.style.opacity = "0.6";
  }

  /* if (type === "champion") {
    img.style.objectPosition = getchampionObjectPosition(item.name);
    img.style.transform = `scale(${getChampionZoom(item.name)})`;
    
  }

  if (type === "skin") {
    img.style.objectPosition = getskinObjectPosition(item.name);
    img.style.transform = `scale(${getSkinZoom(item.name)})`;
    
  }*/

  card.appendChild(img);

  // 👉 Contador
  if (item.quantity && item.quantity > 1) {
    const badge = document.createElement("div");
    badge.textContent = item.quantity;
    badge.style.position = "absolute";
    badge.style.bottom = "5px";
    badge.style.right = "5px";
    badge.style.background = "rgba(0,0,0,0.7)";
    badge.style.color = "white";
    badge.style.fontSize = "0.9rem";
    badge.style.padding = "2px 6px";
    badge.style.borderRadius = "6px";
    card.appendChild(badge);
  }

  // 👉 Click especial para cofres
  if (type === "chest" || type === "masterChest") {
    card.addEventListener("click", () => {
      createChestClickModal(item, type); // acá abrimos el modal que armamos antes
    });
  }

  return card;
}
