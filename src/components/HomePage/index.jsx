import React from "react";
import WelcomeBanner from "./WelcomeBanner";
import Featured from "./Featured";
import Story from "./Story";
import SubscribeBanner from "./SubscribeBanner";
import Slideshow from "./Slideshow";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(Link)`
    font-family: Righteous,sans-serif;
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
            <Button to="/subscribers">View Subscribers</Button>    
        </Wrapper>
      )}
    </div>
  );
};

export default HomePage;
