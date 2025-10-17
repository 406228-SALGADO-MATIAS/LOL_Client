// ======================================================
// 🧭 RENDERIZADO DE SECCIONES
// ======================================================

// ----- Selección de Rol -----
function renderRoleSelection() {
  const section = document.createElement("div");
  section.classList.add("modal-section", "role-selection-section");

  // --- TÍTULO ---
  const title = document.createElement("h4");
  title.classList.add("role-selection-title");
  title.textContent = "Seleccionar Rol";

  // --- DISPLAY DE ROL ---
  const displayDiv = document.createElement("div");
  displayDiv.classList.add("role-display");

  // --- BOTONES DE ROLES ---
  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("role-buttons-container");

  roles.forEach((role) => {
    const btn = document.createElement("button");
    btn.classList.add("role-btn");
    btn.innerHTML = `<img src="${role.img}" alt="${role.name}"><span>${role.name}</span>`;
    btn.addEventListener("click", () => selectRole(role, btn));
    buttonsDiv.appendChild(btn);
  });

  // --- BOTÓN SIGUIENTE ---
  nextBtn = document.createElement("button");
  nextBtn.classList.add("modal-next-btn");
  nextBtn.textContent = "Siguiente";
  nextBtn.disabled = true;
  nextBtn.style.opacity = 0; // empieza oculto
  nextBtn.addEventListener("click", () => {
    if (!selectedRole) return;
    goToChampionSelection();
  });

  section.append(title, displayDiv, buttonsDiv, nextBtn);

  // === ANIMACIÓN EXTERNA ===
  animateRoleSelection(title, displayDiv, buttonsDiv);

  return section;
}

