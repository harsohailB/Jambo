import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  text-decoration: none;
  padding: 0 20px;
  max-width: 250px;

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
    width: 250px;
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

const DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const VisibleIcon = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  color: #bbb;
`;

const Item = ({ item }) => {
  const user = useSelector((state) => state.user);

  return (
    <Wrapper to={"/catalog/" + item.id}>
      <Image src={item.thumbnailImage.imageLink}></Image>

      <DetailsWrapper>
        <ColumnWrapper>
          <Name>{item.name}</Name>
          <Price>${item.price.toFixed(2)}</Price>
        </ColumnWrapper>
        {user && (
          <VisibleIcon>
            {item.isVisible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </VisibleIcon>
        )}
      </DetailsWrapper>
    </Wrapper>
  );
};

export default Item;
