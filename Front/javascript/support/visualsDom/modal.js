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
  if (modalChamp) modalChamp.classList.add('show');
}

function hideModalChamp() {
  if (modalChamp) modalChamp.classList.remove('show');
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
  if (modalSkin) modalSkin.classList.add('show');
}

function hideModalSkin() {
  if (modalSkin) modalSkin.classList.remove('show');
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

// ==========================
// Modal Icon
// ==========================
const modalIcon = document.getElementById("iconModal");
const modalIconImg = document.getElementById("iconModalImage");
const closeModalIcon = document.getElementById("iconModalClose");
const unlockButtonIcon = document.getElementById("unlockButtonIcon");

if (closeModalIcon)
  closeModalIcon.addEventListener("click", () => hideModalIcon());
if (modalIcon)
  modalIcon.addEventListener("click", (e) => {
    if (e.target === modalIcon) hideModalIcon();
  });

function showModalIcon() {
  if (modalIcon) modalIcon.classList.add('show');
}

function hideModalIcon() {
  if (modalIcon) modalIcon.classList.remove('show');
}

function openModalIcon(icon) {
  if (modalIconImg) modalIconImg.src = icon.image;
  updateUnlockButtonIcon(icon);
  showModalIcon();
}

window.openModalIcon = openModalIcon;
window.showModalIcon = showModalIcon;
window.hideModalIcon = hideModalIcon;
