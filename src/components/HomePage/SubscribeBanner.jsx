import React, { useState } from "react";
import styled from "styled-components";
import Form from "../styled/Form";
import Input from "../styled/Input";
import { addEmail } from "../../actions/emails";
import { AnimateOnChange, animations } from "react-animation";

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

const ConfirmationMessage = styled.div`
  background-color: #d66e40;
  padding: 10px 55px;
  font-size: 16px;
  font-family: "Oswald", sans-serif;
  font-style: normal;
  color: white;
  wdith: 100%;
  border-radius: 10px;
  margin-top: 10px;
`;

const SubscribeBanner = () => {
  const [email, setEmail] = useState("");
  const [subscribeConfirmation, setSubscribeConfirmation] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length !== 0 && !subscribeConfirmation) {
      try {
        addEmail(email);
        setSubscribeConfirmation(true);
        setEmail("");
      } catch (err) {
        console.log(err);
      }
    }

    if (subscribeConfirmation) {
      setAlreadySubscribed(true);
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
      {subscribeConfirmation && !alreadySubscribed && (
        <ConfirmationMessage>You are now subscribed!</ConfirmationMessage>
      )}
      {alreadySubscribed && (
        <ConfirmationMessage>You are already subscribed!</ConfirmationMessage>
      )}
    </Wrapper>
  );
};

export default SubscribeBanner;
