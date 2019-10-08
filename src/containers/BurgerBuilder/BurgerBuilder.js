import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
	lettuce: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			lettuce: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalIngredients: 0,
		totalPrice: 4,
		purchaseable: false,
		purchasing: false,
	};

	updatePurchaseState(newTotal) {
		let purchaseable = newTotal !== 0;
		this.setState({
			purchaseable,
		});
	}

	addIngredientHandler = type => {
		const count = this.state.ingredients[type] + 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = count;

		const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

		const newTotal = this.state.totalIngredients + 1;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
			totalIngredients: newTotal,
		});
		this.updatePurchaseState(newTotal);
	};

	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount > 0) {
			const count = oldCount - 1;
			const updatedIngredients = { ...this.state.ingredients };
			updatedIngredients[type] = count;

			const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

			const newTotal = this.state.totalIngredients - 1;

			this.setState({
				totalPrice: newPrice,
				ingredients: updatedIngredients,
				totalIngredients: newTotal,
			});
			this.updatePurchaseState(newTotal);
		}
	};

	checkoutHandler = () => {
		this.setState({ purchasing: true });
	};
	cancelCheckoutHandler = () => {
		this.setState({ purchasing: false });
	};
	confirmCheckoutHandler = () => {
		console.log("Ordered!");
		this.setState({
			ingredients: {
				lettuce: 0,
				bacon: 0,
				cheese: 0,
				meat: 0,
			},
			totalIngredients: 0,
			totalPrice: 4,
			purchaseable: false,
			purchasing: false,
		});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] === 0;
		}

		return (
			<>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.cancelCheckoutHandler}
				>
					<OrderSummary
						ingredients={this.state.ingredients}
						cancel={this.cancelCheckoutHandler}
						continue={this.confirmCheckoutHandler}
						price={this.state.totalPrice}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchaseable={this.state.purchaseable}
					checkout={this.checkoutHandler}
				/>
			</>
		);
	}
}

export default BurgerBuilder;
