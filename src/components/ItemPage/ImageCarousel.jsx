import React, { useState } from "react";
import styled from "styled-components";

import Carousel from "react-elastic-carousel";

const SmallImage = styled.img`
  width: 110px;
  height: 100%;
  cursor: pointer;
  margin: 10px;
  padding: 2px;

  &:hover {
    opacity: 80%;
  }
`;

const ImageCarousel = ({ item, images, setMainImage }) => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 100, itemsToShow: 2 },
    { width: 200, itemsToShow: 3 },
    { width: 300, itemsToShow: 4 },
  ];
  const placeHolderImageLink =
    "https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png";

  const renderImages = () => {
    return images.map((image) => (
      <SmallImage
        src={image.imageLink !== "" ? image.imageLink : placeHolderImageLink}
        onClick={() => setMainImage(image)}
      ></SmallImage>
    ));
  };

  return <Carousel breakPoints={breakPoints}>{renderImages()}</Carousel>;
};

export default ImageCarousel;
