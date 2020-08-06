export const sortCatalog = (items, sortingOption) => {
  switch (sortingOption) {
    case "Alphabetically, A-Z":
      return sortAlphabetically(items);
    case "Alphabetically, Z-A":
      return sortAlphabetically(items).reverse();
    case "Featured":
      return sortFeatured(items);
    case "Price, low to high":
      return sortPriceLowToHigh(items);
    case "Price, high to low":
      return sortPriceLowToHigh(items).reverse();
  }
  return items;
};

const sortAlphabetically = (items) => {
  items.sort((a, b) => a.name.localeCompare(b.name));
  return items;
};

const sortFeatured = (items) => {
  return items.filter((item) => item.featured === true);
};

const sortPriceLowToHigh = (items) => {
  items.sort((a, b) => (a.price > b.price ? 1 : -1));
  return items;
};
