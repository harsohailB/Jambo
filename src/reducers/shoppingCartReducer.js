import {
  ADD_ITEM_TO_SC,
  REMOVE_ITEM_FROM_SC,
  FETCH_SC_ITEMS,
  QUANTITY_CHANGE,
  CLEAR_CART,
  PRUNE_CART,
  UPDATE_CART_ITEMS_INFO,
} from "../actions/types";
import ls from "local-storage";
import { routerActions } from "connected-react-router";

const isSameItem = (firstItem, secondItem) => {
  return (
    firstItem.id === secondItem.id &&
    firstItem.color === secondItem.color &&
    firstItem.size === secondItem.size
  );
};

const shoppingCartReducer = (state = [], action) => {
  let newState = [];

  switch (action.type) {
    case FETCH_SC_ITEMS:
      newState = action.items;
      break;

    case ADD_ITEM_TO_SC:
      let itemExists = false;

      // if shopping cart has item then increment quantity
      state.forEach((existingItem) => {
        if (isSameItem(action.item, existingItem)) {
          itemExists = true;
          let quantity = existingItem.quantity;
          newState.push({ ...existingItem, quantity: ++quantity });
        } else {
          newState.push(existingItem);
        }
      });

      // if not, add new one
      if (!itemExists) {
        let newItem = {
          ...action.item,
          color: action.item.color,
          quantity: "1",
          size: action.item.size,
        };
        newState = [...state, newItem];
      }

      break;

    case REMOVE_ITEM_FROM_SC:
      state.forEach((existingItem) => {
        if (!isSameItem(action.item, existingItem)) {
          newState.push(existingItem);
        }
      });
      break;

    case QUANTITY_CHANGE:
      state.forEach((existingItem) => {
        if (isSameItem(action.item, existingItem)) {
          newState.push({ ...existingItem, quantity: action.newQuantity });
        } else {
          newState.push(existingItem);
        }
      });
      break;

    case CLEAR_CART:
      newState = [];
      break;

    case PRUNE_CART:
      // Removes items that do not exist in store anymore
      newState = state.filter((item) => {
        return action.items.some((actionItem) => actionItem.id === item.id);
      });
      // Remove items that have selected color or size that does not exist anymore
      newState = state.filter((item) => {
        const existingItem = action.items.find(
          (actionItem) => actionItem.id === item.id
        );

        if (
          existingItem.colors.some((color) => color === item.color) &&
          existingItem.sizes.some((size) => size === item.size)
        ) {
          return true;
        } else {
          return false;
        }
      });
      break;

    case UPDATE_CART_ITEMS_INFO:
      newState = state.map((item) => {
        if (action.items.some((actionItem) => actionItem.id === item.id)) {
          const updatedItem = action.items.find(
            (actionItem) => actionItem.id === item.id
          );
          return {
            ...item,
            name: updatedItem.name,
            price: updatedItem.price,
            shipping: updatedItem.shipping,
            colors: updatedItem.colors,
            sizes: updatedItem.sizes,
          };
        }

        return item;
      });
      break;
    default:
      return state;
  }

  ls.set("shoppingCart", newState);
  return newState;
};

export default shoppingCartReducer;
