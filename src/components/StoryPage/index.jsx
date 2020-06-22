import React from "react";
import styled from "styled-components";
import Title from "../styled/Title"

import storyImage from "../../assets/story-page-image.webp"

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

const StoryPage = () => {
    return(
        <Wrapper>
            <Title>Story</Title>
            <MessageWrapper>
                <Message>
                    Walking through rural communities in Kenya, you will certainly see excited young children 
                    eagerly waving as you pass, and hear the friendly greeting of "Jambo!"- the Swahili word for hello. 
                    A simple and inviting message of kindness. I decided to name this brand Jambo and use the ellipsis symbol 
                    as the logo for a few reasons; the name and logo together symbolize the continuation of a story. 
                    A story that began with an individual's courageous choice to speak out and acknowledge the presence of others. 
                    A story that will carry on for a long time.
                </Message>
                <Message>
                    The ellipsis represents how the children can begin their own story by entering primary school and 
                    receiving a basic education- the first step towards an unpredictable yet exciting future. The action opens 
                    a door, allowing them the choice of continuing their education into secondary school and eventually pursuing 
                    their own dreams and ambitions. Legacies live on. Jambo has a beginning but sees no end. It is to be continued...
                </Message>
            </MessageWrapper>
            <Image src={storyImage}></Image>
        </Wrapper>
    );
}

export default StoryPage