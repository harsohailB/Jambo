import React, { useState } from "react";
import styled from "styled-components";
import Form from "../styled/Form";
import Input from "../styled/Input";
import { addEmail } from "../../actions/emails";

const Wrapper = styled.div`
  margin-top: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  margin: 0 0 17.5px;
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;
  font-size: 1.25em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
  color: #3d4246;
`;

const Subtitle = styled.p`
  font-size: 18px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #69727b;
  line-height: 1.5;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Button = styled.button`
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-weight: 400;
  padding: 10px 18px;
  display: inline-block;
  width: auto;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 8px 15px;
  background-color: #557b97;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: normal;
  font-size: 14px;
`;

const SubscribeBanner = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handleSubmit = (e) => {
    if (email.length !== 0) {
      try {
        addEmail(email);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Wrapper>
      <Title>WELCOME TO THE FAMILY</Title>
      <Subtitle>
        be the first to know about new products, promotions, and updates on the
        difference we've made :)
      </Subtitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={handleEmailChange}
        ></Input>
        <Button>SUBSCRIBE</Button>
      </Form>
    </Wrapper>
  );
};

export default SubscribeBanner;
