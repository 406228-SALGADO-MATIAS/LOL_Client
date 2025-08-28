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
  img.style.maxWidth = "200px";
  img.style.margin = "0 auto";
  img.style.display = "block";

  const nameEl = document.createElement("div");
  nameEl.textContent = newItem.name;
  nameEl.style.fontSize = "1.5rem";
  nameEl.style.textAlign = "center";
  nameEl.style.marginTop = "10px";

  const button = document.createElement("button");
  button.textContent = "Añadir";
  button.classList.add("newitem-btn");
  button.style.marginTop = "15px";

  button.addEventListener("click", async () => {
    container.innerHTML = "";
    await loadUserProfile();
    await loadOwnedCollections();
    await loadLootItems();
  });

  modal.appendChild(img);
  modal.appendChild(nameEl);
  modal.appendChild(button);

  overlay.appendChild(modal);
  container.appendChild(overlay);

  // cerrar clickeando afuera
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) container.innerHTML = "";
  });
}
