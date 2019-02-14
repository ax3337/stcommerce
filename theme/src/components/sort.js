import React from 'react';
import PropTypes from 'prop-types';
import { themeSettings, text } from '../lib/settings';

const Sort = ({ defaultSort, currentSort, setSort }) => (
	<div className="columns is-mobile sort">
		<div className="column is-4 sort-title">{text.sort}:</div>
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
		<div className="column display-category">
			<span className="login-button">
				<img
					src="/assets/images/dashboard.svg"
					className="login-icon"
					alt="Плитка"
					title="Плитка"
					style={{
						marginTop: 7 + 'px',
						minWidth: 24 + 'px',
						minHeight: 29 + 'px',
						maxWidth: 44 + 'px',
						maxHeight: 28 + 'px'
					}}
				/>
			</span>
			<span className="login-button">
				<img
					src="/assets/images/list.svg"
					className="login-icon"
					alt="Список"
					title="Список"
					style={{
						marginTop: 7 + 'px',
						minWidth: 24 + 'px',
						minHeight: 29 + 'px',
						maxWidth: 44 + 'px',
						maxHeight: 28 + 'px'
					}}
				/>
			</span>
		</div>
	</div>
);

Sort.propTypes = {
	defaultSort: PropTypes.string.isRequired,
	currentSort: PropTypes.string.isRequired,
	setSort: PropTypes.func.isRequired
};

export default Sort;
