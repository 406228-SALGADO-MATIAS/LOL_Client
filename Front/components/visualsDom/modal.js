// ==========================
// Modal Campeón
// ==========================
const modalChamp = document.getElementById("championModal");
const modalChampImg = document.getElementById("modalImage");
const closeModalChamp = document.getElementById("modalClose");
const unlockButtonChamp = document.getElementById("unlockButton");

// Solo agregar eventos si existen
if (closeModalChamp)
  closeModalChamp.addEventListener("click", () => hideModalChamp());
if (modalChamp)
  modalChamp.addEventListener("click", (e) => {
    if (e.target === modalChamp) hideModalChamp();
  });

function showModalChamp() {
  if (modalChamp) modalChamp.style.display = "flex";
}

function hideModalChamp() {
  if (modalChamp) modalChamp.style.display = "none";
}

function openModal(champ) {
  if (modalChampImg) modalChampImg.src = champ.imageUrl;
  updateUnlockButton(champ); // tu función actual de desbloqueo
  showModalChamp();
}

// ==========================
// Modal Skin
// ==========================
const modalSkin = document.getElementById("skinModal");
const modalSkinImg = document.getElementById("modalImage");
const closeModalSkin = document.getElementById("modalClose");
const unlockButtonSkin = document.getElementById("unlockButton");

// Solo agregar eventos si existen
if (closeModalSkin)
  closeModalSkin.addEventListener("click", () => hideModalSkin());
if (modalSkin)
  modalSkin.addEventListener("click", (e) => {
    if (e.target === modalSkin) hideModalSkin();
  });

function showModalSkin() {
  if (modalSkin) modalSkin.style.display = "flex";
}

function hideModalSkin() {
  if (modalSkin) modalSkin.style.display = "none";
}

function openModalSkin(skin) {
  if (modalSkinImg) modalSkinImg.src = skin.image;
  updateUnlockButtonSkin(skin, skin.championName);
  showModalSkin();
}

// ==========================
// Exponer funciones globales
// ==========================
window.openModal = openModal;
window.openModalSkin = openModalSkin;
window.showModalChamp = showModalChamp;
window.hideModalChamp = hideModalChamp;
window.showModalSkin = showModalSkin;
window.hideModalSkin = hideModalSkin;
