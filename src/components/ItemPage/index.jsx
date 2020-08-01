import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Dropdown from "../styled/Dropdown";
import Button from "../styled/Button";
import { useLocation } from "react-router-dom";
import { getItemById, updateItemById } from "../../actions/items";
import { deleteItemById } from "../../actions/items";
import { ADD_ITEM_TO_SC, REMOVE_ITEM_FROM_SC } from "../../actions/types";
import Title from "../styled/Title";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 50px;
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  max-width: 50%;
  margin-right: 50px;
`;

const MainImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  margin-bottom: 25px;
`;

const MainImage = styled.img`
  width: 50%;
  height: auto;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(3);
  }
`;

const SmallImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  flex-grow: 4;
  width: 600px;
`;

const SmallImage = styled.img`
  width: 110px;
  height: auto;
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

const FeatureItemOption = styled.span`
  display: flex;
  jsutify-content: center;
  align-items: center;
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  color: #3d4246;
`;

const ItemPage = () => {
  const user = useSelector((state) => state.user);
  const shoppingCartItems = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [item, setItem] = useState(null);
  const [itemColors, setItemColors] = useState(null);
  const [itemSizes, setItemSizes] = useState(null);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    try {
      const itemId = location.pathname.split("/").reverse()[0];
      getItemById(itemId).then((fetchedItem) => {
        setItem(fetchedItem);
        setImages(fetchedItem.images);
        setItemColors(fetchedItem.colors.split("/"));
        setSelectedColor(fetchedItem.colors.split("/")[0]);
        setItemSizes(fetchedItem.sizes.split("/"));
        setSelectedSize(fetchedItem.sizes.split("/")[0]);
        setMainImage(fetchedItem.thumbnailImage);
      });
    } catch (e) {
      console.log("ItemPage UseEffect ERROR");
      console.log(e);
    }
  }, [location]);

  const renderItemColors = () => {
    const itemColors = item.colors.split("/");
    return itemColors.map((color) => <option>{color}</option>);
  };

  const renderItemSizes = () => {
    const itemSizes = item.sizes.split("/");
    return itemSizes.map((size) => <option>{size}</option>);
  };

  const renderSmallImages = () => {
    return images.map((image) => (
      <SmallImage
        src={require("../../assets/catalog/inventory/" +
          item.folderName +
          "/" +
          image.imageName)}
        onClick={() => setMainImage(image)}
      ></SmallImage>
    ));
  };

  const updateSelectedColor = (evt) => {
    setSelectedColor(evt.target.value);
    images.forEach((image) => {
      if (image.color === evt.target.value) {
        setMainImage(image);
      }
    });
  };

  const updateSelectedSize = (evt) => {
    setSelectedSize(evt.target.value);
  };

  const handleRemoveItem = () => {
    deleteItemById(user, item.id);
    setTimeout(() => {
      history.push("/catalog");
    }, 500);
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
        selectedImageName: mainImage.imageName,
        color: selectedColor,
        quantity: "1",
        size: selectedSize,
      },
    });
    history.push("/cart");
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
    <div>
      {item ? (
        <Wrapper>
          <PreviewWrapper>
            <MainImageWrapper>
              {mainImage ? (
                <MainImage
                  src={require("../../assets/catalog/inventory/" +
                    item.folderName +
                    "/" +
                    mainImage.imageName)}
                ></MainImage>
              ) : (
                <MainImage
                  src={require("../../assets/catalog/inventory/" +
                    item.folderName +
                    "/" +
                    item.thumbnailImage.imageName)}
                ></MainImage>
              )}
            </MainImageWrapper>

            <SmallImageWrapper>{renderSmallImages()}</SmallImageWrapper>
          </PreviewWrapper>

          <InfoWrapper>
            <Name>{item.name}</Name>
            <Price>${item.price}</Price>
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
            <Description>{item.description}</Description>
            {user && <Button onClick={handleEditItem}>EDIT ITEM</Button>}
            {user && <Button onClick={handleRemoveItem}>REMOVE ITEM</Button>}
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
          </InfoWrapper>
        </Wrapper>
      ) : (
        <Title>Loading...</Title>
      )}
    </div>
  );
};

export default ItemPage;
