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

describe("--- TEST: EDIT SHOPPING LIST ITEM ---", () => {
  it.only("should render item 2 as 'Tomatoes' (DOM) before update", () => {
    gc.setDisplay();
    const { body } = document;
    expect(body.innerHTML).not.toEqual("");

    const textBefore = document.getElementById("TOMATOES").textContent;
    expect(textBefore).toEqual("Tomatoes");
  });

  it("should check Eggs (array) has count 1 before increment", () => {
    expect(gc.itemsArray[0].count).toEqual(3);
  });

  it("should execute the 'count-down' event for item Eggs ", () => {
    const countDownBtn = document.getElementById("EGGS-count-down");
    countDownBtn.addEventListener("click", gc.countDown);
    gc.eventTest = true;

    countDownBtn.click();
    expect(gc.event).toEqual("EGGS-count-down");
  });

  it("should check Eggs (DOM) has count of 2 after increment", () => {
    gc.updateExistingFromEvent("EGGS-count-down", gc.COUNT_DOWN);
    const numAfter = document.getElementById("EGGSNo").textContent.replace(/\s+/g, "");
    expect(numAfter).toEqual("2");
  });

  it("should check Eggs (array) has count 2 after increment", () => {
    expect(gc.itemsArray[0].count).toEqual(2);
  });

  it("should display message 'Item Eggs has been decremented in your list'", () => {
    const text = gc.userInfo.textContent;
    expect(text).toEqual("Item Eggs has been decremented in your list");
  });
  afterAll(() => unloadEvents(gc));
});
