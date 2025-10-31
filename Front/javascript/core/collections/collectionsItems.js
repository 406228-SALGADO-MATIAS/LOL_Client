const collectionsContainer = document.getElementById("collectionsContainer");

// Variable global para todos los items
let allItems = [];

let currentCategoryFilter = "all";

// ==========================
// Cargar Items desde backend
// ==========================
async function loadItems() {
  collectionsContainer.innerHTML = "";
  try {
    const res = await fetch(`http://localhost:8080/items/getAll`);
    if (!res.ok) throw new Error("Error cargando items");

    allItems = await res.json();
    renderItems(allItems);
    updateItemCounters();
  } catch (err) {
    collectionsContainer.innerHTML = `<p class="text-center text-danger">${err.message}</p>`;
  }
}

// ==========================
// Renderizado básico
// ==========================

function updateItemCounters() {
  const total = allItems.length;
  const posesion = total; // siempre igual al total

  const totalEl = document.getElementById("counter-total");
  const posesionEl = document.getElementById("counter-posesion");

  if (totalEl) totalEl.textContent = total;
  if (posesionEl) posesionEl.textContent = posesion;
}

function applyItemFilter(filter) {
  currentCategoryFilter = filter;
  window.scrollTo({ top: 0, behavior: "smooth" });

  switch (filter) {
    case "style1":
      renderItemsByStyle(); // itemType principal
      break;
    case "style2":
      renderItemsByStyle2(); // itemType secundario
      break;
    default:
      renderItems(); // lista plana
      break;
  }
}


// ==========================
// Listeners
// ==========================
// Cuando la página cargue
document.addEventListener("DOMContentLoaded", () => {
  loadItems();
});

// 🔍 Buscador
document.getElementById("searchItem").addEventListener("input", () => {
  applyItemFilter(currentCategoryFilter);
});

// 🔀 Ordenar
document.getElementById("sortItems").addEventListener("change", () => {
  applyItemFilter(currentCategoryFilter);
});

// 🎭 Filtro de categoría
document.getElementById("filterItems").addEventListener("change", (e) => {
  applyItemFilter(e.target.value);
});
