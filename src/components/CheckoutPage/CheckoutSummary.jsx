import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CheckoutItemPreview from "./CheckoutItemPreview";
import currency from "currency.js";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  width: 40%;
`;

const BreakLine = styled.br``;

const TableWrapper = styled.table`
  margin-left: 10px;
`;

const TableRow = styled.tr`
  text-align: right;
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
  font-family: "Raleway", sans-serif;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.08em;
  white-space: normal;
  font-size: 16px;
  text-align: right;
`;

const CheckoutSummary = () => {
  const shoppingCartItems = useSelector((state) => state.shoppingCart);
  const [subTotal, setSubtotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    shoppingCartItems.forEach((item) => {
      sum += currency(item.price * item.quantity).value;
    });
    setSubtotal(sum);
  }, [shoppingCartItems]);

  const renderItems = () => {
    return shoppingCartItems.map((item) => <CheckoutItemPreview item={item} />);
  };

  return (
    <Wrapper>
      <TableWrapper>{renderItems()}</TableWrapper>
      <BreakLine />
      <h3>Discount Code Section</h3>
      <BreakLine />
      <TableWrapper>
        <TableRow>
          <Title>Subtotal</Title>
          <Value>${subTotal}</Value>
        </TableRow>
        <TableRow>
          <Title>Shipping</Title>
          <Value>Calculated at next step</Value>
        </TableRow>
      </TableWrapper>
      <BreakLine />
      <TableWrapper>
        <TableRow>
          <Title>Total</Title>
          <Value>CAD ${subTotal}</Value>
        </TableRow>
      </TableWrapper>
    </Wrapper>
  );
};

export default CheckoutSummary;
