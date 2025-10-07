// ================================
// matchModalGraphs.js
// ================================

// Render principal de la pestaña "Gráficos"
function createGraphsSection(match) {
  const container = document.createElement("div");
  container.classList.add("mm-graphs-container");

  // --- Header con opciones ---
  const header = createGraphsHeader();
  container.appendChild(header);

  // --- Contenedor de equipos ---
  const teamsWrapper = document.createElement("div");
  teamsWrapper.classList.add("mm-teams");
  container.appendChild(teamsWrapper);

  // Guardamos el match global para actualizaciones dinámicas
  window.currentGraphMatch = match;
  window.currentGraphStat = "kills";

  renderGraphTeams(teamsWrapper, match, "kills");

  return container;
}

// ------------------------------------------
// Header con botones de selección de stat
// ------------------------------------------
function createGraphsHeader() {
  const header = document.createElement("div");
  header.classList.add("mm-graphs-header");

  const stats = [
    { key: "kills", label: "Kills" },
    { key: "deaths", label: "Deaths" },
    { key: "assists", label: "Assists" },
    { key: "totalDamage", label: "Daño" },
    { key: "totalGold", label: "Oro" },
    { key: "totalFarm", label: "Farm" },
  ];

  stats.forEach((stat, i) => {
    const label = document.createElement("label");
    label.classList.add("mm-graph-option");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "graphStat";
    input.value = stat.key;
    if (i === 0) input.checked = true;

    input.addEventListener("change", () => {
      window.currentGraphStat = stat.key;
      updateGraphBars();
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(stat.label));
    header.appendChild(label);
  });

  return header;
}

// ------------------------------------------
// Render de los equipos y sus miembros
// ------------------------------------------
function renderGraphTeams(container, match, statKey) {
  container.innerHTML = "";

  const blue = createGraphTeamBlock(match.blueTeam, "blue", statKey);
  const red = createGraphTeamBlock(match.redTeam, "red", statKey);

  container.append(blue, red);
}

// ------------------------------------------
// Cada bloque de equipo (igual al original)
// ------------------------------------------
function createGraphTeamBlock(team, side, statKey) {
  const teamDiv = document.createElement("div");
  teamDiv.classList.add("mm-team", side);

  const header = document.createElement("div");
  header.classList.add("mm-team-header");
  header.innerHTML = `
    <div class="mm-team-info">
      <h3>${side === "blue" ? "Equipo Azul" : "Equipo Rojo"}</h3>
    </div>
  `;

  const membersDiv = document.createElement("div");
  membersDiv.classList.add("mm-members");

  team.members.forEach((p) => {
    const card = createGraphMemberCard(p, statKey);
    membersDiv.appendChild(card);
  });

  teamDiv.append(header, membersDiv);
  return teamDiv;
}

// ------------------------------------------
// Member card con barra gráfica
// ------------------------------------------
function createGraphMemberCard(p, statKey) {
  const card = document.createElement("div");
  card.classList.add("mm-member");
  card.dataset.userid = p.userId;

  // --- izquierda: champ, nick, rol ---
  const left = document.createElement("div");
  left.classList.add("mm-member-left");
  left.innerHTML = `
    <img src="${p.squareChampion}" class="mm-champ-square" alt="${p.champion}">
    <div class="mm-member-id">
      <span class="mm-nick">${p.nickName}</span>
      <img src="${p.roleImg}" class="mm-role-icon" title="${p.role}">
    </div>
  `;
  const nickSpan = left.querySelector(".mm-nick");
  nickSpan.addEventListener("click", (e) => {
    e.stopPropagation();
    handleNickClick(p.userId);
  });

  // --- derecha: barra ---
  const right = document.createElement("div");
  right.classList.add("mm-graph-bar-wrapper");

  const bar = document.createElement("div");
  bar.classList.add("mm-graph-bar");

  const fill = document.createElement("div");
  fill.classList.add("mm-graph-fill");
  fill.dataset.value = p[statKey]; // guardamos valor

  bar.appendChild(fill);
  right.append(bar);

  card.append(left, right);
  return card;
}

// ------------------------------------------
// Recalcular y actualizar barras
// ------------------------------------------
function updateGraphBars() {
  const match = window.currentGraphMatch;
  const statKey = window.currentGraphStat;
  const allPlayers = [...match.blueTeam.members, ...match.redTeam.members];

  const maxValue = Math.max(...allPlayers.map((p) => p[statKey] || 0));

  document.querySelectorAll(".mm-graph-fill").forEach((fill) => {
    const value = parseInt(fill.dataset.value) || 0;
    const percent = maxValue > 0 ? (value / maxValue) * 100 : 0;
    fill.style.height = `${percent}%`;
    fill.title = `${value} ${statKey}`;
  });
}

