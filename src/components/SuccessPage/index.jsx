import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Title from "../styled/Title";
import { Helmet } from "react-helmet";
import { CLEAR_CART } from "../../actions/types";
import successSVG from "../../assets/svgs/success.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Subtitle = styled.h1`
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #838b92;
  line-height: 1.5;
  max-width: 50%;
  margin-bottom: 25px;
  text-align: center;
`;

const Image = styled.img`
  width: 30vw;
`;

const SuccessPage = () => {
  const shoppingCartItems = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: CLEAR_CART,
    });
  }, []);

  return (
    <Wrapper>
      <Helmet>
        <title>Order Success - JAMBO</title>
      </Helmet>
      <Title>Order Success!</Title>
      <Subtitle>
        You will receive an email confirmation for your order shortly, if you
        have any questions about your feel free to contact us at{" "}
        <a href="jamboapparel@gmail.com">jamboapparel@gmail.com</a>
      </Subtitle>
      <Image src={successSVG}></Image>
    </Wrapper>
  );
};

export default SuccessPage;
