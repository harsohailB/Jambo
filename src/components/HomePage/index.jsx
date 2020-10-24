import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Button from "../styled/Button";
import WelcomeBanner from "./WelcomeBanner";
import Featured from "./Featured";
import Story from "./Story";
import SubscribeBanner from "./SubscribeBanner";
import Slideshow from "./Slideshow";

const SubscribeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
        <SubscribeWrapper>
          <Button to="/subscribers">View Subscribers</Button>
        </SubscribeWrapper>
      )}
    </div>
  );
};

export default HomePage;
