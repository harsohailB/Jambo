const getColorByVariant = (printifyItem, variantID) => {
  return printifyItem.variants
    .find((variant) => variant.id === variantID)
    .title.split(" / ")[0];
};

const createImages = (printifyItem) => {
  return printifyItem.images.map((image) => {
    return {
      color: image.is_default
        ? getColorByVariant(printifyItem, image.variant_ids[0])
        : "None",
      imageLink: image.src,
    };
  });
};

const getOptions = (printifyItem, opt) => {
  return printifyItem.options
    .find((option) => option.type === opt)
    .values.map((value) => value.title);
};

const printifyItemParser = (printifyItem) => {
  const itemHasColors = printifyItem.options.find(
    (option) => option.type === "color"
  );

  return {
    isPrintifyItem: true,
    printifyID: printifyItem.id,
    id: 1,
    variant: printifyItem.variants[0].id,
    name: printifyItem.title,
    description: printifyItem.description.split(".: ").join("<li>"),
    price: printifyItem.variants[0].price / 100,
    featured: false,
    tags: printifyItem.tags,
    thumbnailImage: {
      color: getColorByVariant(
        printifyItem,
        printifyItem.images[0].variant_ids[0]
      ),
      imageLink: printifyItem.images[0].src,
    },
    colors: itemHasColors
      ? getOptions(printifyItem, "color")
      : getOptions(printifyItem, "surface"),
    sizes: getOptions(printifyItem, "size"),
    images: createImages(printifyItem),
  };
};

module.exports = printifyItemParser;
