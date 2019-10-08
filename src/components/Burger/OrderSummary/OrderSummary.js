import React from "react";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
	const ingredientSummary = Object.keys(props.ingredients).map(ingKey => {
		return (
			<li key={ingKey}>
				<span style={{ textTransform: "capitalize" }}>{ingKey}</span>:{" "}
				{props.ingredients[ingKey]}
			</li>
		);
	});

	return (
		<>
			<h3>Your Order</h3>
			<p>
				<strong>Burger Ingredients:</strong>
			</p>
			<ul>{ingredientSummary}</ul>
			<p>
				<strong>Purchase Price:</strong> ${props.price.toFixed(2)}
			</p>
			<p>Continue to Checkout?</p>
			<Button clicked={props.cancel} btnType={"Danger"}>
				CANCEL
			</Button>
			<Button clicked={props.continue} btnType={"Success"}>
				CONTINUE
			</Button>
		</>
	);
};

export default orderSummary;
