import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import {
  getPrintifyItemById,
  getPrintifyItems,
} from "../../actions/printifyItems";

const Dropdown = styled.select`
  padding: 10px 28px 10px 18px;
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: black;
  line-height: 1.5;
  border: 0 solid transparent;
  width: 100%;
  margin-top: 20px;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
    font-size: 22px;
  }
`;

const PrintifyPreview = (props) => {
  const user = useSelector((state) => state.user);
  const [printifyItems, setPrintifyItems] = useState([]);

  useEffect(() => {
    getPrintifyItems(user).then((fetchedPrintifyItems) => {
      console.log(fetchedPrintifyItems);
      setPrintifyItems(fetchedPrintifyItems);
    });
  }, []);

  const handleDropdownChange = (evt) => {
    let itemPrintifyID = printifyItems.find(
      (item) => item.name === evt.target.value
    ).printifyID;
    getPrintifyItemById(user, itemPrintifyID).then((fetchedPrintifyItem) => {
      props.setNewItem({
        ...fetchedPrintifyItem,
        id: itemPrintifyID,
      });
    });
  };

  const renderOptions = () => {
    return printifyItems.map((printifyItem) => (
      <option value={printifyItem.name}>{printifyItem.name}</option>
    ));
  };

  return (
    <Dropdown onChange={handleDropdownChange}>
      <option value="" disabled selected>
        Please select your option
      </option>
      {renderOptions()}
    </Dropdown>
  );
};

export default PrintifyPreview;
