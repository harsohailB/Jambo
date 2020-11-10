import React, { useState } from "react";
import { useSelector } from "react-redux";

import Dropdown from "../styled/Dropdown";
import styled from "styled-components";
import Button from "../styled/Button";

import { sortCatalog } from "./sortingAlgorithms";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 5%;
  margin-right: 5%;
  width: 80%;
  max-width: 1500px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
`;

const Filter = styled.div`
  display: flex;
`;

const FilterText = styled.label`
  font-size: 14px;
  font-family: Oswald, sans-serif;
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
  font-family: Oswald, sans-serif;
  line-height: 55px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FilterBar = ({ items, displayedItems, setDisplayedItems }) => {
  const sortingOptions = [
    "Alphabetically, A-Z",
    "Alphabetically, Z-A",
    "Featured",
    "Price, low to high",
    "Price, high to low",
  ];

  const filteringOptions = [
    "All Products",
    "Accessories",
    "Case",
    "Cotton",
    "Crew Neck",
    "DTG",
    "Embroidery",
    "Glossy",
    "Hats",
    "Hoodies",
    "Long Sleeves",
    "Matte",
    "Men's Clothing",
    "Original",
    "Original T-Shirt",
    "Phone Cases",
    "Regular Fit",
    "Shirt",
    "Short Sleeve",
    "Slim",
    "Sweatshirts",
    "T",
    "T-Shirt",
    "T-Shirts",
    "Tee",
    "Unisex",
    "Women's Clothing",
  ];
  const user = useSelector((state) => state.user);
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    sortingOptions[0]
  );
  const [selectedFilteringOption, setSelectedFilteringOption] = useState(
    filteringOptions[0]
  );

  const renderOptions = (optionsArray) => {
    return optionsArray.map((option) => <option>{option}</option>);
  };

  const updateSelectedSortingOption = (evt) => {
    setSelectedSortingOption(evt.target.value);
    updateCatalog(items, evt.target.value, selectedFilteringOption);
  };

  const updateSelectedFilteringOption = (evt) => {
    setSelectedFilteringOption(evt.target.value);
    updateCatalog(items, selectedSortingOption, evt.target.value);
  };

  const updateCatalog = (items, sortingOption, filteringOption) => {
    // SORT
    let sortedItems = sortCatalog(items, sortingOption);
    // FILTER
    if (filteringOption !== "All Products") {
      setDisplayedItems(
        sortedItems.filter((item) => item.tags.includes(filteringOption))
      );
    } else {
      setDisplayedItems([...sortedItems]);
    }
  };

  return (
    <Wrapper>
      <FilterWrapper>
        <Filter>
          <FilterText>FILTER BY</FilterText>
          <Dropdown
            value={selectedFilteringOption}
            onChange={updateSelectedFilteringOption}
          >
            {renderOptions(filteringOptions)}
          </Dropdown>
        </Filter>

        <Filter>
          <FilterText>SORT BY</FilterText>
          <Dropdown
            value={selectedSortingOption}
            onChange={updateSelectedSortingOption}
          >
            {renderOptions(sortingOptions)}
          </Dropdown>
        </Filter>

        {user && <Button to="/add-item">ADD ITEM</Button>}
      </FilterWrapper>
      <InventoryCount>{displayedItems.length} products</InventoryCount>
    </Wrapper>
  );
};

export default FilterBar;
