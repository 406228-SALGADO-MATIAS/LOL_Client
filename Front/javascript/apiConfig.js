// --- apiConfig.js ---
const LOCAL_URL = "http://localhost:8080";
const RENDER_URL = "https://lol-client-back.onrender.com";

/**
 * smartFetchUniversal:
 * Hace fetch paralelo a varias URLs y devuelve siempre:
 * { data, status, url }
 * Lanza error solo si **ninguna URL respondió**
 */
async function smartFetchUniversal(endpoint, options = {}) {
  const urls = [`${LOCAL_URL}${endpoint}`, `${RENDER_URL}${endpoint}`];
  const controllers = urls.map(() => new AbortController());

  const fetchPromises = urls.map((url, i) =>
    fetch(url, { ...options, signal: controllers[i].signal })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        return { data, status: res.status, url };
      })
      .catch((err) => {
        if (err.name === "AbortError") return null; // ignoramos abort
        return Promise.reject(err);
      })
  );

  let result;
  try {
    result = await Promise.any(fetchPromises);
  } catch (err) {
    throw new Error("❌ Ninguna URL respondió correctamente");
  }

  // Cancelar los fetch restantes
  controllers.forEach((ctrl) => {
    try {
      ctrl.abort();
    } catch (e) {}
  });

  if (!result) throw new Error("❌ Ninguna URL respondió correctamente");

  console.log(
    `✅ smartFetchUniversal conectó a: ${
      result.url.includes(LOCAL_URL) ? "localhost" : "Render"
    }`
  );

  return result; // { data, status, url }
}

/**
 * API de usuario / login / perfil
 */
const apiOut = {
  /**
   * Registrar usuario
   * Retorna { data, status }
   */
  register: (dto, server) =>
    smartFetchUniversal(`/users/createUser?serverOption=${server}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    }),

  /**
   * Login de usuario
   * Retorna { data, status }
   */
  login: (payload) =>
    smartFetchUniversal("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  /**
   * GET perfil (login)
   */
  getProfile: (userId) =>
    smartFetchUniversal(`/users/profile/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),

  /**
   * GET perfil detallado (mainNavbar)
   */
  getProfileDetailed: (userId) =>
    smartFetchUniversal(`/users/getProfileById/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
};

/**
 * API de campeones
 */
const apiChampions = {
  /**
   * GET campeones que el usuario posee
   */
  getUserChampions: (userId) =>
    smartFetchUniversal(`/champions/userChampions/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),

  /**
   * GET campeones que el usuario NO posee
   */
  getUserChampionsNotOwned: (userId) =>
    smartFetchUniversal(`/champions/userChampions/NotPossess/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),

  /**
   * POST Desbloquear un campeón para el usuario
   */
  unlockChampion: (userId, champ) =>
    smartFetchUniversal(
      `/UserXChampion/unlockChampion?idUser=${userId}&idChampion=${champ.id}`,
      { method: "POST" }
    ),
};

/**
 * API de skins
 */
const apiSkins = {
  /**
   * GET skins que el usuario posee
   */
  getUserSkins: (userId) =>
    smartFetchUniversal(`/skins/getUserSkins/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),

  /**
   * GET skins que el usuario NO posee
   */
  getUserSkinsNotOwned: (userId) =>
    smartFetchUniversal(`/skins/getUserSkins/NotPossess/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),

  /**
   * POST Desbloquear una skin para el usuario
   */
  unlockSkin: (userId, skin) =>
    smartFetchUniversal(
      `/UserXSkin/unlockSkin?idUser=${userId}&idSkin=${skin.id}`,
      { method: "POST" }
    ),
};

/**
 * API de íconos
 */
const apiIcons = {
  /**
   * GET todos los íconos disponibles
   */
  getAllIcons: () =>
    smartFetchUniversal(`/ProfileIcon/getAll`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),

  /**
   * GET íconos que posee un usuario
   */
  getUserIcons: (userId) =>
    smartFetchUniversal(`/UserXIcon/findByUserId/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),

  /**
   * POST Desbloquear un ícono para el usuario
   */
  unlockIcon: (userId, icon) =>
    smartFetchUniversal(
      `/UserXIcon/unlockIcon?idUser=${userId}&idIcon=${icon.id}`,
      { method: "POST" }
    ),

  /**
   * PUT Aplicar un ícono al usuario
   */
  useIcon: (userId, profileIconId) =>
    smartFetchUniversal(`/users/${userId}/icon/${profileIconId}`, {
      method: "PUT",
    }),
};

/**
 * API de items
 */
const apiItems = {
  /**
   * GET todos los items del juego
   */
  getAllItems: () =>
    smartFetchUniversal("/items/getAll", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
};

// Hacer accesible globalmente
window.apiOut = apiOut;
window.apiChampions = apiChampions;
window.apiSkins = apiSkins;
window.apiIcons = apiIcons;
window.apiItems = apiItems;
