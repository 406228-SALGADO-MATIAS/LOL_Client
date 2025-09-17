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
async function loadUserProfile() {
  const userId = getSessionUserId();
  if (!userId) return;

  try {
    const res = await fetch(
      `http://localhost:8080/users/getProfileById/${userId}`
    );
    if (!res.ok) throw new Error("Error cargando perfil");

    const data = await res.json();

    // Nickname y servidor
    const nicknameEl = document.getElementById("userNickname");
    let serverShort = "";
    if (data.server) {
      const match = data.server.match(/\(([^)]+)\)/);
      if (match) serverShort = match[1];
    }
    nicknameEl.innerHTML = `${
      data.nickname || "Sin nick"
    }<span style="font-weight: normal; font-size: 1.3rem">#${serverShort}</span>`;

    // BE y RP
    document.getElementById("userBE").textContent = data.blueEssence ?? 0;
    document.getElementById("userRP").textContent = data.riotPoints ?? 0;

    // Icono de usuario
    const userIcon = document.getElementById("userIcon");
    const iconSrc =
      data.iconImage && data.iconImage.trim() !== ""
        ? data.iconImage
        : "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/profileIcons/none.jpg?raw=true";
    userIcon.src = iconSrc;
    userIcon.style.width = "auto";
    userIcon.style.height = "100%";
    userIcon.style.objectFit = "cover";

    // ==== ANIMACIÓN DE APARICIÓN ====
    const profileBox = document.getElementById("userProfileBox");
    // agregamos clase 'visible' después de un pequeño timeout
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
