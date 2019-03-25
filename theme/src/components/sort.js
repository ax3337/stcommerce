import React from 'react';
import PropTypes from 'prop-types';
import { themeSettings, text } from '../lib/settings';

const Sort = ({
	defaultSort,
	currentSort,
	setSort,
	setDisplayList,
	displayType
}) => (
	<div className="columns is-mobile sort">
		<div className="is-4 sort-title">{text.sort}:</div>
		<div className="column">
			<span className="select is-fullwidth">
				<select
					onChange={e => {
						setSort(e.target.value);
					}}
					value={currentSort}
				>
					<option value={defaultSort}>{text.sortFavorite}</option>
					<option value={themeSettings.sortNewest}>{text.sortNewest}</option>
					<option value={themeSettings.sortPriceLow}>
						{text.sortPriceLow}
					</option>
					<option value={themeSettings.sortPriceHigh}>
						{text.sortPriceHigh}
					</option>
				</select>
			</span>
		</div>
		<div className="display-category">
			<div
				onClick={e => {
					setDisplayList(false);
				}}
				style={{
					borderRight: '1px solid #dbdbdb',
					padding: 'calc(.375em - 1px) calc(.625em - 1px)'
				}}
			>
				<svg
					className="login-icon"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					fill={!displayType ? 'black' : 'gray'}
					viewBox="0 0 24 24"
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
				</svg>
			</div>
			<div
				onClick={e => {
					setDisplayList(true);
				}}
				style={{
					padding: 'calc(.375em - 1px) calc(.625em - 1px)'
				}}
			>
				<svg
					className="login-icon"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					fill={displayType ? 'black' : 'gray'}
					viewBox="0 0 24 24"
				>
					<path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
					<path d="M0 0h24v24H0z" fill="none" />
				</svg>
			</div>
		</div>
	</div>
);

Sort.propTypes = {
	defaultSort: PropTypes.string.isRequired,
	currentSort: PropTypes.string.isRequired,
	setSort: PropTypes.func.isRequired,
	setDisplayList: PropTypes.func.isRequired
};

export default Sort;
