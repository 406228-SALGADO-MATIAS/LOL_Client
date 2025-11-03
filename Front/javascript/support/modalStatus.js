/* ========================= */
/* modalStatus.js       */
/* ========================= */

let statusModalOverlay = null;
let messageEl = null;
let subMessageEl = null;

function createStatusModal() {
  if (statusModalOverlay) return; // ya creado

  statusModalOverlay = document.createElement("div");
  statusModalOverlay.className = "status-modal-overlay";

  const box = document.createElement("div");
  box.className = "status-modal-box";

  messageEl = document.createElement("div");
  messageEl.className = "status-modal-message";
  messageEl.innerText = "Cargando...";

  subMessageEl = document.createElement("div");
  subMessageEl.className = "status-modal-submessage";
  subMessageEl.innerText = "";

  const hr = document.createElement("hr");

  const barsContainer = document.createElement("div");
  barsContainer.className = "status-modal-bars";
  for (let i = 0; i < 4; i++) {
    const bar = document.createElement("div");
    bar.className = "status-modal-bar";
    barsContainer.appendChild(bar);
  }

  box.appendChild(messageEl);
  box.appendChild(hr);
  box.appendChild(subMessageEl);
  box.appendChild(barsContainer);
  statusModalOverlay.appendChild(box);
  document.body.appendChild(statusModalOverlay);
}

function animateBars() {
  // CSS ya hace la animación wave
}

function openStatusModal(message = "Cargando...", subMessage = "") {
  createStatusModal();

  if (!statusModalOverlay) return;

  // ⚡ Asegurarse de que el overlay esté visible
  statusModalOverlay.style.display = "flex";

  if (messageEl) messageEl.innerText = message;
  if (subMessageEl) subMessageEl.innerText = subMessage;

  // fade in
  statusModalOverlay.classList.add("active");
  animateBars();
}

function updateStatusModal(message, subMessage) {
  if (messageEl && message) messageEl.innerText = message;
  if (subMessageEl && subMessage !== undefined)
    subMessageEl.innerText = subMessage;
}

function closeStatusModal() {
  if (!statusModalOverlay) return;

  // fade out
  statusModalOverlay.classList.remove("active");

  // esperar la transición antes de ocultar completamente
  setTimeout(() => {
    if (statusModalOverlay) statusModalOverlay.style.display = "none";
  }, 300); // coincide con el transition-duration del CSS
}
