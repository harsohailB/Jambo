import React, { useEffect } from "react";
import styled from "styled-components";
import currency from "currency.js";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
  width: 100%;
  flex-grow: 3;
  justify-content: space-between;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top: 10px;
  width: 50%;
`;

const Quantity = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: orange;
  float: left;
  z-index: 1000;
  font-size: 12px;
  font-family: "Raleway", sans-serif;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  border: 1px rgba(0, 0, 0, 0.1) solid;
`;

const Name = styled.span`
  color: #323232;
  font-family: "Raleway", sans-serif;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.08em;
  white-space: normal;
  font-size: 14px;
`;

const Price = styled.span`
  color: #323232;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.08em;
  white-space: normal;
  font-size: 14px;
  margin-top: 10px;
`;

const Description = styled.span`
  font-size: 12px;
  font-family: "Raleway", sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #838b92;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 25px;
`;

const CheckoutItemPreview = (props) => {
  return (
    <Wrapper>
      <ProductWrapper>
        <Image
          src={require("../../assets/catalog/inventory/" +
            props.item.folderName +
            "/" +
            props.item.selectedImageName)}
        />
        <ProductInfoWrapper>
          <Name>{props.item.name}</Name>
          <Description>
            {props.item.color}/{props.item.size}
          </Description>
        </ProductInfoWrapper>
        <Quantity>{props.item.quantity}</Quantity>
        <Price>${currency(props.item.price * props.item.quantity).value}</Price>
      </ProductWrapper>
    </Wrapper>
  );
};

export default CheckoutItemPreview;
