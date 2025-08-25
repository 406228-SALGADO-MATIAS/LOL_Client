// Modal Item
const modalItem = document.getElementById("itemModal");
const modalItemImg = document.getElementById("itemModalImage");
const modalItemInfo = document.getElementById("itemModalInfo");
const closeModalItem = document.getElementById("itemModalClose");

// Imagen → en su contenedor propio
const modalItemImageContainer = document.getElementById("itemModalImageContainer");
if (modalItemImageContainer) {
  modalItemImageContainer.innerHTML = ""; // limpiar antes
  modalItemImageContainer.appendChild(modalItemImg);
}

// Eventos
if (closeModalItem) closeModalItem.addEventListener("click", () => hideModalItem());
if (modalItem)
  modalItem.addEventListener("click", (e) => {
    if (e.target === modalItem) hideModalItem();
  });

function showModalItem() {
  if (modalItem) modalItem.style.display = "flex";
}

function hideModalItem() {
  if (modalItem) modalItem.style.display = "none";
}

// Abrir modal con un item
function openModalItem(item) {
  if (!item) return;

  if (modalItemImg) modalItemImg.src = item.image || "/assets/default-item.png";

  // Imagen a la izquierda
  const modalItemImageContainer = document.getElementById("itemModalImageContainer");
  if (modalItemImageContainer) {
    modalItemImageContainer.innerHTML = "";
    modalItemImageContainer.appendChild(modalItemImg);
  }

  if (modalItemInfo) {
    modalItemInfo.innerHTML = ""; // Limpiar antes

    // Título
    const title = document.createElement("h2");
    title.textContent = item.name || "Sin nombre";
    modalItemInfo.appendChild(title);

    // Stats
    const fields = {
      itemType: "Tipo",
      cost: "Costo",
      attackDamage: "Attack Damage",
      abilityPower: "Ability Power",
      health: "Health",
      armor: "Armor",
      magicResistance: "Magic Resist",
      coolDownReduction: "Cool Down Red.",
      manaRegeneration: "Mana Regen",
      healingAndShieldPower: "Healing & Shield"
    };

    for (const key in fields) {
      if (item[key] !== null && item[key] !== undefined && item[key] !== "") {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${fields[key]}:</strong> ${item[key]}`;
        modalItemInfo.appendChild(p);
      }
    }

    // Efecto
    if (item.effect) {
      const effectP = document.createElement("p");
      effectP.style.marginTop = "1.5rem";
      effectP.innerHTML = `<strong>Efecto:</strong> ${item.effect.replace(/\\n/g, "<br>")}`;
      modalItemInfo.appendChild(effectP);
    }
  }

  showModalItem();
}


// Hacer global si lo querés llamar desde cards
window.openModalItem = openModalItem;
window.showModalItem = showModalItem;
window.hideModalItem = hideModalItem;
