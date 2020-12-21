'use strict';

class ToDo {
	constructor(form, input, toDoList, toDoCompleted, toDoContainer) {
		this.form = document.querySelector(form);
		this.input = document.querySelector(input);
		this.toDoList = document.querySelector(toDoList);
		this.toDoCompleted = document.querySelector(toDoCompleted);
		this.toDoContainer = document.querySelector(toDoContainer);
		this.toDoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
	}

	addToStorage() {
		localStorage.setItem('toDoList', JSON.stringify([...this.toDoData]));
	}

	render() {
		this.toDoList.textContent = '';
		this.toDoCompleted.textContent = '';
		this.input.value = '';
		this.toDoData.forEach(this.createItem, this);
		this.addToStorage();
	}

	createItem(toDo) {
		const li = document.createElement('li');
		li.classList.add('todo-item');
		li.key = toDo.key;
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
		} else {
			alert('Заполните поле!');
		}
	}

	generateKey() {
		return (
			Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15)
		);
	}

	deleteItem(key) {
		this.toDoData.forEach((item) => {
			if (item.key === key) {
				this.toDoData.delete(key);
			}
		});
		this.render();
	}

	completedItem(key) {
		this.toDoData.forEach((item) => {
			if (item.key === key) {
				this.toDoData.get(key).completed = !this.toDoData.get(key)
					.completed;
			}
		});
		this.render();
	}

	handler() {
		this.toDoContainer.addEventListener('click', (event) => {
			const target = event.target,
				key = target.parentNode.parentNode.key;

			if (target.matches('.todo-remove')) {
				this.deleteItem(key);
			} else if (target.matches('.todo-complete')) {
				this.completedItem(key);
			} else {
				return;
			}
		});
	}

	init() {
		this.form.addEventListener('submit', this.addToDo.bind(this));
		this.render();
		this.handler();
	}
}

const toDo = new ToDo(
	'.todo-control',
	'.header-input',
	'.todo-list',
	'.todo-completed',
	'.todo-container'
);

toDo.init();
