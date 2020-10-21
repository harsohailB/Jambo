import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FilterBar from "./FilterBar";
import Item from "./Item";
import { getItems } from "../../actions/items";
import Form from "../styled/Form";
import Input from "../styled/Input";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

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
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  padding-left: 100px;
  padding-right: 0px;
  margin-left: auto;
  margin-right: auto;
  flex-grow: 5;
  max-width: 14000px;

  &:after {
    content: "";
    flex: auto;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding-left: 0px;
    padding-right: 0px;
    margin-left: 50px;
    margin-right: auto;
    justify-content: flex-start;
    &:after {
      padding-left: 0px;
      padding-right: 0px;
      margin-left: auto;
      margin-right: auto;
      content: "";
      flex: auto;
    }
  }
`;

const CatalogPage = () => {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);

  useEffect(() => {
    getItems().then((fetchedItems) => {
      console.log("CatalogPage -> fetchedItems", fetchedItems);
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

    return filteredItems.map((item) => (
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
