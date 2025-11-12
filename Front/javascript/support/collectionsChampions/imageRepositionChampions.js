function getChampionObjectPosition(name) {
  // Normalizamos las comillas
  name = name.replace(/´/g, "'");

  // Default
  let position = 50;

  const verySmallRight = [
    "Dr. Mundo",
    "Rek'Sai",
    "Zilean",
    "Skarner",
    "Ornn",
    "Zeri",
    "Aurelion Sol",
    "LeBlanc",
  ];
  const smallRight = [
    "Aatrox",
    "Urgot",
    "Renekton",
    "Senna",
    "Twitch",
    "Milio",
  ];
  const midRight = [
    "Cho'Gath",
    "Alistar",
    "Rengar",
    "Gragas",
    "Xerath",
    "Warwick",
    "Zac",
    "Bardo",
    "Katarina",
    "Renata",
    "Hecarim",
    "Lee Sin",
  ];
  const midlargeRight = ["Nasus", "Poppy"];
  const largeRight = [
    "Graves",
    "Fizz",
    "Fiora",
    "Kha'Zix",
    "Malphite",
    "Vladimir",
    "Trundle",
    "Singed",
    "Leona",
  ];
  const veryLargeRight = [
    "Jinx",
    "Karma",
    "Shen",
    "Zed",
    "Lucian",
    "Twisted Fate",
    "Vi",
    "Jarvan IV",
    "Tryndamere",
    "Lissandra",
    "Elise",
    "Gangplank",
    "Shaco",
  ];
  const superRight = [
    "Fizz",
    "Braum",
    "Draven",
    "Caitlyn",
    "Annie",
    "Garen",
    "Master Yi",
  ];
  const verySmallLeft = ["Kai'Sa", "Mordekaiser", "Ivern", "Galio"];
  const SmallLeft = ["Fiddlesticks"];

  if (verySmallRight.includes(name)) position += 7;
  else if (smallRight.includes(name)) position += 15;
  else if (midRight.includes(name)) position += 22;
  else if (midlargeRight.includes(name)) position += 30;
  else if (largeRight.includes(name)) position += 35;
  else if (veryLargeRight.includes(name)) position += 42;
  else if (superRight.includes(name)) position += 50;
  else if (verySmallLeft.includes(name)) position -= 7;
  else if (SmallLeft.includes(name)) position -= 18;

  return `${position}% center`;
}

function getChampionZoom(name) {
  name = name.replace(/´/g, "'");

  // Valor por defecto
  let zoom = 1.0;

  // 7
  const smallZoom = [
    "Aurelion Sol",
    "Zilean",
    "Akali",
    "Bardo",
    "Aatrox",
    "Alistar",
    "Gragas",
    "Hecarim",
    "Shen",
    "Twitch",
    "Urgot",
    "Caitlyn",
    "Galio",
    "Jarvan IV",
    "Poppy",
    "Gangplank",
    "LeBlanc",
    "Leona",
  ];
  //15
  const mediumZoom = [
    "Jinx",
    "Zed",
    "Braum",
    "Kha'Zix",
  
    "Vi",
    "Kai'Sa",
    "Master Yi",
    "Shaco",
  ];
  //25
  const largeZoom = ["Karma", "Garen", "Nasus", "Lee Sin"];
  //35
  const veryLargeZoom = [  "Renata",];
  //50
  const superZoom = ["Draven", "Lucian", "Elise","Lissandra"];

  if (smallZoom.includes(name)) zoom = 1.07;
  else if (mediumZoom.includes(name)) zoom = 1.15;
  else if (largeZoom.includes(name)) zoom = 1.25;
  else if (veryLargeZoom.includes(name)) zoom = 1.35;
  else if (superZoom.includes(name)) zoom = 1.5;

  return zoom;
}

// 🔹 NUEVO: ajuste vertical
function getChampionVerticalOffset(name) {
  name = name.replace(/´/g, "'");

  // Por defecto no se mueve
  let offset = 0;

  const largeDown = ["Lissandra"];

  // Campeones que deben bajar un poco (se ven muy arriba)
  const moveDown = ["Elise","Renata"];

  // Campeones que deben subir un poco (se ven muy abajo)
  const moveUp = [];

  if (moveDown.includes(name)) offset = 40; // píxeles
  else if (moveUp.includes(name)) offset = -25;
  else if (largeDown.includes(name)) offset = 55;

  return offset;
}
