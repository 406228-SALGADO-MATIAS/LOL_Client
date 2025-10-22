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
  nameEl.classList.add("newitem-modal-name");
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

// 🔹 Lógica principal para abrir varios cofres de manera dinámica
async function showItemsSequentiallyDynamic(type, count) {
  const container = document.getElementById("lootModalContainer");
  let opened = 0;
  let stop = false;

  const overlay = document.createElement("div");
  overlay.classList.add("newitem-modal-overlay");
  container.innerHTML = "";
  container.appendChild(overlay);

  async function showNext() {
    if (stop || opened >= count) {
      container.innerHTML = "";
      await reloadDynamicChestsData();
      return;
    }

    let newItem;
    try {
      newItem = await handleOpenChest(type);
    } catch (err) {
      stop = true;
      container.innerHTML = "";
      await finishRemainingDynamicChests(type, count, opened);
      await reloadDynamicChestsData();
      return;
    }

    createDynamicChestModal(
      newItem,
      overlay,
      async () => {
        opened++;
        await reloadDynamicChestsData();
        showNext();
      },
      async () => {
        if (!stop) {
          stop = true;
          container.innerHTML = "";
          await finishRemainingDynamicChests(type, count, opened);
          await reloadDynamicChestsData();
        }
      }
    );
  }

  showNext();
}

// 🔹 Recarga todos los datos del usuario para el flujo dinámico
async function reloadDynamicChestsData() {
  await loadUserProfile();
  await loadOwnedCollections();
  await loadLootItems();
}

// 🔹 Abre los cofres restantes para el flujo dinámico
async function finishRemainingDynamicChests(type, totalCount, openedCount) {
  const remaining = totalCount - openedCount;
  for (let i = 0; i < remaining; i++) {
    try {
      await handleOpenChest(type);
    } catch (err) {
      // solo log interno, no propagar al usuario
      console.debug(
        `[FINISH WARN] Error simulando cofre restante #${openedCount + i + 1}:`,
        err.message
      );
    }
  }
}

// 🔹 Crea el modal visual del ítem para el flujo dinámico
function createDynamicChestModal(newItem, overlay, onAdd, onCancel) {
  overlay.innerHTML = "";

  const modal = document.createElement("div");
  modal.classList.add("newitem-modal");

  const img = document.createElement("img");
  img.src = newItem.image;
  img.alt = newItem.name;

  const nameEl = document.createElement("div");
  nameEl.classList.add("newitem-modal-name");
  nameEl.textContent = newItem.name.replace(/´/g, "'");
  nameEl.style.textAlign = "center";

  const button = document.createElement("button");
  button.textContent = "Añadir";
  button.classList.add("newitem-btn");
  button.style.marginTop = "15px";

  button.addEventListener("click", onAdd);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) onCancel();
  });

  modal.appendChild(img);
  modal.appendChild(nameEl);
  modal.appendChild(button);
  overlay.appendChild(modal);
}
