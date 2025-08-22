// Orden alfabético
function sortIconsAlphabetically(icons) {
  return icons
    .slice()
    .sort((a, b) =>
      a.icon.localeCompare(b.icon, "en", { sensitivity: "base" })
    );
}

// Normalización simple
function normalize(str) {
  return str.replace(/´/g, "'").toLowerCase();
}

// Filtrar por búsqueda de nombre de icono
function filterByQuery(icons, query) {
  if (!query) return icons;
  const normalizedQuery = normalize(query);
  return icons.filter((i) => normalize(i.icon).includes(normalizedQuery));
}

// Agrega propiedad owned según pertenencia
function filterByOwnership(ownedData, showNotOwned, notOwnedData) {
  return [
    ...ownedData.map((i) => ({ ...i, owned: true })),
    ...(showNotOwned ? notOwnedData.map((i) => ({ ...i, owned: false })) : []),
  ];
}

// Función principal que reemplaza getFilteredSkins()
function getFilteredIcons({ ignoreSearch = false } = {}) {
  const showNotOwnedEl = document.getElementById("showNotOwned");
  const searchInputEl = document.getElementById("searchIcon"); // tu input real
  const filterSelectEl = document.getElementById("filterSelect"); // si lo usas

  // Chequeo de existencia
  if (!showNotOwnedEl || !searchInputEl) {
    console.warn("Elementos del filtro no existen aún");
    return []; // devuelvo vacío para que no explote
  }

  const showNotOwned = showNotOwnedEl.checked;

  let icons = filterByOwnership(ownedIcons, showNotOwned, notOwnedIcons);

  if (!ignoreSearch) {
    const iconQuery = searchInputEl.value.trim().toLowerCase();
    icons = filterByQuery(icons, iconQuery);
  }

  return sortIconsAlphabetically(icons);
}
