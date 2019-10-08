import React from "react";

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
	const ingredients = props.ingredients;
	let transformedIngredients = Object.keys(ingredients)
		.map(ingKey => {
			const ingArr = [];
			for (let i = 0; i < ingredients[ingKey]; i++) {
				ingArr.push(
					<BurgerIngredient key={ingKey + i} type={ingKey} />
				);
			}
			return ingArr;
		})
		.reduce((redArr, ele) => {
			return redArr.concat(ele);
		}, []);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please choose some ingredients!</p>;
	}
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;
