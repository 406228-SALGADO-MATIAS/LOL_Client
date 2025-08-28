function createChestClickModal(item, type) {
  const container = document.getElementById("lootModalContainer");
  container.innerHTML = ""; // limpio por si ya hay otro modal abierto

  // Overlay del modal (fondo oscuro semitransparente)
  const overlay = document.createElement("div");
  overlay.classList.add("chest-modal-overlay");

  // Contenido del modal (imagen + botón)
  const modal = document.createElement("div");
  modal.classList.add("chest-modal");

  const img = document.createElement("img");
  img.src = item.imageUrl;
  img.alt = "Chest";
  img.style.maxWidth = "200px";
  img.style.height = "auto";
  img.style.display = "block";
  img.style.margin = "0 auto";

  const button = document.createElement("button");
  button.classList.add("chest-btn");
  button.textContent =
    getItemStatus(item, type) === "NEEDS_KEY" ? "Necesita llave" : "Abrir";

  // Acción del botón (acá después conectamos la lógica real)
  button.addEventListener("click", async () => {
    if (getItemStatus(item, type) === "NEEDS_KEY") {
      alert("Este cofre necesita una llave 🔑");
    } else {
      try {
        const newItem = await handleOpenChest(type);
        container.innerHTML = ""; // cierro modal del cofre
        createNewItemModal(newItem); // abro modal del reward
      } catch (err) {
        alert("Error abriendo cofre: " + err.message);
      }
    }
  });

  modal.appendChild(img);
  modal.appendChild(button);

  overlay.appendChild(modal);
  container.appendChild(overlay);

  // Cerrar modal clickeando afuera
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      container.innerHTML = "";
    }
  });
}
