import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FilterBar from "./FilterBar";
import Item from "./Item";
import { getItems } from "../../actions/items";
import Form from "../styled/Form";
import Input from "../styled/Input";
import { useLocation } from "react-router-dom";

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
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 150px;
  margin-right: 150px;
  flex-grow: 5;
  max-width: 1400px;
`;

const CatalogPage = () => {
  const location = useLocation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log(location);
    getItems().then((fetchedItems) => {
      if (fetchedItems.length > 1000000) {
        throw "Error loading page, items overflow";
      } else {
        setItems(fetchedItems);
      }
    });
  }, [location]);

  const renderItems = () => {
    let filteredItems = [];
    if (location.data) {
      filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(location.data.toLowerCase())
      );
    } else {
      filteredItems = items;
    }

    return filteredItems.map((item) => (
      <Item
        key={item.id}
        id={item.id}
        path={require("../../assets/catalog/inventory/" +
          item.folderName +
          "/" +
          item.thumbnailImage.imageName)}
        name={item.name}
        price={item.price}
      ></Item>
    ));
  };

  return (
    <Wrapper>
      {location.data ? (
        <Title>Search results for "{location.data}"</Title>
      ) : (
        <Title>Products</Title>
      )}
      <FilterBar productCount={items.length} />
      <ItemsWrapper>{renderItems()}</ItemsWrapper>
    </Wrapper>
  );
};

export default CatalogPage;
