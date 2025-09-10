function createNewItemModal(newItem, onClose) {
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
  nameEl.classList.add("newitem-modal-name")
  nameEl.textContent = newItem.name.replace(/´/g, "'");
  
  nameEl.style.textAlign = "center";
  

  const button = document.createElement("button");
  button.textContent = "Añadir";
  button.classList.add("newitem-btn");
  button.style.marginTop = "15px";

  const closeAndReload = async () => {
    container.innerHTML = "";
    await loadUserProfile();
    await loadOwnedCollections();
    await loadLootItems();
    if (onClose) onClose(); // reaplicar filtro o callback extra
  };

  button.addEventListener("click", closeAndReload);

  modal.appendChild(img);
  modal.appendChild(nameEl);
  modal.appendChild(button);

  overlay.appendChild(modal);
  container.appendChild(overlay);

  // cerrar clickeando afuera y recargar
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeAndReload(); // <--- usamos la misma función que el botón
    }
  });
}
