import React from "react";
import styled from "styled-components";

const AnnouncementWrapper = styled.div`
  background-color: #d66e40;
  display: flex;
  justify-content: center;
`;

const AnnouncementMessage = styled.div`
  padding: 10px 55px;
  font-size: 16px;
  font-family: "Oswald", sans-serif;
  font-style: normal;
  color: white;
`;

const AnnouncementHeader = () => {
  return (
    <AnnouncementWrapper>
      <AnnouncementMessage>
        NEW LOWERED PRICES + A CHANCE TO WIN A FREE SHIRT WITH ANY PURCHASE
      </AnnouncementMessage>
    </AnnouncementWrapper>
  );
};

export default AnnouncementHeader;
