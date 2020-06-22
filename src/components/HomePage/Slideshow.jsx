import React, { useState } from "react";
import styled from "styled-components";
import { FaDotCircle } from 'react-icons/fa';

import elephant from "../../assets/african-elephants.jpg"
import deer from "../../assets/deer-wildlife.jpg"
import cheetah from "../../assets/cheetah.jpg"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const ContentWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    float: left;
    z-index: 1000;
    width: 100%;
`;

const Image = styled.img`
    margin-top: 100px;
    width: 100%;
    max-height: 500px;
    -webkit-animation: fadein 2s; 

    @-webkit-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
`;

const Title = styled.h1`
    font-style: normal;
    font-weight: 400;
    line-height: 1.2;
    color: black;
    font-family: Righteous,sans-serif;
    margin-top: 300px;
    margin-bottom: 200px;
`;

const DotsWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Dot = styled.div`
    margin: 5px;
    color: white;
    cursor: pointer;

    & :hover {
        color: #131516;
    }
    & > svg {
        transition: color 0.1s linear;
    }
`;

const Slideshow = () => {
    const slideshowImages = [elephant, cheetah, deer];
    const slideshowTitles = ["ASANTE SANA", "THANK YOU", "ILI KUENDELEA"]
    const [slideshowImage, setSlideshowImage] = useState(slideshowImages[0]);
    const [slideshowTitle, setSlideshowTitle] = useState(slideshowTitles[0]);

    const handleSlideshowChange = page => {
        setSlideshowImage(slideshowImages[page]);
        setSlideshowTitle(slideshowTitles[page]);
    }

    return(
        <Wrapper>
            <ContentWrapper>
                <Title>{slideshowTitle}</Title>
                <DotsWrapper>
                    <Dot onClick={() => handleSlideshowChange(0)}>
                        <FaDotCircle/>
                    </Dot>
                    <Dot onClick={() => handleSlideshowChange(1)}>
                        <FaDotCircle/>
                    </Dot>
                    <Dot onClick={() => handleSlideshowChange(2)}>
                        <FaDotCircle/>
                    </Dot>
                </DotsWrapper>
            </ContentWrapper>
            <Image src={slideshowImage}></Image>
        </Wrapper>
    );
}

export default Slideshow