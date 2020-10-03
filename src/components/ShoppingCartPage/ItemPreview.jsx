import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_ITEM_FROM_SC, QUANTITY_CHANGE } from "../../actions/types";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

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

const Button = styled.button`
  background-color: transparent;
  color: #25282b;
  padding: 4px 5px;
  font-size: 0.75em;
  line-height: 1;
  font-family: Righteous, sans-serif;
  font-style: normal;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: normal;
  font-size: 12px;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid;
  border-radius: 2px;
  color: #3d4246;

  &:hover {
    color: black;
  }
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
  const shoppingCartItems = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const [item, setItem] = useState(props.item);

  const handleRemoveClick = () => {
    dispatch({ type: REMOVE_ITEM_FROM_SC, item: item });
    props.calculateSubtotal();
    window.location.reload(false); // TODO state is updated correctly, but wrong item component until refreshed, hence the reload
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
    var imageLink;
    item.images.forEach((image) => {
      if (item.color === image.color) {
        imageLink = image.imageLink;
      }
    });
    return imageLink;
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
          </ItemInfoWrapper>
        </ProductWrapper>
      </td>
      <td>
        <Price>${item.price}</Price>
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
      <td>
        <Price>${calculateTotal()}</Price>
      </td>
    </TableRow>
  );
};

export default ItemPreview;
