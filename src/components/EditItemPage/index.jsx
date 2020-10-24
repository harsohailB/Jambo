import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Title from "../styled/Title";
import EditItemForm from "./EditItemForm";
import { Helmet } from "react-helmet";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EditItemPage = () => {
  const user = useSelector((state) => state.user);

  return (
    <Wrapper>
      <Helmet>
        <title>Edit Item - JAMBO</title>
      </Helmet>
      {user ? <EditItemForm /> : <Title>You're not supposed to be here!</Title>}
    </Wrapper>
  );
};

export default EditItemPage;
