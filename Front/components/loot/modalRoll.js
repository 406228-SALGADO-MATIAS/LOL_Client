let isLootRollModalOpen = false;

let selectedItemsForRoll = [null, null, null]; // max 3 slots

async function createLootRollModal(rollType) {
  // Si ya hay un modal abierto, cerrarlo primero y esperar
  if (isLootRollModalOpen) {
    await new Promise((resolve) => closeLootRollModal(resolve));
  }

  const container = document.getElementById("lootModalContainer");
  container.innerHTML = "";

  const overlay = document.createElement("div");
  overlay.classList.add("loot-roll-overlay");

  const modal = document.createElement("div");
  modal.classList.add("loot-roll-modal");

  const closeButton = document.createElement("button");
  closeButton.classList.add("loot-roll-close");
  closeButton.textContent = "x";
  closeButton.addEventListener("click", closeLootRollModal);

  // --- NUEVO: título dinámico ---
  const title = document.createElement("div");
  title.classList.add("loot-roll-title");
  title.style.textAlign = "center"; // solo inline centrado
  switch (rollType) {
    case "champion":
      title.textContent = "Campeones";
      break;
    case "skin":
      title.textContent = "Skins";
      break;
    case "icon":
      title.textContent = "Iconos";
      break;
    default:
      title.textContent = "";
  }
  modal.appendChild(title); // agregamos el título arriba del contenedor de items

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("loot-roll-img-container");

  // generamos 3 slots vacíos
  for (let i = 0; i < 3; i++) {
    const slot = document.createElement("div");
    slot.classList.add("loot-roll-slot");
    slot.dataset.index = i;

    const placeholder = document.createElement("span");
    placeholder.textContent = "+";
    placeholder.classList.add("loot-roll-placeholder");

    slot.appendChild(placeholder);
    imgContainer.appendChild(slot);
  }

  const rollButton = document.createElement("button");
  rollButton.classList.add("loot-roll-btn");
  rollButton.textContent = "ROLL";

  rollButton.addEventListener("click", async () => {
    try {
      // Llamamos al handleRoll con el tipo del roll abierto y los items seleccionados
      await handleRoll(selectedRollType, selectedItemsForRoll);

      // Cerramos el modal si querés
      closeLootRollModal();

      // Limpiamos el array de selección para el próximo roll
      selectedItemsForRoll.fill(null);
      updateRollButtonState(); // para que quede gris/deshabilitado otra vez
    } catch (err) {
      console.error(err);
      alert("Error ejecutando el roll: " + err.message);
    }
  });

  modal.appendChild(closeButton);
  modal.appendChild(imgContainer);
  modal.appendChild(rollButton);

  overlay.appendChild(modal);
  container.appendChild(overlay);

  isLootRollModalOpen = true;

  // Guardamos el tipo del roll
  selectedRollType = rollType; // variable global
  updateRollButtonState();
}

function addItemToRoll(item) {
  if (!isLootRollModalOpen) return;

  // Validar que el tipo coincida con el roll abierto
  if (item.type !== selectedRollType) {
    console.log(
      `No puedes añadir ${item.type}, el roll es de ${selectedRollType}`
    );
    return;
  }

  // Validar que no esté ya agregado
  if (selectedItemsForRoll.some((i) => i && i.name === item.name)) {
    console.log(`El item ${item.name} ya está agregado`);
    return;
  }

  // Buscar el primer slot vacío
  const index = selectedItemsForRoll.findIndex((i) => i === null);
  if (index === -1) {
    console.log("Ya hay 3 items seleccionados");
    return;
  }

  // Guardamos el objeto
  selectedItemsForRoll[index] = item;

  // Renderizamos en el slot
  const slot = document.querySelector(`.loot-roll-slot[data-index="${index}"]`);
  slot.innerHTML = "";

  const img = document.createElement("img");
  img.src = item.imageUrl || item.icon;
  img.alt = item.name;
  img.classList.add("loot-roll-img");
  img.style.animation = "appearBlur 0.1s ease-out forwards";

  // Al hacer click sobre la imagen, removemos el item del slot
  img.addEventListener("click", () => removeItemFromRoll(index));

  slot.appendChild(img);
  updateRollButtonState(); // actualizamos el estado del botón
}

function removeItemFromRoll(index) {
  selectedItemsForRoll[index] = null;

  const slot = document.querySelector(`.loot-roll-slot[data-index="${index}"]`);
  const img = slot.querySelector("img");

  if (img) {
    img.style.animation = "removeItem 0.08s ease forwards";
    setTimeout(() => {
      slot.innerHTML = "";
      const placeholder = document.createElement("span");
      placeholder.textContent = "+";
      placeholder.classList.add("loot-roll-placeholder");
      slot.appendChild(placeholder);
    }, 200);
  }
}

function closeLootRollModal(onClosed) {
  const container = document.getElementById("lootModalContainer");
  const modal = container.querySelector(".loot-roll-modal");
  if (!modal) {
    if (onClosed) onClosed();
    return;
  }

  // Limpiar selección
  selectedItemsForRoll = [null, null, null];
  selectedRollType = null;
  isLootRollModalOpen = false;

  modal.style.animation = "modalClose 0.15s ease forwards";
  setTimeout(() => {
    container.innerHTML = "";
    if (onClosed) onClosed();
  }, 150);
}

function updateRollButtonState() {
  const rollButton = document.querySelector(".loot-roll-btn");
  if (!rollButton) return;

  // Verificamos si todos los slots están llenos
  const allFilled = selectedItemsForRoll.every((item) => item !== null);

  if (allFilled) {
    rollButton.disabled = false;
    rollButton.style.backgroundColor = "#280041ff";
    rollButton.style.color = "#fff";
    rollButton.style.pointerEvents = "auto";
    rollButton.classList.remove("loot-roll-btn-disabled");
  } else {
    rollButton.disabled = true;
    rollButton.style.backgroundColor = "#ccc";
    rollButton.style.color = "#666";
    rollButton.style.pointerEvents = "none";
    rollButton.classList.add("loot-roll-btn-disabled");
  }
}
