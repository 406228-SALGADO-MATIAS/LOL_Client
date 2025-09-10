function checkSession() {
  const userId = sessionStorage.getItem("userId");
  if (!userId) {
    alert("Error: No hay sesión activa. Serás redirigido al login.");
    window.location.href = "/pages/out/intro.html";
  }
}

async function loadUserProfile() {
  const userId = sessionStorage.getItem("userId");
  if (!userId) return;

  try {
    const res = await fetch(
      `http://localhost:8080/users/getProfileById/${userId}`
    );
    if (!res.ok) throw new Error("Error cargando perfil");

    const data = await res.json();

    const nicknameEl = document.getElementById("userNickname");
    let serverShort = "";
    if (data.server) {
      const match = data.server.match(/\(([^)]+)\)/);
      if (match) serverShort = match[1];
    }

    nicknameEl.innerHTML = `${
      data.nickname || "Sin nick"
    }<span style="font-weight: normal; font-size: 1.3rem">#${serverShort}</span>`;

    document.getElementById("userBE").textContent = data.blueEssence ?? 0;
    document.getElementById("userRP").textContent = data.riotPoints ?? 0;

    const userIcon = document.getElementById("userIcon");

    // Si no hay icono o viene vacío, asignamos el "none.jpg"
    const iconSrc =
      data.iconImage && data.iconImage.trim() !== ""
        ? data.iconImage
        : "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/profileIcons/none.jpg?raw=true";

    userIcon.src = iconSrc;
    userIcon.style.width = "auto";
    userIcon.style.height = "100%";
    userIcon.style.objectFit = "cover";
  } catch (err) {
    console.error(err);
  }
}

// Ejecutar inmediatamente porque el navbar ya está en el DOM
checkSession();
loadUserProfile();

// Configurar logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () =>
    sessionStorage.removeItem("userId")
  );
}

// Volver a cargar cuando se vuelve a la página
window.addEventListener("pageshow", () => {
  checkSession();
  loadUserProfile();
});
