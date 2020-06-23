import React from "react";
import styled from "styled-components";
import Title from "../styled/Title"

import contactImage from "../../assets/contact-page-image.webp"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
   height: auto;
   width: 480px; 
   margin-right: 50px;
   margin-top: 20px;
`;

const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Message = styled.p`
    font-size: 16px;
    font-family: Oswald,sans-serif;
    font-style: normal;
    font-weight: 400;
    color: #838B92;
    line-height: 1.5;
    max-width: 50%;
`;

const ContactPage = () => {
    return(
        <Wrapper>
            <Title>Contact</Title>
            <MessageWrapper>
                <Message>
                Sorry, no returns or exchanges, as we are print-on-demand.
                Feel free to contact us using the email address below:
                jamboapparel@outlook.com   :)
                </Message>
            </MessageWrapper>
            <Image src={contactImage}></Image>
        </Wrapper>
    );
}

export default ContactPage