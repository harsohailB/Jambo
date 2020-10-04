import React from "react";
import styled from "styled-components";
import { FaCheck, FaTimes } from "react-icons/fa";

import Subtitle from "../styled/Subtitle";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconsWrapper = styled.div`
  display: flex;
`;

const Icon = styled.div`
  margin: 10px;
  padding: 0px 0px 0px 0px;
  color: #3d4246;
  cursor: pointer;

  & :hover {
    color: #131516;
  }
  & > svg {
    transition: color 0.1s linear;
  }
`;

const ConfirmationPopUp = (props) => {
  return (
    <Wrapper>
      <Subtitle>Are you sure?</Subtitle>
      <IconsWrapper>
        <Icon style={{ color: "green" }} onClick={props.removeItem()}>
          <FaCheck size={24} />
        </Icon>
        <Icon
          style={{ color: "red" }}
          onClick={() => props.setConfirmationPopUp(false)}
        >
          <FaTimes size={24} />
        </Icon>
      </IconsWrapper>
    </Wrapper>
  );
};

export default ConfirmationPopUp;
