import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { FaCircle } from 'react-icons/fa';
import { AnimateOnChange, animations } from 'react-animation';

import fox from "../../assets/fox.jpg"
import bison from "../../assets/bison.jpg"
import dogCat from "../../assets/dogcat.jpg"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
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
    height: 475px;
    object-fit: cover;
`;

const Title = styled.h1`
    font-style: normal;
    font-weight: 400;
    line-height: 1.2;
    color: white;
    font-family: Righteous,sans-serif;
    margin-top: 300px;
    margin-bottom: 200px;
`;

const DotsWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Dot = styled.div`
    margin: 3px;
    color: white;
    cursor: pointer;
    opacity: 0.3;
    active: blue;
    focus: blue;

    & :hover {
        color: #131516;
    }
    & > svg {
        transition: color 0.1s linear;
    }
`;

const Slideshow = () => {
    const slideshowImages = [fox, bison, dogCat];
    const slideshowTitles = ["ASANTE SANA", "THANK YOU", "ILI KUENDELEA"]
    const [index, setIndex] = useState(0);
    const [slideshowImage, setSlideshowImage] = useState(slideshowImages[0]);
    const [slideshowTitle, setSlideshowTitle] = useState(slideshowTitles[0]);

    const handleSlideshowChange = index => {
        setSlideshowImage(slideshowImages[index]);
        setSlideshowTitle(slideshowTitles[index]);
    }

    return(
        <Wrapper>
            <ContentWrapper>
<<<<<<< HEAD
                <AnimateOnChange animationIn="fadeInUp" animationOut="fadeOut" durationOut = "600">
=======
                <AnimateOnChange animationIn="fadeInUp" animationOut="fadeOut" durationOut = "400">
>>>>>>> 2aee4a9012bf1d4f69fe8ce9def909aafaf0eebb
                    <Title>{slideshowTitle}</Title>
                </AnimateOnChange>
                <DotsWrapper>
                    <Dot onClick={() => handleSlideshowChange(0)}>
                        <FaCircle/>
                    </Dot>
                    <Dot onClick={() => handleSlideshowChange(1)}>
                        <FaCircle/>
                    </Dot>
                    <Dot onClick={() => handleSlideshowChange(2)}>
                        <FaCircle/>
                    </Dot>
                </DotsWrapper>
            </ContentWrapper>
            <AnimateOnChange durationOut = "400">
                <Image src={slideshowImage}></Image>
            </AnimateOnChange>
        </Wrapper>
    );
}

export default Slideshow