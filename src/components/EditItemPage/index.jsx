import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

import Title from "../styled/Title";
import { getItemById } from "../../actions/items";
import NewItemForm from "../AddItemPage/NewItemForm";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EditItemPage = () => {
  const location = useLocation();
  const itemId = location.pathname.split("/").reverse()[0];
  const defaultNewItem = {
    isPrintifyItem: false,
    printifyID: "",
    id: itemId,
    name: "",
    price: "",
    colors: [],
    sizes: [],
    description: "",
    tags: [],
    featured: false,
    thumbnailImage: {
      imageLink:
        "https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png",
    },
    images: [],
    shipping: "",
    increment: 1,
    eligibleCountries: [],
  };
  const user = useSelector((state) => state.user);
  const [item, setItem] = useState(defaultNewItem);

  useEffect(() => {
    try {
      getItemById(itemId).then((fetchedItem) => {
        setItem(fetchedItem);
      });
    } catch (e) {
      console.log("EditItemPage UseEffect ERROR");
      console.log(e);
    }
  }, [location]);

  return (
    <Wrapper>
      <Helmet>
        <title>Edit Item - JAMBO</title>
      </Helmet>

      <Title>
        {item.isPrintifyItem
          ? "This is a Printify Item"
          : "This is a Custom Item"}
      </Title>

      {user ? (
        <NewItemForm item={item} edit={true} />
      ) : (
        <Title>You're not supposed to be here!</Title>
      )}
    </Wrapper>
  );
};

export default EditItemPage;
