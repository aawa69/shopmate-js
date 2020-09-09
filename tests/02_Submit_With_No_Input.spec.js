/* eslint-disable import/extensions */
/* eslint-env jest */
/* eslint-disable no-debugger */
import ToDo from "../src/class.js";
import { formControl, container, unloadEvents } from "./utils/setup.js";

const setInputHTML = (iItems = "", iInput = "") => {
  document.body.innerHTML = formControl + container;
  const todo = new ToDo();
  todo.setInitial(iItems);
  todo.setItemEvents = false;
  todo.setEventListeners();
  todo.setDisplay();

  document.getElementById("grocery").value = iInput;
  const submitBtn = document.getElementById("submit");
  submitBtn.click();
  return todo;
};

describe("--- TEST: SUBMIT WITH NO INPUT ---", () => {
  // eslint-disable-next-line quotes
  const items = '[{"item":"EGGS","count":3},{"item":"TOMATOES","count":1}]';
  const gc = setInputHTML(items, "");

  it("should display 'Enter an item to add'", () => {
    const text = gc.userInfo.textContent;
    expect(text).toEqual("Enter an item to add");
  });

  const classes = gc.userInfo.classList;

  it("should show message as an error, i.e. in red'", () => {
    expect(classes.contains("userInfo-success")).toBeFalsy();
    expect(classes.contains("userInfo-error")).toBeTruthy();
  });
  afterAll(() => unloadEvents(gc));
});
