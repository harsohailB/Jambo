import React, { useState } from "react";
import styled from "styled-components";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Carousel from "react-bootstrap/Carousel";

const SmallImagesSlideOption = ({ item, images, setMainImage }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const renderSmallImages = () => {
    return images.map((image) => (
      <Carousel.Item
        src={require("../../assets/catalog/inventory/" +
          item.folderName +
          "/" +
          image.imageName)}
      ></Carousel.Item>
    ));
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {renderSmallImages}
    </Carousel>
  );
};

export default SmallImagesSlideOption;
