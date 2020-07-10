import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CheckoutItemPreview from "./CheckoutItemPreview";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  width: 33%;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckoutSummary = () => {
  const shoppingCartItems = useSelector((state) => state.shoppingCart);

  const renderItems = () => {
    return shoppingCartItems.map((item) => <CheckoutItemPreview item={item} />);
  };

  return <Wrapper>{renderItems()}</Wrapper>;
};

export default CheckoutSummary;
