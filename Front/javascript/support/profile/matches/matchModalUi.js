function enableModalCloseOnOutsideClick() {
  const overlay = document.querySelector(".mm-overlay");
  const modal = document.querySelector(".mm-modal");
  if (!overlay || !modal) return;

  // Cerrar al click en el fondo (no dentro del modal)
  overlay.addEventListener("mousedown", (e) => {
    // Solo cerrar si el click fue directamente sobre el overlay
    if (e.target === overlay) {
      closeModal();
    }
  });
}

function closeModal() {
  const overlay = document.querySelector(".mm-overlay");
  if (!overlay) return;

  overlay.classList.add("hide");
  setTimeout(() => {
    overlay.remove();
  }, 250); // animación de salida
}

// --- Separador visual ---
function createSeparator() {
  const sep = document.createElement("span");
  sep.textContent = " - ";
  sep.classList.add("mm-separator");
  return sep;
}

function highlightMemberCard() {
  const allMembers = document.querySelectorAll(".mm-member");

  allMembers.forEach((card) => {
    const uid = card.dataset.userid;

    // Resetear todos los borders
    card.style.border = "1px solid transparent";
    card.style.boxShadow = "none";

    // Caso 1: hay searchedUserId
    if (window.searchedUserId) {
      if (String(uid) === String(window.searchedUserId)) {
        card.style.border = "2px solid #ffbb00cb"; // dorado
        card.style.boxShadow = "0 0 10px #635400ff";
      } else if (String(uid) === String(window.originalUserId)) {
        card.style.border = "2px solid white"; // blanco
        card.style.boxShadow = "0 0 10px #808080ff";
      }
    }
    // Caso 2: no hay searchedUserId → original es dorado
    else if (String(uid) === String(window.originalUserId)) {
      card.style.border = "2px solid #ffbb009c"; // dorado
      card.style.boxShadow = "0 0 10px #635400ff";
    }
  });
}

// ----------- LÓGICA DE CLICK EN EL NICK -----------
async function handleNickClick(userId) {
  const transition = document.querySelector(".page-transition");
  if (!transition) return;

  // Mostrar la transición
  transition.classList.remove("hidden");

  // Cerrar modal primero
  const overlay = document.querySelector(".mm-overlay");
  if (overlay) overlay.remove();

  // Esperar a que la transición termine (150ms)
  await new Promise((resolve) => setTimeout(resolve, 150));

  // Lógica de selección/deselección
  if (String(userId) === String(window.originalUserId)) {
    window.searchedUserId = null;
    sessionStorage.removeItem("tempUserId");
  } else {
    window.searchedUserId = userId;
    sessionStorage.setItem("tempUserId", userId);
  }

  // **Resaltar la tarjeta correcta**
  highlightMemberCard();

  // Actualizar botón de retorno
  const btn = document.getElementById("btnReturnProfile");
  if (btn) {
    btn.style.display =
      window.searchedUserId && window.searchedUserId !== window.originalUserId
        ? "inline-block"
        : "none";
  }

  // Ejecutar la carga principal
  if (typeof window.onUserSelected === "function") {
    await window.onUserSelected(window.searchedUserId);
  }

  // Ocultar la transición
  transition.classList.add("hidden");
}
