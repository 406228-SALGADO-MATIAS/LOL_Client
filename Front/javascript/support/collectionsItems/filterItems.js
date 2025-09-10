function normalize(str) {
  return str ? str.replace(/´/g, "'").toLowerCase() : "";
}

// 🔍 Filtro por nombre del ítem
function filterByName(items, query) {
  if (!query) return items;
  const normalizedQuery = normalize(query);
  return items.filter((i) => normalize(i.name).includes(normalizedQuery));
}

// 🔍 Filtro por tipo de ítem
function filterByType(items, query) {
  if (!query) return items;
  const normalizedQuery = normalize(query);
  return items.filter((i) => normalize(i.itemType).includes(normalizedQuery));
}

function filterByStats(items, filters) {
  return items.filter((i) => {
    if (
      filters.attackDamageMin &&
      (!i.attackDamage || i.attackDamage < filters.attackDamageMin)
    )
      return false;
    if (filters.armorMin && (!i.armor || i.armor < filters.armorMin))
      return false;
    if (
      filters.abilityPowerMin &&
      (!i.abilityPower || i.abilityPower < filters.abilityPowerMin)
    )
      return false;
    if (filters.healthMin && (!i.health || i.health < filters.healthMin))
      return false;
    return true;
  });
}

function sortItems(items, sortBy) {
  if (!sortBy) return items; // sin ordenar

  return items.slice().sort((a, b) => {
    const valA = a[sortBy] ?? 0;
    const valB = b[sortBy] ?? 0;

    // Ordenar de mayor a menor
    return valB - valA;
  });
}

function getFilteredItems({ ignoreSearch = false } = {}) {
  let items = allItems;

  // 🔍 filtro de nombre
  if (!ignoreSearch) {
    const query = document
      .getElementById("searchItem")
      .value.trim()
      .toLowerCase();
    if (query) {
      items = items.filter((i) => i.name.toLowerCase().includes(query));
    }
  }

  // 🔍 filtro por stats
  const filters = {
    attackDamageMin:
      Number(document.getElementById("filterAttackDamageMin")?.value) || null,
    armorMin: Number(document.getElementById("filterArmorMin")?.value) || null,
    abilityPowerMin:
      Number(document.getElementById("filterAbilityPowerMin")?.value) || null,
    healthMin:
      Number(document.getElementById("filterHealthMin")?.value) || null,
  };
  items = filterByStats(items, filters);

  // ❌ sacamos esto 👇 (lo dejamos al render)
  // if (currentCategoryFilter === "style1") { ... }
  // else if (currentCategoryFilter === "style2") { ... }

  // 🔀 ordenamiento
  const sortBy = document.getElementById("sortItems").value;
  items = sortItems(items, sortBy);

  return items;
}
