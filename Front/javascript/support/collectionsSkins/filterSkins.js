// Orden alfabético
function sortSkinsAlphabetically(skins) {
  return skins.slice().sort((a, b) => {
    // 1️⃣ Primero comparo el nombre del campeón
    const champCompare = a.championName.localeCompare(b.championName, "en", {
      sensitivity: "base",
    });
    if (champCompare !== 0) return champCompare; // si son distintos, ese es el orden final

    // 2️⃣ Si el campeón es el mismo, comparo el nombre de la skin
    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  });
}

function normalize(str) {
  // reemplaza ´ por ' y pasa todo a minúscula
  return str.replace(/´/g, "'").toLowerCase();
}

function filterByQuery(champions, query) {
  if (!query) return champions;
  const normalizedQuery = normalize(query);
  return champions.filter((c) => normalize(c.name).includes(normalizedQuery));
}

function filterByChampionName(champions, query) {
  if (!query) return champions;
  const normalizedQuery = normalize(query);
  return champions.filter((c) =>
    normalize(c.championName).includes(normalizedQuery)
  );
}

function filterByOwnership(ownedData, showNotOwned, notOwnedData) {
  return [
    ...ownedData.map((s) => ({ ...s, owned: true })),
    ...(showNotOwned ? notOwnedData.map((s) => ({ ...s, owned: false })) : []),
  ];
}

function filterByOwnership(ownedData, showNotOwned, notOwnedData) {
  return [
    ...ownedData.map((c) => ({ ...c, owned: true })),
    ...(showNotOwned ? notOwnedData.map((c) => ({ ...c, owned: false })) : []),
  ];
}

// En getFilteredSkins(), agregamos la parte del campeón
function getFilteredSkins({ ignoreSearch = false } = {}) {
  const showNotOwned = document.getElementById("showNotOwned").checked;

  let skins = filterByOwnership(ownedSkins, showNotOwned, notOwnedSkins);

  if (!ignoreSearch) {
    const skinQuery = document
      .getElementById("searchSkin")
      .value.trim()
      .toLowerCase();
    const champQuery = document
      .getElementById("searchChampion")
      .value.trim()
      .toLowerCase();

    skins = filterByQuery(skins, skinQuery); // filtro por nombre de skin
    skins = filterByChampionName(skins, champQuery); // filtro por nombre de campeón
  }

  return sortSkinsAlphabetically(skins);
}
