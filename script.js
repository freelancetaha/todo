const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputValue");
const btn = document.querySelector(".btn");

// Retrieve todo list from local storage
const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("ProgrammingTodoList")) || [];
};

// Initialize the todo list
let localTodoLists = getTodoListFromLocal();

// Add a todo element dynamically to the DOM
const addTodoDynamicElement = (curElem) => {
  const divElement = document.createElement("div");
  divElement.classList.add("main_todo_div");
  divElement.innerHTML = `
        <div class='created'>
            <li class='created_li'>${curElem}</li> 
            <button class='deleteBtn'>Delete</button>
        </div>
    `;
  mainTodoElem.append(divElement);

  // Add delete functionality
  const deleteBtn = divElement.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", () => {
    deleteTodo(curElem, divElement);
  });
};

// Add a new todo to the list
const addTodoList = (e) => {
  e.preventDefault();
  const todoListValue = inputValue.value.trim();

  // Validate input and check for duplicates
  if (todoListValue && !localTodoLists.includes(todoListValue)) {
    localTodoLists.push(todoListValue);
    localStorage.setItem("ProgrammingTodoList", JSON.stringify(localTodoLists));

    addTodoDynamicElement(todoListValue);
    inputValue.value = ""; // Clear the input field
  } else {
    alert("Invalid or duplicate todo!");
  }
};

// Display the todo list on page load
const showTodoList = () => {
  localTodoLists.forEach((curElem) => {
    addTodoDynamicElement(curElem);
  });
};

// Delete a todo item
const deleteTodo = (todoValue, divElement) => {
  localTodoLists = localTodoLists.filter((item) => item !== todoValue);
  localStorage.setItem("ProgrammingTodoList", JSON.stringify(localTodoLists));
  divElement.remove(); // Remove the item from the DOM
};

// Initialize the application
showTodoList();

btn.addEventListener("click", (e) => {
  addTodoList(e);
});
