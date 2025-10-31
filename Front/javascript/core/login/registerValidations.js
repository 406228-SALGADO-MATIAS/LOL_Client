// registerValidations.js //

/**
 * Función principal de validación antes de enviar
 * Devuelve true si todo está OK, false si hay errores críticos
 */

async function validate() {
  let isValid = true;

  // Limpiar mensajes anteriores
  clearAllMessages();

  // 1️⃣ Validaciones básicas
  if (!validateEmailField()) isValid = false;
  if (!validatePasswordField()) isValid = false;
  if (!validateConfirmPasswordField()) isValid = false;
  if (!validateEmptyFields()) isValid = false;

  if (!isValid) return false; // hay errores críticos

  // 2️⃣ Validaciones de datos repetidos (simulación front)
  validateDuplicates();

  return true;
}

function validateEmail(email) {
  if (!email || !email.trim()) {
    return "El email no puede estar vacío.";
  }

  const trimmedEmail = email.trim();

  if (trimmedEmail.length < 6) {
    return "El email es demasiado corto para ser válido.";
  }

  if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
    return "El email debe contener '@' y un dominio como '.com'.";
  }

  const atIndex = trimmedEmail.indexOf("@");
  const lastDotIndex = trimmedEmail.lastIndexOf(".");

  if (lastDotIndex < atIndex) {
    return "Estructura de dominio inválida en el email.";
  }

  if (!/\.(com|net|org|edu|gov|io|co)$/.test(trimmedEmail)) {
    return "El email debe terminar con un dominio válido como '.com'.";
  }

  return null; // todo bien
}

function validatePassword(password) {
  if (!password || !password.trim()) {
    return "La contraseña no puede estar vacía.";
  }

  const trimmedPassword = password.trim();

  if (trimmedPassword.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }

  if (!/[A-Z]/.test(trimmedPassword)) {
    return "La contraseña debe contener al menos una letra mayúscula.";
  }

  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(trimmedPassword)) {
    return "La contraseña debe contener al menos un carácter especial.";
  }

  return null; // todo bien
}

/* =======================
   Password & Confirm Password ()
   ======================= */

function validatePasswords() {
  if (passwordInput.value !== confirmPasswordInput.value) {
    showMessage("Las contraseñas no coinciden", "danger");
    return false;
  }
  return true;
}
/* =======================
   Auxiliares de validate ()
   ======================= */

function clearAllMessages() {
  [
    "emailMsg",
    "usernameMsg",
    "passwordMsg",
    "confirmPasswordMsg",
    "nicknameMsg",
    "serverMsg",
  ].forEach((id) => showInputMessage(id, "", ""));
}

function validateEmailField() {
  const emailError = validateEmail(emailInput.value);
  if (emailError) {
    showInputMessage("emailMsg", emailError, "error");
    return false;
  }
  return true;
}

function validatePasswordField() {
  const passwordError = validatePassword(passwordInput.value);
  if (passwordError) {
    showInputMessage("passwordMsg", passwordError, "error");
    return false;
  }
  return true;
}

function validateConfirmPasswordField() {
  if (passwordInput.value !== confirmPasswordInput.value) {
    showInputMessage(
      "confirmPasswordMsg",
      "Las contraseñas no coinciden.",
      "error"
    );
    return false;
  }
  return true;
}

function validateEmptyFields() {
  let valid = true;

  if (!usernameInput.value.trim()) {
    showInputMessage(
      "usernameMsg",
      "El nombre de usuario no puede estar vacío.",
      "error"
    );
    valid = false;
  }

  if (!nicknameInput.value.trim()) {
    showInputMessage(
      "nicknameMsg",
      "El nickname no puede estar vacío.",
      "error"
    );
    valid = false;
  }

  if (!serverSelect.value.trim()) {
    showInputMessage("serverMsg", "Selecciona un servidor.", "error");
    valid = false;
  }

  return valid;
}

function validateDuplicates() {
  const emailValue = emailInput.value.trim().toLowerCase();
  const usernameValue = usernameInput.value.trim();
  const nicknameValue = nicknameInput.value.trim();
  const server = serverSelect.value;

  const existingUsers = [
    {
      email: "test1@example.com",
      username: "user1",
      nickname: "nick1",
      server: "LAS",
    },
    {
      email: "test2@example.com",
      username: "user2",
      nickname: "nick2",
      server: "LAS",
    },
  ];

  const repeatedEmail = existingUsers.find(
    (u) => u.email.toLowerCase() === emailValue && u.server === server
  );
  if (repeatedEmail) {
    showInputMessage(
      "emailMsg",
      `El email (${emailValue}) no está disponible.`,
      "warning"
    );
  }

  const repeatedUsername = existingUsers.find(
    (u) => u.username === usernameValue && u.server === server
  );
  if (repeatedUsername) {
    showInputMessage(
      "usernameMsg",
      `El username (${usernameValue}) ya está en uso en ${server}.`,
      "warning"
    );
  }

  const repeatedNickname = existingUsers.find(
    (u) =>
      u.nickname.toLowerCase() === nicknameValue.toLowerCase() &&
      u.server === server
  );
  if (repeatedNickname) {
    showInputMessage(
      "nicknameMsg",
      `El nickname (${nicknameValue}) ya está en uso en ${server}.`,
      "warning"
    );
  }
}
