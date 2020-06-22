import React from "react";
import styled from "styled-components";
import Item from "../CatalogPage/Item";
import Button from "../styled/Button";

import featuredOnePic from "../../assets/catalog/featured/tenaci-tee.jpg";
import featuredTwoPic from "../../assets/catalog/featured/legacy-long-sleeve.jpg";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 55px 0px; 
    color: #3d4246;
    align-items: center;
`;

const Message = styled.h2`
    margin: 0 0 17.5px;
    font-family: Righteous,sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: 1.2;
    font-size: 1.25em;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-align: center;
`;

const ItemWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 17.5px;
`;

const Featured = () => {
    return(
        <Wrapper>
            <Message>CHECK CATALOG FOR NEW PRODUCTS</Message>
            <ItemWrapper>
                <Item path={featuredOnePic} name="TenaciTee:)" price="$27.99"></Item>
                <Item path={featuredTwoPic} name="LEGACY Long Sleeve :)" price="$35.99"></Item>
            </ItemWrapper>
            <Button>View All</Button>
        </Wrapper>
    );
}

export default Featured