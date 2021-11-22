import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import { REMOVE_ITEM_FROM_SC, QUANTITY_CHANGE } from "../../actions/types";
import { countriesList } from "./countriesList.js";

const TableRow = styled.tr`
  width: 100%;
`;

const ProductWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  text-decoration: none;
  transition: all 0.3s ease-in;
  &: hover {
    opacity: 80%;
  }
`;

const Image = styled.img`
  width: 95px;
  height: 95px;
  margin-right: 20px;
  border-radius: 5px;
`;

const ItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.h3`
  font-size: 18px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #3d4246;
  margin: 0px;
`;

const ItemDetail = styled.p`
  font-size: 14px;
  font-family: Oswald, sans-serif;
  font-style: italic;
  font-weight: 400;
  color: #3d4246;
  margin: 0px;
`;

const Price = styled.h3`
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #3d4246;
  margin: 0px;
`;

const QuantityWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const QuantityInput = styled.input`
  text-align: center;
  width: 60px;
  height: 40px;
  border: 1px solid rgba(61, 66, 70, 0.85);
  color: #000;
  border-radius: 2px;
  font-size: 16px;
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 200;
`;

const Icon = styled(Link)`
  margin: 10px;
  color: #3d4246;
  cursor: pointer;

  & :hover {
    color: red;
  }
  & > svg {
    transition: color 0.1s linear;
  }
`;

const ItemPreview = (props) => {
  const dispatch = useDispatch();
  const [item, setItem] = useState(props.item);

  useEffect(() => {
    setItem(props.item);
  }, [props.item]);

  const handleRemoveClick = () => {
    dispatch({ type: REMOVE_ITEM_FROM_SC, item: item });
    props.calculateSubtotal();
    window.location.reload(false);
  };

  const handleQuantityChange = (evt) => {
    if (evt.target.value < 1) {
      evt.target.value = 1;
    } else if (evt.target.value > 100) {
      evt.target.value = 100;
    }
    setItem({ ...item, quantity: evt.target.value });

    dispatch({
      type: QUANTITY_CHANGE,
      item: item,
      newQuantity: evt.target.value,
    });
    props.calculateSubtotal();
  };

  const calculateTotal = () => {
    return parseFloat(item.price * item.quantity).toFixed(2);
  };

  const getSelectedImageLink = () => {
    return item.images.find((image) => item.color === image.color).imageLink;
  };

  const getCountryNames = (eligibleCountries) => {
    if (eligibleCountries === "CA") {
      return "Canada (CA)";
    } else if (eligibleCountries === "CA/US") {
      return "Canada (CA) and United States (US)";
    }
  };

  return (
    <TableRow>
      <td>
        <ProductWrapper to={"/catalog/" + item.id}>
          <Image src={getSelectedImageLink()}></Image>
          <ItemInfoWrapper>
            <ItemName>{item.name}</ItemName>
            <ItemDetail>Color: {item.color}</ItemDetail>
            <ItemDetail>Size: {item.size}</ItemDetail>
            {item.eligibleCountries.length !== 0 && (
              <ItemDetail style={{ color: "red" }}>
                Only ships to {getCountryNames(item.eligibleCountries)}
              </ItemDetail>
            )}
          </ItemInfoWrapper>
        </ProductWrapper>
      </td>
      <td>
        <Price>${item.price.toFixed(2)}</Price>
      </td>
      <td>
        <QuantityWrapper>
          <QuantityInput
            class="quantityInput"
            value={item.quantity}
            type="number"
            pattern="[0-9]"
            min="1"
            onChange={handleQuantityChange}
          ></QuantityInput>
          <Icon onClick={handleRemoveClick}>
            <FaTrash size={18} />
          </Icon>
        </QuantityWrapper>
      </td>
      <td align="right">
        <Price>${calculateTotal()}</Price>
      </td>
    </TableRow>
  );
};

export default ItemPreview;
