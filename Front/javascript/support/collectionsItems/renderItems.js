const ITEM_STYLES = [
  { value: "Fighter", label: "Fighter" },
  { value: "Marksman", label: "Marksman" },
  { value: "Mage", label: "Mage" },
  { value: "Assassin", label: "Assassin" },
  { value: "Tank", label: "Tank" },
  { value: "Support", label: "Support" },
];

function renderItems(items = getFilteredItems()) {
  collectionsContainer.innerHTML = "";
  if (!items.length) {
    collectionsContainer.innerHTML = `<p class="text-center">No se encontraron items</p>`;
    return;
  }
  appendItemRows(collectionsContainer, items);
}

// 🔹 Render por itemType (PRINCIPAL)
function renderItemsByStyle() {
  collectionsContainer.innerHTML = "";
  const items = getFilteredItems();
  const usedIds = new Set();

  ITEM_STYLES.forEach((cat) => {
    // Filtra solo los que coinciden con el itemType principal
    const group = items.filter(
      (i) => i.itemType === cat.value && !usedIds.has(i.id)
    );

    if (!group.length) return;

    group.forEach((i) => usedIds.add(i.id));

    const title = document.createElement("h3");
    title.innerHTML = `<strong>${cat.label.toUpperCase()}</strong>`;
    title.classList.add("mt-3", "category-title");
    collectionsContainer.appendChild(title);

    appendItemRows(collectionsContainer, group);
  });

  // 🔸 Grupo “SIN CATEGORÍA” → ítems cuyo itemType no coincide con ningún tipo conocido
  const noCategory = items.filter(
    (i) =>
      !ITEM_STYLES.some((cat) => i.itemType === cat.value) && !usedIds.has(i.id)
  );

  if (noCategory.length) {
    const title = document.createElement("h3");
    title.innerHTML = `<strong>SIN CATEGORÍA</strong>`;
    title.classList.add("mt-3", "category-title");
    collectionsContainer.appendChild(title);

    appendItemRows(collectionsContainer, noCategory);
  }
}

// 🔹 Render por itemType2 (SECUNDARIO)
function renderItemsByStyle2() {
  collectionsContainer.innerHTML = "";
  const items = getFilteredItems();
  const usedIds = new Set();

  ITEM_STYLES.forEach((cat) => {
    const group = items.filter(
      (i) => i.itemType2 === cat.value && !usedIds.has(i.id)
    );

    if (!group.length) return;

    group.forEach((i) => usedIds.add(i.id));

    const title = document.createElement("h3");
    title.innerHTML = `<strong>${cat.label.toUpperCase()}</strong>`;
    title.classList.add("mt-3", "category-title");
    collectionsContainer.appendChild(title);

    appendItemRows(collectionsContainer, group);
  });

  // grupo "sin tipo 2"
  const noType2 = items.filter((i) => !i.itemType2 && !usedIds.has(i.id));
  if (noType2.length) {
    const title = document.createElement("h3");
    title.innerHTML = `<strong>SIN TIPO 2</strong>`;
    title.classList.add("mt-3", "category-title");
    collectionsContainer.appendChild(title);

    appendItemRows(collectionsContainer, noType2);
  }
}
