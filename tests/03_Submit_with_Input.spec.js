/* eslint-disable import/extensions */
/* eslint-env jest */
/* eslint-disable no-debugger */
import ToDo from "../src/class.js";
import { formControl, container, unloadEvents } from "./utils/setup.js";

const setInputHTML = (iItems = "", iInput = "", iSetNull = false) => {
  document.body.innerHTML = formControl + container;
  const todo = new ToDo();
  todo.setInitial(iItems, iSetNull);
  todo.setItemEvents = false;
  todo.setEventListeners();
  todo.setDisplay();

  document.getElementById("grocery").value = iInput;
  const submitBtn = document.getElementById("submit");
  submitBtn.click();
  return todo;
};

describe("--- TEST: SUBMISSION WITH INPUT ---", () => {
  describe("- Input of 'eggs' and submit:", () => {
    const gc = setInputHTML(null, "eggs", true);

    // eslint-disable-next-line quotes
    const expected = [{ item: "EGGS", count: 1 }];

    it("should display 'Item Eggs has been added to your list'", () => {
      const text = gc.userInfo.textContent;
      expect(text).toEqual("Item Eggs has been added to your list");
    });

    it("should add Eggs with count 1 to internal array'", () => {
      const array = gc.getGroceryItems();
      expect(array).toEqual(expect.arrayContaining(expected));
    });

    it("should add 1 item to the DOM to display", () => {
      const articles = document.getElementsByClassName("grocery-item");
      expect(articles.length).toEqual(1);
    });

    it("should un-hide the grocery items container", () => {
      const gcContainer = document.getElementById("container");
      const showContainer = gcContainer.classList.contains("show-container");
      expect(showContainer).toBeTruthy();
    });

    it("should write a single 'Eggs' item to local storage", () => {
      const items = localStorage.getItem("items");
      const array = items !== null && items.length > 0 ? JSON.parse(items) : [];
      expect(array.length).toEqual(1);
      expect(array).toEqual(expect.arrayContaining(expected));
    });
    afterAll(() => unloadEvents(gc));
  });
});
