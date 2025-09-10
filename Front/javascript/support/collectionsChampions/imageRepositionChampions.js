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
  ];
  const largeRight = [
    "Graves",
    "Fizz",
    "Fiora",
    "Kha'Zix",
    "Malphite",
    "Vladimir",
    "Trundle",
    "Singed",
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
  ];
  const superRight = ["Fizz", "Braum", "Draven", "Caitlyn"];
  const verySmallLeft = ["Kai'Sa", "Mordekaiser", "Ivern", "Galio"];

  if (verySmallRight.includes(name)) position += 7;
  else if (smallRight.includes(name)) position += 15;
  else if (midRight.includes(name)) position += 22;
  else if (largeRight.includes(name)) position += 35;
  else if (veryLargeRight.includes(name)) position += 42;
  else if (superRight.includes(name)) position += 50;
  else if (verySmallLeft.includes(name)) position -= 7;

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
    "Kai'Sa",
  ];
  //15
  const mediumZoom = ["Jinx", "Zed", "Braum", "Kha'Zix", "Renata", "Vi"];
  //25
  const largeZoom = ["Karma", "Lucian"];
  //35
  const veryLargeZoom = [];
  //50
  const superZoom = ["Draven"];

  if (smallZoom.includes(name)) zoom = 1.07;
  else if (mediumZoom.includes(name)) zoom = 1.15;
  else if (largeZoom.includes(name)) zoom = 1.25;
  else if (veryLargeZoom.includes(name)) zoom = 1.35;
  else if (superZoom.includes(name)) zoom = 1.5;

  return zoom;
}


