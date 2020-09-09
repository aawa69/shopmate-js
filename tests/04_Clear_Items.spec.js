/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-env jest */
/* eslint-disable no-debugger */
import ToDo from "../src/class.js";
// eslint-disable-next-line no-unused-vars
import { formControl, container, unloadEvents } from "./utils/setup.js";

const setListHTML = (iItems = "") => {
  document.body.innerHTML = formControl + container;

  const todo = new ToDo();
  todo.setInitial(iItems);
  todo.setItemEvents = false;
  return todo;
};

describe("--- TEST: CLEAR GROCERY LIST ---", () => {
  // eslint-disable-next-line quotes
  const items = '[{"item":"EGGS","count":3},{"item":"TOMATOES","count":1}]';
  const gc = setListHTML(items);

  const clearBtn = document.getElementById("clear");
  gc.eventTest = true;

  clearBtn.addEventListener("click", gc.clearItems); // optional event test via param

  it("should execute the 'clear items' event and code ", () => {
    // document.querySelector(".clear-btn").removeEventListener("click", this.clearItems);
    clearBtn.click();
    expect(gc.event).toEqual("clear");
  });

  it("should check 2 items in DOM before removal", () => {
    gc.setDisplay();
    const articlesBefore = document.getElementsByClassName("grocery-item");
    expect(articlesBefore.length).toEqual(2);
  });

  it("should check item array has 2 items before initializing", () => {
    expect(gc.itemsArray.length).toEqual(2);
  });

  it("should show DOM list container before items removed", () => {
    const gcContainer = document.getElementById("container");
    const showContainer = gcContainer.classList.contains("show-container");
    expect(showContainer).toBeTruthy();
  });

  it("should check 0 items in DOM after removal", () => {
    gc.removeAllChildNodes(gc.list);
    const articlesAfter = document.getElementsByClassName("grocery-item");
    expect(articlesAfter.length).toEqual(0);
  });

  it("should check item array has 0 items after initializing", () => {
    gc.setGroceryItems(null);
    expect(gc.itemsArray.length).toEqual(0);
  });

  it("should hide DOM list container after items removed", () => {
    gc.toggleContainer();
    const gcContainer = document.getElementById("container");
    const showContainer = gcContainer.classList.contains("show-container");
    expect(showContainer).toBeFalsy();
  });

  // Object.defineProperty(window, "localStorage", {
  //  value: localStorageMock,
  // });

  it("should check local storage has 2 elements before delete", () => {
    localStorage.setItem("items", items);
    gc.setGroceryItems(localStorage.getItem("items"));
    const lsItems = gc.getGroceryItems();
    expect(lsItems.length).toEqual(2);
  });

  it("should check local storage is deleted", () => {
    gc.deleteLocalStorage("items");
    const lsItems = localStorage.getItem("items") || null;
    expect(lsItems).toBeNull();
  });

  it("should display message 'All items removed from list'", () => {
    gc.successInfo("All items removed from list");
    const text = gc.userInfo.textContent;
    expect(text).toEqual("All items removed from list");
  });
  afterAll(() => unloadEvents(gc));
});
