import React from "react";
import styled from "styled-components";
import Title from "../styled/Title";
import errorSVG from "../../assets/svgs/404.svg";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 30vw;
`;

const ErrorPage = () => {
  return (
    <Wrapper>
      <Title>This page does not exist...</Title>
      <Image src={errorSVG}></Image>
    </Wrapper>
  );
};

export default ErrorPage;
