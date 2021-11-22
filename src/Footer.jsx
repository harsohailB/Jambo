import React from "react";
import styled from "styled-components";
import { SocialIcon } from "react-social-icons";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 15px;
  @media (max-width: 900px) {
    margin-top: 100px;
  }
`;

const Credits = styled.p`
  font-size: 14px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #3d4246;
  line-height: 1.5;

  @media (max-width: 768px) {
    width: 250px;
    text-align: center;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const Footer = () => {
  return (
    <Wrapper>
      <SocialMediaIcons>
        <SocialIcon
          url="https://www.facebook.com/jamboapparell"
          style={{ height: 50, width: 50, margin: 10 }}
        />
        <SocialIcon
          url="https://www.instagram.com/jamboapparel/?igshid=cduznovgcg5p"
          style={{ height: 50, width: 50, margin: 10 }}
        />
      </SocialMediaIcons>
      <Credits>
        © {new Date().getFullYear()}, JAMBO Website by Harsohail Brar, Ryan Holt
        & Gary Wu
      </Credits>
    </Wrapper>
  );
};

export default Footer;
