import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FilterBar from "./FilterBar";
import Item from "./Item"
import { csv } from "d3";
import inventoryDataCSV from "../../assets/catalog/inventoryData.csv"

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
    justify-content: center;
    margin-left: 50px;
    margin-right: 50px;
    align-items: center;
`;

const CatalogPage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        csv(inventoryDataCSV).then(items => {
            setItems(items);
        });
    }, []);

    const renderItems= () => {
        return items.map(item => (
            <Item key={item.id} path={"../../assets/catalog/inventory/".concat(item.imageName)} name={item.name} price={item.price}></Item>
        ));
    }

    return(
        <div>
            <Title>Products</Title>
            <FilterBar productCount={items.length}/>
            <ItemsWrapper>
                {renderItems()}
            </ItemsWrapper>
        </div>
    );
}

export default CatalogPage