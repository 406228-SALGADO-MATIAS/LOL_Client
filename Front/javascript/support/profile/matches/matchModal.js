// ================================
// matchModal.js (version aislada)
// ================================

// ----------- CREAR Y MOSTRAR MODAL -----------
async function openMatchModal(matchId, userId) {
  const match = await fetchMatchData(matchId, userId);
  if (!match) {
    console.error("No se pudo obtener la partida");
    return;
  }
  createMatchModal(match);
  // Destacar la card del usuario

  highlightMemberCard();
}

// ----------- FETCH DE DATOS -----------
async function fetchMatchData(matchId, userId) {
  try {
    const res = await fetch(
      `http://localhost:8080/matches/getUserMatch/${matchId}/${userId}`
    );
    if (!res.ok) throw new Error("Error al obtener datos de la partida");
    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

// ----------- CREAR MODAL GENERAL -----------
function createMatchModal(match) {
  const existing = document.querySelector(".mm-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.classList.add("mm-overlay");

  const modal = document.createElement("div");
  modal.classList.add("mm-modal");

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("mm-close");
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = () => overlay.remove();

  const header = createHeaderSection(match);
  const nav = createNavSection();
  const content = createMainSection(match);

  modal.append(closeBtn, header, nav, content);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

// ----------- HEADER -----------
function createHeaderSection(match) {
  const header = document.createElement("div");
  header.classList.add("mm-header");

  // --- Resultado (Victoria / Derrota) ---
  const result = document.createElement("div");
  result.classList.add("mm-result", match.win ? "win" : "lose");
  result.textContent = match.win ? "VICTORIA" : "DERROTA";

  // --- Fila central con los datos ---
  const infoRow = document.createElement("div");
  infoRow.classList.add("mm-header-row");

  // Separar fecha y hora
  const [fecha, hora] = match.date.split(" ");

  const map = document.createElement("div");
  map.classList.add("mm-map");
  map.textContent = match.map;

  const type = document.createElement("div");
  type.classList.add("mm-detail");
  type.textContent = match.gameType;

  const duration = document.createElement("div");
  duration.classList.add("mm-detail");
  duration.textContent = match.duration;

  const date = document.createElement("div");
  date.classList.add("mm-detail");
  date.textContent = `${fecha} | ${hora}`;

  const server = document.createElement("div");
  server.classList.add("mm-detail");
  server.textContent = `Servidor: ${match.server}`;

  // Agregar con guiones entre los valores
  infoRow.append(
    map,
    createSeparator(),
    type,
    createSeparator(),
    duration,
    createSeparator(),
    date,
    createSeparator(),
    server
  );

  header.append(result, infoRow);
  return header;
}

// --- Separador visual ---
function createSeparator() {
  const sep = document.createElement("span");
  sep.textContent = " - ";
  sep.classList.add("mm-separator");
  return sep;
}

// ----------- NAVBAR -----------
function createNavSection() {
  const nav = document.createElement("div");
  nav.classList.add("mm-nav");

  const statsBtn = document.createElement("button");
  statsBtn.textContent = "Estadísticas";
  statsBtn.classList.add("active");

  const graphBtn = document.createElement("button");
  graphBtn.textContent = "Gráficos";

  statsBtn.onclick = () => switchTab("stats", statsBtn, graphBtn);
  graphBtn.onclick = () => switchTab("graphics", graphBtn, statsBtn);

  nav.append(statsBtn, graphBtn);
  return nav;
}

function switchTab(tab, activeBtn, inactiveBtn) {
  activeBtn.classList.add("active");
  inactiveBtn.classList.remove("active");

  const content = document.querySelector(".mm-main");
  content.innerHTML = "";

  if (tab === "stats")
    content.appendChild(createTeamsSection(window.currentMatchData));
  else content.innerHTML = "<div class='mm-coming-soon'>📊 En desarrollo</div>";
}

// ----------- MAIN CONTENT -----------
function createMainSection(match) {
  window.currentMatchData = match;
  const main = document.createElement("div");
  main.classList.add("mm-main");
  main.appendChild(createTeamsSection(match));
  return main;
}

// ----------- EQUIPOS -----------
function createTeamsSection(match) {
  const container = document.createElement("div");
  container.classList.add("mm-teams");

  const blue = createTeamBlock(match.blueTeam, "blue");
  const red = createTeamBlock(match.redTeam, "red");

  container.append(blue, red);
  return container;
}

// ----------- BLOQUE DE EQUIPO -----------
function createTeamBlock(team, side) {
  const teamDiv = document.createElement("div");
  teamDiv.classList.add("mm-team", side);

  const header = document.createElement("div");
  header.classList.add("mm-team-header");

  // Nuevo layout horizontal y centrado con títulos
  header.innerHTML = `
    <div class="mm-team-info">
      <h3>${side === "blue" ? "Equipo Azul" : "Equipo Rojo"}</h3>
      <div class="mm-team-stats">
        <span title="KDA">🗡️ ${team.kills}/${team.deaths}/${team.assists}</span>
        <span title="Farm">🐉 ${team.totalFarm}</span>
        <span title="Gold">💰 ${team.totalGold}</span>
      </div>
    </div>
  `;

  const membersDiv = document.createElement("div");
  membersDiv.classList.add("mm-members");

  team.members.forEach((p) => {
    const card = createMemberCard(p);
    membersDiv.appendChild(card);
  });

  teamDiv.append(header, membersDiv);
  return teamDiv;
}

// ----------- BLOQUE PRINCIPAL -----------
function createMemberCard(p) {
  const card = document.createElement("div");
  card.classList.add("mm-member");
  card.dataset.userid = p.userId;

  const left = createMemberLeft(p);
  const center = createMemberCenter(p);
  const right = createMemberRight(p);

  card.append(left, center, right);
  return card;
}

// ----------- BLOQUE IZQUIERDO (Nick + Campeón + Rol) -----------
function createMemberLeft(p) {
  const left = document.createElement("div");
  left.classList.add("mm-member-left");
  left.innerHTML = `
    <img src="${p.squareChampion}" class="mm-champ-square" alt="${p.champion}" title="${p.champion}">
    <div class="mm-member-id">
      <span class="mm-nick">${p.nickName}</span>
      <img src="${p.roleImg}" class="mm-role-icon" title="${p.role}" alt="${p.role}">
    </div>
  `;

  const nickSpan = left.querySelector(".mm-nick");
  nickSpan.addEventListener("click", (e) => {
    e.stopPropagation();
    handleNickClick(p.userId);
  });

  return left;
}

// ----------- BLOQUE CENTRAL (Items) -----------
function createMemberCenter(p) {
  const center = document.createElement("div");
  center.classList.add("mm-member-center");

  const itemsRow = document.createElement("div");
  itemsRow.classList.add("mm-items-row");

  for (let i = 0; i < 6; i++) {
    const slot = document.createElement("div");
    slot.classList.add("mm-item-slot");

    const item = p.items[i];
    if (item) {
      const itemImg = document.createElement("img");
      itemImg.src = item.image;
      itemImg.alt = item.itemName;
      itemImg.title = item.itemName;
      slot.appendChild(itemImg);
    }

    itemsRow.appendChild(slot);
  }

  center.appendChild(itemsRow);
  return center;
}

// ----------- BLOQUE DERECHO (Stats) -----------
function createMemberRight(p) {
  const right = document.createElement("div");
  right.classList.add("mm-member-right");
  right.innerHTML = `
    <div class="mm-stats-row">
      <div class="mm-stat">
        <span title="KDA">🗡️</span>${p.kills}/${p.deaths}/${p.assists}
      </div>
      <div class="mm-stat">
        <span title="Farm">🐉</span>${p.totalFarm}
      </div>
      <div class="mm-stat">
        <span title="Gold">💰</span>${p.totalGold}
      </div>
    </div>
  `;
  return right;
}

function highlightMemberCard() {
  const allMembers = document.querySelectorAll(".mm-member");

  allMembers.forEach((card) => {
    const uid = card.dataset.userid;

    // Resetear todos los borders
    card.style.border = "1px solid transparent";
    card.style.boxShadow = "none";

    // Caso 1: hay searchedUserId
    if (window.searchedUserId) {
      if (String(uid) === String(window.searchedUserId)) {
        card.style.border = "2px solid #ffbb00cb"; // dorado
        card.style.boxShadow = "0 0 10px #635400ff";
      } else if (String(uid) === String(window.originalUserId)) {
        card.style.border = "2px solid white"; // blanco
        card.style.boxShadow = "0 0 10px #808080ff";
      }
    }
    // Caso 2: no hay searchedUserId → original es dorado
    else if (String(uid) === String(window.originalUserId)) {
      card.style.border = "2px solid #ffbb009c"; // dorado
      card.style.boxShadow = "0 0 10px #635400ff";
    }
  });
}

// ----------- LÓGICA DE CLICK EN EL NICK -----------
async function handleNickClick(userId) {
  const transition = document.querySelector(".page-transition");
  if (!transition) return;

  // Mostrar la transición
  transition.classList.remove("hidden");

  // Esperar a que la transición termine (150ms)
  await new Promise((resolve) => setTimeout(resolve, 150));

  // Lógica de selección/deselección
  if (String(userId) === String(window.originalUserId)) {
    window.searchedUserId = null;
    sessionStorage.removeItem("tempUserId");
  } else {
    window.searchedUserId = userId;
    sessionStorage.setItem("tempUserId", userId);
  }

  // **Resaltar la tarjeta correcta**
  highlightMemberCard();

  // Actualizar botón de retorno
  const btn = document.getElementById("btnReturnProfile");
  if (btn) {
    btn.style.display =
      window.searchedUserId && window.searchedUserId !== window.originalUserId
        ? "inline-block"
        : "none";
  }

  // Ejecutar la carga principal
  if (typeof window.onUserSelected === "function") {
    await window.onUserSelected(window.searchedUserId);
  }

  // Cerrar modal
  const overlay = document.querySelector(".mm-overlay");
  if (overlay) overlay.remove();

  // Ocultar la transición
  transition.classList.add("hidden");
}
