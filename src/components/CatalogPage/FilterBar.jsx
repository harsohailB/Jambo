import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "../styled/Dropdown";
import styled from "styled-components";
import Button from "../styled/Button";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 150px;
    margin-right: 150px;
`;

const FilterWrapper = styled.div`
    display: flex;
`;

const Filter = styled.div`
    display: flex;
`;

const FilterText = styled.label`
    font-size: 14px;
    font-family: Oswald,sans-serif;
    font-style: normal;
    font-weight: 400;
    color: #3d4246;
    margin-top: 12px;
    margin-left: 12px;
    width: 100px;
`;

const InventoryCount = styled.p`
    font-size: 14px;
    font-style: italic;
    font-family: Oswald,sans-serif;
    line-height: 55px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const FilterBar = (props) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const sortingOptions = ["Alphabetically, A-Z", "Alphabetically, Z-A", "Featured",
                            "Best-Selling", "Price, low to high", "Price, high to low",
                            "Date, new to old", "Date, old to new"]
    const filteringOptions = ["All Products", "Accesories", "Case", "Cotton", "Crew Neck",
                            "DTG", "Embroidery", "Glossy", "Hats", "Hoodies", "Long Sleeves"]

    const renderSortingOptions = () => {
        return sortingOptions.map(option => (
            <option>{option}</option>
        ));
    }

    const renderFilteringOptions = () => {
        return filteringOptions.map(option => (
            <option>{option}</option>
        ));
    }

    return(
       <Wrapper>
           <FilterWrapper>
                <Filter>
                    <FilterText>FILTER BY</FilterText>
                    <Dropdown>
                        {renderFilteringOptions()}
                    </Dropdown>
                </Filter>
                <Filter>
                    <FilterText>SORT BY</FilterText>
                    <Dropdown>
                        {renderSortingOptions()}
                    </Dropdown>
                </Filter>
                {user && <Button to="/add-item">ADD ITEM</Button>}
           </FilterWrapper>
           <InventoryCount>{props.productCount} products</InventoryCount>
       </Wrapper>
    );
}

export default FilterBar