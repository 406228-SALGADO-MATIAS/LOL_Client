const collectionsContainer = document.getElementById("collectionsContainer");
const userId = sessionStorage.getItem("userId");

let ownedData = [];
let notOwnedData = [];

//  Método para ordenar campeones alfabéticamente por nombre
function sortChampionsAlphabetically(champions) {
  return champions.slice().sort((a, b) => {
    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  });
}

// Función que carga desde el backend
async function loadChampions() {
  collectionsContainer.innerHTML = "";

  try {
    const [ownedRes, notOwnedRes] = await Promise.all([
      fetch(`http://localhost:8080/champions/userChampions/${userId}`),
      fetch(
        `http://localhost:8080/champions/userChampions/NotPossess/${userId}`
      ),
    ]);

    if (!ownedRes.ok || !notOwnedRes.ok) {
      collectionsContainer.innerHTML = `<p class="text-center text-danger">Error cargando campeones</p>`;
      return;
    }

    ownedData = await ownedRes.json();
    notOwnedData = await notOwnedRes.json();

    renderChampions(); // primera vez
  } catch (err) {
    collectionsContainer.innerHTML = `<p class="text-center text-danger">${err.message}</p>`;
  }
}

// Función que decide qué mostrar
function renderChampions() {
  collectionsContainer.innerHTML = "";
  const showNotOwned = document.getElementById("showNotOwned").checked;

  // Combinamos campeones propios y, si está activo, los no obtenidos
  let champions = [
    ...ownedData.map((c) => ({ ...c, owned: true })),
    ...(showNotOwned ? notOwnedData.map((c) => ({ ...c, owned: false })) : []),
  ];

  // Orden alfabético
  champions = sortChampionsAlphabetically(champions);

  let row;
  champions.forEach((champ, index) => {
    if (index % 5 === 0) {
      row = document.createElement("div");
      row.classList.add("row", "mb-4");
      collectionsContainer.appendChild(row);
    }

    // Reutilizamos la función que crea la tarjeta
    row.appendChild(createChampionCard(champ));
  });
}

// Crea un <div class="col-md-2"> con la tarjeta de un campeón
function createChampionCard(champ) {
  const col = document.createElement("div");
  col.classList.add("col-md-2", "text-center");
  col.style.flex = "0 0 20%";
  col.style.maxWidth = "20%";

  const card = document.createElement("div");
  card.classList.add("card", "mb-2");
  card.style.width = "108%";
  card.style.height = "360px";
  card.style.overflow = "hidden";

  const img = document.createElement("img");
  img.src = champ.imageUrl;
  img.alt = champ.name;
  img.style.width = "108%";
  img.style.height = "360px";
  img.style.objectFit = "cover";
  img.style.objectPosition = "60% center";

  if (!champ.owned) {
    img.style.filter = "grayscale(100%)";
    img.style.opacity = "0.6";
  }

  const name = document.createElement("div");
  name.classList.add("card-body", "p-2");
  name.innerHTML = `<strong>${champ.name}</strong>`;

  card.appendChild(img);
  card.appendChild(name);
  col.appendChild(card);

  return col;
}

function renderChampionsByDifficulty() {
  collectionsContainer.innerHTML = "";
  const showNotOwned = document.getElementById("showNotOwned").checked;

  // Creamos la colección completa según checkbox
  let champions = [
    ...ownedData.map((c) => ({ ...c, owned: true })),
    ...(showNotOwned ? notOwnedData.map((c) => ({ ...c, owned: false })) : []),
  ];

  // Agrupamos por dificultad
  const difficulties = ["Easy", "Medium", "Hard"];
  difficulties.forEach((diff) => {
    // Filtramos campeones de esta dificultad
    let group = champions.filter((c) => c.difficulty === diff);

    // Ordenamos alfabéticamente
    group = sortChampionsAlphabetically(group);

    if (group.length === 0) return; // Si no hay campeones, saltamos

    // Título del grupo
    const title = document.createElement("h4");
    title.textContent = diff;
    title.classList.add("mt-3");
    collectionsContainer.appendChild(title);

    // Fila de tarjetas
    let row;
    group.forEach((champ, index) => {
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("row", "mb-4");
        collectionsContainer.appendChild(row);
      }

      // Reutilizamos la función de creación de tarjeta
      row.appendChild(createChampionCard(champ));
    });
  });
}

function renderChampionsByRole() {
  collectionsContainer.innerHTML = "";
  const showNotOwned = document.getElementById("showNotOwned").checked;

  // Creamos la colección completa según checkbox
  let champions = [
    ...ownedData.map((c) => ({ ...c, owned: true })),
    ...(showNotOwned ? notOwnedData.map((c) => ({ ...c, owned: false })) : []),
  ];

  // Roles en orden que queremos mostrar
  const roles = ["TOP", "JUNGLE", "MID", "ADC", "SUPPORT"];

  roles.forEach((role) => {
    // Filtramos campeones por mainRole
    let group = champions.filter((c) => c.mainRole === role);

    // Ordenamos alfabéticamente
    group = sortChampionsAlphabetically(group);

    if (group.length === 0) return; // Si no hay campeones en este rol, saltamos

    // Título del grupo
    const title = document.createElement("h4");
    title.textContent =
      role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    title.classList.add("mt-3");
    collectionsContainer.appendChild(title);

    // Fila de tarjetas
    let row;
    group.forEach((champ, index) => {
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("row", "mb-4");
        collectionsContainer.appendChild(row);
      }

      // Reutilizamos la función de creación de tarjeta
      row.appendChild(createChampionCard(champ));
    });
  });
}

