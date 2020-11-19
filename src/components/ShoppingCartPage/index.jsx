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
import { PRUNE_CART, UPDATE_CART_ITEMS_INFO } from "../../actions/types";
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
  width: 45%;

  @media (max-width: 1000px) {
    width: 90%;
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
  margin-top: 20px;
  margin-right: 20px;
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

const Heading = styled.div`
  width: 100%;
  text-align: left;
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  line-height: 1.2;
  margin-top: 20px;
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const shoppingCartItems = useSelector((state) => state.shoppingCart);
  const [shippingCalculated, setShippingCalculated] = useState(false);
  const [shipping, setShipping] = useState(0);
  const [countryCode, setCountryCode] = useState("");

  const [subTotal, setSubTotal] = useState(0);
  const STRIPE_PUBLISHABLE_KEY = "pk_live_vy8q9jFyjBC8piCuMDc6msXg00qvJq3l7y";
  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    getItems().then((items) => {
      // Update cart item info if any info has changed
      dispatch({
        type: UPDATE_CART_ITEMS_INFO,
        items,
      });
      // Prunes items from cart that have been removed from store
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

  const calculateCustomShipping = () => {
    let customItemShipping = 0;

    shoppingCartItems.forEach((item) => {
      if (!item.isPrintifyItem) {
        customItemShipping += parseFloat(
          item.shipping * Math.ceil(item.quantity / item.increment)
        );
      }
    });

    return customItemShipping;
  };

  const calculateShipping = async () => {
    if (countryCode !== "") {
      const shippingObject = generateShippingObject();
      let customItemShipping = calculateCustomShipping();
      var printifyShipping = 0;

      if (shippingObject.line_items.length) {
        await getShipping(shippingObject).then((shippingData) => {
          printifyShipping = shippingData.standard / 100;
        });
      }

      setShipping(printifyShipping + customItemShipping);
      setShippingCalculated(true);
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
    var intersectingCountries = countriesList;
    shoppingCartItems.forEach((item) => {
      if (item.eligibleCountries.length !== 0) {
        intersectingCountries = intersectingCountries.filter((country) => {
          return item.eligibleCountries
            .split("/")
            .some((eligibleCountry) => eligibleCountry === country.code);
        });
      }
    });

    return intersectingCountries.map((country) => (
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
        <Heading style={{ marginBottom: "20px" }}>Products</Heading>

        <TableWrapper>
          <TableRow>
            <TableHeading></TableHeading>
            <TableHeading>Price</TableHeading>
            <TableHeading>Quantity</TableHeading>
            <TableHeading style={{ textAlign: "right" }}>Total</TableHeading>
          </TableRow>
          {renderItems()}
        </TableWrapper>

        <Price style={{ width: "100%", "text-align": "right" }}>
          Subtotal CAD ${subTotal}
        </Price>

        <Heading>Shipping</Heading>

        <RowWrapper>
          <Dropdown value={countryCode} onChange={handleCountryCodeChange}>
            <option value="" disabled selected>
              Select your country
            </option>
            {renderCountryCodeOptions()}
          </Dropdown>
          {shippingCalculated && (
            <Price style={{ margin: 0 }}>
              Shipping CAD ${parseFloat(shipping).toFixed(2)}
            </Price>
          )}
          {countryCode.length && !shippingCalculated ? (
            <Subtitle style={{ margin: 0 }}>Calculating shipping...</Subtitle>
          ) : (
            <div style={{ display: "none" }}></div>
          )}
        </RowWrapper>

        {shippingCalculated ? (
          <Title style={{ marginTop: "0" }}>
            Total CAD $
            {parseFloat(currency(subTotal).add(currency(shipping))).toFixed(2)}
          </Title>
        ) : (
          <Price>Please choose your shipping country</Price>
        )}
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
