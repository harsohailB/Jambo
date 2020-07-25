import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Title from "../styled/Title";
import Button from "../styled/Button";
import Form from "../styled/Form";
import Input from "../styled/Input";
import Item from "../CatalogPage/Item";
import { getItems } from "../../actions/items";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 150px;
  margin-right: 150px;
  margin-top: 50px;
  flex-grow: 5;
  max-width: 1400px;
`;

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [items, setItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchProp = location.pathname.split("/").reverse()[0];
    if (searchProp != "all") {
      setSearchInput(searchProp);
    }
    getItems().then((fetchedItems) => {
      setItems(fetchedItems);
    });
  }, []);

  const handleSearchInputChange = (evt) => {
    setSearchInput(evt.target.value);
  };

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );

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
      <Title>SEARCH OUR SITE</Title>
      <Form>
        <Input
          type="search"
          placeholder="Search"
          value={searchInput}
          onChange={handleSearchInputChange}
        ></Input>
      </Form>
      <ItemsWrapper>{renderItems()}</ItemsWrapper>
    </Wrapper>
  );
};

export default SearchPage;
