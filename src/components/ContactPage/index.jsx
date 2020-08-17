import React from "react";
import styled from "styled-components";
import Title from "../styled/Title";
import { Helmet } from "react-helmet";

import contactImage from "../../assets/contact-page-image.webp";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: auto;
  width: 480px;
  margin-top: 20px;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Message = styled.p`
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #838b92;
  line-height: 1.5;
  max-width: 50%;
  @media (max-width: 768px) {
    font-size: 20px;
    max-width: 75%;
  }
`;

const ContactPage = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>Contact - JAMBO</title>
      </Helmet>
      <Title>Contact</Title>
      <MessageWrapper>
        <Message>
          Sorry, no returns or exchanges, as we are print-on-demand. Feel free
          to contact us using the email address below: jamboapparel@gmail.com :)
        </Message>
      </MessageWrapper>
      <Image src={contactImage}></Image>
    </Wrapper>
  );
};

export default ContactPage;
