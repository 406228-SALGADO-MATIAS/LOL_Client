function createMatchCard(match) {
  // Card general
  const card = document.createElement("div");
  card.classList.add("match-card");

  // ========== 1) Columna Campeón ==========
  const champDiv = document.createElement("div");
  champDiv.classList.add("match-col", "champ-col");

  const champImg = document.createElement("img");
  champImg.src = match.squareChampion;
  champImg.alt = match.championName;
  champImg.classList.add("champ-img");

  const champName = document.createElement("div");
  champName.classList.add("champ-name");
  champName.textContent = match.championName;

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
      itemImg.src = item.image; // solo `image`, no imageUrlItem
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
  kdaIcon.src = "https://cdn-icons-png.flaticon.com/512/32/32339.png"; // ícono genérico de espada (puedes cambiarlo)
  kdaIcon.classList.add("stat-icon");
  const kdaText = document.createElement("span");
  kdaText.textContent = match.kda;
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

  // ========== 4) Columna Info Extra ==========
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("match-col", "info-col");

  const mapText = document.createElement("div");
  mapText.textContent = `Mapa: ${match.map}`;

  const dateText = document.createElement("div");
  dateText.textContent = `Fecha: ${match.date}`;

  const durationText = document.createElement("div");
  durationText.textContent = `Duración: ${match.duration}`;

  infoDiv.appendChild(mapText);
  infoDiv.appendChild(dateText);
  infoDiv.appendChild(durationText);

  // Agregar columnas a la card
  card.appendChild(champDiv);
  card.appendChild(resultDiv);
  card.appendChild(statsDiv);
  card.appendChild(infoDiv);

  return card;
}
