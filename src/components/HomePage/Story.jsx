import React from "react";
import styled from "styled-components";

import schoolKids from "../../assets/school-kids.jpg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 545px;
  width: auto;
  margin-right: 50px;
`;

const MessageWrapper = styled.div`
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    margin-left: 0px;
    margin-right: 50px;
  }
`;

const Title = styled.h2`
  margin: 0 0 17.5px;
  font-size: 26px;
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;
  overflow-wrap: break-word;
  word-wrap: break-word;
  color: #3f4448;
`;

const Subtitle = styled.p`
  font-size: 18px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #838b92;
  line-height: 1.5;
`;

const Story = () => {
  return (
    <Wrapper>
      <Image src={schoolKids}></Image>
      <MessageWrapper>
        <Title>JAMBO from O'Lorien School</Title>
        <Subtitle>
          Each purchase is another step towards a continued brighter future for
          our Kenyan friends{" "}
        </Subtitle>
      </MessageWrapper>
    </Wrapper>
  );
};

export default Story;
