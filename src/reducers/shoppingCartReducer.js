import { ADD_ITEM_TO_SC, REMOVE_ITEM_FROM_SC, FETCH_SC_ITEMS, QUANTITY_CHANGE } from "../actions/types";
import ls from "local-storage";

const isSameItem = (firstItem, secondItem) => {
    return firstItem.id === secondItem.id && firstItem.color === secondItem.color && firstItem.size === secondItem.size;
}

const shoppingCartReducer = (state = [], action) => {
    let newState = [];
    
    switch (action.type){
        case FETCH_SC_ITEMS:
            newState = action.items;
            break;
        case ADD_ITEM_TO_SC:
            let itemExists = false;
            
            // if shopping cart has item then increment quantity
            state.forEach(existingItem => {
                if(isSameItem(action.item, existingItem)){
                    itemExists = true;
                    let quantity = existingItem.quantity;
                    newState.push({...existingItem, quantity: ++quantity}); 
                }else{
                    newState.push(existingItem)
                }
            });
            
            // if not, add new one
            if(!itemExists){
                let newItem = {
                    ...action.item,
                    color: action.item.color,
                    quantity: "1",
                    size: action.item.size
                }
                newState = [...state, newItem];
            }
            
            break;
        case REMOVE_ITEM_FROM_SC:
            state.forEach(existingItem => {
                if(!isSameItem(action.item, existingItem)){
                    newState.push(existingItem); 
                }
            });
            break;
        case QUANTITY_CHANGE:
            state.forEach(existingItem => {
                if(isSameItem(action.item, existingItem)){
                    newState.push({...existingItem, quantity: action.newQuantity});
                }else{
                    newState.push(existingItem); 
                }
            });
            break;
        default:
            return state;
    }

    ls.set("shoppingCart", newState);
    return newState;
};

export default shoppingCartReducer;