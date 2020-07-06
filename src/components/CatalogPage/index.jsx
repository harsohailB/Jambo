import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FilterBar from "./FilterBar";
import Item from "./Item";
import { getItems } from "../../actions/items";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

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

const ItemsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 150px;
    margin-right: 150px;
    flex-grow: 5;
    max-width: 1400px;
`;

const CatalogPage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems().then(fetchedItems => {
            setItems(fetchedItems);
        });
    }, []);

    const renderItems = () => {
        return items.map(item => (
            <Item 
                key={item.id} 
                id={item.id}
                path={require("../../assets/catalog/inventory/" + item.imageName + "/" + item.imageName + ".jpg")} 
                name={item.name} 
                price={item.price}>                   
            </Item>
        ));
    }
    return(
        <Wrapper>
            <Title>Products</Title>
            <FilterBar productCount={items.length}/>
            <ItemsWrapper>
                {renderItems()}
            </ItemsWrapper>
        </Wrapper>
    );
}

export default CatalogPage