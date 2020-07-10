import React from "react";
import styled from "styled-components";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutForm from "./CheckoutForm";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NestedWrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 90%;
`;

const CheckoutPage = () => {
  return (
    <Wrapper>
      <CheckoutForm />
      <CheckoutSummary />
    </Wrapper>
  );
};

export default CheckoutPage;
