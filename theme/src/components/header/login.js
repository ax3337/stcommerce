import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import Lscache from 'lscache';

const LoginIcon = () => {
	return (
		<img
			src="/assets/images/login.svg"
			className="login-icon"
			alt={text.login}
			title={text.login}
			style={{
				minWidth: 24 + 'px',
			}}
		/>
	);
};

export default class Login extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			userName:
				Lscache.get('name_user') !== undefined
					? Lscache.get('name_user')
					: 'Guest'
		};
	}

	render() {
		const { login, onClick } = this.props;
		return (
			<span className="cart-button" onClick={onClick}>
				<p className="is-hidden-mobile">{this.state.userName}</p>
				<LoginIcon />
			</span>
		);
	}
}
