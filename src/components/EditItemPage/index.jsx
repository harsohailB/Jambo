import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Title from "../styled/Title";
import EditItemForm from "./EditItemForm";

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
      {user ? <EditItemForm /> : <Title>You're not supposed to be here!</Title>}
    </Wrapper>
  );
};

export default EditItemPage;
