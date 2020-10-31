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

const printifyItemParser = (printifyItem) => {
  // parse item and return a fanua item
  return {
    isPrintfulItem: true,
    printifyID: printifyItem.id,
    id: 1,
    variant: printifyItem.variants[0].id,
    name: printifyItem.title,
    description: printifyItem.description,
    price: printifyItem.variants[0].price,
    featured: false,
    tags: printifyItem.tags,
    thumbnailImage: {
      color: getColorByVariant(
        printifyItem,
        printifyItem.images[0].variant_ids[0]
      ),
      imageLink: printifyItem.images[0].src,
    },
    colors: printifyItem.options
      .find((option) => option.type === "color")
      .values.map((value) => value.title),
    sizes: printifyItem.options
      .find((option) => option.type === "size")
      .values.map((value) => value.title),
    images: createImages(printifyItem),
  };
};

module.exports = printifyItemParser;
