import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CheckoutItemPreview from "./CheckoutItemPreview";
import currency from "currency.js";
import { useEffect } from "react";
import InputBox from "./InputBox";
import Button from "./Button";

const Wrapper = styled.div`
  background-color: #fafafa;
  width: 40%;
`;

const NestedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const BreakLine = styled.hr`
  border: 1px solid black;
  width: 100%;
  margin-left: 10px;
`;

const Title = styled.th`
  color: #323232;
  font-family: "Raleway", sans-serif;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.08em;
  white-space: normal;
  font-size: 16px;
  text-align: left;
`;

const Value = styled.tr`
  color: #323232;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.08em;
  white-space: normal;
  font-size: 16px;
  text-align: right;
`;

const TotalPrice = styled.h3`
  color: #323232;
  font-family: "Roboto", sans-serif;
  font-style: bold;
  font-weight: 600;
  letter-spacing: 0.08em;
  white-space: normal;
  font-size: 20px;
  margin-top: 0;
`;

const RowWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const CheckoutSummary = () => {
  const shoppingCartItems = useSelector((state) => state.shoppingCart);
  const [subTotal, setSubtotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    shoppingCartItems.forEach((item) => {
      sum += currency(item.price * item.quantity).value;
    });
    setSubtotal(sum.toFixed(2));
  }, [shoppingCartItems]);

  const renderItems = () => {
    return shoppingCartItems.map((item) => (
      <RowWrapper>
        <CheckoutItemPreview item={item} />
      </RowWrapper>
    ));
  };

  return (
    <Wrapper>
      <NestedWrapper>
        {renderItems()}

        <BreakLine />

        <RowWrapper>
          <InputBox placeholder="Discount Code" />
          <Button>Apply</Button>
        </RowWrapper>

        <BreakLine />

        <RowWrapper>
          <Title>Subtotal</Title>
          <Value>${subTotal}</Value>
        </RowWrapper>
        <RowWrapper>
          <Title>Shipping</Title>
          <Value>Calculated at next step</Value>
        </RowWrapper>
        <BreakLine />
        <RowWrapper>
          <Title>Total</Title>
          <TotalPrice>CAD ${subTotal}</TotalPrice>
        </RowWrapper>
      </NestedWrapper>
    </Wrapper>
  );
};

export default CheckoutSummary;
