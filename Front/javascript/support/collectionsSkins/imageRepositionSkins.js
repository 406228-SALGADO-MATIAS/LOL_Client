function getSkinZoom(name) {
  name = name.replace(/´/g, "'");

  // Valor por defecto
  let zoom = 1.0;

  // +7%
  const smallZoom = [
    "Ashen Lord Aurelion Sol",
    "Dragonslayer Braum",
    "Sheriff Caitlyn",
    "Corporate Mundo",
    "Pool Party Mundo",
    "Primetime Draven",
    "Soaring Sword Fiora",
    "Tundra Fizz",
    "Gatekeeper Galio",
    "Gragas, Esq.",
    "Pool Party Graves",
    "Riot Graves",
    "Arcade Hecarim",
    "Elderwood Hecarim",
    "Astronaut Ivern",
    "Dunkmaster Ivern",
    "Darkforge Jarvan IV",
    "Battle Cat Jinx",
    "Odyssey Jinx",
    "Traditional Karma",
    "High Noon Lucian",
    "Glacial Malphite",
    "Rain Shepherd Milio",
    "Lord Mordekaiser",
    "PROJECT: Mordekaiser",
    "Choo-Choo Ornn",
    "Elderwood Ornn",
    "Blackfrost Rek'Sai",
    "Eternum Rek'Sai",
    "Prestige La Ilusión Renata",
    "Outback Renekton",
    "Pool Party Renekton",
    "Prestige True Damage Senna",
    "Warlord Shen",
    "Sandscourge Skarner",
    "Constable Trundle",
    "Traditional Trundle",
    "Warring Kingdoms",
    "Underworld Twisted Fate",
    "PROJECT: Vi",
    "Battlecast Urgot",
    "Soulstealer Vladimir",
    "Tundra Hunter Warwick",
    "Empyrean Zac",
    "Special Weapon Zac",
    "Empyrean Zed",
    "Sugar Rush Zilean",
    "The Magnificent Twisted Fate",
    "Arcana Xerath",
  ];

  // +15%
  const mediumZoom = [
    "Blood Moon Aatrox",
    "Santa Braum",
    "Gentleman Cho'Gath",
    "Arcane Caitlyn",
    "Soul Reaver Draven",
    "Warring Kingdoms Jarvan IV",
    "Admiral Glasc",
    "Coral Reef Malphite",
    "High Noon Senna",
    "Giant Enemy Crabgot",
    "Neon Strike Vi",
    "Scorched Earth Xerath",
    "Shockblade Zed",
    "Withered Rose Zeri",
    "Demonblade Tryndamere",
    "Headmistress Fiora",
    "Headhunter Rengar",
    "Heavenscale Kai'Sa",
    "Slay Belle Katarina",
    "Kitty Cat Katarina",
    "PROJECT Lucian",
    "Commando Galio",
  ];

  // +25%
  const largeZoom = ["Time Machine Zilean", "Surfer Singed"];

  // +35%
  const veryLargeZoom = [
    "Longhorn Alistar",
    "Moo Cow Alistar",
    "Blood Lord Vladimir",
    "Augmented Singed",
    "Jurassic Cho'Gath",
    "Tranquility Dragon Karma",
  ];

  // +50%
  const superZoom = ["Snow Day Bard"];

  if (smallZoom.includes(name)) zoom = 1.07;
  else if (mediumZoom.includes(name)) zoom = 1.15;
  else if (largeZoom.includes(name)) zoom = 1.25;
  else if (veryLargeZoom.includes(name)) zoom = 1.35;
  else if (superZoom.includes(name)) zoom = 1.5;

  return zoom;
}

