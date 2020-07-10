import React from "react";
import styled from "styled-components";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutForm from "./CheckoutForm";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
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
