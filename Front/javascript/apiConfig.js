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

  /**
   * GET todos los campeones
   */
  getAllChampions: () =>
    smartFetchUniversal("/champions/getAll", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
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

  /**
   * GET skins que el usuario puede comprar (activables)
   */
  getUserSkinsToPurchase: (userId) =>
    smartFetchUniversal(`/skins/getUserSkins/toPurchase/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
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

const apiLoot = {
  /**
   * GET Obtener loot del usuario
   * @param {number} userId
   * @param {boolean} [showInactives=false]
   * @returns {Promise<{data, status, url}>}
   */
  getUserLoot: (userId, showInactives = false) =>
    smartFetchUniversal(`/userLoot/${userId}?showInactives=${showInactives}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),

  /**
   * PUT Abrir cofres del usuario
   * @param {"normal"|"master"} type - tipo de cofre
   * @param {number} userId
   * @returns {Promise<{data, status, url}>}
   */
  openChest: (type, userId) =>
    smartFetchUniversal(`/userLoot/openChests/${type}/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }),

  /**
   * PUT Desbloquear o desencantar un ítem del loot
   * @param {"champion"|"skin"|"icon"} type
   * @param {number} itemId
   * @param {boolean} enchant - true = desbloquear, false = desencantar
   * @returns {Promise<{data, status, url}>}
   */
  unlockOrRefundItem: (type, itemId, enchant = true) =>
    smartFetchUniversal(
      `/userLoot/unlockOrRefund/${type}/${itemId}?enchant=${enchant}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    ),

  /**
   * PUT Re-roll (fusionar 3 ítems del mismo tipo para obtener uno nuevo)
   * @param {"champion"|"skin"|"icon"} type - tipo de ítem
   * @param {number[]} itemIds - IDs de los 3 ítems seleccionados
   * @returns {Promise<{data, status, url}>}
   */
  reRollItems: (type, itemIds) => {
    if (!Array.isArray(itemIds) || itemIds.length !== 3) {
      throw new Error("Debes pasar exactamente 3 IDs para hacer el re-roll");
    }

    let endpoint = "";
    switch (type) {
      case "champion":
        endpoint = `/userLoot/reRoll/champions?idLootChampion1=${itemIds[0]}&idLootChampion2=${itemIds[1]}&idLootChampion3=${itemIds[2]}`;
        break;
      case "skin":
        endpoint = `/userLoot/reRoll/skins?idLootSkin1=${itemIds[0]}&idLootSkin2=${itemIds[1]}&idLootSkin3=${itemIds[2]}`;
        break;
      case "icon":
        endpoint = `/userLoot/reRoll/icons?idLootIcon1=${itemIds[0]}&idLootIcon2=${itemIds[1]}&idLootIcon3=${itemIds[2]}`;
        break;
      default:
        throw new Error("Tipo desconocido: " + type);
    }

    return smartFetchUniversal(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
  },

  /**
   * PUT Desencantar todos los ítems del usuario (incluye inactivos)
   * @param {number} userId
   * @returns {Promise<{data, status, url}>}
   */
  disenchantOwnedItems: (userId) =>
    smartFetchUniversal(
      `/userLoot/disenchantOwnedItems?idUser=${userId}&showInactives=true`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    ),
};

const apiMatches = {
  /**
   * GET historial de partidas de un usuario
   * @param {number} userId
   * @returns {Promise<{data, status, url}>}
   */
  getUserHistory: (userId, query = "") =>
    smartFetchUniversal(
      `/matches/getUserHistory/${userId}${query ? "?" + query : ""}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ),

  /**
   * GET datos de una partida específica de un usuario
   * @param {number} matchId
   * @param {number} userId
   * @returns {Promise<{data, status, url}>}
   */
  getUserMatch: (matchId, userId) =>
    smartFetchUniversal(`/matches/getUserMatch/${matchId}/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
};

const apiUsers = {
  /**
   * GET buscar usuario por nickname
   * @param {string} nickname
   * @returns {Promise<{data, status, url}>}
   */
  findByNickname: (nickname) =>
    smartFetchUniversal(
      `/users/findUsers/nickname/${encodeURIComponent(nickname)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ),

  /**
   * GET buscar usuario por nickname y servidor
   * @param {string} nickname
   * @param {string} serverOption
   * @returns {Promise<{data, status, url}>}
   */
  findByNicknameAndServer: (nickname, serverOption) =>
    smartFetchUniversal(
      `/users/findUsers/nicknameAndserver?nickname=${encodeURIComponent(
        nickname
      )}&serverOption=${encodeURIComponent(serverOption)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ),

  /**
   * GET buscar usuario por nickname y rank
   * @param {string} nickname
   * @param {string} rankTier
   * @returns {Promise<{data, status, url}>}
   */
  findByNicknameAndRank: (nickname, rankTier) =>
    smartFetchUniversal(
      `/users/findUsers/nickname/rankTier?nickname=${encodeURIComponent(
        nickname
      )}&rankTier=${encodeURIComponent(rankTier)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ),

  /**
   * GET buscar usuario por nickname, rank y servidor
   * @param {string} nickname
   * @param {string} rankTier
   * @param {string} serverOption
   * @returns {Promise<{data, status, url}>}
   */
  findByNicknameRankAndServer: (nickname, rankTier, serverOption) =>
    smartFetchUniversal(
      `/users/findUsers/nickname/rankTierAndServer?nickname=${encodeURIComponent(
        nickname
      )}&rankTier=${encodeURIComponent(rankTier)}&server=${encodeURIComponent(
        serverOption
      )}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ),
};

const apiStats = {
  /**
   * GET stats de partidas de un usuario
   * @param {number} userId
   * @param {string} [gameType] - opcional: NORMAL, ARAM, etc.
   * @returns {Promise<{data, status, url}>}
   */
  getUserStats: (userId, gameType) =>
    smartFetchUniversal(
      `/usersMatches/${userId}/stats${gameType ? `?gameType=${gameType}` : ""}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ),

  /**
   * GET stats de un campeón específico
   * @param {number} userId
   * @param {number} championId
   * @param {string} [role] - opcional: TOP, JG, MID, etc.
   * @param {string} [gameType] - opcional: NORMAL, ARAM, etc.
   * @returns {Promise<{data, status, url}>}
   */
  getChampionStats: (userId, championId, role, gameType) => {
    let endpoint = `/usersMatches/${userId}/stats/champion/${championId}`;
    if (role && role !== "all") endpoint += `/role/${role}`;
    if (gameType && gameType !== "all")
      endpoint += `?gameType=${gameType.toUpperCase()}`;

    return smartFetchUniversal(endpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  },

  /**
   * GET stats de partidas de un usuario con soporte de role y gameType
   * Reemplaza fetchStats original
   * @param {number} userId
   * @param {string} [gameType] - opcional
   * @param {string} [role] - opcional
   * @returns {Promise<{data, status, url}>}
   */
  getUserStatsAdvanced: (userId, gameType = "all", role = "all") => {
    let endpoint = `/usersMatches/${userId}/stats`;
    if (role && role !== "all") endpoint += `/role/${role}`;
    if (gameType && gameType !== "all")
      endpoint += `?gameType=${gameType.toUpperCase()}`;

    return smartFetchUniversal(endpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  },
};

const apiPlay = {
  /**
   * POST Crear partida automática para un usuario
   * @param {number} userId
   * @param {object} options - { gameMode, map, showChampionImg, showItemImg }
   * @returns {Promise<{data, status, url}>}
   */
  createMatch: (userId, options = {}) => {
    const params = new URLSearchParams({
      gameMode: options.gameMode || "NORMAL",
      map: options.map || "SUMMONERS RIFT",
      showChampionImg: options.showChampionImg ?? false,
      showItemImg: options.showItemImg ?? false,
    });

    return smartFetchUniversal(
      `/matches/createMatch/${userId}?${params.toString()}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
  },

  /**
   * POST Crear partida con usuario y rol
   * @param {number} userId
   * @param {string} role
   * @param {string} gameMode - NORMAL o RANKED
   * @param {boolean} showChampion
   * @param {boolean} showItem
   * @returns {Promise<{data, status, url}>}
   */
  createMatchUserAndRole: (userId, role, gameMode, showChampion, showItem) => {
    const params = new URLSearchParams({
      role,
      gameMode,
      showChampion,
      showItem,
    });

    return smartFetchUniversal(
      `/matches/createMatch/userAndRole/${userId}?${params.toString()}`,
      { method: "POST" }
    );
  },

  /**
   * POST Crear partida con usuario, rol y campeón seleccionado
   * @param {number} userId
   * @param {string} role
   * @param {string} gameMode - NORMAL o RANKED
   * @param {number} championId
   * @param {boolean} showChampion
   * @param {boolean} showItem
   * @returns {Promise<{data, status, url}>}
   */
  createMatchUserRoleAndChampion: (
    userId,
    role,
    gameMode,
    championId,
    showChampion,
    showItem
  ) => {
    const params = new URLSearchParams({
      role,
      gameMode,
      showChampion,
      showItem,
      championId,
    });

    return smartFetchUniversal(
      `/matches/createMatch/userRoleAndChampion/${userId}?${params.toString()}`,
      { method: "POST" }
    );
  },
  /**
   * POST crear partida ARAM con usuario y campeón
   * @param {number} userId - ID del usuario que crea la partida
   * @param {number} championId - ID del campeón seleccionado
   * @returns {Promise<{data, status, url}>} - Datos de la partida creada
   */
  createAramMatchWithChampion: (userId, championId) =>
    smartFetchUniversal(
      `/matches/createMatch/ARAM/userAndChampion/${userId}?championId=${championId}`,
      { method: "POST" }
    ),
};

const apiRanks = {
  /**
   * GET todos los ranks
   * @returns {Promise<{data, status, url}>}
   */
  getAll: () =>
    smartFetchUniversal("/ranks/all", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
};
