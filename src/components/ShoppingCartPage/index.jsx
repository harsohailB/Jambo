import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";

import currency from "currency.js";
import { loadStripe } from "@stripe/stripe-js";

import { createCheckoutSession } from "../../actions/payments";
import Title from "../styled/Title";
import Button from "../styled/Button";
import ItemPreview from "./ItemPreview";

import { getItems } from "../../actions/items";
import { PRUNE_CART } from "../../actions/types";
import { countriesList } from "./countriesList";
import { getShipping } from "../../actions/shipping";

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

  @media (max-width: 768px) {
    width: 95%;
  }
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
  margin-bottom: 0px;
`;

const CheckoutButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Dropdown = styled.select`
  padding: 10px 28px 10px 18px;
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: black;
  line-height: 1.5;
  border: 0 solid transparent;
  width: 200px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  text-align: left;
  color: black;
  line-height: 1.5;
  max-width: 50%;
`;

const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const shoppingCartItems = useSelector((state) => state.shoppingCart);
  const [shippingCalculated, setShippingCalculated] = useState(false);
  const [shipping, setShipping] = useState(0);
  const [countryCode, setCountryCode] = useState("");
  const emptyCountryCode = !countryCode.length;
  const isCalculatingShipping = countryCode.length && !shippingCalculated;

  const [subTotal, setSubTotal] = useState(0);
  const STRIPE_PUBLISHABLE_KEY =
    "pk_test_51H5gw9Aka2oZYulluoHic76Ouk1kd7afjcPSiqEEcXYMnzHA7CZKZtG4piWrmNudkdLE5idB8bS7Za0oaNcbhA9C00CsLqQBdo";
  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    // Prunes items from cart that have been removed from store
    getItems().then((items) => {
      dispatch({
        type: PRUNE_CART,
        items,
      });
    });

    calculateShipping();
    calculateSubtotal();
  }, []);

  useEffect(() => {
    setShippingCalculated(false);
    calculateShipping();
    calculateSubtotal();
  }, [shoppingCartItems, countryCode]);

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

  const generateShippingObject = () => {
    let printifyitems = shoppingCartItems.filter((item) => item.isPrintifyItem);
    return {
      line_items: printifyitems.map((item) => {
        if (item.isPrintifyItem) {
          return {
            product_id: item.printifyID,
            variant_id: item.variant,
            quantity: item.quantity,
          };
        }
      }),
      address_to: {
        country: countryCode,
      },
    };
  };

  const calculateShipping = () => {
    if (countryCode !== "") {
      getShipping(generateShippingObject()).then((response) => {
        setShipping(response.standard / 100);
        setShippingCalculated(true);
      });
    }
  };

  const createLineItems = () => {
    let line_items = shoppingCartItems.map((item) => {
      return {
        name: item.name + " (" + item.color + "/" + item.size + ")",
        amount: Math.round(item.price * 100),
        currency: "cad",
        quantity: item.quantity,
      };
    });

    return line_items.concat({
      name: "Shipping to " + countryCode,
      amount: Math.round(shipping * 100),
      currency: "cad",
      quantity: 1,
    });
  };

  const handleCheckoutClick = async () => {
    if (shippingCalculated) {
      const sessionId = await createCheckoutSession(
        createLineItems(),
        countryCode
      );
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });
    }
  };

  const renderCountryCodeOptions = () => {
    return countriesList.map((country) => (
      <option value={country.code}>
        {country.name + " - " + country.code}
      </option>
    ));
  };

  const handleCountryCodeChange = (evt) => {
    setShippingCalculated(false);
    setCountryCode(evt.target.value);
    calculateShipping();
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
        <div>
          <Label>Shipping Country Code:</Label>
          <Dropdown value={countryCode} onChange={handleCountryCodeChange}>
            <option value="" disabled selected>
              Select your country
            </option>
            {renderCountryCodeOptions()}
          </Dropdown>
        </div>
        <Price>Subtotal CAD ${subTotal}</Price>

        {shippingCalculated && (
          <Subtitle>
            <strong>Shipping</strong> CAD ${parseFloat(shipping).toFixed(2)}
          </Subtitle>
        )}
        {countryCode.length && !shippingCalculated ? (
          <Subtitle>Calculating shipping...</Subtitle>
        ) : (
          <hr></hr>
        )}
        {!countryCode.length && (
          <Subtitle>Please choosing a country to ship to</Subtitle>
        )}

        <Title style={{ marginTop: "0" }}>
          Total CAD $
          {parseFloat(currency(subTotal).add(currency(shipping))).toFixed(2)}
        </Title>
        <CheckoutButtonsWrapper>
          <Button to="/catalog">CONTINUE SHOPPING</Button>
          <Button onClick={handleCheckoutClick} locked={!shippingCalculated}>
            CHECK OUT
          </Button>
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
      <Helmet>
        <title>Your Shopping Cart - JAMBO</title>
      </Helmet>
      <Title>Your cart</Title>
      {shoppingCartItems.length !== 0 ? renderCart() : renderEmptyCart()}
    </Wrapper>
  );
};

export default ShoppingCartPage;
