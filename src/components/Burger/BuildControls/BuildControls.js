import React from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
	{ label: "Lettuce", type: "lettuce" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" },
];

const BuildControls = props => {
	return (
		<div className={classes.BuildControls}>
			<p>
				Current Price: <strong>${props.price.toFixed(2)} </strong>
			</p>
			{controls.map(ele => (
				<BuildControl
					disabled={props.disabled[ele.type]}
					key={ele.label}
					label={ele.label}
					added={() => props.ingredientAdded(ele.type)}
					removed={() => props.ingredientRemoved(ele.type)}
				/>
			))}
			<button
				className={classes.OrderButton}
				disabled={!props.purchaseable}
				onClick={props.checkout}
			>
				ORDER NOW
			</button>
		</div>
	);
};

export default BuildControls;
