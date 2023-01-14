import { useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length >= 5 && value.length <= 6;

const Checkout = (props) => {
  const [enteredname, setName] = useState("");
  const [enteredstreet, setStreet] = useState("");
  const [enteredpostal, setPostal] = useState("");
  const [enteredcity, setCity] = useState("");

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameChangeHandler = (event) => {
    console.log(event.target.value);
    const inputId = event.target.id;
    if (inputId === "name") {
      setName(event.target.value);
    }
    if (inputId === "postal") {
      setPostal(event.target.value);
    }
    if (inputId === "street") {
      setStreet(event.target.value);
    }
    if (inputId === "city") {
      setCity(event.target.value);
    }
  };

  const confirmHandler = (event) => {
    // setIsSubmiting(true);
    event.preventDefault();

    const enterednameIsVaild = !isEmpty(enteredname);
    const enteredcityIsVaild = !isEmpty(enteredcity);
    const enteredstreetIsVaild = !isEmpty(enteredstreet);
    const enteredpostalIsVaild = isFiveChars(enteredpostal);

    setFormInputsValidity({
      name: enterednameIsVaild,
      street: enteredstreetIsVaild,
      city: enteredcityIsVaild,
      postalCode: enteredpostalIsVaild,
    });

    const formIsVaild =
      enterednameIsVaild &&
      enteredstreetIsVaild &&
      enteredcityIsVaild &&
      enteredpostalIsVaild;

    if (!formIsVaild) {
      return;
    }

    // submitinng form

    props.onConfirm({
      name: enteredname,
      street: enteredstreet,
      city: enteredcity,
      postalCode: enteredpostal,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" onChange={nameChangeHandler} />
        {!formInputsValidity.name && (
          <p className={classes.invaild_p}>Entered Name is Not vaild...</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" onChange={nameChangeHandler} />
        {!formInputsValidity.street && (
          <p className={classes.invaild_p}>Entered Street is Not vaild...</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" onChange={nameChangeHandler} />
        {!formInputsValidity.postalCode && (
          <p className={classes.invaild_p}>
            Entered Postal Code is Not vaild...
          </p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" onChange={nameChangeHandler} />
        {!formInputsValidity.city && (
          <p className={classes.invaild_p}>Entered City is Not vaild...</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
