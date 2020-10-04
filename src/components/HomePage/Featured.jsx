import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Item from "../CatalogPage/Item";
import Button from "../styled/Button";
import { getItems } from "../../actions/items";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 55px 0px;
  color: #3d4246;
  align-items: center;
`;

const Message = styled.h2`
  margin: 0 0 17.5px;
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;
  font-size: 1.25em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 17.5px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Featured = () => {
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    getItems().then((fetchedItems) => {
      console.log(fetchedItems);
      let items = [];
      fetchedItems.forEach((item) => {
        if (item.featured) {
          items.push(item);
        }
      });
      setFeaturedItems(items);
      console.log(featuredItems);
    });
  }, []);

  const renderFeaturedItems = () => {
    console.log("renderFeaturedItems -> featuredItems", featuredItems);
    return featuredItems.map((item) => (
      <Item
        key={item.id}
        id={item.id}
        imageLink={item.thumbnailImage.imageLink}
        name={item.name}
        price={item.price}
      ></Item>
    ));
  };

  return (
    <Wrapper>
      <Message>CHECK CATALOG FOR NEW PRODUCTS</Message>
      <ItemWrapper>{renderFeaturedItems()}</ItemWrapper>
      <Button to="catalog">View All</Button>
    </Wrapper>
  );
};

export default Featured;
