import React from 'react';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

const AddToCartButton = ({
	product,
	customer,
	variant,
	addCartItem,
	isAllOptionsSelected
}) => {
	let tax = 0;
	if (customer !== undefined) {
		for (var key in product) {
			if (key === customer.customer_settings.group_name) {
				tax = product[key] / 100;
			}
		}
	}
	let buttonStyle = {};
	if (
		themeSettings.button_addtocart_bg &&
		themeSettings.button_addtocart_bg.length > 0
	) {
		buttonStyle.backgroundColor = themeSettings.button_addtocart_bg;
	}
	if (
		themeSettings.button_addtocart_color &&
		themeSettings.button_addtocart_color.length > 0
	) {
		buttonStyle.color = themeSettings.button_addtocart_color;
	}

	let addToCartText =
		themeSettings.button_addtocart_text &&
		themeSettings.button_addtocart_text.length > 0
			? themeSettings.button_addtocart_text
			: text.addToCart;

	if (product.stock_status === 'discontinued') {
		return (
			<button
				className="button is-dark is-fullwidth is-landing"
				style={buttonStyle}
				disabled
			>
				{text.discontinued}
			</button>
		);
	} else if (product.variable && variant && variant.stock_quantity > 0) {
		return (
			<button
				className="button is-success is-fullwidth is-landing"
				style={buttonStyle}
				onClick={addCartItem}
			>
				<img
					src="/assets/images/shopping_cart.png"
					style={{
						minWidth: 18 + 'px',
						minHeight: 18 + 'px',
						maxWidth: 18 + 'px',
						maxHeight: 18 + 'px'
					}}
				/>
				{product.price - product.price * tax + ' руб'}
			</button>
		);
	} else if (product.variable && !isAllOptionsSelected) {
		return (
			<button
				className="button is-success is-fullwidth is-landing"
				style={buttonStyle}
				disabled
			>
				{text.optionsRequired}
			</button>
		);
	} else if (product.variable && !product.stock_backorder) {
		return (
			<button
				className="button is-success is-fullwidth is-landing"
				style={buttonStyle}
				disabled
			>
				{text.outOfStock}
			</button>
		);
	} else if (product.stock_status === 'available') {
		return (
			<button
				className="button is-success is-landing"
				style={buttonStyle}
				onClick={addCartItem}
			>
				<img
					src="/assets/images/shopping_cart.png"
					style={{
						minWidth: 18 + 'px',
						minHeight: 18 + 'px',
						maxWidth: 18 + 'px',
						maxHeight: 18 + 'px'
					}}
				/>
				<p>{product.price - product.price * tax + ' руб'}</p>
			</button>
		);
	} else if (product.stock_status === 'out_of_stock') {
		return (
			<button
				className="button is-success is-fullwidth is-landing"
				style={buttonStyle}
				disabled
			>
				{text.outOfStock}
			</button>
		);
	} else {
		return null;
	}
};

export default AddToCartButton;
