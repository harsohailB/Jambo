import React from "react";
import styled from "styled-components";
import Button from "../styled/Button"

const Wrapper = styled.div`
    margin-top: 55px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h2`
    margin: 0 0 17.5px;
    font-family: Righteous,sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: 1.2;
    font-size: 1.25em;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-align: center;
    color: #3d4246;
`;

const Subtitle = styled.p`
    font-size: 18px;
    font-family: Oswald,sans-serif;
    font-style: normal;
    font-weight: 400;
    color: #69727B;
    line-height: 1.5;
`;

const Form = styled.form`
    display: flex;   
    justify-content: center;
    text-align: center;
    max-height: 46px;
`;

const Input = styled.input`
    border: 1px solid rgba(61,66,70,0.85);
    background-color: #fff;
    width: 437px;
    border-radius: 2px;
    font-size: 16px;
    font-family: Oswald,sans-serif;
    font-style: normal;
    font-weight: 400;
    color: #3d4246;
    line-height: 1.5;
    padding: 10px 18px;
`;

const SubscribeBanner = () => {
    return(
        <Wrapper>
            <Title>WELCOME TO THE FAMILY</Title>
            <Subtitle>be the first to know about new products, promotions, and updates on the difference we've made :)</Subtitle>
            <Form>
                <Input type="email" placeholder="Email Address"></Input>
                <Button>SUBSCRIBE</Button>
            </Form>
        </Wrapper>
    );
}

export default SubscribeBanner