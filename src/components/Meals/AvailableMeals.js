import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {

  const [data, setData] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  const [httpError, setHttpError] = useState(false);

  const fetchMeals = async () => {
    try {
      const response = await fetch(
        "https://food-order-bb7c9-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Somthing Wrong");
      }

      const dataArr = await response.json();

      // console.log(dataArr);
      const Meals_arr = [];

      for (const key in dataArr) {
        Meals_arr.push({
          id: key,
          name: dataArr[key].name,
          description: dataArr[key].description,
          price: dataArr[key].price,
        });
      }
      // console.log(Meals_arr);
      setData(Meals_arr);
      setIsLoding(false);
    } catch (error) {
      setIsLoding(false);
      setHttpError(error.message);
    }
  };

  useEffect(() => {
    fetchMeals().catch((error) => {
      setIsLoding(false);
      // setHttpError("Somthing Went Wrong..!!");
    });
  }, []);

  // console.log(httpError);

  const MealsList = data.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {isLoding && !httpError && (
          <p className={classes.isLoding}>Loading.....</p>
        )}

        {!isLoding && httpError && (
          <p className={classes.faild_to_load}>{httpError}</p>
        )}
        {!isLoding && !httpError && <ul>{MealsList}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
