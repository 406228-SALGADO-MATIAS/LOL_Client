function createNewItemModal(newItem) {
  const container = document.getElementById("lootModalContainer");
  container.innerHTML = "";

  const overlay = document.createElement("div");
  overlay.classList.add("newitem-modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("newitem-modal");

  const img = document.createElement("img");
  img.src = newItem.image;
  img.alt = newItem.name;

  const nameEl = document.createElement("div");
  nameEl.textContent = newItem.name;
  nameEl.style.fontSize = "1.6rem";
  nameEl.style.textAlign = "center";
  nameEl.style.marginTop = "10px";

  const button = document.createElement("button");
  button.textContent = "Añadir";
  button.classList.add("newitem-btn");
  button.style.marginTop = "15px";

  const closeAndReload = async () => {
    container.innerHTML = "";
    await loadUserProfile();
    await loadOwnedCollections();
    await loadLootItems();
  };

  button.addEventListener("click", closeAndReload);

  modal.appendChild(img);
  modal.appendChild(nameEl);
  modal.appendChild(button);

  overlay.appendChild(modal);
  container.appendChild(overlay);

  // cerrar clickeando afuera y recargar
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeAndReload();
  });
}
