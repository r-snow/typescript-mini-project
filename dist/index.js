"use strict";
const btn = document.getElementById("btn");
const input = document.getElementById("todoinput");
const form = document.querySelector("form");
const list = document.getElementById("todolist");
// created a data structure for local storage
const todos = readTodos();
todos.forEach(createTodo);
// return contents of local storage
function readTodos() {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
}
// update local storage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
// creates todo and adds to local storage, clears input
function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
        text: input.value,
        status: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
    saveTodos();
    input.value = "";
}
// adds todo to DOM
function createTodo(todo) {
    const newLI = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.status;
    checkbox.addEventListener("change", function () {
        todo.status = checkbox.checked;
        saveTodos();
    });
    newLI.append(todo.text);
    newLI.append(checkbox);
    list.append(newLI);
}
form.addEventListener("submit", handleSubmit);
