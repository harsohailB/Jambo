import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Dropdown from "../styled/Dropdown"
import Button from "../styled/Button"
import { useLocation } from "react-router-dom";
import { csv } from "d3";
import inventoryDataCSV from "../../assets/catalog/inventoryData.csv"
import itemImagesCSV from "../../assets/catalog/itemImages.csv"

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
    const [images, setImages] = useState([]);
    const [mainImage, setMainImage] = useState(null);

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
                            <Dropdown>{renderItemColors()}</Dropdown>
                            <Dropdown>{renderItemSizes()}</Dropdown>
                        </DropdownWrapper>
                        <Button>ADD TO CART</Button>
                        <Description>{item.description}</Description>
                    </InfoWrapper>
                </Wrapper> : 
                <h3>Loading</h3>}
        </div>
    );
}

export default ItemPage