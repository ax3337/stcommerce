import React from 'react';
import { connect } from 'react-redux';
import {
	fetchCustomers,
	deleteCustomers,
	setGroup,
	setFilterSearch,
	createCustomer
} from '../actions';
import Buttons from './components/buttons';

const mapStateToProps = state => {
	return {
		search: state.customers.search,
		selectedCount: state.customers.selected.length
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setSearch: value => {
			dispatch(setFilterSearch(value));
			dispatch(fetchCustomers());
		},
		onDelete: () => {
			dispatch(deleteCustomers());
		},
		onSetGroup: group_id => {
			dispatch(setGroup(group_id));
		},
		onCustomerCreate: customer => {
			dispatch(
				createCustomer({
					role: 'manager',
					note: customer.note,
					full_name: customer.full_name,
					group_id: customer.group_id,
					email: customer.email,
					mobile: customer.mobile
				})
			).then(function(value) {
				dispatch(fetchCustomers());
				console.log(value);
			});
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Buttons);
