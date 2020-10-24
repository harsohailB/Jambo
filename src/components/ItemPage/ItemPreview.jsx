import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

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
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 45%;
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
  width: 60%;
`;

const MainImage = styled.img`
  width: 45%;
  height: 100%;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(3);
  }
  @media (max-width: 768px) {
    width: 100%;
  }
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
  height: 100%;
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
  @media (max-width: 768px) {
    margin-bottom: 10px;
    font-size: 22px;
  }
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
  const [selectedColor, setSelectedColor] = useState(item.colors.split("/")[0]);
  const [selectedSize, setSelectedSize] = useState(item.sizes.split("/")[0]);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);

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
    const itemColors = item.colors.split("/");
    return itemColors.map((color) => <option>{color}</option>);
  };

  const renderItemSizes = () => {
    const itemSizes = item.sizes.split("/");
    return itemSizes.map((size) => <option>{size}</option>);
  };

  const updateSelectedColor = (evt) => {
    setSelectedColor(evt.target.value);
    item.images.forEach((image) => {
      if (image.color === evt.target.value) {
        setMainImage(image);
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

  return (
    <Wrapper>
      <Helmet>
        <title>{item.name} - JAMBO</title>
      </Helmet>

      <PreviewWrapper>
        <MainImageWrapper>
          {mainImage ? (
            <InnerImageZoom
              src={mainImage.imageLink}
              zoomSrc={mainImage.imageLink}
            />
          ) : (
            <InnerImageZoom
              src={item.thumbnailImage.imageLink}
              zoomSrc={item.thumbnailImage.imageLink}
            />
          )}
        </MainImageWrapper>

        {!isMobile ? (
          <SmallImageWrapper>{renderSmallImages()}</SmallImageWrapper>
        ) : (
          <ImageCarousel
            item={item}
            images={item.images}
            setMainImage={setMainImage}
          />
        )}
      </PreviewWrapper>

      <InfoWrapper>
        <Name>{item.name.length ? item.name : "<Name>"}</Name>
        <Price>${item.price.length ? item.price : "<Price>"}</Price>

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
          {item.description.length ? item.description : "<Description>"}
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
