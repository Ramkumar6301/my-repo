let todoInput = document.querySelector(".input");
let addTodoButton = document.querySelector(".button");
let todo;
let showTodo = document.querySelector(".todo-container");
let localData = JSON.parse(localStorage.getItem("todo"))
let todoList = localData || [];

function uuid(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random()*16 | 0;
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
}

addTodoButton.addEventListener("click", (e)=>{
  e.preventDefault();
  todo=todoInput.value;
  if(todo.length>0){
    todoList.push({id: uuid(), todo, isCompleted: false})
  }
  renderTodoList(todoList);
  localStorage.setItem("todo",JSON.stringify(todoList));
  todoInput.value="";
})

showTodo.addEventListener("click", (e)=>{
  e.preventDefault();
  let key = e.target.dataset.key;
  let delKey = e.target.dataset.todokey;
  todoList = todoList.map(todo => todo.id === key ? {...todo, isCompleted: !todo.isCompleted} : todo);
  todoList = todoList.filter(todo => todo.id !== delKey)
  renderTodoList(todoList);
  localStorage.setItem("todo",JSON.stringify(todoList))
  console.log(todoList);
})

function renderTodoList(todoList){
  console.log(todoList);
  showTodo.innerHTML = todoList.map(({id, todo, isCompleted})=> `<div class="relative"><input id="item-${id}" type="checkbox" data-key=${id} ${isCompleted?"checked":""}><label 
  for="item-${id}" class="todo todo-text todo-pointer ${isCompleted? "checked": ""}" data-key=${id}>${todo}
  </label><button class="del-btn cursor" ><i><span data-todokey=${id} class="material-icons-outlined">
  delete
  </span></i></button></div>`).join("<br/>")
}
renderTodoList(todoList);