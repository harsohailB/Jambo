import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  FaAngleLeft,
  FaAngleRight,
  FaCheckCircle,
  FaRegCircle,
} from "react-icons/fa";
import parse from "html-react-parser";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import ImageCarousel from "./ImageCarousel";
import { Facebook, Twitter, Pinterest } from "react-sharingbuttons";
import "react-sharingbuttons/dist/main.css";
import { useWindowResize } from "beautiful-react-hooks";

import ConfirmationPopUp from "./ConfirmationPopUp";
import Button from "../styled/Button";

import { ADD_ITEM_TO_SC } from "../../actions/types";
import { updateItemById, deleteItemById } from "../../actions/items";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 50px;
  justify-content: flex-start;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 45%;
  width: 45%;
  margin-left: 200px;
  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    margin-left: 5%;
    width: 90%;
  }
`;

const MainImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 25px;
  width: 30vw;
  height: 30vw;
  object-fit: cover;
`;

const SmallImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-grow: 4;
  max-width: 600px;
  width: 100%;
`;

const SmallImage = styled.img`
  width: 110px;
  height: 110px;
  object-fit: cover;
  cursor: pointer;
  margin: 10px;
  padding: 2px;
  &:hover {
    opacity: 80%;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 20%;
  margin-top: 50px;
  padding-right: 100px;
  @media (max-width: 768px) {
    margin-left: 50px;
    margin-right: 50px;
    width: 80%;
  }
`;

const Name = styled.h3`
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  font-weight: 400;
  color: #3d4246;
  line-height: 1.5;
  margin: 0;
`;

const Price = styled.h3`
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-size: 18px;
  font-weight: 200;
  color: #727a83;
  margin: 0;
`;

const Description = styled.h3`
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-size: 16px;
  font-weight: 200;
  color: #727a83;
  margin-top: 25px;
`;

const DropdownWrapper = styled.div`
  display: flex;
  flex-grow: 2;
  margin-top: 25px;
  margin-bottom: 5px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Icon = styled.div`
  margin: 5px;
  color: #557b97;
  cursor: pointer;
  width: -webkit-fit-content;
  height: -webkit-fit-content;
  & :hover {
    color: black;
  }
  & > svg {
    transition: color 0.1s linear;
  }
`;

const FontBox = styled.div`
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  vertical-align: middle;
`;

const FeatureItemOption = styled.span`
  display: flex;
  align-items: center;
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  color: #3d4246;
`;

const Dropdown = styled.select`
  padding: 10px 28px 10px 18px;
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: black;
  line-height: 1.5;
  border: 0 solid transparent;
  width: 100%;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;

  @media (max-width: 768px) {
    margin-bottom: 10px;
    font-size: 22px;
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: auto;
`;

const ItemPreview = ({ item, setItem }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  useWindowResize((event: React.SyntheticEvent) => {
    setIsMobile(window.innerWidth < 728);
  });

  const shareText = "Checkout this amazing product from Jambo";
  const placeHolderImageLink =
    "https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png";

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const url = window.location.href;

  const [mainImage, setMainImage] = useState(item.mainImage);
  const [selectedColor, setSelectedColor] = useState(item.colors[0]);
  const [selectedSize, setSelectedSize] = useState(item.sizes[0]);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [mobileCarouselIndex, setMobileCarouselIndex] = useState(0);

  const renderSmallImages = () => {
    return item.images.map((image) => (
      <SmallImage
        src={image.imageLink}
        onError={placeHolderImageLink}
        onClick={() => setMainImage(image)}
      ></SmallImage>
    ));
  };

  const renderItemColors = () => {
    return item.colors.map((color) => <option>{color}</option>);
  };

  const renderItemSizes = () => {
    return item.sizes.map((size) => <option>{size}</option>);
  };

  const renderMobileCarousel = () => {
    return item.images.map((image) => (
      <InnerImageZoom
        src={image.imageLink}
        zoomSrc={image.imageLink}
        className="innerZoomImage"
      />
    ));
  };

  const updateSelectedColor = (evt) => {
    setSelectedColor(evt.target.value);
    item.images.forEach((image) => {
      if (image.color === evt.target.value) {
        setMainImage(image);
        setMobileCarouselIndex(item.images.indexOf(image));
      }
    });
  };

  const updateSelectedSize = (evt) => {
    setSelectedSize(evt.target.value);
  };

  const handleEditItem = () => {
    history.push("/edit-item/" + item.id);
  };

  const handleAddToCartClick = () => {
    console.log(item);
    dispatch({
      type: ADD_ITEM_TO_SC,
      item: {
        ...item,
        color: selectedColor,
        quantity: "1",
        size: selectedSize,
      },
    });
    history.push("/cart");
  };

  const removeItem = () => {
    deleteItemById(user, item.id);
    setTimeout(() => {
      history.push("/catalog");
    }, 500);
  };

  const handleFeatureClick = (e) => {
    e.preventDefault();
    let currentItemFeatured = item.featured;
    setItem({
      ...item,
      featured: !currentItemFeatured,
    });
    updateItemById(user, {
      ...item,
      featured: !currentItemFeatured,
    });
  };

  const handleVisibleClick = (e) => {
    e.preventDefault();
    let currentItemVisible = item.isVisible;
    setItem({
      ...item,
      isVisible: !currentItemVisible,
    });
    updateItemById(user, {
      ...item,
      isVisible: !currentItemVisible,
    });
  };

  const handleMobileCarouselIndexChange = (e) => {
    setMobileCarouselIndex(e.target ? e.target.value : e);
  };

  return (
    <Wrapper>
      <Helmet>
        <title>{item.name} - JAMBO</title>
      </Helmet>

      <PreviewWrapper>
        {!isMobile ? (
          <MainImageWrapper>
            {mainImage ? (
              <InnerImageZoom
                src={mainImage.imageLink}
                zoomSrc={mainImage.imageLink}
                className="innerZoomImage"
              />
            ) : (
              <InnerImageZoom
                src={item.thumbnailImage.imageLink}
                zoomSrc={item.thumbnailImage.imageLink}
              />
            )}
          </MainImageWrapper>
        ) : (
          <Carousel
            arrowLeft={<FaAngleLeft size={40} />}
            arrowRight={<FaAngleRight size={40} />}
            addArrowClickHandler
            value={mobileCarouselIndex}
            onChange={handleMobileCarouselIndexChange}
          >
            {renderMobileCarousel()}
          </Carousel>
        )}

        {!isMobile && (
          <SmallImageWrapper>{renderSmallImages()}</SmallImageWrapper>
        )}
      </PreviewWrapper>

      <InfoWrapper>
        <Name>{item.name.length ? item.name : "<Name>"}</Name>
        <Price>${item.price !== "" ? item.price.toFixed(2) : "<Price>"}</Price>

        <DropdownWrapper>
          <Dropdown value={selectedColor} onChange={updateSelectedColor}>
            {renderItemColors()}
          </Dropdown>
          <Dropdown value={selectedSize} onChange={updateSelectedSize}>
            {renderItemSizes()}
          </Dropdown>
        </DropdownWrapper>

        <Button onClick={handleAddToCartClick} to="/cart">
          ADD TO CART
        </Button>

        <Description>
          {item.description.length ? parse(item.description) : "<Description>"}
        </Description>
        {user && <Button onClick={handleEditItem}>EDIT ITEM</Button>}
        {user && (
          <Button onClick={() => setConfirmationPopUp(true)}>
            REMOVE ITEM
          </Button>
        )}
        {confirmationPopUp && (
          <ConfirmationPopUp
            setConfirmationPopUp={setConfirmationPopUp}
            removeItem={removeItem}
          />
        )}

        {user && (
          <FeatureItemOption onClick={handleFeatureClick}>
            <Icon>
              {item.featured ? (
                <FaCheckCircle size={24} />
              ) : (
                <FaRegCircle size={24} />
              )}
            </Icon>
            Featured Item
          </FeatureItemOption>
        )}
        {user && (
          <FeatureItemOption onClick={handleVisibleClick}>
            <Icon>
              {item.isVisible ? (
                <FaCheckCircle size={24} />
              ) : (
                <FaRegCircle size={24} />
              )}
            </Icon>
            Item Visible
          </FeatureItemOption>
        )}

        <shareBoxes>
          <FontBox>
            <Facebook url={url}></Facebook>
            <Twitter url={url} shareText={shareText} />
            <Pinterest url={url} shareText={shareText}></Pinterest>
          </FontBox>
        </shareBoxes>
      </InfoWrapper>
    </Wrapper>
  );
};

export default ItemPreview;
