import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  text-decoration: none;
  padding: 0 20px;

  & :hover {
    opacity: 80%;
  }

  margin-bottom: 50px;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;

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

const Item = ({ item }) => {
  return (
    <Wrapper to={"/catalog/" + item.id}>
      <Image src={item.thumbnailImage.imageLink}></Image>
      <Name>{item.name}</Name>
      <Price>${item.price}</Price>
    </Wrapper>
  );
};

export default Item;
