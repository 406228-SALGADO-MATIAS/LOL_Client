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

function renderItemsByStyle() {
  collectionsContainer.innerHTML = "";
  const items = getFilteredItems(); // ya trae todo combinado

  ITEM_STYLES.forEach((cat) => {
    const group = items.filter(
      (i) => i.itemType === cat.value || i.itemType2 === cat.value
    );
    if (!group.length) return;

    const title = document.createElement("h3");
    title.innerHTML = `<strong>${cat.label.toUpperCase()}</strong>`;
    title.classList.add("mt-3", "category-title"); 
    collectionsContainer.appendChild(title);

    appendItemRows(collectionsContainer, group);
  });

  // grupo "sin categoría"
  const emptyGroup = items.filter(
    (i) =>
      !ITEM_STYLES.some(
        (cat) => i.itemType === cat.value || i.itemType2 === cat.value
      )
  );
  if (emptyGroup.length) {
    const title = document.createElement("h3");
    title.innerHTML = `<strong>SIN CATEGORÍA</strong>`;
    title.classList.add("mt-3", "category-title"); 
    collectionsContainer.appendChild(title);

    appendItemRows(collectionsContainer, emptyGroup);
  }
}
