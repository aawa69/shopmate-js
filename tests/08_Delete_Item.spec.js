/* eslint-disable no-param-reassign */
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

// eslint-disable-next-line quotes
const items = '[{"item":"EGGS","count":3},{"item":"TOMATOES","count":2},{"item":"BREAD","count":1}]';
const gc = setListHTML(items);

describe("--- TEST: DELETE SHOPPING LIST ITEM ---", () => {
  describe("- Before item removal:", () => {
    it("should render item 2 as 'Tomatoes' (DOM)", () => {
      gc.setDisplay();
      const { body } = document;
      expect(body.innerHTML).not.toEqual("");

      const textBefore = document.getElementById("TOMATOES").textContent;
      expect(textBefore).toEqual("Tomatoes");
    });

    it("should check Tomatoes (array) has count 2", () => {
      expect(gc.itemsArray[1].count).toEqual(2);
    });
  });

  describe("- On Delete:", () => {
    beforeAll(() => {
      const deleteBtn = document.getElementById("TOMATOES-delete");
      deleteBtn.addEventListener("click", gc.deleteItem);
      gc.eventTest = true; // test event only
      deleteBtn.click();
    });

    it("should fire 'delete' event", () => {
      expect(gc.event).toEqual("TOMATOES-delete");
    });
  });

  describe("- After Delete:", () => {
    beforeAll(() => {
      gc.eventTest = false;
      gc.removeExisting("TOMATOES");
    });

    it("should have removed 'Tomatoes' (DOM)", () => {
      const tomatoes = document.getElementById("TOMATOES") || null;
      expect(tomatoes).toBeNull();
    });

    it("should have removed 'Tomatoes' (array)", () => {
      const tomatoes = gc.itemsArray.find((item) => item.item === "TOMATOES") || null;
      expect(tomatoes).toBeNull();
    });

    it("should output 'Tomatoes has been removed from your list'", () => {
      const text = gc.userInfo.textContent;
      expect(text).toEqual("Tomatoes has been removed from your list");
    });
  });
  afterAll(() => unloadEvents(gc));
});
