import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";

import { loginUser } from "../../actions/users";
import Title from "../styled/Title";
import ButtonStyles from "../styled/ButtonStyles";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid rgba(61, 66, 70, 0.85);
  background-color: #fff;
  width: 437px;
  margin: 10px;
  border-radius: 2px;
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #3d4246;
  line-height: 1.5;
  padding: 10px 18px;
`;

const Button = styled.button`
  ${ButtonStyles}
`;

const Error = styled.label`
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: red;
`;

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasErrors, setHasErrors] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(await loginUser(username, password));
      history.push("/");
    } catch (error) {
      setHasErrors(true);
      console.log(error);
    }
  };

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Login - JAMBO</title>
      </Helmet>
      {!user ? (
        <Form onSubmit={handleFormSubmit}>
          <Input
            hasError={false}
            label="Username"
            handleInputChange={setUsername}
            onChange={handleUsernameChange}
            value={username}
            placeholder="Username"
            autocomplete="username"
          />
          <Input
            hasError={false}
            label="Password"
            handleInputChange={setPassword}
            onChange={handlePasswordChange}
            value={password}
            placeholder="Password"
            type="password"
            autocomplete="new-password"
          />
          {hasErrors && <Error>Please enter valid credentials!</Error>}
          <Button>LOGIN</Button>
        </Form>
      ) : (
        <Title>You are already logged in!</Title>
      )}
    </Wrapper>
  );
};

export default LoginForm;
