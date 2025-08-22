function normalize(str) {
  // reemplaza ´ por ' y pasa todo a minúscula
  return str.replace(/´/g, "'").toLowerCase();
}

function filterByQuery(champions, query) {
  if (!query) return champions;
  const normalizedQuery = normalize(query);
  return champions.filter((c) => normalize(c.name).includes(normalizedQuery));
}

function filterByOwnership(ownedData, showNotOwned, notOwnedData) {
  return [
    ...ownedData.map((c) => ({ ...c, owned: true })),
    ...(showNotOwned ? notOwnedData.map((c) => ({ ...c, owned: false })) : []),
  ];
}

//  Método para ordenar campeones alfabéticamente por nombre
function sortChampionsAlphabetically(champions) {
  return champions.slice().sort((a, b) => {
    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  });
}

function getFilteredChampions() {
  const showNotOwned = document.getElementById("showNotOwned").checked;
  const query = document
    .getElementById("searchChampion")
    .value.trim()
    .toLowerCase();

  let champions = filterByOwnership(ownedData, showNotOwned, notOwnedData);
  champions = filterByQuery(champions, query);

  return sortChampionsAlphabetically(champions);
}
