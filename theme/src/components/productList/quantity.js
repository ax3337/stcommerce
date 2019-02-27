import React, { Fragment } from 'react';
import { themeSettings, text } from '../../lib/settings';

export default class Quantity extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			quantity: 1
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.quantity > nextProps.maxQuantity) {
			this.setQuantity(nextProps.maxQuantity);
		}
	}

	handleChange = event => {
		this.setQuantity(event.target.value);
	};

	setQuantity = quantity => {
		const intQuantity = parseInt(quantity);
		if (intQuantity > 0 && intQuantity <= this.props.maxQuantity) {
			this.setState({ quantity: intQuantity });
			this.props.onChange(intQuantity);
		}
	};

	render() {
		const { maxQuantity } = this.props;
		const { quantity } = this.state;
		const disabled = maxQuantity === 0;
		const value = disabled ? 0 : quantity;

		return (
			<Fragment>
				<input
					className="product-quantity-list"
					value={value}
					onChange={this.handleChange}
					maxLength="3"
					type="number"
					pattern="\d*"
					disabled={disabled}
				/>
			</Fragment>
		);
	}
}
