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

describe("--- TEST: EDIT SHOPPING LIST ITEM ---", () => {
  describe("- Before text update:", () => {
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

    it("should check 'Tomatoes' (element) is not editable", () => {
      const isEditable = document.getElementById("TOMATOES").isContentEditable;
      expect(isEditable).toBeFalsy();
    });
  });

  describe("- On Edit:", () => {
    beforeAll(() => {
      const editBtn = document.getElementById("TOMATOES-edit");
      editBtn.addEventListener("click", gc.editItem);
      gc.eventTest = true; // test event only
      editBtn.click();
    });

    it("should fire 'edit' event", () => {
      expect(gc.event).toEqual("TOMATOES-edit");
    });
  });

  describe("- During Edit:", () => {
    beforeAll(() => {
      gc.editExistingFromEvent("TOMATOES-edit");
    });

    it("should check 'Tomatoes' (element) is editable", () => {
      const tomatoes = document.getElementById("TOMATOES");
      expect(tomatoes).not.toBeNull();
      expect(tomatoes.contentEditable).toBe(true);
    });

    it("should check 'Tomatoes' (element) has the focus", () => {
      const editBtn = document.getElementById("TOMATOES");
      const classes = editBtn.classList;
      expect(classes.contains("input")).toBeTruthy();
    });

    it("should check 'edit' button hidden", () => {
      const editBtn = document.getElementById("TOMATOES-edit");
      const classes = editBtn.classList;
      expect(classes.contains("hide-btn")).toBeTruthy();
    });

    it("should check 'save' button displayed", () => {
      const saveBtn = document.getElementById("TOMATOES-save");
      const classes = saveBtn.classList;
      expect(classes.contains("hide-btn")).toBeFalsy();
    });
  });

  describe("- On Save event:", () => {
    beforeAll(() => {
      const saveBtn = document.getElementById("TOMATOES-save");
      gc.eventTest = true; // test event only
      saveBtn.addEventListener("click", gc.saveItem);
      saveBtn.click();
    });

    it("should fire 'save' event", () => {
      expect(gc.event).toEqual("TOMATOES-save");
    });
  });

  describe("- On blank input:", () => {
    beforeAll(() => {
      gc.eventTest = false;
      document.getElementById("TOMATOES").textContent = "";
      gc.replaceExistingFromEvent("TOMATOES");
    });

    it("should output 'Please enter item text' if item text blank on 'save'", () => {
      const text = gc.userInfo.textContent;
      expect(text).toEqual("Please enter item text");
      expect(gc.event).toEqual("TOMATOES-save");
    });
  });

  describe("- After Save:", () => {
    beforeAll(() => {
      gc.eventTest = false;
      document.getElementById("TOMATOES").textContent = "Salami";
      gc.replaceExisting("TOMATOES");
    });

    it("should have replaced 'Tomatoes' with 'Salami' (DOM)", () => {
      const tomatoes = document.getElementById("TOMATOES") || null;
      const salami = document.getElementById("SALAMI") || null;
      expect(tomatoes).toBeNull();
      expect(salami).not.toBeNull();
    });

    it("should check Salami exists (array) with same count as 'Tomatoes' (2)", () => {
      const salami = gc.itemsArray.find((item) => item.item === "SALAMI") || null;
      expect(salami).not.toBeNull();
      expect(salami.item).toEqual("SALAMI");
      expect(salami.count).toEqual(2);
    });

    it("should check Salami exists (array) in same position (second)", () => {
      expect(gc.itemsArray[1].item).toEqual("SALAMI");
    });

    it("should check Tomatoes does not exist (array)", () => {
      const tomatoes = gc.itemsArray.find((item) => item.item === "TOMATOES") || null;
      expect(tomatoes).toBeNull();
    });

    it("should check 'Salami' (element) is not editable", () => {
      const isEditable = document.getElementById("SALAMI").isContentEditable;
      expect(isEditable).toBeFalsy();
    });
  });
  afterAll(() => unloadEvents(gc));
});
