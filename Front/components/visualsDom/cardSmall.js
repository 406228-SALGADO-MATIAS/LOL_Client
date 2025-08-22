// Crear tarjeta pequeña para iconos/items
function createIconCard(icon) {
  const col = document.createElement("div");
  col.classList.add("col-md-1", "text-center"); // 12 columnas / 10 cards ≈ col-md-1.2
  col.style.flex = "0 0 10%";
  col.style.maxWidth = "10%";
  col.style.marginRight = "47px"; // separación horizontal
  //col.style.marginBottom = "2px"; // separación vertical

  const card = document.createElement("div");
  card.classList.add("card", "mb-2");
  card.style.width = "170%";
  card.style.height = "165px"; // más chico
  card.style.overflow = "hidden";
  card.style.display = "flex";
  card.style.flexDirection = "column";

  // Contenedor para la imagen
  const imgContainer = document.createElement("div");
  imgContainer.style.height = "140px"; // menor altura
  imgContainer.style.display = "flex";
  imgContainer.style.alignItems = "center";
  imgContainer.style.justifyContent = "center";

  const img = document.createElement("img");
  img.src = icon.image;
  img.alt = icon.icon;
  img.style.width = "90%";
  img.style.height = "100%";
  img.style.objectFit = "cover";

  if (!icon.owned) {
    img.style.filter = "grayscale(95%)";
    img.style.opacity = "0.7";
  }

  imgContainer.appendChild(img);

  // Nombre / info pequeña
  const name = document.createElement("div");
  name.classList.add("card-body", "p-1");
  name.style.flex = "0 0 20px";
  name.style.fontSize = "0.75rem";
  name.innerHTML = `<strong>${icon.icon}</strong>`;

  card.appendChild(imgContainer);
  card.appendChild(name);
  col.appendChild(card);

  card.addEventListener("click", () => openModalIcon(icon));
  return col;
}

// Append filas de 7
function appendIconRows(container, icons) {
  let row;
  icons.forEach((icon, index) => {
    if (index % 7 === 0) {
      row = document.createElement("div");
      row.classList.add("row", "mb-2");
      container.appendChild(row);
    }
    row.appendChild(createIconCard(icon));
  });
}
