import React from "react";
import HeadImage from '../../assets/meals.jpg'; 
import Classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={Classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton showCart={props.showCart} />
      </header>
      <div className={Classes["main-image"]}>
        <img src={HeadImage} alt="Food Order App " />
      </div>
    </React.Fragment>
  );
};

export default Header;
