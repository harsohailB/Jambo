import React from "react";
import WelcomeBanner from "./WelcomeBanner";
import Featured from "./Featured";
import Story from "./Story";
import SubscribeBanner from "./SubscribeBanner";
import Slideshow from "./Slideshow";
import styled from "styled-components";
import Button from "../styled/Button";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExtraPadding = styled.div`
  padding: 15px;
`;

const HomePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <WelcomeBanner />
      <Featured />
      <Story />
      <Slideshow />
      <SubscribeBanner />
      {user && (
        <Wrapper>
          <ExtraPadding>
            <Button to="/subscribers">View Subscribers</Button>
          </ExtraPadding>
        </Wrapper>
      )}
    </div>
  );
};

export default HomePage;
