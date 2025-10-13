// ================================
// matchModalGraphs.js
// ================================

let graphRedirectMode = false; // ← valor por defecto

// Render principal de la pestaña "Gráficos"
function createGraphsSection(match, redirectMode = false) {
  graphRedirectMode = redirectMode; // ← guardamos el modo recibido

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

  // --- Render de los equipos ---
  renderGraphTeams(teamsWrapper, match, "kills");

  // 🔹 Forzar updateGraphBars después del render para que se vea la barra
  setTimeout(() => {
    window.currentGraphStat = "kills";
    updateGraphBars();
  }, 0);

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
    { key: "totalDamage", label: "Damage" },
    { key: "totalGold", label: "Gold" },
    { key: "totalFarm", label: "Farm" },
  ];

  stats.forEach((stat, i) => {
    const label = document.createElement("label");
    label.classList.add("mm-graph-option");

    // Estilo tipo botón
    label.style.cursor = "pointer";
    label.style.padding = "6px 12px";
    label.style.marginRight = "6px";
    label.style.borderRadius = "4px";
    label.style.backgroundColor = i === 0 ? "rgba(0, 75, 124, 1)" : "#222";
    label.style.color = i === 0 ? "#fff" : "#ccc";
    label.style.userSelect = "none";
    label.style.display = "flex";
    label.style.alignItems = "center";
    label.style.gap = "4px";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "graphStat";
    input.value = stat.key;
    input.style.display = "none";
    if (i === 0) input.checked = true;

    input.addEventListener("change", () => {
      window.currentGraphStat = stat.key;
      updateGraphBars();

      // actualizar estilos de los botones
      header.querySelectorAll("label").forEach((l) => {
        l.style.backgroundColor = l.querySelector("input").checked
          ? "rgba(0, 75, 124, 1)"
          : "#222";
        l.style.color = l.querySelector("input").checked ? "#fff" : "#ccc";
      });
    });

    // --- Imagen del stat ---
    const img = document.createElement("img");
    img.src = STAT_ICON_URLS[stat.key];
    img.alt = stat.label;
    img.title = stat.label;
    img.style.width = "20px";
    img.style.height = "20px";

    label.appendChild(input);
    label.appendChild(img);
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
function createGraphMemberCard(p) {
  const card = document.createElement("div");
  card.classList.add("mm-member");
  card.dataset.userid = p.userId;

  // --- izquierda: champ, nick, rol ---
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
  let hoverTimeout;

  // CLICK → ir al perfil y cerrar cualquier hover modal abierto
  nickSpan.addEventListener("click", (e) => {
    e.stopPropagation();

    if (activeModal) {
      activeModal.remove();
      activeModal = null;
    }

    handleNickClick(p.userId, graphRedirectMode);
  });

  // HOVER → mostrar modal con info del usuario
  nickSpan.addEventListener("mouseenter", async (e) => {
    clearTimeout(hoverTimeout);

    // Cerrar modal previo si existe
    if (activeModal) {
      activeModal.remove();
      activeModal = null;
    }

    const rect = nickSpan.getBoundingClientRect();
    const nickname = p.nickName;

    // Buscar servidor dentro del modal principal
    const matchModal = nickSpan.closest(".mm-modal");
    const serverDetail = Array.from(
      matchModal?.querySelectorAll(".mm-detail") || []
    ).find((el) => el.textContent.includes("Servidor:"));
    const serverText = serverDetail
      ? serverDetail.textContent.replace("Servidor: ", "").trim()
      : null;
    const serverOption = mapServerToEnum(serverText);

    // Fetch de datos del usuario
    const userData = await fetchUserProfileByNickname(nickname, serverOption);
    if (!userData) return;

    const modal = createHoverModal(userData);
    activeModal = modal;

    // Posicionar modal
    modal.style.top = `${rect.top + window.scrollY - 10}px`;
    modal.style.left = `${rect.right + 10}px`;

    document.body.appendChild(modal);

    // Fade-in
    setTimeout(() => modal.classList.add("visible"), 10);
  });

  // MOUSELEAVE → ocultar modal
  nickSpan.addEventListener("mouseleave", () => {
    hoverTimeout = setTimeout(() => {
      if (document.activeElement === nickSpan) return;

      if (activeModal) {
        activeModal.classList.remove("visible");
        setTimeout(() => {
          activeModal?.remove();
          activeModal = null;
        }, 150);
      }
    }, 150);
  });

  // --- centro: barra horizontal ---
  const center = document.createElement("div");
  center.classList.add("mm-graph-bar-wrapper");

  const bar = document.createElement("div");
  bar.classList.add("mm-graph-bar");

  const fill = document.createElement("div");
  fill.classList.add("mm-graph-fill");
  fill.dataset.value = 0; // se inicializa en 0
  bar.appendChild(fill);
  center.appendChild(bar);

  // --- derecha: icono + valor ---
  const right = document.createElement("div");
  right.classList.add("mm-stat-display");
  right.innerHTML = `
    <img src="" alt="" class="mm-stat-icon" title="">
    <span class="mm-stat-value">0</span>
  `;

  // --- ensamblar todo ---
  card.append(left, center, right);
  return card;
}

// ------------------------------------------
// Preload de íconos (para evitar lag)
// ------------------------------------------
const STAT_ICON_URLS = {
  kills:
    "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/stats/stats%20kills.png?raw=true",
  deaths:
    "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/stats/stats%20deaths.png?raw=true",
  assists:
    "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/stats/stats%20assists.png?raw=true",
  totalFarm:
    "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/stats/minions.png?raw=true",
  totalGold: "https://pngimg.com/d/coin_PNG36939.png",
  totalDamage: "https://cdn-icons-png.flaticon.com/512/7380/7380434.png",
};

function getStatIconAndTitle(statKey) {
  const titles = {
    kills: "Kills",
    deaths: "Deaths",
    assists: "Assists",
    totalFarm: "Farm",
    totalGold: "Gold",
    totalDamage: "Damage",
  };

  return {
    icon: STAT_ICON_URLS[statKey] || "",
    title: titles[statKey] || "",
  };
}

// ------------------------------------------
// Recalcular y actualizar barras
// ------------------------------------------
function updateGraphBars() {
  const match = window.currentGraphMatch;
  const statKey = window.currentGraphStat;
  if (!match || !statKey) return;

  const allPlayers = [...match.blueTeam.members, ...match.redTeam.members];
  const maxValue = Math.max(...allPlayers.map((p) => p[statKey] || 0));

  document.querySelectorAll(".mm-member").forEach((card) => {
    const fill = card.querySelector(".mm-graph-fill");
    const right = card.querySelector(".mm-stat-display");
    if (!fill || !right) return;

    const userId = parseInt(card.dataset.userid);
    const player =
      match.blueTeam.members.find((p) => p.userId === userId) ||
      match.redTeam.members.find((p) => p.userId === userId);
    if (!player) return;

    const value = player[statKey] || 0;
    const percent = maxValue > 0 ? (value / maxValue) * 100 : 0;

    // --- actualizar barra ---
    fill.style.width = `${percent}%`;
    fill.title = `${value} ${statKey}`;

    // --- actualizar icono + valor ---
    const { icon, title } = getStatIconAndTitle(statKey);
    const iconImg = right.querySelector(".mm-stat-icon");
    const valueSpan = right.querySelector(".mm-stat-value");

    iconImg.src = icon;
    iconImg.alt = title;
    iconImg.title = title;
    valueSpan.textContent = value;

    // 🔧 Ajustes dinámicos de estilo según tipo de estadística
    if (statKey === "kills") {
      iconImg.style.width = "30px";
      iconImg.style.height = "30px";
      right.style.gap = "0px";
      right.style.marginRight = ""; // reset al default

      right.style.marginLeft = "20px"; // reset al default
    } else if (["deaths", "assists"].includes(statKey)) {
      iconImg.style.width = "28px";
      iconImg.style.height = "28px";
      right.style.gap = "0px";
      right.style.marginRight = ""; // reset al default
      right.style.marginLeft = "20px";
    } else {
      iconImg.style.width = "26px";
      iconImg.style.height = "26px";
      right.style.gap = "4px";
    }
  });
}
