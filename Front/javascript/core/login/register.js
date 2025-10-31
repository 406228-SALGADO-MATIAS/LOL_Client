// register.js

// -----------------------------
// SELECTORES DE ELEMENTOS
// -----------------------------
const createForm = document.getElementById("createForm");
const serverSelect = document.getElementById("server");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const emailInput = document.getElementById("email");
const nicknameInput = document.getElementById("nickname");
const messageEl = document.getElementById("message");

/**
 * Muestra un mensaje en el div #message
 * @param {string} text - Texto del mensaje
 * @param {'success'|'danger'} type - Tipo de mensaje
 */
function showMessage(text, type) {
  messageEl.innerText = text;
  messageEl.classList.remove("text-success", "text-danger");
  messageEl.classList.add(type === "success" ? "text-success" : "text-danger");
}

/**
 * Valida que password y confirmPassword coincidan
 * @returns {boolean}
 */

async function handleSubmit(e) {
  e.preventDefault();

  const ok = await validate();
  if (!ok) return; // errores críticos, no seguimos

  // Si todo bien, construimos DTO y hacemos register
  const dto = {
    username: usernameInput.value.trim(),
    password: passwordInput.value,
    email: emailInput.value.trim(),
    nickname: nicknameInput.value.trim(),
  };
  const server = serverSelect.value;

  try {
    const res = await fetch(
      `http://localhost:8080/users/createUser?serverOption=${server}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      }
    );

    if (res.ok) {
      showMessage("Registración exitosa!", "success");

      // 🧠 Si está tildado "remember", guardamos los datos
      const rememberCheck = document.getElementById("remember-info");
      if (rememberCheck.checked) {
        const dataToSave = {
          email: emailInput.value.trim(),
          username: usernameInput.value.trim(),
          password: passwordInput.value, // 🔥 incluimos password
          nickname: nicknameInput.value.trim(),
          server: serverSelect.value,
        };
        localStorage.setItem("registerData", JSON.stringify(dataToSave));
      } else {
        localStorage.removeItem("registerData");
      }

      // Redirección o mensaje
      // setTimeout(() => window.location.href = "/pages/out/intro.html", 2000);
      return;
    }

    // Si no fue OK, leemos la respuesta
    const data = await res.json();
    const msg = data.message || "";

    // 🔍 Detectar tipo de mensaje y mostrar en el campo correspondiente
    if (msg.includes("email")) {
      showInputMessage("emailMsg", msg, "warning");
    } else if (msg.includes("username")) {
      showInputMessage("usernameMsg", msg, "warning");
    } else if (msg.includes("nickname")) {
      showInputMessage("nicknameMsg", msg, "warning");
    } else {
      // Mensaje genérico si no matchea
      showMessage(msg || "Error al registrar usuario.", "danger");
    }
  } catch (err) {
    console.error("Error en registro:", err);
    showMessage("Error al conectar con el servidor", "danger");
  }
}

function handleRememberInfo() {
  const rememberBox = document.getElementById("remember-info");
  if (!rememberBox) return;

  if (rememberBox.checked) {
    // Guardamos los campos principales
    const data = {
      email: emailInput.value.trim(),
      username: usernameInput.value.trim(),
      password: passwordInput.value,
      nickname: nicknameInput.value.trim(),
      server: serverSelect.value,
    };
    localStorage.setItem("rememberedRegister", JSON.stringify(data));
  } else {
    // Si no está marcado, eliminamos cualquier dato guardado
    localStorage.removeItem("rememberedRegister");
  }
}

function loadRememberedRegister() {
  const remembered = JSON.parse(localStorage.getItem("rememberedRegister"));
  if (!remembered) return;

  emailInput.value = remembered.email || "";
  usernameInput.value = remembered.username || "";
  passwordInput.value = remembered.password || "";
  nicknameInput.value = remembered.nickname || "";
  serverSelect.value = remembered.server || "LAS";

  // Activamos el checkbox para mostrar que está recordando
  const rememberBox = document.getElementById("remember-info");
  if (rememberBox) rememberBox.checked = true;
}

createForm.addEventListener("submit", handleSubmit);

let videoInterval = null;
let backgroundEnabled = true;

document.addEventListener("DOMContentLoaded", () => {
  animateForm();
  setupBackgroundVideo();

  const toggle = document.getElementById("toggle-bg");
  toggle.addEventListener("change", (e) => {
    backgroundEnabled = e.target.checked;

    if (backgroundEnabled) {
      const overlay = document.getElementById("video-overlay");
      overlay.style.opacity = 1;
      setTimeout(() => {
        document.body.style.background = "";
        setupBackgroundVideo();
        overlay.style.opacity = 0;
      }, 600);
    } else {
      disableBackgroundVideo();
    }
  });

  // 🧠 Remember data
  const rememberCheck = document.getElementById("remember-info");

  // Si hay datos guardados, los cargamos
  const savedData = JSON.parse(localStorage.getItem("registerData"));
  if (savedData) {
    emailInput.value = savedData.email || "";
    usernameInput.value = savedData.username || "";
    passwordInput.value = savedData.password || "";
    nicknameInput.value = savedData.nickname || "";
    serverSelect.value = savedData.server || "LAS";

    rememberCheck.checked = true;

    // 🔹 Activamos el estado "focused" de los labels
    [emailInput, usernameInput, passwordInput, nicknameInput].forEach(
      (input) => {
        if (input.value) {
          input.parentNode.classList.add("focused");
        }
      }
    );
  }

  // Cuando cambia el checkbox remember, si lo desactivás, se limpia
  rememberCheck.addEventListener("change", () => {
    if (!rememberCheck.checked) {
      localStorage.removeItem("registerData");
    }
  });
});
