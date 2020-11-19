import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import NewItemForm from "./NewItemForm";
import Title from "../styled/Title";
import { Helmet } from "react-helmet";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddItemPage = () => {
  const defaultNewItem = {
    isPrintifyItem: false,
    printifyID: "",
    id: 1,
    name: "",
    price: "",
    colors: [],
    sizes: [],
    description: "",
    tags: [],
    shipping: "",
    increment: 1,
    eligibleCountries: "",
    featured: false,
    thumbnailImage: {
      imageLink:
        "https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png",
    },
    images: [],
  };
  const user = useSelector((state) => state.user);

  return (
    <Wrapper>
      <Helmet>
        <title>Add Item - JAMBO</title>
      </Helmet>

      <Title>Adding a New Item</Title>

      {user ? (
        <NewItemForm item={defaultNewItem} edit={false} />
      ) : (
        <Title>You're not supposed to be here!</Title>
      )}
    </Wrapper>
  );
};

export default AddItemPage;
