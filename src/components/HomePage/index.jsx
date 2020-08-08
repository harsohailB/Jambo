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
          <Button to="/subscribers">View Subscribers</Button>
        </Wrapper>
      )}
    </div>
  );
};

export default HomePage;
