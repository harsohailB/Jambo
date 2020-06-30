import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = props => {
    const [shoppingCartItems, setShoppingCartItems] = useState([]);

    return (
       <ShoppingCartContext.Provider value={[shoppingCartItems, setShoppingCartItems]}>
            {props.children}
       </ShoppingCartContext.Provider> 
    );
}