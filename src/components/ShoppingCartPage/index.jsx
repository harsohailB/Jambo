import React from "react";
import styled from "styled-components";
import Title from "../styled/Title";
import Button from "../styled/Button";
import ItemPreview from "./ItemPreview";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import currency from "currency.js";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../../actions/payments";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
`;

const TableWrapper = styled.table`
  width: 100%;
`;

const TableHeading = styled.th`
  font-weight: 400;
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-size: 20px;
  color: #3d4246;
  line-height: 1.5;
  text-align: left;
`;

const TableRow = styled.tr`
  width: 100%;
`;

const Subtitle = styled.h1`
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #838b92;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 25px;
`;

const Price = styled.h3`
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-size: 18px;
  font-weight: 200;
  color: black;
  margin: 0;
`;

const CheckoutButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ShoppingCartPage = () => {
  const shoppingCartItems = useSelector((state) => state.shoppingCart);
  const [subTotal, setSubTotal] = useState(0);
  const STRIPE_PUBLISHABLE_KEY =
    "pk_test_51H5gw9Aka2oZYulluoHic76Ouk1kd7afjcPSiqEEcXYMnzHA7CZKZtG4piWrmNudkdLE5idB8bS7Za0oaNcbhA9C00CsLqQBdo";
  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    calculateSubtotal();
  }, [subTotal, shoppingCartItems]);

  const renderItems = () => {
    return shoppingCartItems.map((item) => (
      <ItemPreview
        item={item}
        calculateSubtotal={calculateSubtotal}
      ></ItemPreview>
    ));
  };

  const calculateSubtotal = () => {
    let sum = 0;
    shoppingCartItems.forEach((item) => {
      sum += currency(item.price * item.quantity).value;
    });
    setSubTotal(sum.toFixed(2));
  };

  const createLineItems = () => {
    let line_items = [];
    shoppingCartItems.forEach((item) => {
      line_items.push({
        name: item.name,
        description: item.color + "/" + item.size,
        amount: Math.round(item.price * 100),
        currency: "cad",
        quantity: item.quantity,
      });
    });
    return line_items;
  };

  const handleCheckoutClick = async () => {
    const sessionId = await createCheckoutSession(createLineItems());
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };

  const renderCart = () => {
    return (
      <ItemsWrapper>
        <TableWrapper>
          <TableRow>
            <TableHeading>Product</TableHeading>
            <TableHeading>Price</TableHeading>
            <TableHeading>Quantity</TableHeading>
            <TableHeading>Total</TableHeading>
          </TableRow>
          {renderItems()}
        </TableWrapper>
        <Price>Subtotal ${subTotal}</Price>
        <Subtitle>Taxes and shipping calculated at checkout</Subtitle>
        <CheckoutButtonsWrapper>
          <Button to="/catalog">CONTINUE SHOPPING</Button>
          <Button onClick={handleCheckoutClick}>CHECK OUT</Button>
        </CheckoutButtonsWrapper>
      </ItemsWrapper>
    );
  };

  const renderEmptyCart = () => {
    return (
      <div>
        <Subtitle>Your cart is currently empty.</Subtitle>
        <Button to="/catalog">CONTINUE SHOPPING</Button>
      </div>
    );
  };

  return (
    <Wrapper>
      <Title>Your cart</Title>
      {shoppingCartItems.length !== 0 ? renderCart() : renderEmptyCart()}
    </Wrapper>
  );
};

export default ShoppingCartPage;
