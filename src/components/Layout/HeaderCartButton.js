import React, { useContext } from "react";
import CartContext from "../../store/create-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  // console.table(cartCtx.items);
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    // console.log({curNumber,item})
    return curNumber + item.amount;
  }, 0);

  // console.log(cartCtx.items);
  // console.log(numberOfCartItems);

  const showCart = (event) => {
    props.showCart();
  };

  return (
    <button className={classes.button} onClick={showCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart </span>
      <span className={classes.badge}>{numberOfCartItems} </span>
    </button>
  );
};

export default HeaderCartButton;
