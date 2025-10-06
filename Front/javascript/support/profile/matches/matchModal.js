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

  const result = document.createElement("div");
  result.classList.add("mm-result", match.win ? "win" : "lose");
  result.textContent = match.win ? "VICTORIA" : "DERROTA";

  const map = document.createElement("div");
  map.classList.add("mm-map");
  map.textContent = match.map;

  const info = document.createElement("div");
  info.classList.add("mm-info");
  info.innerHTML = `
    <div><b>Tipo:</b> ${match.gameType}</div>
    <div><b>Duración:</b> ${match.duration}</div>
    <div><b>Fecha:</b> ${match.date}</div>
    <div><b>Servidor:</b> ${match.server}</div>
  `;

  header.append(result, map, info);
  return header;
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
  header.innerHTML = `
    <h3>${side === "blue" ? "Equipo Azul" : "Equipo Rojo"}</h3>
    <div class="mm-team-stats">
      <span>🗡️ ${team.kills}/${team.deaths}/${team.assists}</span>
      <span>💰 ${team.totalGold}</span>
      <span>🐉 ${team.totalFarm}</span>
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

// ----------- BLOQUE DE JUGADOR -----------
function createMemberCard(p) {
  const card = document.createElement("div");
  card.classList.add("mm-member");

  const left = document.createElement("div");
  left.classList.add("mm-member-left");
  left.innerHTML = `
    <img src="${p.squareChampion}" class="mm-champ-square" alt="${p.champion}">
    <div class="mm-member-id">
      <span class="mm-nick">${p.nickName}</span>
      <img src="${p.roleImg}" class="mm-role-icon" title="${p.role}" alt="${p.role}">
    </div>
  `;

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

  const right = document.createElement("div");
  right.classList.add("mm-member-right");
  right.innerHTML = `
    <div class="mm-stats-row">
      <div class="mm-stat"><span>🗡️</span>${p.kills}/${p.deaths}/${p.assists}</div>
      <div class="mm-stat"><span>🐉</span>${p.totalFarm}</div>
      <div class="mm-stat"><span>💰</span>${p.totalGold}</div>
    </div>
  `;

  card.append(left, center, right);
  return card;
}
