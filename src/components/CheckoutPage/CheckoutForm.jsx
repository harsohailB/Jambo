import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import InputBox from "./InputBox";
import { useState } from "react";
import { FaSquare, FaCheckSquare } from "react-icons/fa";
import Button from "./Button";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 60%;
`;

const NestedWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-right: 5%;
`;

const SiteTitle = styled(Link)`
  font-family: "Raleway", sans-serif;
  font-size: 2em;
  line-height: 1.3em;
  text-decoration: none;
  color: black;
`;

const PagePipeline = styled.div`
  display: flex;
`;

const PageReference = styled(Link)`
  font-family: "Raleway", sans-serif;
  font-size: 12px;
  text-decoration: none;
  color: blue;
  margin-top: 2px;
`;

const Arrow = styled.p`
  font-family: "Raleway", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: black;
  margin-top: 0;
  margin-left: 5px;
  margin-right: 5px;
`;

const BoldPageLabel = styled.p`
  font-family: "Raleway", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: black;
  margin-top: 2px;
`;

const PageLabel = styled.p`
  font-family: "Raleway", sans-serif;
  font-size: 12px;
  color: black;
  margin-top: 2px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-family: "Raleway", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin-top: 10px;
`;

const AutoSummarizeMessage = styled.span`
  cursor: pointer;
  font-family: "Raleway", sans-serif;
  font-size: 14px;
  font-weight: 400;
`;

const Icon = styled.span`
  margin-right: 10px;
  color: grey;
`;

const InputWrapper = styled.div`
  display: flex;
`;

const ConfirmationWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 50px;
`;

const CheckoutForm = () => {
  const [check, setCheck] = useState(false);

  const handleCheckClick = () => {
    setCheck(!check);
  };

  return (
    <Wrapper>
      <NestedWrapper>
        <SiteTitle to="/">JAMBO</SiteTitle>
        <PagePipeline>
          <PageReference to="/cart">Cart</PageReference>
          <Arrow>{">"}</Arrow>
          <BoldPageLabel>Information</BoldPageLabel>
          <Arrow>{">"}</Arrow>
          <PageLabel>Shipping</PageLabel>
          <Arrow>{">"}</Arrow>
          <PageLabel>Payment</PageLabel>
        </PagePipeline>

        <FormWrapper>
          <Title>Contact Information</Title>
          <InputBox placeholder="Email or mobile phone number"></InputBox>
          <div>
            <AutoSummarizeMessage>
              <Icon onClick={handleCheckClick}>
                {check ? <FaCheckSquare size={18} /> : <FaSquare size={18} />}
              </Icon>
              Keep me up to date on news and exclusive offers
            </AutoSummarizeMessage>
          </div>

          <Title>Shipping Address</Title>
          <InputWrapper>
            <InputBox placeholder="First Name (optional)" />
            <InputBox placeholder="Last name" />
          </InputWrapper>
          <InputBox placeholder="Address" />
          <InputBox placeholder="Apartment, suite, etc. (optional)" />
          <InputBox placeholder="City" />
          <InputWrapper>
            <InputBox placeholder="Country/Region" />
            <InputBox placeholder="Province" />
            <InputBox placeholder="Postal Code" />
          </InputWrapper>

          <ConfirmationWrapper>
            <PagePipeline>
              <Arrow>{"<"}</Arrow>
              <PageReference to="/cart">{"Return to cart"}</PageReference>
            </PagePipeline>
            <Button>Continue to Shipping</Button>
          </ConfirmationWrapper>
        </FormWrapper>
      </NestedWrapper>
    </Wrapper>
  );
};

export default CheckoutForm;
