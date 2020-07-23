export const sortCatalog = (items, sortingOption) => {
  switch (sortingOption) {
    case "Alphabetically, A-Z":
      return sortAlphabetically(items);
    case "Alphabetically, Z-A":
      return sortAlphabetically(items).reverse();
    case "Featured":
      return sortFeatured(items);
    case "Best-Selling":
      return sortBestSelling(items);
    case "Price, low to high":
      return sortPriceLowToHigh(items);
    case "Price, high to low":
      return sortPriceLowToHigh(items).reverse();
    case "Date, new to old":
      return sortDateNewToOld(items);
    case "Date, old to new":
      return sortDateNewToOld(items).reverse();
  }
  return items;
};

const sortAlphabetically = (items) => {
  items.sort((a, b) => a.name.localeCompare(b.name));
  return items;
};

const sortFeatured = (items) => {
  // TODO implement featured sorting
};

const sortBestSelling = (items) => {
  // TODO implement best selling sorting
};

const sortPriceLowToHigh = (items) => {
  items.sort((a, b) => (a.price > b.price ? 1 : -1));
  return items;
};

const sortDateNewToOld = (items) => {
  // TODO implement sort by date
};
