// -----------  matchUserModal.js -----------

function mapServerToEnum(serverText) {
  if (!serverText) return "LAS"; // Valor por defecto
  const map = {
    "Latin America South (LAS)": "LAS",
    "Latin America North (LAN)": "LAN",
    "Brazil (BR)": "BR",
    "North America (NA)": "NA",
  };
  return map[serverText] || "LAS";
}

async function fetchUserProfileByNickname(nickname, serverOption) {
  try {
    const { data, status } = await apiUsers.findByNicknameAndServer(
      nickname,
      serverOption
    );
    if (status !== 200) throw new Error("Error al buscar usuario por nickname");
    return data?.[0] || null; // tomamos el primer resultado
  } catch (err) {
    console.error("Error en fetchUserProfileByNickname:", err);
    return null;
  }
}

function createHoverModal(user) {
  if (!user) return null;

  const modal = document.createElement("div");
  modal.classList.add("nick-hover-modal");

  // Mapeamos server a abreviado
  const serverMap = {
    "Latin America South (LAS)": "LAS",
    "Latin America North (LAN)": "LAN",
    "Brazil (BR)": "BR",
    "North America (NA)": "NA",
  };
  const serverAbbr = serverMap[user.server] || "LAS";

  modal.innerHTML = `
    <div class="modal-content">
      <!-- Sección izquierda -->
      <div class="modal-section">
        <img src="${user.iconImage}" alt="icon" class="modal-icon">
        <span class="modal-nickname">${user.nickname}</span>
        <span class="modal-server">#${serverAbbr}</span>
      </div>

      <!-- Sección derecha -->
      <div class="modal-section">
        <img src="${user.rankImage}" alt="rank" class="modal-rank">
        <span class="modal-rank-name">${user.rank}</span>
        <span class="modal-rank-lp">${user.lp} LP</span>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  return modal;
}
