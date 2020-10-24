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
  const user = useSelector((state) => state.user);

  return (
    <Wrapper>
      <Helmet>
        <title>Add Item - JAMBO</title>
      </Helmet>
      {user ? <NewItemForm /> : <Title>You're not supposed to be here!</Title>}
    </Wrapper>
  );
};

export default AddItemPage;
