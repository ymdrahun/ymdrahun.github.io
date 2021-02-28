const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
var todos = [];
var id = 0;

function onStart()
{
  todos = JSON.parse(localStorage.getItem("todo"));
  if (todos != null) {
    render();
  }
  else
  {
    todos = [];
  }
}

function saveToDo()
{
  localStorage.setItem('todo', JSON.stringify(todos)); 
}


//<li>
//  <input type="checkbox">
//  <button>deleta</button>
//  <span>text</span>
//</li>

class Todo {
  constructor() {
    this.id = ++id;
    this.check = false;
    this.text = this.getText();
  }
  getText() {
    return prompt('Enter a todo task:')
  }
}

function newTodo() {
  const todo = new Todo();
  todos.push(todo);
  render();
}

function render() {
  list.innerHTML = ``;
  todos.map(createTodo).forEach(todo => list.appendChild(todo));
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.check).length;
  saveToDo();
}

function createTodo(todo) {
  const li = document.createElement("li");
  li.className = 'todo-container'
  li.innerHTML = `
  <input class = 'todo-checkbox' type="checkbox" onchange="changeTodo(${todo.id})" ${todo.check ? "checked" : ""}>
  <button class = 'todo-delete' onclick="deleteTodo(${todo.id})">delete</button>
  <span>${todo.text}</span>
  `;
  return li;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id)
  render();
}

function changeTodo(id) {
  //  for (let i = 0; i < todos.length; i++) {
  //    if (todos[i].id === id) {
  //      todos[i].check = !todos[i].check;
  //      break;
  //    }
  //  }


  //todos = todos.map(todo => todo.id === id ? { id: todo.id, text: todo.text, check: !todo.check } : todo)

  todos = todos.map(todo => todo.id === id ? { ...todo, check: !todo.check } : todo)

  uncheckedCountSpan.textContent = todos.filter(todo => !todo.check).length;
  render()
}