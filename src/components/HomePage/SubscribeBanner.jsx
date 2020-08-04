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
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!error && email.length !== 0) {
      try {
        addEmail({
          email,
        }).then((response) => {
          console.log(response);
          setMessage(response.message);
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const validateEmail = (email) => {
    if (email.length === 0) {
      setError(true);
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setError(!re.test(String(email).toLowerCase()));
  };

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
    validateEmail(evt.target.value);
  };

  return (
    <Wrapper>
      <Title>WELCOME TO THE FAMILY</Title>
      <Subtitle>
        be the first to know about new products, promotions, and updates on the
        difference we've made :)
      </Subtitle>
      <Form onSubmit={handleFormSubmit}>
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={handleEmailChange}
          hasError={error}
          errorMessage={"Invalid Email Address"}
        ></Input>
        <Button>SUBSCRIBE</Button>
      </Form>
    </Wrapper>
  );
};

export default SubscribeBanner;
