import React, { Component, }  from 'react';

import AppHeader from '../app-header';
import ItemAddForm from '../item-add-form';
import ItemStatusFilter from '../item-status-filter';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import './app.css';


export default class App extends Component {

	maxId = 100;


	state = {
		todoData: [
			this.createTodoItem('Drink Coffe'),
			this.createTodoItem('Make Awesome App'),
			this.createTodoItem('Have a lunch'),
		],
		filter: 'all',
		search: '',
	};

	createTodoItem(label) {
		return {
			label,
			important: false,
			done     : false,
			id       : this.maxId++,
		};
	}

	deleteItem = id => {
		this.setState(({ todoData, }) => {
			return {
				todoData: todoData.filter(el => el.id !== id),
			};
		});
	};

	addItem = text => {
		const newItem = this.createTodoItem(text);

		this.setState(({ todoData, }) => {
			return {
				todoData: [ ...todoData, newItem, ],
			};
		});
	};

	toggleProperty(arr, id, propName) {
		const idx = arr.findIndex(el => el.id === id),
			oldItem = arr[idx],
			newItem = { ...oldItem, [propName]: !oldItem[propName], };
		return  [
			...arr.slice(0, idx),
			newItem,
			...arr.slice(idx + 1),
		];
	}

	onToggleImportant = id => {
		this.setState(({ todoData, }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'important'),
			};
		});
	}

	onToggleDone= id => {
		this.setState(({ todoData, }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'done'),
			};
		});
	}

	onSearch = value => {
		this.setState({
			search: value,
		});
	}

	onFilter = value => {
		this.setState({
			filter: value,
		});
	}

	filter = (items, filter) => {
		switch (filter) {
			case 'all':
				return items;
			case 'active':
				return items.filter(el => !el.done);
			case 'done':
				return items.filter(el => el.done);
			default:
				return items;
		}
	}

	search = (items, value) => {
		return items.filter(el => el.label.toLowerCase().includes(value));
	}

	render() {
		const { todoData, filter, search, } = this.state,
			doneCount = todoData.filter(el => el.done).length,
			todoCount = todoData.length - doneCount,
			searched = this.search(todoData, search.toLowerCase()),
			visible = this.filter(searched, filter);

		return (
			<div className="todo-app">
				<AppHeader toDo={todoCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SearchPanel onSearch={this.onSearch}/>
					<ItemStatusFilter onFilter={this.onFilter}
						filter={filter}/>
				</div>

				<TodoList todos={visible}
					onDeleted={this.deleteItem}
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone}/>

				<ItemAddForm
					onItemAdded={this.addItem}/>
			</div>
		);
	}
}