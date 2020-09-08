/* eslint-disable import/extensions */
/* eslint-disable no-debugger */
import ToDo from "../src/class.js";
import { container } from "./utils/setup.js";

const setItemHTML = (iItems) => {
  document.body.innerHTML = container;
  const todo = new ToDo();
  todo.setInitial(iItems);
  todo.setDisplay();
};

describe("--- TEST: INITIAL DISPLAY OF GROCERY ITEMS ---", () => {
  // eslint-disable-next-line quotes
  const items = '[{"item":"EGGS","count":3},{"item":"TOMATOES","count":1}]';

  const gc = new ToDo();
  gc.setInitial(items);

  // Test instance creation
  describe("- Creating a grocery list with 2 items:", () => {
    it("should have 2 items, Eggs and Tomatoes", () => {
      const array = gc.getGroceryItems();
      const expected = JSON.parse(items);
      expect(array).toEqual(expect.arrayContaining(expected));
    });
  });

  // Initial display
  describe("- Initial display of grocery list in DOM:", () => {
    it("should be empty if no items to display", () => {
      setItemHTML(undefined);
      const articles = document.getElementsByClassName("grocery-item");
      expect(articles.length).toEqual(0);
    });

    it("should have 2 items to display", () => {
      setItemHTML(items);
      const articles = document.getElementsByClassName("grocery-item");
      expect(articles.length).toEqual(2);
    });

    it("should display item 'Eggs' with a count of 3", () => {
      const paragraph = document.getElementById("EGGS");
      expect(paragraph.textContent).toEqual(" 3 Eggs");
    });

    it("'Eggs' item should have an edit and delete button", () => {
      const editBtn = document.getElementById("EGGS-edit");
      const deleteBtn = document.getElementById("EGGS-delete");
      expect(editBtn).toBeTruthy();
      expect(deleteBtn).toBeTruthy();
    });

    it("should display 'Tomatoes' with a count of 1", () => {
      const paragraph = document.getElementById("TOMATOES");
      expect(paragraph.textContent).toEqual(" 1 Tomatoes");
    });

    it("'Tomatoes' item should have an edit and delete button", () => {
      const editBtn = document.getElementById("TOMATOES-edit");
      const deleteBtn = document.getElementById("TOMATOES-delete");
      expect(editBtn).toBeTruthy();
      expect(deleteBtn).toBeTruthy();
    });
  });
});
