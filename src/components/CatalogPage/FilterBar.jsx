import React from "react";
import styled from "styled-components";

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
    margin: 12px;
`;

const FilterDropdown = styled.select`
    padding: 10px 28px 10px 18px;
    font-size: 16px;
    font-family: Oswald,sans-serif;
    font-style: normal;
    font-weight: 400;
    color: #3d4246;
    line-height: 1.5;
    border: 0 solid transparent;
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

const FilterBar = () => {
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
                    <FilterDropdown>
                        {renderFilteringOptions()}
                    </FilterDropdown>
                </Filter>
                <Filter>
                    <FilterText>SORT BY</FilterText>
                    <FilterDropdown>
                        {renderSortingOptions()}
                    </FilterDropdown>
                </Filter>
           </FilterWrapper>
           <InventoryCount>15 products</InventoryCount>
       </Wrapper>
    );
}

export default FilterBar