function getSkinObjectPosition(name) {
  // Normalizamos las comillas
  name = name.replace(/´/g, "'");

  // Default
  let position = 50;

  // +7%
  const verySmallRight = [
    "Nurse Akali",
    "Ashen Lord Aurelion Sol",
    "Mecha Aurelion Sol",
    "Astronaut Bard",
    "Snow Day Bard",
    "Candy King Ivern",
    "Admiral Glasc",
    "Prestige La Ilusión Renata",
    "Battlecast Alpha Skarner",
    "Sandscourge Skarner",
    "Tundra Hunter Warwick",
    "Arcana Xerath",
    "Astronaut Ivern",
  ];

  // +15%
  const smallRight = [
    "Arcade Kai'Sa",
    "Giant Enemy Crabgot",
    "Sugar Rush Zilean",
  ];

  // +22%
  const midRight = [
    "Dragonslayer Braum",
    "Gatekeeper Galio",
    "Hillbilly Gragas",
    "Battle Cat Jinx",
    "Warring Kingdoms Jarvan IV",
    "High Noon Lucian",
    "Rain Shepherd Milio",
    "Lord Mordekaiser",
    "Elderwood Ornn",
    "Blackfrost Rek'Sai",
    "Eternum Rek'Sai",
    "Headhunter Rengar",
    "Yellow Jacket Shen",
    "Battlecast Urgot",
    "Empyrean Zac",
    "Special Weapon Zac",
    "Arcade Hecarim",
    "Commando Galio",
  ];

  // +30
  const midlargeRight = ["Night Hunter Rengar",];

  // +35%
  const largeRight = [
    "Longhorn Alistar",
    "Arcane Caitlyn",
    "Primetime Draven",
    "Soaring Sword Fiora",
    "Fisherman Fizz",
    "Elderwood Hecarim",
    "PROJECT: Mordekaiser",
    "Mecha Kha'Zix",
    "Warlord Shen",
    "Soulstealer Vladimir",
    "Shockblade Zed",
    "Santa Braum",
    "Time Machine Zilean",
  ];

  // +42%
  const veryLargeRight = [
    "Mecha Aatrox",
    "Jurassic Cho'Gath",
    "Dunkmaster Ivern",
    "Riot Graves",
    "Kitty Cat Katarina",
    "Augmented Singed",
    "The Magnificent Twisted Fate",
    "Traditional Trundle",
    "Neon Strike Vi",
    "Crime City Twitch",
    "Warring Kingdoms Tryndamere",
    "Scorched Earth Xerath",
    "Pool Party Renekton",
    
    "Pool Party Graves",
  ];

  // +50%
  const superRight = [
    "Gentleman Cho'Gath",
    "Pool Party Mundo",
    "Soul Reaver Draven",
    "Headmistress Fiora",
    "Gragas, Esq.",
    "Darkforge Jarvan IV",
    "Coral Reef Malphite",
    "Slay Belle Katarina",
    "Glacial Malphite",
    "Outback Renekton",
    "Constable Trundle",
    "Surfer Singed",
    "Demonblade Tryndamere",
    "Underworld Twisted Fate",
    "Blood Lord Vladimir",
    "Ocean Song Zeri",
    "Tundra Fizz",
    "PROJECT Lucian",
  ];

  // -7%
  const verySmallLeft = [
    "Corporate Mundo",
    "Odyssey Jinx",
    "Tranquility Dragon Karma",
    "Prestige True Damage Senna",
    "Empyrean Zed",
    "PROJECT: Vi",
  ];
  ("Hecarim");

  //-17%
  const smallLeft = ["Moo Cow Alistar", "Dragonslayer Twitch"];

  if (verySmallRight.includes(name)) position += 7;
  else if (smallRight.includes(name)) position += 15;
  else if (midRight.includes(name)) position += 22;
  else if (midlargeRight.includes(name)) position += 30;
  else if (largeRight.includes(name)) position += 35;
  else if (veryLargeRight.includes(name)) position += 42;
  else if (superRight.includes(name)) position += 50;
  else if (verySmallLeft.includes(name)) position -= 7;
  else if (smallLeft.includes(name)) position -= 17;

  return `${position}% center`;
}

