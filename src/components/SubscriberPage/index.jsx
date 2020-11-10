import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { FaTrash } from "react-icons/fa";

import Title from "../styled/Title";
import { getEmails, deleteEmail } from "../../actions/emails";
import Button from "../styled/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EmailWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Subtitle = styled.p`
  font-size: 18px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #69727b;
  line-height: 1.5;
`;

const Icon = styled.div`
  color: #3d4246;
  cursor: pointer;

  & :hover {
    color: red;
  }
  & > svg {
    transition: color 0.1s linear;
  }
`;

const SubscriberPage = () => {
  const user = useSelector((state) => state.user);
  const [emails, setEmails] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user) {
      try {
        getEmails(user).then((fetchedEmails) => {
          setEmails(fetchedEmails);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [user]);

  const handleEmailDelete = (email) => {
    try {
      deleteEmail(user, email.email);
      setEmails(emails.filter((obj) => obj.email !== email.email));
    } catch (err) {
      console.log(err);
    }
  };

  const renderEmails = () => {
    return emails.map((obj) => (
      <EmailWrapper>
        <Subtitle>{obj.email}</Subtitle>
        <Icon onClick={() => handleEmailDelete(obj)}>
          <FaTrash size={18} />
        </Icon>
      </EmailWrapper>
    ));
  };

  const handleButtonClick = () => {
    let emailsCSV = "";
    emails.forEach((obj) => {
      emailsCSV += obj.email + ",";
    });
    var textField = document.createElement("textarea");
    textField.innerText = emailsCSV;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    setCopied(true);
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
            {!copied ? "Copy to clipboard (CSV)" : "Copying Success!"}
          </Button>
          {renderEmails()}
        </Wrapper>
      ) : (
        <Title>You're not supposed to be here!</Title>
      )}
    </Wrapper>
  );
};

export default SubscriberPage;