function renderChampionsByStyle() {
  collectionsContainer.innerHTML = "";
  const showNotOwned = document.getElementById("showNotOwned").checked;

  // Combinamos campeones propios y, si está activo, los no obtenidos
  let champions = [
    ...ownedData.map((c) => ({ ...c, owned: true })),
    ...(showNotOwned ? notOwnedData.map((c) => ({ ...c, owned: false })) : []),
  ];

  // Orden de estilos que queremos mostrar
  const styles = ["Fighter", "Marksman", "Mage", "Assassin", "Tank", "Support"];

  styles.forEach((style) => {
    // Filtramos campeones por style
    let group = champions.filter((c) => c.style === style);

    // Orden alfabético
    group = sortChampionsAlphabetically(group);

    if (group.length === 0) return; // Si no hay campeones en este estilo, saltamos

    // Título del grupo con primera letra mayúscula
    const title = document.createElement("h4");
    title.textContent =
      style.charAt(0).toUpperCase() + style.slice(1).toLowerCase();
    title.classList.add("mt-3");
    collectionsContainer.appendChild(title);

    // Fila de tarjetas
    let row;
    group.forEach((champ, index) => {
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("row", "mb-4");
        collectionsContainer.appendChild(row);
      }

      // Reutilizamos la función de creación de tarjeta
      row.appendChild(createChampionCard(champ));
    });
  });
}

function renderChampionsByRole2() {
  collectionsContainer.innerHTML = "";
  const showNotOwned = document.getElementById("showNotOwned").checked;

  let champions = [
    ...ownedData.map((c) => ({ ...c, owned: true })),
    ...(showNotOwned ? notOwnedData.map((c) => ({ ...c, owned: false })) : []),
  ];

  // Orden de roles que queremos mostrar
  const roles = ["TOP", "JUNGLE", "MID", "ADC", "SUPPORT"];

  // Recorremos en orden fijo
  roles.forEach((role) => {
    let group = champions
      .filter((c) => c.sideRole === role)
      .sort((a, b) => a.name.localeCompare(b.name));

    if (group.length === 0) return;

    const title = document.createElement("h4");
    title.textContent =
      role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    title.classList.add("mt-3");
    collectionsContainer.appendChild(title);

    let row;
    group.forEach((champ, index) => {
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("row", "mb-4");
        collectionsContainer.appendChild(row);
      }
      row.appendChild(createChampionCard(champ));
    });
  });

  // Campeones sin sideRole
  const withoutSideRole = champions
    .filter((c) => !c.sideRole)
    .sort((a, b) => a.name.localeCompare(b.name));

  if (withoutSideRole.length > 0) {
    const title = document.createElement("h4");
    title.textContent = "SIN ROL SECUNDARIO";
    title.classList.add("mt-3");
    collectionsContainer.appendChild(title);

    let row;
    withoutSideRole.forEach((champ, index) => {
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("row", "mb-4");
        collectionsContainer.appendChild(row);
      }
      row.appendChild(createChampionCard(champ));
    });
  }
}

function renderChampionsByStyle2() {
  collectionsContainer.innerHTML = "";
  const showNotOwned = document.getElementById("showNotOwned").checked;

  // Combinamos campeones propios y, si está activo, los no obtenidos
  let champions = [
    ...ownedData.map((c) => ({ ...c, owned: true })),
    ...(showNotOwned ? notOwnedData.map((c) => ({ ...c, owned: false })) : []),
  ];

  // Orden de estilos secundarios que queremos mostrar
  const styles = ["Fighter", "Marksman", "Mage", "Assassin", "Tank", "Support"];

  // Para cada estilo definido
  styles.forEach((style) => {
    // Filtramos campeones por style2
    let group = champions.filter((c) => c.style2 === style);

    // Orden alfabético
    group = sortChampionsAlphabetically(group);

    if (group.length === 0) return;

    // Título del grupo
    const title = document.createElement("h4");
    title.textContent =
      style.charAt(0).toUpperCase() + style.slice(1).toLowerCase();
    title.classList.add("mt-3");
    collectionsContainer.appendChild(title);

    // Fila de tarjetas
    let row;
    group.forEach((champ, index) => {
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("row", "mb-4");
        collectionsContainer.appendChild(row);
      }
      row.appendChild(createChampionCard(champ));
    });
  });

  // Grupo especial: sin estilo secundario
  let noStyleGroup = champions.filter((c) => !c.style2);

  if (noStyleGroup.length > 0) {
    noStyleGroup = sortChampionsAlphabetically(noStyleGroup);

    const title = document.createElement("h4");
    title.textContent = "Sin estilo secundario";
    title.classList.add("mt-3");
    collectionsContainer.appendChild(title);

    let row;
    noStyleGroup.forEach((champ, index) => {
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("row", "mb-4");
        collectionsContainer.appendChild(row);
      }
      row.appendChild(createChampionCard(champ));
    });
  }
}

// Función central que decide qué renderizar
function applyFilter() {
  const activeFilter = document.getElementById("filterSelect").value;

  if (activeFilter === "difficulty") renderChampionsByDifficulty();
  else if (activeFilter === "role") renderChampionsByRole();
  else if (activeFilter === "style") renderChampionsByStyle();
  else if (activeFilter === "style2") renderChampionsByStyle2();
  else if (activeFilter === "role2") renderChampionsByRole2();
  else renderChampions();
}

// Inicialización
document.addEventListener("DOMContentLoaded", loadChampions);

// Checkbox para mostrar campeones no obtenidos
document.getElementById("showNotOwned").addEventListener("change", applyFilter);

// Dropdown filtros
document.getElementById("filterSelect").addEventListener("change", applyFilter);

// Si hacés click en el nav Champions → recarga
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (e.target.innerText === "Champions") {
      e.preventDefault();
      loadChampions();
    }
  });
});
