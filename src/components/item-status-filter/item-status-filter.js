import React, { Component, } from 'react';

import './item-status-filter.css';


export default class ItemStatusFilter extends Component {

	buttons = [
		{ name: 'all', label: 'All', },
		{ name: 'active', label: 'Active', },
		{ name: 'done', label: 'Done', },
	];

	render() {
		const { filter, onFilter, } = this.props;

		const elements = this.buttons.map(el => {
			const clazz = filter === el.name ? ' btn-info' : ' btn-outline-secondary';
			const clazzName = 'btn' + clazz;

			return (
				<button type="button"
					key={el.name}
					className={clazzName}
					onClick={() => onFilter(el.name)}>
					{el.label}
				</button>
			);
		});


		return (
			<div className="btn-group">
				{elements}
			</div>
		);
	}
}
