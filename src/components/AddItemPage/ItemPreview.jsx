import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

import Button from "../styled/Button";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5%;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  transition: all 0.3s ease;
  margin-right: 5%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 300px;
  width: 30%;
  margin-top: 50px;

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

const ItemPreview = (props) => {
  const placeHolderImageLink =
    "https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png";

  const [item, setItem] = useState(null);

  useEffect(() => {
    setItem(props.item);
  }, [props]);

  const renderItemColors = () => {
    const itemColors = item.colors.split("/");
    return itemColors.map((color) => <option>{color}</option>);
  };

  const renderItemSizes = () => {
    const itemSizes = item.sizes.split("/");
    return itemSizes.map((size) => <option>{size}</option>);
  };

  return (
    <div>
      {console.log(item)}
      {item && (
        <Wrapper>
          {item.images.length > 0 ? (
            <MainImage src={item.images[0].imageLink} />
          ) : (
            <MainImage src={placeHolderImageLink} />
          )}

          <InfoWrapper>
            <Name>{item.name.length !== 0 ? item.name : "<Name>"}</Name>
            <Price>
              {item.price.length !== 0 ? "$" + item.price : "<Price>"}
            </Price>

            <DropdownWrapper>
              <Dropdown value={item.colors.split("/")[0]}>
                {renderItemColors()}
              </Dropdown>
              <Dropdown value={item.colors.split("/")[0]}>
                {renderItemSizes()}
              </Dropdown>
            </DropdownWrapper>

            <Button>ADD TO CART</Button>

            <Description>
              {item.description.length !== 0
                ? item.description
                : "<Description>"}
            </Description>

            <Button>EDIT ITEM</Button>
            <Button>REMOVE ITEM</Button>

            <FeatureItemOption>
              <Icon>
                {item.featured ? (
                  <FaCheckCircle size={24} />
                ) : (
                  <FaRegCircle size={24} />
                )}
              </Icon>
              Featured Item
            </FeatureItemOption>
          </InfoWrapper>
        </Wrapper>
      )}
    </div>
  );
};

export default ItemPreview;
