async function applyChampionBackgroundPosition(imageContainer, backgroundUrl) {
  if (!imageContainer || !backgroundUrl) return;

  // 1️⃣ Traemos la lista de campeones
  const championsList = await fetchChampionList();

  // 2️⃣ Detectamos el campeón (usa regex y, si falla, busca coincidencia)
  const championName = extractChampionNameFromUrl(backgroundUrl, championsList);

  if (!championName) {
    console.warn(
      "⚠️ No se pudo detectar el campeón desde la URL:",
      backgroundUrl
    );
    return;
  }

  // 3️⃣ Calculamos posición
  const position = getChampionObjectPosition(championName);

  // 4️⃣ Aplicamos estilo
  imageContainer.style.setProperty(
    "background-position",
    position,
    "important"
  );

  console.log(`✅ Fondo ajustado para ${championName}: ${position}`);
}

function extractChampionNameFromUrl(url, championsList = []) {
  if (!url) return null;

  // 1️⃣ Intento principal: regex splash
  const match = url.match(/splash%2F([A-Za-z0-9'._]+)_\d+\.jpg/);
  if (match) {
    const rawName = decodeURIComponent(match[1]);
    return rawName;
  }

  // 2️⃣ Fallback: búsqueda en la lista de campeones
  const lowerUrl = url.toLowerCase();
  for (const champ of championsList) {
    const normalizedName = champ
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[´' ._-]/g, "");

    if (lowerUrl.includes(normalizedName)) return champ;
  }

  // 3️⃣ Fallback manual solo para URLs conocidas que no contienen el nombre
  const manualMap = {
    "https://eskipaper.com/images/league-of-legends-wallpaper-15.jpg": "Zed",
    // agregá más si hace falta
  };

  if (manualMap[url]) return manualMap[url];

  return null;
}
async function fetchChampionList() {
  try {
    const { data } = await apiChampions.getAllChampions();
    return (data || []).map((c) => c.name);
  } catch (e) {
    console.error("No se pudieron cargar los campeones:", e);
    return [];
  }
}

function getChampionObjectPosition(name) {
  if (!name) return "center 50%";

  // Normalizamos el nombre: minúsculas, sin tildes, apóstrofes ni espacios
  const normalized = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .replace(/[´' ._-]/g, ""); // elimina apóstrofes, espacios, guiones, etc.

  // Por defecto centrado
  let position = 50;

  // 🔹 Grupos de ajuste
  const up5 = [];
  const up10 = ["alistar"];
  const up15 = ["reksai", "twitch", "katarina"];
  const up20 = ["chogath", "draven", "vi"];
  const up25 = ["rengar"];
  const up30 = [
    "karma",
    "senna",
    "ornn",
    "vladimir",
    "bard",
    "trundle",
    "jinx",
  ];
  const up35 = [
    "zed",
    "braum",
    "tryndamere",
    "zilean",
    "gragas",
    "zeri",
    "fizz",
    "jarvaniv",
    "xerath",
  ];
  const up40 = [
    "kaisa",
    "milio",
    "renata",
    "hecarim",
    "caitlyn",
    "singed",
    "renekton",
  ];
  const up45 = [
    "akali",
    "urgot",
    "graves",
    "fiora",
    "galio",
    "ivern",
    "shen",
    "aatrox",
    "drmundo",
  ];
  const up50 = ["aurelionsol"];

  const down5 = ["warwick"];
  const down10 = ["khazix"];
  const down15 = ["zac", ""];
  const down30 = ["skarner"];

  if (up5.includes(normalized)) position -= 5;
  else if (up10.includes(normalized)) position -= 10;
  else if (up15.includes(normalized)) position -= 15;
  else if (up20.includes(normalized)) position -= 20;
  else if (up25.includes(normalized)) position -= 25;
  else if (up30.includes(normalized)) position -= 30;
  else if (up35.includes(normalized)) position -= 35;
  else if (up40.includes(normalized)) position -= 40;
  else if (up45.includes(normalized)) position -= 45;
  else if (up50.includes(normalized)) position -= 50;
  else if (down5.includes(normalized)) position += 5;
  else if (down10.includes(normalized)) position += 10;
  else if (down15.includes(normalized)) position += 15;
  else if (down30.includes(normalized)) position += 30;

  return `center ${position}%`;
}
