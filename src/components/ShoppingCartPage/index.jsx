import React from "react";
import styled from "styled-components";
import Title from "../styled/Title"
import Button from "../styled/Button"
import ItemPreview from "./ItemPreview"
import { useContext } from "react";
import { ShoppingCartContext } from "../../ShoppingCartContext";
import { useEffect } from "react";
import { useState } from "react";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ItemsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

const ColumnHeading = styled.h3`
    font-weight: 400;
    font-family: Righteous,sans-serif;
    font-style: normal;
    color: #3d4246;
    line-height: 1.5;
`;

const Subtitle = styled.h1`
    font-size: 16px;
    font-family: Oswald,sans-serif;
    font-style: normal;
    font-weight: 400;
    color: #838B92;
    line-height: 1.5;
    text-align: center;
    margin-bottom: 25px;
`;

const Price = styled.h3`
    font-family: Oswald,sans-serif;
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
    const [shoppingCartItems, setShoppingCartItems] = useContext(ShoppingCartContext);
    const [subTotal, setSubTotal] = useState(0);

    useEffect(() => {
        calculateSubtotal();
    }, [subTotal, shoppingCartItems]);

    const renderItems = () => {
        return shoppingCartItems.map(item => (
            <ItemPreview item={item} calculateSubtotal={calculateSubtotal}></ItemPreview>
        ));
    }

    const calculateSubtotal = () => {
        let sum = 0; 
        shoppingCartItems.forEach(item => {
            sum += parseFloat(item.price * item.quantity).toFixed(2);
        });
        setSubTotal(sum);
    }

    const renderCart = () => {
        return (
            <ItemsWrapper>
                <Header>
                    <ColumnHeading>Product</ColumnHeading>
                    <ColumnHeading>Price</ColumnHeading>
                    <ColumnHeading>Quantity</ColumnHeading>
                    <ColumnHeading>Total</ColumnHeading>
                </Header>
                {renderItems()}
                <Price>Subtotal ${subTotal}</Price>
                <Subtitle>Taxes and shipping calculated at checkout</Subtitle>
                <CheckoutButtonsWrapper>
                    <Button to="/catalog">CONTINUE SHOPPING</Button>
                    <Button>CHECK OUT</Button>
                </CheckoutButtonsWrapper>
            </ItemsWrapper>
        )
    }

    const renderEmptyCart = () => {
        return (
            <div>
                <Subtitle>Your cart is currently empty.</Subtitle>
                <Button to="/catalog">CONTINUE SHOPPING</Button>
            </div>
        );
    }

    return(
        <Wrapper>
            <Title>Your cart</Title>
            {shoppingCartItems.length !== 0 ? renderCart() : renderEmptyCart()}
        </Wrapper>
    );
}

export default ShoppingCartPage