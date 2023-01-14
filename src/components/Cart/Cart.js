import React, { useContext, useState } from "react";
import CartContext from "../../store/create-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isChackOut, setIsChackOut] = useState(false);
  const [sendingDataIs, setSendingDataIs] = useState(false);
  const [isOrderIsSaved, setIsOrderIsSaved] = useState(false);

  const cartCtx = useContext(CartContext);

  const hasItems = cartCtx.items.length > 0;

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const chackOut = (event) => {
    setIsChackOut(true);
  };

  const sendDataHandeler = async (userDetails) => {
    setSendingDataIs(true);
    // console.log(userDetails);
    const response = await fetch(
      "https://food-order-bb7c9-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          userDetails,
          orderDetails: cartCtx.items,
        }),
      }
    );
    console.log(response);
    console.log(response.ok);

    setSendingDataIs(false);
    setIsOrderIsSaved(true);
    cartCtx.clearCart();
  };

  let showBtn = "";
  if (!isChackOut) {
    showBtn = (
      <div className={classes.actions}>
        <button onClick={props.hideCart} className={classes["button--alt"]}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={chackOut}>
            Order
          </button>
        )}
      </div>
    );
  }

  const cartModelContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isChackOut && (
        <Checkout onCancel={props.hideCart} onConfirm={sendDataHandeler} />
      )}
      {showBtn}
    </React.Fragment>
  );

  // order submited conent

  const orderSubmitedContent = (
    <React.Fragment>
      <p className={classes.submited}>
        Order Accepted!!! Thanks you Visiting!!
      </p>
      <div className={classes.actions}>
        <button onClick={props.hideCart} className={classes.button}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  // JSX
  return (
    <Modal hideCart={props.hideCart}>
      {!sendingDataIs && !isOrderIsSaved && cartModelContent}
      {sendingDataIs && !isOrderIsSaved && (
        <p className={classes.submiting}>Order Accepting</p>
      )}
      {!sendingDataIs && isOrderIsSaved && orderSubmitedContent}
    </Modal>
  );
};

export default Cart;
