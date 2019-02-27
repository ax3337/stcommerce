import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import ItemTags from './itemTags';
import ItemImage from './itemImage';
import AddToCartButton from './addToCartButton';
import Quantity from './quantity';

export default class Item extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOptions: {},
			selectedVariant: null,
			isAllOptionsSelected: false,
			quantity: 1
		};

		this.onOptionChange = this.onOptionChange.bind(this);
		this.findVariantBySelectedOptions = this.findVariantBySelectedOptions.bind(
			this
		);
		this.addToCart = this.addToCart.bind(this);
		this.checkSelectedOptions = this.checkSelectedOptions.bind(this);
	}

	onOptionChange(optionId, valueId) {
		let { selectedOptions } = this.state;

		if (valueId === '') {
			delete selectedOptions[optionId];
		} else {
			selectedOptions[optionId] = valueId;
		}

		this.setState({ selectedOptions: selectedOptions });
		this.findVariantBySelectedOptions();
		this.checkSelectedOptions();
	}

	findVariantBySelectedOptions() {
		const { selectedOptions } = this.state;
		const { product } = this.props;
		for (const variant of product.variants) {
			const variantMutchSelectedOptions = variant.options.every(
				variantOption =>
					selectedOptions[variantOption.option_id] === variantOption.value_id
			);
			if (variantMutchSelectedOptions) {
				this.setState({ selectedVariant: variant });
				return;
			}
		}

		this.setState({ selectedVariant: null });
	}

	setQuantity = quantity => {
		this.setState({ quantity: quantity });
	};

	addToCart() {
		const { product, addCartItem } = this.props;
		const { selectedVariant, quantity } = this.state;

		let item = {
			product_id: product.id,
			quantity: quantity
		};

		if (selectedVariant) {
			item.variant_id = selectedVariant.id;
		}

		addCartItem(item);
	}

	checkSelectedOptions() {
		const { selectedOptions } = this.state;
		const { product } = this.props;

		const allOptionsSelected =
			Object.keys(selectedOptions).length === product.options.length;
		this.setState({ isAllOptionsSelected: allOptionsSelected });
	}

	render() {
		const { product, settings, categories, addCartItem } = this.props;
		const { selectedVariant, isAllOptionsSelected } = this.state;
		const maxQuantity =
			product.stock_status === 'discontinued'
				? 0
				: product.stock_backorder
				? themeSettings.maxCartItemQty
				: selectedVariant
				? selectedVariant.stock_quantity
				: product.stock_quantity;

		const columnCount = 12;
		const columnCountOnMobile = 2;
		const columnCountOnTablet = 2;
		const columnCountOnDesktop = 3;
		const columnCountOnWidescreen = 3;
		const columnCountOnFullhd = 4;

		const columnSizeOnMobile = columnCount / columnCountOnMobile;
		const columnSizeOnTablet = columnCount / columnCountOnTablet;
		const columnSizeOnDesktop = columnCount / columnCountOnDesktop;
		const columnSizeOnWidescreen = columnCount / columnCountOnWidescreen;
		const columnSizeOnFullhd = columnCount / columnCountOnFullhd;

		const imageHeight =
			themeSettings.list_image_max_height &&
			themeSettings.list_image_max_height > 0
				? themeSettings.list_image_max_height
				: 'auto';
		const placeholderHeight =
			themeSettings.list_image_max_height &&
			themeSettings.list_image_max_height > 0
				? themeSettings.list_image_max_height
				: 200;
		if (product) {
			return (
				<div
					style={{
						minWidth: 250 + 'px'
					}}
					className={`column is-${columnSizeOnMobile}-mobile is-${columnSizeOnTablet}-tablet is-${columnSizeOnDesktop}-desktop is-${columnSizeOnWidescreen}-widescreen is-${columnSizeOnFullhd}-fullhd ${
						product.stock_status
					}`}
				>
					<div className="item-box">
						<NavLink to={product.path}>
							<figure className="image" style={{ height: imageHeight }}>
								<ItemTags tags={product.tags} />
								<ItemImage
									images={product.images}
									productName={product.name}
									height={placeholderHeight}
								/>
							</figure>
						</NavLink>
						<div className="content product-caption">
							<div className="product-name">{product.name}</div>
							<div className="product-content-info">
								<tr>
									<td>Артикул:</td>
									<td>{product.sku}</td>
								</tr>
								<tr>
									<td>Ед. измерения:</td>
									<td>-none-</td>
								</tr>
								<tr>
									<td>В упаковке:</td>
									<td>-none-</td>
								</tr>
								<tr>
									<td>Наличие:</td>
									<td>{product.stock_quantity}</td>
								</tr>
							</div>
							<div className="product-addToCartButton">
								<span>Количество:</span>
								<Quantity
									maxQuantity={maxQuantity}
									onChange={this.setQuantity}
								/>
								<div>
									<AddToCartButton
										product={product}
										variant={selectedVariant}
										addCartItem={this.addToCart}
										isAllOptionsSelected={isAllOptionsSelected}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return null;
		}
	}
}
