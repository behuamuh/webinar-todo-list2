const todos = [
  'как настроить сокращения для гит',
  'Бесплатные сервисы для анализа кроссбраузерности',
  'Разобраться с функциями',
  'Чистый код',
];

let todoCount = 0;

const todosListElement = document.querySelector('.todos__list');
const todosFormElement = document.querySelector('.todos__form');
const todosSubmitBtn = todosFormElement.querySelector('.todos__submit-btn');
const todosInputElement = document.querySelector('.todos__input');
const todosTemplateElement = document.querySelector('.todo-template');

let editedElement = null;

function addTodoListeners(todo) {
  todo.querySelector('.todo__btn_type_delete').addEventListener('click', handleDelete);
  todo.querySelector('.todo__btn_type_edit').addEventListener('click', handleEdit);
  todo.querySelector('.todo__btn_type_duplicate').addEventListener('click', handleDuplicate);
}

function handleDelete(evt) {
  const todo = evt.currentTarget.closest('.todo');
  todo.remove();
}

function setTodoToForm(todo) {
  const text = todo.querySelector('.todo__text').textContent;
  todosInputElement.value = text;
  todosSubmitBtn.textContent = 'Сохранить';
}

function resetTodoForm() {
  editedElement = null;
  todosInputElement.value = '';
  todosSubmitBtn.textContent = 'Добавить';
}

function handleEdit(evt) {
  const todo = evt.currentTarget.closest('.todo');

  editedElement = todo;
  setTodoToForm(todo);
}

function handleDuplicate(evt) {
  const todo = evt.currentTarget.closest('.todo');

  const duplicate = todo.cloneNode(true);

  addTodoListeners(duplicate);
  todo.after(duplicate);
}

function createTodo(text) {
  const todo = todosTemplateElement.content.cloneNode(true);

  todo.querySelector('.todo__text').textContent = capitalize(text);
  addTodoListeners(todo);

  return todo;
}

function addTodo(todo) {
  todosListElement.prepend(todo);

  todoCount++;

  return todoCount;
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  const text = todosInputElement.value;

  if (editedElement) {
    editedElement.querySelector('.todo__text').textContent = text;
  } else {
    const newTodo = createTodo(text);
    const newCount = addTodo(newTodo);
    console.log(newCount);
  }

  resetTodoForm();
}

todos.forEach(text => {
  const todo = createTodo(text);

  const newCount = addTodo(todo);
  console.log(newCount);
});

todosFormElement.addEventListener('submit', handleFormSubmit);

function capitalize(text) {
  if (!text || typeof text !== 'string') return text;

  return text[0].toUpperCase() + text.slice(1);
}
