import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  text-decoration: none;

  & :hover {
    opacity: 80%;
  }

  margin-bottom: 50px;
`;

const Image = styled.img`
  width: 250px;
  height: auto;

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const Name = styled.h3`
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  font-weight: 400;
  color: #3d4246;
  line-height: 1.5;
  margin: 0;
`;

const Price = styled.h3`
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-size: 18px;
  font-weight: 200;
  color: #727a83;
  margin: 0;
`;

const Item = (props) => {
  const placeHolderImageLink =
    "https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png";
  return (
    <Wrapper to={"/catalog/" + props.id}>
      {props.imageLink !== "" ? (
        <Image src={props.imageLink}></Image>
      ) : (
        <Image src={placeHolderImageLink}></Image>
      )}
      <Name>{props.name}</Name>
      <Price>${props.price}</Price>
    </Wrapper>
  );
};

export default Item;
