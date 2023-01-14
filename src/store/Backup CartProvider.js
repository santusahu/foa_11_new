import React, { useReducer } from "react";
import CartContext from "./create-context";

// cartReducer reducer function pass as a first parameter in useRseducer
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // console.log("state", state);
    // console.log("action");
    // console.log(action);
    // console.log("state");
    // console.log(state);
    const updateCart = state.items.concat(action.item);
    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // console.table(existingCartItemIndex);
    console.log(existingCartItemIndex);
    const existingCartItem = state.items[existingCartItemIndex];
    console.log(existingCartItem);


    return {
      items: updateCart,
      totalAmount: updateTotalAmount,
    };
  }

  return defaultCartState;
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
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
