// ================================
// modalMatch.js
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
  // Remover modal anterior si existe
  const existing = document.querySelector(".match-modal-overlay");
  if (existing) existing.remove();

  // Overlay
  const overlay = document.createElement("div");
  overlay.classList.add("match-modal-overlay");

  // Contenedor principal
  const modal = document.createElement("div");
  modal.classList.add("match-modal");

  // Botón de cierre
  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = () => overlay.remove();

  // Secciones
  const header = createHeaderSection(match);
  const nav = createNavSection();
  const content = createMainSection(match);

  modal.appendChild(closeBtn);
  modal.appendChild(header);
  modal.appendChild(nav);
  modal.appendChild(content);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

// ----------- HEADER (Datos globales) -----------
function createHeaderSection(match) {
  const header = document.createElement("div");
  header.classList.add("match-header");

  const result = document.createElement("div");
  result.classList.add("match-result", match.win ? "win" : "lose");
  result.textContent = match.win ? "VICTORIA" : "DERROTA";

  const map = document.createElement("div");
  map.classList.add("match-map");
  map.textContent = match.map;

  const info = document.createElement("div");
  info.classList.add("match-info");
  info.innerHTML = `
    <div><b>Tipo:</b> ${match.gameType}</div>
    <div><b>Duración:</b> ${match.duration}</div>
    <div><b>Fecha:</b> ${match.date}</div>
    <div><b>Servidor:</b> ${match.server}</div>
  `;

  header.append(result, map, info);
  return header;
}

// ----------- NAVBAR (Tabs: Stats / Gráficos) -----------
function createNavSection() {
  const nav = document.createElement("div");
  nav.classList.add("match-nav");

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

  const content = document.querySelector(".match-main");
  content.innerHTML = "";

  if (tab === "stats")
    content.appendChild(createTeamsSection(window.currentMatchData));
  else content.innerHTML = "<div class='coming-soon'>📊 En desarrollo</div>";
}

// ----------- MAIN CONTENT -----------
function createMainSection(match) {
  window.currentMatchData = match; // Guardar para cambiar de tab sin refetch
  const main = document.createElement("div");
  main.classList.add("match-main");
  main.appendChild(createTeamsSection(match));
  return main;
}

// ----------- EQUIPOS (Blue / Red) -----------
function createTeamsSection(match) {
  const container = document.createElement("div");
  container.classList.add("teams-container");

  const blue = createTeamBlock(match.blueTeam, "blue");
  const red = createTeamBlock(match.redTeam, "red");

  container.append(blue, red);
  return container;
}

// ----------- BLOQUE DE EQUIPO -----------
function createTeamBlock(team, side) {
  const teamDiv = document.createElement("div");
  teamDiv.classList.add("team-block", side);

  const header = document.createElement("div");
  header.classList.add("team-header");
  header.innerHTML = `
    <h3>${side === "blue" ? "Equipo Azul" : "Equipo Rojo"}</h3>
    <div class="team-stats">
      <span>🗡️ ${team.kills}/${team.deaths}/${team.assists}</span>
      <span>💰 ${team.totalGold}</span>
      <span>🐉 ${team.totalFarm}</span>
    </div>
  `;

  const membersDiv = document.createElement("div");
  membersDiv.classList.add("members-container");

  team.members.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="${p.squareChampion}" class="champ-square" alt="${p.champion}">
      <div class="member-info">
        <span class="nick">${p.nickName}</span>
        <div class="items">
          ${p.items
            .map(
              (i) =>
                `<div class="item-slot"><img src="${i.image}" title="${i.itemName}" alt="${i.itemName}"></div>`
            )
            .join("")}
        </div>
        <div class="stats-line">
          <span>🗡️ ${p.kills}/${p.deaths}/${p.assists}</span>
          <span>🐉 ${p.totalFarm}</span>
          <span>💰 ${p.totalGold}</span>
        </div>
      </div>
    `;

    membersDiv.appendChild(card);
  });

  teamDiv.append(header, membersDiv);
  return teamDiv;
}
