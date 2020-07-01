import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { ShoppingCartContext } from "../../ShoppingCartContext";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
    marign-bottom: 20px;
`;

const ProductWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const Image = styled.img`
    width: 95px;
    height: auto;
    margin-right: 20px;
`;

const ItemInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ItemName = styled.h3`
    font-size: 18px;
    font-family: Oswald,sans-serif;
    font-style: normal;
    font-weight: 400;
    color: #3d4246;
    margin: 0px;
`;

const ItemDetail = styled.p`
    font-size: 14px;
    font-family: Oswald,sans-serif;
    font-style: italic;
    font-weight: 400;
    color: #3d4246;
    margin: 0px;
`;

const Price = styled.h3`
    font-size: 16px;
    font-family: Oswald,sans-serif;
    font-style: normal;
    font-weight: 400;
    color: #3d4246;
    margin: 0px;
`;

const QuantityInput = styled.input`
    text-align: center;
    width: 60px;
    height: 40px;
    border: 1px solid rgba(61,66,70,0.85);
    color: #000;
    border-radius: 2px;
    font-size: 16px;
    font-family: Oswald,sans-serif;
    font-style: normal;
    font-weight: 200;
`;

const Button = styled.button`
    background-color: transparent;
    color: #25282b;
    padding: 4px 5px;
    font-size: 0.75em;
    line-height: 1;
    font-family: Righteous,sans-serif;
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
    
    &:hover{
        color: black;
    }
`;

const ItemPreview = (props) => {
    const [shoppingCartItems, setShoppingCartItems] = useContext(ShoppingCartContext);
    const [item, setItem] = useState(props.item);

    const handleRemoveClick = () => {
        shoppingCartItems.forEach(item => {
            if(item.id === props.item.id){
                shoppingCartItems.splice(shoppingCartItems.indexOf(item), 1);
            }
        });
        props.calculateSubtotal();
    }

    const handleQuantityChange = evt => {
        shoppingCartItems.forEach(existingItem => {
            if(existingItem.id === item.id && existingItem.color === item.color && existingItem.size === item.size){
                setItem({...item, quantity: evt.target.value});
                existingItem.quantity = evt.target.value;
            }
        });
        props.calculateSubtotal();
    }

    const calculateTotal = () => {
        return parseFloat(item.price * item.quantity).toFixed(2);
    }

    return(
        <Wrapper>
            <ProductWrapper>
                <Image src={require("../../assets/catalog/inventory/" + item.imageName + "/" + item.imageName + ".jpg")}></Image>
                <ItemInfoWrapper>
                    <ItemName>{item.name}</ItemName>
                    <ItemDetail>Color: {item.color}</ItemDetail>
                    <ItemDetail>Size: {item.size}</ItemDetail>
                    <Button onClick={handleRemoveClick}>REMOVE</Button>
                </ItemInfoWrapper>
            </ProductWrapper>
            <Price>${item.price}</Price>
            <QuantityInput value={item.quantity} type="number" pattern="[0-9]" min="1" onChange={handleQuantityChange}></QuantityInput>
            <Price>${calculateTotal()}</Price>
        </Wrapper>
    );
}

export default ItemPreview
