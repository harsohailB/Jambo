import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import paymentMethods from "./assets/payment-methods.PNG";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const PageReference = styled(Link)`
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #3d4246;
  line-height: 1.5;
  text-decoration: none;
  margin: 20px;
`;

const Image = styled.img`
  max-height: 32px;
`;

const Credits = styled.p`
  font-size: 12px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #3d4246;
  line-height: 1.5;
`;

const Footer = () => {
  return (
    <Wrapper>
      <PageReference to="/search/all">Search</PageReference>
      <Image src={paymentMethods}></Image>
      <Credits>© 2020, JAMBO Website by Harsohail Brar & Ryan Holt</Credits>
    </Wrapper>
  );
};

export default Footer;
