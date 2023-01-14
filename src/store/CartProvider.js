import React, { useReducer } from "react";
import CartContext from "./create-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// cartReducer reducer function pass as a first parameter in useRseducer
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    // console.log(action);
    // console.log(state);

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;


    console.log({ existingCartItem, existingCartItemIndex});

    if (existingCartItem) {
      console.log(existingCartItem);
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      console.log(updatedItem);
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
      // console.log(updatedItems);
    } else {
      updatedItems = state.items.concat(action.item);
    }

    // const updateCart = state.items.concat(action.item);
    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const exstingItem = state.items[existingCartItemIndex];
    const updateTotalAmount = state.totalAmount - exstingItem.price;
    let updatedItems;
    if (exstingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {...exstingItem , amount : exstingItem.amount - 1};
      console.log(exstingItem);
      console.log(updatedItem);
      updatedItems = [...state.items];
      console.log(updatedItems);
      updatedItems[existingCartItemIndex] =updatedItem
      console.log(updatedItems);
    }
    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  // const [cartState, dispatchCartAction] = useReducer(cartReducer,defaultCartState);
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    // console.table(item);
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  // cartContext Halper pass as a value
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
