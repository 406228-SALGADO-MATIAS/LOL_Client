function createNewItemModal(newItem, onClose) {
  // 🔹 cerrar modal de estado una vez que todo terminó
  closeStatusModal();
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

  const closeAndReload = async (isFinal = true) => {
    const overlayEl = document.querySelector(".newitem-modal-overlay");
    const modalEl = overlayEl?.querySelector(".newitem-modal");

    // lanzar animación de salida (sin esperar)
    if (modalEl) modalEl.classList.add("fade-out");
    if (isFinal && overlayEl) overlayEl.classList.add("fade-out");

    // 🔹 iniciamos reload inmediatamente
    const reloadPromise = Promise.all([
      loadUserProfile(),
      loadOwnedCollections(),
      loadLootItems(),
    ]);

    // limpiar DOM mientras tanto
    setTimeout(() => (container.innerHTML = ""), 0);

    await reloadPromise; // esperamos los datos antes del cierre

    if (onClose) onClose();
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
  await Promise.all([
    loadUserProfile(),
    loadOwnedCollections(),
    loadLootItems(),
  ]);
}

// 🔹 Abre los cofres restantes para el flujo dinámico
async function finishRemainingDynamicChests(type, totalCount, openedCount) {
  let remaining = totalCount - openedCount;

  for (let i = 0; i < remaining; i++) {
    try {
      await handleOpenChest(type);

      const newRemaining = remaining - (i + 1);
      updateStatusModal(
        "Cargando inventario",
        `Terminando de abrir cofres... 
        Restantes: ${newRemaining}`
      );
    } catch (err) {}
  }

  // 🔹 Cerrar modal al terminar
  closeStatusModal("Todos los cofres fueron abiertos ✅");
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

  // función para cerrar con animación
  async function animateClose(isFinal) {
    modal.classList.add("fade-out");
    if (isFinal) overlay.classList.add("fade-out");
    await new Promise((res) => setTimeout(res, 250));
  }

  // click en añadir → fade modal, mantener overlay (porque sigue la secuencia)
  button.addEventListener("click", async () => {
    animateClose(false);
    onAdd();
  });

  // click fuera → fade modal + overlay
  overlay.addEventListener("click", async (e) => {
    if (e.target === overlay) {
      animateClose(true);

      // 🔹 Mostrar modal de estado
      openStatusModal("Cargando inventario", "Abriendo cofres restantes...");

      // 🔹 Ejecutar el onCancel, que ya maneja los cofres restantes
      await onCancel();

      // 🔹 Cerrar el modal de estado cuando termine todo
      closeStatusModal();
    }
  });

  modal.appendChild(img);
  modal.appendChild(nameEl);
  modal.appendChild(button);
  overlay.appendChild(modal);
}

// 🔹 Muestra en secuencia todos los ítems desbloqueados del enchantAll
async function showItemsSequentiallyEnchantAll(itemsList) {
  if (!itemsList || !itemsList.length) return;

  const container = document.getElementById("lootModalContainer");
  container.innerHTML = "";
  let current = 0;
  let stop = false;

  const overlay = document.createElement("div");
  overlay.classList.add("newitem-modal-overlay");
  container.appendChild(overlay);

  // 🔸 Cierra todo y recarga inventario
  async function finishSequence() {
    container.innerHTML = "";
    openStatusModal("Actualizando inventario", "Refrescando colecciones...");
    await Promise.all([
      loadUserProfile(),
      loadOwnedCollections(),
      loadLootItems(),
    ]);
    closeStatusModal("Inventario actualizado ✅");
  }

  async function showNext() {
    if (stop || current >= itemsList.length) {
      await finishSequence();
      return;
    }

    const item = itemsList[current];

    createDynamicEnchantModal(
      item,
      overlay,
      async () => {
        current++;
        showNext(); // mostrar siguiente
      },
      async () => {
        stop = true;
        await finishSequence(); // canceló → recarga
      }
    );
  }

  showNext();
}

// 🔹 Modal individual para cada ítem desbloqueado por enchantAll
function createDynamicEnchantModal(newItem, overlay, onAdd, onCancel) {
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

  // animación de salida
  async function animateClose(isFinal = false) {
    modal.classList.add("fade-out");
    if (isFinal) overlay.classList.add("fade-out");
    await new Promise((res) => setTimeout(res, 250));
  }

  button.addEventListener("click", async () => {
    await animateClose(false);
    onAdd();
  });

  overlay.addEventListener("click", async (e) => {
    if (e.target === overlay) {
      await animateClose(true);
      onCancel();
    }
  });

  modal.appendChild(img);
  modal.appendChild(nameEl);
  modal.appendChild(button);
  overlay.appendChild(modal);
}
