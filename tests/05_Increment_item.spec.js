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
const items = '[{"item":"EGGS","count":3},{"item":"TOMATOES","count":1}]';
const gc = setListHTML(items);

describe("--- TEST: INCREMENT SHOPPING LIST ITEM ---", () => {
  it("should check Tomatoes (DOM) has count of 1 before increment", () => {
    gc.setDisplay();
    const { body } = document;
    expect(body.innerHTML).not.toEqual("");

    const numBefore = document.getElementById("TOMATOESNo").textContent.replace(/\s+/g, "");
    expect(numBefore).toEqual("1");
  });

  it("should check Tomatoes (array) has count 1 before increment", () => {
    expect(gc.itemsArray[1].count).toEqual(1);
  });

  it("should execute the 'count-up' event for item Tomatoes ", () => {
    const countUpBtn = document.getElementById("TOMATOES-count-up");
    countUpBtn.addEventListener("click", gc.countUp);
    gc.eventTest = true;

    countUpBtn.click();
    expect(gc.event).toEqual("TOMATOES-count-up");
  });

  it("should check Tomatoes (DOM) has count of 2 after increment", () => {
    gc.updateExistingFromEvent("TOMATOES-count-up", gc.COUNT_UP);
    const numAfter = document.getElementById("TOMATOESNo").textContent.replace(/\s+/g, "");
    expect(numAfter).toEqual("2");
  });

  it("should check Tomatoes (array) has count 2 after increment", () => {
    expect(gc.itemsArray[1].count).toEqual(2);
  });

  it("should display message 'Item Tomatoes has been incremented in your list'", () => {
    const text = gc.userInfo.textContent;
    expect(text).toEqual("Item Tomatoes has been incremented in your list");
  });
  afterAll(() => unloadEvents(gc));
});
