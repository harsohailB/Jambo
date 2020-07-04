import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Dropdown from "../styled/Dropdown"
import Button from "../styled/Button"
import { useLocation } from "react-router-dom";
import { csv } from "d3";
import inventoryDataCSV from "../../assets/catalog/inventoryData.csv"
import itemImagesCSV from "../../assets/catalog/itemImages.csv"
import { ShoppingCartContext } from "../../ShoppingCartContext"
import { UserContext } from "../../UserContext";

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
    font-family: Righteous,sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    font-weight: 400;
    color: #3d4246;
    line-height: 1.5;
    margin: 0;
`;

const Price = styled.h3`
    font-family: Oswald,sans-serif;
    font-style: normal;
    font-size: 18px;
    font-weight: 200;
    color: #727A83;
    margin: 0;
`;

const Description = styled.h3`
    font-family: Oswald,sans-serif;
    font-style: normal;
    font-size: 16px;
    font-weight: 200;
    color: #727A83;
    margin-top: 25px;
`;

const DropdownWrapper = styled.div`
    display: flex;
    flex-grow: 2;
    margin-top: 25px;
    margin-bottom: 5px;
`;

const ItemPage = () => {
    const location = useLocation();
    const [item, setItem] = useState(null);
    const [user, setUser] = useContext(UserContext);
    const [itemColors, setItemColors] = useState(null);
    const [itemSizes, setItemSizes] = useState(null);
    const [images, setImages] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [shoppingCartItems, setShoppingCartItems] = useContext(ShoppingCartContext);

    useEffect(() => {
        importItem();
        importAllItemImages();
    }, [location]);

    const importItem = () => {
        try {
            const itemId = location.pathname.split("/").reverse()[0];
            csv(inventoryDataCSV).then(items => {
                items.forEach(item => {
                    if(item.id === itemId){
                        setItem(item);
                        const itemColorsArray = item.colors.split('/');
                        const itemSizesArray = item.sizes.split('/');
                        setItemColors(itemColorsArray);
                        setItemSizes(itemSizesArray);
                        setSelectedColor(itemColorsArray[0]);
                        setSelectedSize(itemSizesArray[0]);
                    }
                })
            });
        } catch (e) {
            console.log(e);
        }
    }

    const importAllItemImages = () => {
        try {
            var tempImagesArray = []
            const itemId = location.pathname.split("/").reverse()[0];
            csv(itemImagesCSV).then(itemImages => {
                itemImages.forEach(itemImage => {
                    if(itemImage.id === itemId){
                        tempImagesArray.push(itemImage);
                    }
                })
                setImages(tempImagesArray);
            });
        } catch (e) {
            console.log(e);
        }
    }

    const renderItemColors = () => {
        const itemColors = item.colors.split('/')
        return itemColors.map(color => (
            <option>{color}</option>
        ));
    };

    const renderItemSizes = () => {
        const itemSizes = item.sizes.split('/')
        return itemSizes.map(size => (
            <option>{size}</option>
        ));
    };

    const renderSmallImages = () => {
        return images.map(image => (
            <SmallImage 
                src={require("../../assets/catalog/inventory/" + item.imageName + "/" + image.imageName)}
                onClick={() => setMainImage(image)}
            ></SmallImage>
        ));
    }

    const updateSelectedColor = evt => {
        setSelectedColor(evt.target.value);
        images.forEach(image => {
            if(image.color === evt.target.value){
                setMainImage(image);
            }
        });
    }
    
    const updateSelectedSize = evt => {
        setSelectedSize(evt.target.value);
    }
    
    const handleRemoveItem = () => {
        // TODO remove item
    }
    
    const handleEditItem = () => {
        // TODO edit item
    }

    const handleAddToCartClick = () => {
        let itemExists = false;
        // if shopping cart has item then increment quantity
        shoppingCartItems.forEach(existingItem => {
            if(item.id === existingItem.id && selectedColor === existingItem.color && selectedSize === existingItem.size){
                existingItem.quantity++;
                itemExists = true;
            }
        });
        // if not, add new one
        if(!itemExists){
            shoppingCartItems.push({
                ...item,
                color: selectedColor,
                quantity: "1",
                size: selectedSize
            });
        }
    }

    return(
        <div>
            {item ? 
                <Wrapper>
                    <PreviewWrapper>
                        <MainImageWrapper>
                            {mainImage ? 
                                <MainImage src={require("../../assets/catalog/inventory/" + item.imageName + "/" + mainImage.imageName)}></MainImage>
                            :   <MainImage src={require("../../assets/catalog/inventory/" + item.imageName + "/" + item.imageName + ".jpg")}></MainImage>}
                        </MainImageWrapper>

                        <SmallImageWrapper>
                            {renderSmallImages()}
                        </SmallImageWrapper>
                    </PreviewWrapper>

                    <InfoWrapper>
                        <Name>{item.name}</Name>
                        <Price>${item.price}</Price>
                        <DropdownWrapper>
                            <Dropdown value={selectedColor} onChange={updateSelectedColor}>{renderItemColors()}</Dropdown>
                            <Dropdown value={selectedSize} onChange={updateSelectedSize}>{renderItemSizes()}</Dropdown>
                        </DropdownWrapper>
                        <Button onClick={handleAddToCartClick} to="/cart">ADD TO CART</Button>
                        <Description>{item.description}</Description>
                        {user && <Button onClick={handleEditItem}>EDIT ITEM</Button>}
                        {user && <Button onClick={handleRemoveItem}>REMOVE ITEM</Button>}
                    </InfoWrapper>
                </Wrapper> : 
                <h3>Loading</h3>}
        </div>
    );
}

export default ItemPage