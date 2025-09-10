// Render básico
function renderIcons() {
  collectionsContainer.innerHTML = "";
  const icons = getFilteredIcons();
  appendIconRows(collectionsContainer, icons);
}

function renderIconsByCategory({
  attribute,
  categories,
  formatTitle,
  includeEmptyGroup,
  emptyGroupTitle,
  ignoreSearch = false,
}) {
  collectionsContainer.innerHTML = "";
  const icons = getFilteredIcons({ ignoreSearch });

  categories.forEach((cat) => {
    const value = cat.value !== undefined ? cat.value : cat;

    const group = icons.filter((i) => {
      const attrValue = i[attribute];
      if (typeof attrValue === "string") {
        return (
          attrValue.replace(/´/g, "'") === String(value).replace(/´/g, "'")
        );
      }
      return attrValue === value;
    });

    if (!group.length) return;

    const title = document.createElement("h3");
    const displayCat = (formatTitle ? formatTitle(cat) : String(cat)).replace(
      /´/g,
      "'"
    );
    title.innerHTML = `<strong>${displayCat.toUpperCase()}</strong>`;
    title.classList.add("mt-3", "category-title"); 
    collectionsContainer.appendChild(title);

    appendIconRows(collectionsContainer, group);
  });

  if (includeEmptyGroup) {
    const emptyGroup = icons.filter((i) => {
      const attrValue = i[attribute];
      return !categories.some((cat) => {
        const value = cat.value !== undefined ? cat.value : cat;
        if (typeof attrValue === "string") return attrValue === String(value);
        return attrValue === value;
      });
    });

    if (emptyGroup.length) {
      const title = document.createElement("h3");
      title.innerHTML = `<strong>${emptyGroupTitle.toUpperCase()}</strong>`;
      title.classList.add("mt-3", "category-title"); 
      collectionsContainer.appendChild(title);

      appendIconRows(collectionsContainer, emptyGroup);
    }
  }
}

// Por ownership
function renderIconsByOwnership() {
  renderIconsByCategory({
    attribute: "owned",
    categories: [true, false],
    formatTitle: (owned) => (owned ? "ADQUIRIDOS" : "NO ADQUIRIDOS"),
    includeEmptyGroup: false,
    ignoreSearch: false,
  });
}