// ----- Selección de Campeón -----
function renderChampionSelection() {
  const section = document.createElement("div");
  section.classList.add("modal-section", "champion-selection-section");

  // Filtros de roles
  const filterHeader = document.createElement("div");
  filterHeader.classList.add("champion-filter-header");

  roles.forEach((role) => {
    const btn = document.createElement("button");
    btn.classList.add("role-filter-btn");
    btn.title = role.name;

    const img = document.createElement("img");
    img.src = role.img;
    img.alt = role.name;
    btn.appendChild(img);

    btn.addEventListener("click", () => {
      if (activeRole === role.key) {
        activeRole = null;
        btn.classList.remove("active");
      } else {
        activeRole = role.key;
        document
          .querySelectorAll(".role-filter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      }
      filterAndRenderChampions();
    });

    filterHeader.appendChild(btn);
  });

  // ==== BUSCADOR ==== //
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Buscar campeón...";
  searchInput.classList.add("champion-search-input");
  searchInput.style.marginLeft = "auto"; // lo lleva full a la derecha
  searchInput.addEventListener("input", () => {
    filterAndRenderChampions();
  });
  filterHeader.appendChild(searchInput);

  champGrid = document.createElement("div");
  champGrid.classList.add("champion-grid");

  const previewDiv = renderChampionPreview();
  section.append(filterHeader, champGrid, previewDiv);

  renderChampionGrid(); // render inicial completo
  return section;
}

// ======================================================
// 🧱 COMPONENTES DE RENDER (Grilla y Preview)
// ======================================================
function renderChampionGrid() {
  if (!championsData.length) return;

  champGrid.innerHTML = "";
  let filtered = championsData
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  if (activeRole) {
    filtered = filtered.filter((c) => c.mainRole === activeRole);
  }

  filtered.forEach((champ) => {
    const card = document.createElement("div");
    card.classList.add("champion-card");

    const img = document.createElement("img");
    img.src = champ.squareImageUrl || `images/champs/${champ.name}.jpg`;
    img.alt = champ.name;

    const name = document.createElement("p");
    name.textContent = champ.name;

    card.append(img, name);
    card.addEventListener("click", () => selectChampion(champ, card));

    champGrid.appendChild(card);
  });

  animateChampionCards();
}

function renderChampionPreview() {
  const previewDiv = document.createElement("div");
  previewDiv.classList.add("champion-preview");

  // ===== DIV EXCLUSIVO PARA LA IMAGEN DE FONDO =====
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("champion-preview-image");
  previewDiv.appendChild(imageDiv);

  // ===== Overlay superior =====
  const infoOverlay = document.createElement("div");
  infoOverlay.classList.add("champion-preview-overlay");

  // ===== Partes separadas =====
  const champHeaderDiv = renderPreviewHeader();
  infoOverlay.appendChild(champHeaderDiv);

  const buttonsOverlay = renderPreviewButtons();
  const { leftArrow, rightArrow } = renderPreviewCarousel();

  // ===== Ensamblado final =====
  previewDiv.append(infoOverlay, buttonsOverlay, leftArrow, rightArrow);

  // ===== Guardar referencias globales =====
  champImg = imageDiv;
  champImgNameDiv = champHeaderDiv.querySelector(".champion-preview-name");
  champImg.leftArrow = leftArrow;
  champImg.rightArrow = rightArrow;
  champImg.difficultyDiv = champHeaderDiv.querySelector(
    ".champion-preview-difficulty"
  );
  champImg.winrateDiv = champHeaderDiv.querySelector(
    ".champion-preview-winrate"
  );
  champActionBtn = buttonsOverlay.querySelector(".champion-preview-action-btn");

  return previewDiv;
}

// ====================================================
// =============== SUBCOMPONENTES ======================
// ====================================================

function renderPreviewHeader() {
  const champHeaderDiv = document.createElement("div");
  champHeaderDiv.classList.add("champion-preview-header");

  const champDifficulty = document.createElement("div");
  champDifficulty.classList.add("champion-preview-difficulty");
  champDifficulty.textContent = "";

  const champNameDiv = document.createElement("div");
  champNameDiv.classList.add("champion-preview-name");
  champNameDiv.textContent = "";

  const champWinrate = document.createElement("div");
  champWinrate.classList.add("champion-preview-winrate");
  champWinrate.textContent = "";

  champHeaderDiv.append(champDifficulty, champNameDiv, champWinrate);
  return champHeaderDiv;
}

function renderPreviewButtons() {
  const buttonsOverlay = document.createElement("div");
  buttonsOverlay.classList.add("champion-preview-overlay", "bottom");

  // --- NUEVO BOTÓN "ROL" ---
  const roleBtn = document.createElement("button");
  roleBtn.classList.add("champion-preview-role-btn");
  roleBtn.textContent = "Regresar";
  roleBtn.addEventListener("click", goToRolesSection);

  const actionBtn = document.createElement("button");
  actionBtn.classList.add("champion-preview-action-btn", "choose-btn");
  actionBtn.textContent = "Elegir";
  actionBtn.style.display = "none";
  actionBtn.addEventListener("click", finishSelection);

  const randomBtn = document.createElement("button");
  randomBtn.classList.add("champion-preview-random-btn", "skip-btn");
  randomBtn.textContent = "Skip";
  randomBtn.addEventListener("click", () => {
    selectedChampionId = null;
    finishSelection();
  });

  // Append: rolBtn primero para que quede a la izquierda
  buttonsOverlay.append(roleBtn, actionBtn, randomBtn);
  return buttonsOverlay;
}

function renderPreviewCarousel() {
  const leftArrow = document.createElement("button");
  leftArrow.classList.add("carousel-arrow", "left-arrow");
  leftArrow.textContent = "<";
  leftArrow.style.display = "none";
  leftArrow.addEventListener("click", () => changeSkin(-1));

  const rightArrow = document.createElement("button");
  rightArrow.classList.add("carousel-arrow", "right-arrow");
  rightArrow.textContent = ">";
  rightArrow.style.display = "none";
  rightArrow.addEventListener("click", () => changeSkin(1));

  return { leftArrow, rightArrow };
}
