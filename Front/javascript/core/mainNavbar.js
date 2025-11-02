function getSessionUserId() {
  return sessionStorage.getItem("userId") || null;
}

function checkSession() {
  const userId = sessionStorage.getItem("userId");
  if (!userId) {
    alert("Error: No hay sesión activa. Serás redirigido al login.");
    window.location.href = "/pages/out/intro.html";
  }
}

// Carga los datos del perfil del usuario de sesión
// Carga los datos del perfil del usuario de sesión
async function loadUserProfile() {
  const userId = getSessionUserId();
  if (!userId) return;

  try {
    // 🔹 Obtenemos { data, status, url }
    const { data } = await apiOut.getProfileDetailed(userId);

    // Nickname y servidor
    const nicknameEl = document.getElementById("userNickname");
    let serverShort = "";
    if (data.server) {
      const match = data.server.match(/\(([^)]+)\)/);
      if (match) serverShort = match[1];
    }

    nicknameEl.innerHTML = `
      ${data.nickname || "Sin nick"}
      <span class="user-server">#${serverShort}</span>
    `;

    // BE y RP
    document.getElementById("userBE").textContent = data.blueEssence ?? 0;
    document.getElementById("userRP").textContent = data.riotPoints ?? 0;

    // Icono de usuario
    const userIcon = document.getElementById("userIcon");
    const iconSrc =
      data.iconImage && data.iconImage.trim() !== ""
        ? data.iconImage
        : "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761336571/none_ep19ag.jpg";

    userIcon.src = iconSrc;

    // ==== ANIMACIÓN DE APARICIÓN ====
    const profileBox = document.getElementById("userProfileBox");
    setTimeout(() => profileBox.classList.add("visible"), 100);
  } catch (err) {
    console.error("Error cargando perfil:", err);
  }
}

// Configurar logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () =>
    sessionStorage.removeItem("userId")
  );
}

// Ejecutar al cargar el DOM
checkSession();
loadUserProfile();

// Refrescar al volver a la página
window.addEventListener("pageshow", () => {
  checkSession();
  loadUserProfile();
});
