import React, { useEffect } from "react";
import styled from "styled-components";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutForm from "./CheckoutForm";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 95px;
  height: 95px;
  border-radius: 5px;
`;

const Name = styled.span`
  color: #323232;
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: normal;
  font-size: 12px;
`;

const CheckoutItemPreview = (item) => {
  return (
    <Wrapper>
      <ProductWrapper>
        <Image
          src={require("../../assets/catalog/inventory/" +
            item.folderName +
            "/" +
            item.selectedImageName)}
        />
        <ProductInfoWrapper>
          <Name>{item.name}</Name>
        </ProductInfoWrapper>
      </ProductWrapper>
    </Wrapper>
  );
};

export default CheckoutItemPreview;
