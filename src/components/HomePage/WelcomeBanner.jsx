import React from "react";
import welcomeImage from "../../assets/kids-running.jpg";
import styled from "styled-components";

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

const Button = styled.a`
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
  margin: 5px;
`;

const WelcomeBanner = () => {
  const donationPageLink =
    "https://donorbox.org/school-supplies-for-o-lorien-primary-school-in-kenya";

  return (
    <Wrapper>
      <ContentWrapper>
        <Title>LEGACIES LIVE ON</Title>
        <Subtitle>
          All proceeds will go towards enriching the lives of children in rural
          Kenya
        </Subtitle>
        <Button href={donationPageLink}>Donate</Button>
      </ContentWrapper>
      <Image src={welcomeImage}></Image>
    </Wrapper>
  );
};

export default WelcomeBanner;
