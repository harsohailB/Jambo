import React from "react";
import styled from "styled-components";
import FilterBar from "./FilterBar"

const Title = styled.h1`
    margin-top: 50px;
    font-family: Righteous,sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size:36px;
    line-height: 1.2;
    overflow-wrap: break-word;
    word-wrap: break-word;
    color: #3d4246;
    text-align: center;
`;

const CatalogPage = () => {
    return(
        <div>
            <Title>Products</Title>
            <FilterBar/>
        </div>
    );
}

export default CatalogPage