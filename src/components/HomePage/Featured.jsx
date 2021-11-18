import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Item from "../CatalogPage/Item";
import Button from "../styled/Button";
import { getItems } from "../../actions/items";
import { useSelector } from "react-redux";

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
  display: grid;
  grid: auto / repeat(5, 19.2%);
  gap: 1%;
  justify-items: center;
  width: 80%;
  max-width: 1500px;

  @media (max-width: 1500px) {
    grid: auto / repeat(4, 25%);
  }

  @media (max-width: 1300px) {
    grid: auto / repeat(3, 33%);
  }

  @media (max-width: 1100px) {
    grid: auto / repeat(3, 33%);
  }

  @media (max-width: 900px) {
    grid: auto / repeat(2, 50%);
  }

  @media (max-width: 768px) {
    grid: auto / repeat(1, 100%);
  }
`;

const Featured = () => {
  const user = useSelector((state) => state.user);
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    getItems().then((fetchedItems) => {
      setFeaturedItems(fetchedItems.filter((item) => item.featured));
    });
  }, []);

  const renderFeaturedItems = () => {
    return featuredItems.map((item) => {
      if (item.isVisible || user) {
        return <Item item={item}></Item>;
      }
    });
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
