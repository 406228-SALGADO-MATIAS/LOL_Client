function filterItemsByStatus(items, type, filterValue) {
  if (filterValue === "all") return items;

  return items.filter((item) => {
    const status = getItemStatus(item, type);

    switch (filterValue) {
      case "availables": // Se puede desbloquear ya mismo y hay recursos
        if (type === "champion" || type === "icon") {
          return (
            status === "ACTIVABLE" &&
            (item.blueEssenceCost || 0) <= (userLoot?.userBlueEssence || 0)
          );
        } else if (type === "skin") {
          return (
            status === "ACTIVABLE" &&
            (item.orangeEssenceCost || 0) <= (userLoot?.orangeEssence || 0)
          );
        }
        return false;

      case "adquired": // Ya en colección
        return status === "OWNED";

      case "resources": // Necesita recursos (BE/OE insuficiente)
        return (
          (status === "ACTIVABLE" &&
            (type === "champion" || type === "icon") &&
            item.blueEssenceCost > (userLoot?.userBlueEssence || 0)) ||
          (status === "ACTIVABLE" &&
            type === "skin" &&
            item.orangeEssenceCost > (userLoot?.orangeEssence || 0))
        );

      case "champion": // Necesita campeón
        return status === "NEEDS_CHAMPION";

      default:
        return true;
    }
  });
}
