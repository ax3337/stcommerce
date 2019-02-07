import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import ItemTags from './itemTags';
import ItemImage from './itemImage';
import ItemPrice from './itemPrice';
import AddToCartButton from './addToCartButton';

const Item = ({
	product,
	addCartItem,
	settings,
	columnCountOnMobile = 2,
	columnCountOnTablet = 3,
	columnCountOnDesktop = 4,
	columnCountOnWidescreen = 4,
	columnCountOnFullhd = 4
}) => {
	const columnCount = 12;

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

	return (
		<div
			className={`column is-${columnSizeOnMobile}-mobile is-${columnSizeOnTablet}-tablet is-${columnSizeOnDesktop}-desktop is-${columnSizeOnWidescreen}-widescreen is-${columnSizeOnFullhd}-fullhd ${
				product.stock_status
			}`}
		>
			<div>
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
						<tr>
							<td>Количество:</td>
							<td>
								<input />
							</td>
							<td>
								<div className="button-addtocart">
									<AddToCartButton product={product} />
								</div>
							</td>
						</tr>
					</div>
					<ItemPrice product={product} settings={settings} />
				</div>
			</div>
		</div>
	);
};

export default Item;
