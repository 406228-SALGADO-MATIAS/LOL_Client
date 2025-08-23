function createIconCard(icon) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.height = "23vh";              // 🔥 antes 165px → relativo al viewport
  card.style.overflow = "hidden";
  card.style.display = "flex";
  card.style.flexDirection = "column";
  card.style.textAlign = "center";         // 🔥 ya lo tenías

  const imgContainer = document.createElement("div");
  imgContainer.style.height = "100%";       // 🔥 antes 140px → % de card
  imgContainer.style.display = "flex";
  imgContainer.style.alignItems = "center";
  imgContainer.style.justifyContent = "center";

  const img = document.createElement("img");
  img.src = icon.image;
  img.alt = icon.icon;
  img.style.width = "95%";                 // 🔥 antes 90px o px → % del contenedor
  img.style.height = "100%";
  img.style.objectFit = "cover";

  if (!icon.owned) {
    img.style.filter = "grayscale(95%)";
    img.style.opacity = "0.7";
  }

  imgContainer.appendChild(img);

  const name = document.createElement("div");
  name.classList.add("card-body", "p-1");
  name.style.flex = "0 0 15%";             // 🔥 antes 20px → % de card
  name.style.fontSize = "0.9rem";          // 🔥 antes 0.75rem, ya relativo
  name.innerHTML = `<strong>${icon.icon}</strong>`;

  card.appendChild(imgContainer);
  card.appendChild(name);

  card.addEventListener("click", () => openModalIcon(icon));
  return card;
}

function appendIconRows(container, icons) {
  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(7, minmax(0, 1fr))"; // 🔥 sin px fijos
  grid.style.justifyContent = "center";
  grid.style.gap = "1.5vw";                  // 🔥 antes 16px → vw relativo al ancho de pantalla
  grid.style.marginBottom = "2vh";         // 🔥 antes 1rem → vh relativo al alto de pantalla

  icons.forEach((icon) => {
    grid.appendChild(createIconCard(icon));
  });

  container.appendChild(grid);
}
