import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import FilterBar from "./FilterBar";
import Item from "./Item";
import { getAllItems } from "../../fauna/items";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 50px;
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 1.2;
  overflow-wrap: break-word;
  word-wrap: break-word;
  color: #3d4246;
  text-align: center;
`;

const ItemsWrapper = styled.div`
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
`;

const CatalogPage = () => {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);

  useEffect(() => {
    getAllItems().then((fetchedItems) => {
      if (fetchedItems.length > 1000000) {
        throw "Error loading page, items overflow";
      } else {
        setItems(fetchedItems);
        setDisplayedItems(fetchedItems);
      }
    });
  }, [location]);

  const renderItems = () => {
    let filteredItems = [];
    if (location.data) {
      filteredItems = displayedItems.filter((item) =>
        item.name.toLowerCase().includes(location.data.toLowerCase())
      );
    } else {
      filteredItems = displayedItems;
    }

    return filteredItems.map((item) => <Item item={item}></Item>);
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Products - JAMBO</title>
      </Helmet>
      {location.data ? (
        <Title>Search results for "{location.data}"</Title>
      ) : (
        <Title>Products</Title>
      )}
      <FilterBar
        items={items}
        displayedItems={
          location.data
            ? displayedItems.filter((item) =>
                item.name.toLowerCase().includes(location.data.toLowerCase())
              )
            : displayedItems
        }
        setDisplayedItems={setDisplayedItems}
      />

      <ItemsWrapper>{renderItems()}</ItemsWrapper>
    </Wrapper>
  );
};

export default CatalogPage;
