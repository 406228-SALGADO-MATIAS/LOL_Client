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

    if (rememberCheck?.checked) {
      localStorage.setItem("savedUsername", username);
    } else {
      localStorage.removeItem("savedUsername");
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

// Inicializamos video directamente
document.addEventListener("DOMContentLoaded", () => {
  setupBackgroundVideo(); // ahora existe, porque loginUi.js ya cargó
});
