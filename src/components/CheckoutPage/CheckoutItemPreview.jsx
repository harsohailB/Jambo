import React, { useEffect } from "react";
import styled from "styled-components";
import currency from "currency.js";

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 2;
  justify-content: space-between;
  margin: 5px;
  width: 100%;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top: 10px;
  width: 75%;
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

const Quantity = styled.div`
  width: 15px;
  height: 15px;
  background-color: orange;
  border-radius: 50%;
  margin: 0;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 12px;
`;

const Price = styled.div`
  width: 50%;
  text-align: right;
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
  text-align: left;
`;

const CheckoutItemPreview = (props) => {
  return (
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
        <Quantity>{props.item.quantity}</Quantity>
      </ProductInfoWrapper>
      <Price>${currency(props.item.price * props.item.quantity).value}</Price>
    </ProductWrapper>
  );
};

export default CheckoutItemPreview;
