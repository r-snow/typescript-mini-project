interface Todo {
    text: string;
    status: boolean;
}

const btn = document.getElementById("btn")! as HTMLButtonElement;
const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("form")!;
const list = document.getElementById("todolist")!;

// created a data structure for local storage
const todos: Todo[] = readTodos();
todos.forEach(createTodo);

// return contents of local storage
function readTodos(): Todo[] {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON === null) return [];
    return JSON.parse(todosJSON);
}

// update local storage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// creates todo and adds to local storage, clears input
function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const newTodo: Todo = {
        text: input.value,
        status: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);

    saveTodos();
    input.value = "";
}

// adds todo to DOM
function createTodo(todo: Todo) {
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
