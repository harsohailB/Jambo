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
  text-align: center;
`;

const AnnouncementHeader = () => {
  return (
    <AnnouncementWrapper>
      <AnnouncementMessage>
        70% OF PROCEEDS WILL GO TOWARDS FUNDING SCHOOL SUPPLIES IN RURAL KENYA
      </AnnouncementMessage>
    </AnnouncementWrapper>
  );
};

export default AnnouncementHeader;
