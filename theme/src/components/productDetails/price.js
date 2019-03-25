import React from 'react';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

const FormattedCurrency = ({ number, settings }) =>
	helper.formatCurrency(number, settings);

const NewAndOldPrices = ({ newPrice, oldPrice, settings }) => (
	<div className="product-price">
		<span className="product-new-price">
			<FormattedCurrency settings={settings} number={newPrice} />
		</span>
		<del className="product-old-price">
			<FormattedCurrency settings={settings} number={oldPrice} />
		</del>
	</div>
);

const Price = ({
	product,
	variant,
	isAllOptionsSelected,
	settings,
	customer
}) => {
	let tax = 0;
	if (customer !== undefined) {
		for (var key in product) {
			if (key === customer.customer_settings.group_name) {
				tax = product[key] / 100;
			}
		}
	}
	console.log(tax);
	let priceStyle = {};
	if (
		themeSettings.details_price_size &&
		themeSettings.details_price_size > 0
	) {
		priceStyle.fontSize = themeSettings.details_price_size + 'px';
	}
	if (
		themeSettings.details_price_color &&
		themeSettings.details_price_color.length > 0
	) {
		priceStyle.color = themeSettings.details_price_color;
	}

	let price = 0;
	let oldPrice = 0;

	if (product.variable && variant && variant.price > 0) {
		price = variant.price - variant.price * tax;
	} else {
		price = product.price - product.price * tax;
	}

	if (product.on_sale) {
		oldPrice = product.regular_price - product.regular_price * tax;
	}

	if (oldPrice > 0) {
		return (
			<NewAndOldPrices
				settings={settings}
				newPrice={price}
				oldPrice={oldPrice}
			/>
		);
	} else {
		return (
			<div className="product-price" style={priceStyle}>
				<FormattedCurrency settings={settings} number={price} />
			</div>
		);
	}
};

export default Price;
