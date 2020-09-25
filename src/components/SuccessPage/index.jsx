import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Title from "../styled/Title";
import { Helmet } from "react-helmet";
import { CLEAR_CART } from "../../actions/types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SuccessPage = () => {
  const shoppingCartItems = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_CART,
      });
      history.push("/");
    }, 1000);
  }, []);

  return (
    <Wrapper>
      <Helmet>
        <title>Checkout Success - JAMBO</title>
      </Helmet>
      <Title>Checkout Success!</Title>
      <Title>Redirecting...</Title>
    </Wrapper>
  );
};

export default SuccessPage;
