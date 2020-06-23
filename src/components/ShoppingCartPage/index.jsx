import React from "react";
import styled from "styled-components";
import Title from "../styled/Title"
import Subtitle from "../styled/Subtitle"
import Button from "../styled/Button"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ShoppingCartPage = () => {
    return(
        <Wrapper>
            <Title>Your cart</Title>
                <Subtitle>Your cart is currently empty.</Subtitle>
            <Button>CONTINUE SHOPPING</Button>
        </Wrapper>
    );
}

export default ShoppingCartPage