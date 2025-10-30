// -----------------------------
// Mostrar mensajes de login
// -----------------------------
function showLoginMessage(text, type = "info") {
  const messageDiv = document.getElementById("loginMessage");
  if (!messageDiv) return;
  messageDiv.innerHTML = `<span class="text-${type}">${text}</span>`;
}

// -----------------------------
// Toggle password
// -----------------------------
function togglePassword(id, el) {
  const input = document.getElementById(id);
  const img = el.querySelector("img");

  if (input.type === "password") {
    input.type = "text";
    img.src =
      "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761530008/eye_uvshov.png";
  } else {
    input.type = "password";
    img.src =
      "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761530005/eye-crossed_xuubre.png";
  }
}

// -----------------------------
// Cargar datos recordados
// -----------------------------

function loadRememberedCredentials() {
  const savedData = JSON.parse(localStorage.getItem("savedLoginData"));
  if (!savedData) return;

  const { server, username, password } = savedData;

  if (server) document.getElementById("server").value = server;
  if (username) document.getElementById("username").value = username;
  if (password) document.getElementById("password").value = password;

  // marcar el checkbox
  const rememberCheck = document.getElementById("rememberUsername");
  if (rememberCheck) rememberCheck.checked = true;
}

// -----------------------------
// Función principal de login
// -----------------------------
// -----------------------------
// Función principal de login
// -----------------------------
async function handleLogin() {
  const server = document.getElementById("server")?.value;
  const username = document.getElementById("username")?.value.trim();
  const password = document.getElementById("password")?.value;
  const rememberCheck = document.getElementById("rememberUsername");

  if (!username || !password) {
    showLoginMessage("Completa todos los campos.", "danger");
    return;
  }

  const payload = { server, username, password };

  try {
    const response = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errorMessage = "Error desconocido";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {}
      showLoginMessage(`Error: ${errorMessage}`, "danger");
      return;
    }

    const data = await response.json();

    // ✅ Guardar o borrar credenciales
    if (rememberCheck?.checked) {
      const savedData = { server, username, password };
      localStorage.setItem("savedLoginData", JSON.stringify(savedData));
    } else {
      localStorage.removeItem("savedLoginData");
    }

    sessionStorage.setItem("userId", data.userId);
    showLoginMessage("Login exitoso", "success");

    setTimeout(() => {
      window.location.href = "../menu.html";
    }, 800);
  } catch (error) {
    console.error(error);
    showLoginMessage("Error al conectar con el servidor.", "danger");
  }
}

// -----------------------------
// Listener click en el botón
// -----------------------------
const loginBtn = document.querySelector("#loginForm button[type='submit']");
if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault(); // evita submit tradicional
    handleLogin();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Primero cargamos los datos recordados
  loadRememberedCredentials();

  const toggle = document.getElementById("disableMenuAnimation");
  const savedPref = localStorage.getItem("bgDisabled") === "true";
  backgroundEnabled = !savedPref;
  if (toggle) toggle.checked = savedPref;

  if (backgroundEnabled) {
    setupBackgroundVideo();
  } else {
    disableBackgroundVideo();
  }

  if (toggle) {
    toggle.addEventListener("change", (e) => {
      backgroundEnabled = !e.target.checked;

      if (backgroundEnabled) {
        const overlay = document.getElementById("video-overlay");
        if (overlay) overlay.style.opacity = 1;

        setTimeout(() => {
          setupBackgroundVideo();
          if (overlay) overlay.style.opacity = 0;
        }, 600);

        localStorage.setItem("bgDisabled", "false");
      } else {
        disableBackgroundVideo();
        localStorage.setItem("bgDisabled", "true");
      }
    });
  }

  // 🔹 Esperamos un poquito antes de animar el form
  setTimeout(() => {
    animateForm();
  }, 110); // ⬅️ 600ms de delay antes de empezar la animación
});
