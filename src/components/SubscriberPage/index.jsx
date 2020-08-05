import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Title from "../styled/Title";
import { Helmet } from "react-helmet";
import { getEmails } from "../../actions/emails";
import Button from "../styled/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubscriberPage = () => {
  const user = useSelector((state) => state.user);
  const [emails, setEmails] = useState([]);
  const [csvMode, setCSVMode] = useState(false);

  useEffect(() => {
    try {
      getEmails(user).then((fetchedEmails) => {
        setEmails(fetchedEmails);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const renderColumnEmails = () => {
    return emails.map((obj) => <p>{obj.email}</p>);
  };

  const renderCSVEmails = () => {
    let emailList = "";
    emails.forEach((obj) => {
      emailList += obj.email + ",";
    });
    return <p>{emailList}</p>;
  };

  const handleButtonClick = () => {
    setCSVMode(!csvMode);
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Subscribers - JAMBO</title>
      </Helmet>

      {user ? (
        <Wrapper>
          <Title>Subscribers</Title>
          <Button onClick={handleButtonClick}>
            {csvMode ? "Column Mode" : "CSV Mode"}
          </Button>
          {csvMode ? renderCSVEmails() : renderColumnEmails()}
        </Wrapper>
      ) : (
        <Title>You're not supposed to be here!</Title>
      )}
    </Wrapper>
  );
};

export default SubscriberPage;
