import ToDo from "./class.js";

/* ---------------------------------------------- */
//                   M A I N
/* ---------------------------------------------- */

// import GroceryList from "./grocery.js";

// eslint-disable-next-line quotes
// const setItems = '[{"item":"EGGS","count":3},{"item":"TOMATOES","count":1}]';
const todo = new ToDo();
todo.setInitial();
todo.setEventListeners();
todo.setDisplay();

// const editBtn = document.querySelector(".edit-btn");
// const deleteBtn = document.querySelector(".delete-btn");
// const clearBtn = document.querySelector(".clear-btn");

// const list.setGroceryItems(items);
// list.setDisplay(); // re-display

// const groceryItems = list.getGroceryItems();
// eslint-disable-next-line no-console
// console.log(groceryItems);
