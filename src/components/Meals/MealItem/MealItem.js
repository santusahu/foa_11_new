import React, { useContext } from 'react'
import CartContext from '../../../store/create-context';
import classes from "./MealItem.module.css";
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
    const price = `$${props.price}`;

    const cartCtx = useContext(CartContext);
    
    const onAddToCart = amount => {
      // console.log(cartCtx);
      // console.log(amount)
      cartCtx.addItem({
        id: props.id,
        name: props.name,
        price: props.price,
        amount :amount
      })
      
    }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description} </div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={onAddToCart} />
      </div>
    </li>
  );
}

export default MealItem