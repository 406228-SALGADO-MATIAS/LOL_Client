function createMatchCard(match) {
  // Card general
  const card = document.createElement("div");
  card.classList.add("match-card");

  // ========== 1) Columna Campeón ==========
  const champDiv = document.createElement("div");
  champDiv.classList.add("match-col", "champ-col");

  const champImg = document.createElement("img");
  champImg.src = match.squareChampion;
  champImg.alt = match.champion;
  champImg.classList.add("champ-img");

  const champName = document.createElement("div");
  champName.classList.add("champ-name");
  champName.textContent = match.champion;

  champDiv.appendChild(champImg);
  champDiv.appendChild(champName);

  // ========== 2) Columna Resultado ==========
  const resultDiv = document.createElement("div");
  resultDiv.classList.add("match-col", "result-col");

  const resultText = document.createElement("div");
  resultText.classList.add("result-text", match.win ? "win" : "lose");
  resultText.textContent = match.win ? "Victoria" : "Derrota";

  const typeText = document.createElement("div");
  typeText.classList.add("match-type");
  typeText.textContent = match.matchType;

  resultDiv.appendChild(resultText);
  resultDiv.appendChild(typeText);

  // ========== 2.5) Columna Style ==========
  const styleDiv = document.createElement("div");
  styleDiv.classList.add("match-col", "style-col");

  const styleImg = document.createElement("img");
  const styleText = document.createElement("span");

  switch (match.style) {
    case "Fighter":
      styleImg.src =
        "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/styles/fighter.png";
      styleText.textContent = "Fighter";
      break;
    case "Marksman":
      styleImg.src =
        "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/styles/adc.png";
      styleText.textContent = "Marksman";
      break;
    case "Mage":
      styleImg.src =
        "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/styles/mage.png";
      styleText.textContent = "Mage";
      break;
    case "Assassin":
      styleImg.src =
        "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/styles/assassin.png";
      styleText.textContent = "Assassin";
      break;
    case "Tank":
      styleImg.src =
        "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/styles/tank.png";
      styleText.textContent = "Tank";
      break;
    case "Support":
      styleImg.src =
        "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/styles/support.png";
      styleText.textContent = "Support";
      break;
    default:
      styleImg.src = "";
      styleText.textContent = match.style;
  }

  styleImg.alt = match.style;
  styleImg.classList.add("style-icon");
  styleDiv.appendChild(styleImg);
  styleDiv.appendChild(styleText);

  // ========== 3) Columna Items + Stats ==========
  const statsDiv = document.createElement("div");
  statsDiv.classList.add("match-col", "stats-col");

  // --- Items ---
  const itemsRow = document.createElement("div");
  itemsRow.classList.add("items-row");

  for (let i = 0; i < 6; i++) {
    const slot = document.createElement("div");
    slot.classList.add("item-slot");

    const item = match.items[i];
    if (item) {
      const itemImg = document.createElement("img");
      itemImg.src = item.image;
      itemImg.alt = item.itemName;
      slot.appendChild(itemImg);
    }

    itemsRow.appendChild(slot);
  }

  // --- Stats con iconos ---
  const statsRow = document.createElement("div");
  statsRow.classList.add("stats-row");

  // KDA
  const kdaDiv = document.createElement("div");
  kdaDiv.classList.add("stat");
  const kdaIcon = document.createElement("img");
  kdaIcon.src =
    "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/stats/kills.png?raw=true";
  kdaIcon.classList.add("stat-icon");
  const kdaText = document.createElement("span");
  kdaText.textContent = match.kills + "/" + match.deaths + "/" + match.assists;
  kdaDiv.appendChild(kdaIcon);
  kdaDiv.appendChild(kdaText);

  // Farm
  const farmDiv = document.createElement("div");
  farmDiv.classList.add("stat");
  const farmIcon = document.createElement("img");
  farmIcon.src =
    "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/stats/minions.png?raw=true";
  farmIcon.classList.add("stat-icon");
  const farmText = document.createElement("span");
  farmText.textContent = match.totalFarm;
  farmDiv.appendChild(farmIcon);
  farmDiv.appendChild(farmText);

  // Gold
  const goldDiv = document.createElement("div");
  goldDiv.classList.add("stat");
  const goldIcon = document.createElement("img");
  goldIcon.src =
    "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/stats/coin.png?raw=true";
  goldIcon.classList.add("stat-icon");
  const goldText = document.createElement("span");
  goldText.textContent = match.totalGold;
  goldDiv.appendChild(goldIcon);
  goldDiv.appendChild(goldText);

  statsRow.appendChild(kdaDiv);
  statsRow.appendChild(farmDiv);
  statsRow.appendChild(goldDiv);

  statsDiv.appendChild(itemsRow);
  statsDiv.appendChild(statsRow);

  // ========== 3.5) Columna Role + Mapa ==========
  const roleDiv = document.createElement("div");
  roleDiv.classList.add("match-col", "role-col");

  const mapText = document.createElement("div");
  mapText.textContent = `${match.map}`;

  const roleImg = document.createElement("img");
  switch (match.role) {
    case "TOP":
      roleImg.src =
        "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/roles/top.png";
      roleImg.title = "Top";
      break;
    case "JUNGLE":
      roleImg.src =
        "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/roles/jg.png";
      roleImg.title = "Jungle";
      break;
    case "MID":
      roleImg.src =
        "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/roles/mid.png";
      roleImg.title = "Mid";
      break;
    case "ADC":
      roleImg.src =
        "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/roles/adc.png";
      roleImg.title = "ADC";
      break;
    case "SUPPORT":
      roleImg.src =
        "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/roles/support.png";
      roleImg.title = "Support";
      break;
    default:
      roleImg.src =
        "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/roles/mid.png";
      roleImg.title = "ARAM (one lane)";
  }

  roleImg.classList.add("role-icon");

  roleDiv.appendChild(mapText);
  roleDiv.appendChild(roleImg);

  // ========== 4) Columna Info Extra ==========
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("match-col", "info-col");

  const dateText = document.createElement("div");
  dateText.classList.add("match-date");
  dateText.textContent = `${match.date}`;

  const durationText = document.createElement("div");
  durationText.classList.add("match-duration");
  durationText.textContent = `Duration: ${match.duration}`;

  infoDiv.appendChild(dateText);
  infoDiv.appendChild(durationText);

  // Agregar columnas a la card
  card.appendChild(champDiv);
  card.appendChild(resultDiv);
  card.appendChild(styleDiv);
  card.appendChild(statsDiv);
  card.appendChild(roleDiv);
  card.appendChild(infoDiv);

  return card;
}
