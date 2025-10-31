function createMatchCard(match) {
  // Card general
  const card = document.createElement("div");
  card.classList.add("match-card");

  card.dataset.matchId = match.idMatch;

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
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339145/fighter_bhcosl.webp";
      styleText.textContent = "Fighter";
      break;
    case "Marksman":
      styleImg.src =
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339141/adc_zlakei.webp";
      styleText.textContent = "Marksman";
      break;
    case "Mage":
      styleImg.src =
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339147/mage_hkt581.webp";
      styleText.textContent = "Mage";
      break;
    case "Assassin":
      styleImg.src =
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339143/assassin_wyfi0d.webp";
      styleText.textContent = "Assassin";
      break;
    case "Tank":
      styleImg.src =
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339139/tank_yypoh4.webp";
      styleText.textContent = "Tank";
      break;
    case "Support":
      styleImg.src =
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339148/support_d9qd9q.png";
      styleText.textContent = "Support";
      break;
    default:
      styleImg.src = "";
      styleText.textContent = match.style;
  }

  styleImg.title = "Items build style";
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
      itemImg.title = item.itemName;
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
    "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339086/kills_gghhmv.png";
  kdaIcon.classList.add("stat-icon");
  kdaIcon.title = "Kills/Deaths/Assits";
  const kdaText = document.createElement("span");
  kdaText.textContent = match.kills + "/" + match.deaths + "/" + match.assists;
  kdaDiv.appendChild(kdaIcon);
  kdaDiv.appendChild(kdaText);

  // Farm
  const farmDiv = document.createElement("div");
  farmDiv.classList.add("stat");
  const farmIcon = document.createElement("img");
  farmIcon.src =
    "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339089/minions_ey2qs1.webp";
  farmIcon.classList.add("stat-icon");
  farmIcon.title = "Creatures killed";
  const farmText = document.createElement("span");
  farmText.textContent = match.totalFarm;
  farmDiv.appendChild(farmIcon);
  farmDiv.appendChild(farmText);

  // Gold
  const goldDiv = document.createElement("div");
  goldDiv.classList.add("stat");
  const goldIcon = document.createElement("img");
  goldIcon.src =
    "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339081/coin_nccy7t.png";
  goldIcon.classList.add("stat-icon");
  goldIcon.title = "Gold";
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
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339120/top_o6nf3d.webp";
      roleImg.title = "Top";
      break;
    case "JUNGLE":
      roleImg.src =
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339123/jg_de9cbc.png";
      roleImg.title = "Jungle";
      break;
    case "MID":
      roleImg.src =
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339125/mid_b7phfo.png";
      roleImg.title = "Mid";
      break;
    case "ADC":
      roleImg.src =
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339916/adc2_qy3qpi.png";
      roleImg.title = "AD Carry";
      break;
    case "SUPPORT":
      roleImg.src =
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339127/support_nuk1pt.png";
      roleImg.title = "Support";
      break;
    default:
      roleImg.src =
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339125/mid_b7phfo.png";
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
  card.appendChild(roleDiv);
  card.appendChild(statsDiv);
  card.appendChild(styleDiv);
  card.appendChild(infoDiv);

  return card;
}
