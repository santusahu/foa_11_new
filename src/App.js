import React, { memo, useEffect, useReducer, useState } from "react";
// import React, { memo, useEffect, useReducer, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCart = () => {
    setCartIsShown(true);
  };

  const hideCart = () => {
    setCartIsShown(false);
  };
  // console.log('App :>> ', App);

  return (
    <CartProvider>
      {cartIsShown && <Cart hideCart={hideCart} />}
      <Header showCart={showCart} />
      <main>
      <SimpleReducer />
        <Meals />
      </main>
    </CartProvider>
  );
}
export default App;

const SimpleReducer = memo(() => {
  const defaultState = {
    name: "hp",
    age: "",
  };

  const reducer = (state, action) => {
    console.log("state, action :>> ", state, action);
    console.log("hggh");
    switch (action.type) {
      case "NAME_CHANGE":
        return {
          ...state,
          name: action.payload,
        };
      case "ADD_AGE":
        return {
          ...state,
          age: action.payload,
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, defaultState);
  useEffect(() => {
    dispatch({ type: "ADD_AGE", payload: 23 });
  }, []);

  return (
    <div>
      {state?.name}
      {state?.age}
      <input
        value={state.name}
        onChange={(e) =>
          dispatch({ type: "NAME_CHANGE", payload: e.target.value })
        }
      />
    </div>
  );
});
