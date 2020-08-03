import React from "react";
import welcomeImage from "../../assets/kids-running.jpg";
import styled from "styled-components";
import Button from "../styled/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  float: left;
  z-index: 1000;
  width: 100%;
  text-align: center;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  position: absolute;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const Title = styled.h1`
  margin-bottom: 8px;
  line-height: 1.2;
  color: white;
  font-family: Righteous, sans-serif;
`;

const Subtitle = styled.p`
  margin-bottom: 20px;
  line-height: 1.2;
  font-family: Oswald, sans-serif;
  font-size: 1.25em;
  color: white;
`;

const WelcomeBanner = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Title>LEGACIES LIVE ON</Title>
        <Subtitle>
          All proceeds will go towards enriching the lives of children in rural
          Kenya
        </Subtitle>
        <Button>Donate</Button>
      </ContentWrapper>
      <Image src={welcomeImage}></Image>
    </Wrapper>
  );
};

export default WelcomeBanner;
