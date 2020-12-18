'use strict';

class ToDo {
	constructor(form, input, toDoList, toDoCompleted) {
		this.form = document.querySelector(form);
		this.input = document.querySelector(input);
		this.toDoList = document.querySelector(toDoList);
		this.toDoCompleted = document.querySelector(toDoCompleted);
		this.toDoData = new Map();
	}

	render() {
		this.toDoData.forEach(this.createItem, this);
	}

	createItem(toDo) {
		const li = document.createElement('li');
		li.classList.add('todo-item');
		li.insertAdjacentHTML(
			'beforeend',
			`<span class="text-todo">${toDo.value}</span>
					<div class="todo-buttons">
						<button class="todo-remove"></button>
						<button class="todo-complete"></button>
					</div>`
		);

		if (toDo.completed) {
			this.toDoCompleted.append(li);
		} else {
			this.toDoList.append(li);
		}
	}

	addToDo(e) {
		e.preventDefault();
		if (this.input.value.trim()) {
			const newToDo = {
				value: this.input.value,
				completed: false,
				key: this.generateKey(),
			};
			this.toDoData.set(newToDo.key, newToDo);
			this.render();
		}
	}

	generateKey() {
		return (
			Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15)
		);
	}

	init() {
		this.form.addEventListener('submit', this.addToDo.bind(this));
	}
}

const toDo = new ToDo(
	'.todo-control',
	'.header-input',
	'.todo-list',
	'.todo-completed'
);

toDo.init();
