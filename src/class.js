/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
export default function ToDo() {
  this.inputItem = "";
  this.userInfo = "";
  this.container = null;
  this.list = null;
  this.items = null;
  this.itemsArray = null;
  this.submitBtn = null;
  this.clearBtn = null;
  this.event = "";
  this.COUNT_UP = "UP";
  this.COUNT_DOWN = "DOWN";

  // Use for testing
  this.setItemEvents = true;
  this.eventTest = false;

  this.getGroceryItems = () => {
    return this.itemsArray;
  };

  this.setGroceryItems = (iItems) => {
    this.itemsArray = iItems !== null && iItems.length > 0 ? JSON.parse(iItems) : [];
  };

  this.setInitial = (iItems, iSetNull) => {
    const itemsOrLS = iItems || localStorage.getItem("items");
    this.items = iSetNull ? null : itemsOrLS; // allow for manual set of null (unit  testing)
    this.setGroceryItems(this.items);

    this.inputItem = "";
    this.userInfo = document.querySelector(".userInfo");
    this.container = document.querySelector(".grocery-container");
    this.list = document.querySelector(".grocery-list");

    this.submitBtn = document.querySelector(".submit-btn");
    this.clearBtn = document.querySelector(".clear-btn");
  };

  this.logError = (func, err) => {
    // eslint-disable-next-line no-console
    console.log(`Function: ${func} - ${err.message}`);
  };

  this.itemText = (text) => {
    return text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : text;
  };

  this.countUp = (e) => {
    if (!this.eventTestOnly(e)) {
      this.updateExistingFromEvent(e.currentTarget.id, this.COUNT_UP);
    }
  };

  // eslint-disable-next-line no-unused-vars
  this.countDown = (e) => {
    if (!this.eventTestOnly(e)) {
      this.updateExistingFromEvent(e.currentTarget.id, this.COUNT_DOWN);
    }
  };

  this.editItem = (e) => {
    if (!this.eventTestOnly(e)) {
      this.editExistingFromEvent(e.currentTarget.id);
    }
  };

  // eslint-disable-next-line no-unused-vars
  this.saveItem = (e) => {
    if (!this.eventTestOnly(e)) {
      this.replaceExistingFromEvent(e.currentTarget.id);
    }
  };

  // eslint-disable-next-line no-unused-vars
  this.deleteItem = (e) => {
    if (!this.eventTestOnly(e)) {
      this.deleteItemFromEvent(e.currentTarget.id);
    }
  };

  this.eventTestOnly = (e) => {
    e.preventDefault();
    this.event = e.currentTarget.id;
    return this.eventTest; // exit when just a test
  };

  // Show success userInfo
  this.successInfo = (sMsg) => {
    try {
      this.userInfo.textContent = sMsg;
      this.userInfo.classList.add("userInfo-success");
      setTimeout(() => {
        this.userInfo.textContent = "";
        this.userInfo.classList.remove("userInfo-success");
      }, 5000);
    } catch (e) {
      this.logError("successInfo", e);
    }
  };

  // Show warning userInfo
  this.errorInfo = (eMsg) => {
    try {
      this.userInfo.textContent = eMsg;
      this.userInfo.classList.add("userInfo-error");
      setTimeout(() => {
        this.userInfo.textContent = "";
        this.userInfo.classList.remove("userInfo-error");
      }, 5000);
    } catch (e) {
      this.logError("errorInfo", e);
    }
  };

  this.clearUserInfo = () => {
    this.userInfo.classList.remove("userInfo-success", "userInfo-error");
    this.userInfo.textContent = "";
  };

  this.updateExistingFromEvent = (iSelectedItem, iAction) => {
    const selectedItem = this.getIdOfElement(iSelectedItem);
    this.outputExisting(selectedItem, iAction);
  };

  this.replaceExistingFromEvent = (iSelectedItem) => {
    const selectedItem = this.getIdOfElement(iSelectedItem);
    this.replaceExisting(selectedItem);
  };

  this.deleteItemFromEvent = (iSelectedItem) => {
    const selectedItem = this.getIdOfElement(iSelectedItem);
    this.removeExisting(selectedItem);
  };

  this.editExistingFromEvent = (iSelectedItem) => {
    const selectedItem = this.getIdOfElement(iSelectedItem);

    this.setEditable(selectedItem);
    this.toggleEditSave(selectedItem);
  };

  this.setEditable = (item) => {
    const element = document.getElementById(item);
    element.contentEditable = true;
    element.focus();
    element.classList.add("input");
  };

  this.toggleEditSave = (item) => {
    const editBtn = document.getElementById(`${item}-edit`);
    const saveBtn = document.getElementById(`${item}-save`);
    editBtn.classList.add("hide-btn");
    saveBtn.classList.remove("hide-btn");
  };

  this.getIdOfElement = (iElement) => {
    return iElement.substr(0, iElement.indexOf("-"));
  };

  // toggle display of the grocery list container
  this.toggleContainer = () => {
    try {
      if (!this.itemsArray.length) {
        this.container.classList.remove("show-container");
      } else if (!this.container.classList.contains("show-container")) {
        this.container.classList.add("show-container");
      }
    } catch (e) {
      this.logError("toggleContainer", e);
    }
  };

  /* Output for existing item - update the count */
  this.outputExisting = (iItem, iAction) => {
    try {
      const existingItem = this.itemsArray?.length ? this.itemsArray.find((item) => item.item === iItem) : null;
      if (!existingItem) return false;

      let actionMsg = "";

      switch (iAction) {
        case this.COUNT_UP:
          existingItem.count += 1;
          actionMsg = "incremented";
          break;
        default:
          existingItem.count -= 1;
          actionMsg = "decremented";
      }

      document.getElementById(`${existingItem.item}No`).innerHTML = `${existingItem.count}`; // update count in DOM

      this.updateLocalStorage();

      this.successInfo(`Item ${this.itemText(existingItem.item)} has been ${actionMsg} in your list`);
    } catch (e) {
      this.logError("outputExisting", e);
    }
    return true;
  };

  this.replaceExisting = (iItem) => {
    try {
      // retrieve the (existing) selected item detail from itemsArray
      const existing = this.findListItem(iItem);

      // this is an error
      if (!existing) throw new Error(`Item ${iItem} not found in itemsArray`);

      // get the new text
      const replaceItem = document.getElementById(iItem) || null;

      // nothing entered - userInfo and exit
      if (!replaceItem) {
        this.errorInfo("Please enter item text");
        return;
      }

      const item = replaceItem.textContent.toUpperCase();

      // create a new item and replace existing item with new one
      const newArticle = this.createArticle(item, existing.count);
      this.list.replaceChild(newArticle, this.list.childNodes[existing.index]);

      // generate button events for new item
      this.createArticleEvents(newArticle);

      // update the array and local storage
      this.itemsArray[existing.index] = { item, count: existing.count };
      this.updateLocalStorage();

      // message
      this.successInfo(`Item ${this.itemText(item)} has been updated in your list`);
    } catch (e) {
      this.logError("replaceExisting", e);
    }
  };

  this.removeExisting = (iItem) => {
    try {
      const existing = this.findListItem(iItem);

      if (!existing) throw new Error(`Item ${iItem} not found in itemsArray`);

      // remove from DOM, array & local storage
      this.list.removeChild(this.list.childNodes[existing.index]);
      this.itemsArray.splice(existing.index, 1);
      this.updateLocalStorage();

      // message
      this.successInfo(`${this.itemText(existing.item)} has been removed from your list`);
    } catch (e) {
      this.logError("removeExisting", e);
    }
  };

  /* Get the item text for output */
  this.outputGroceryItem = (iItem) => {
    try {
      const element = this.createArticle(iItem.item, iItem.count);
      this.createArticleEvents(element);
      this.list.appendChild(element);
    } catch (e) {
      this.logError("outputGroceryItem", e);
    }
  };

  this.createArticle = (id, count) => {
    const text = this.itemText(id);

    const element = document.createElement("article");
    const attr = document.createAttribute("id");

    attr.value = `${id}-article`;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");

    element.innerHTML = `
      <div class="count-container">
        <button id="${id}-count-up" class="count-up-btn" type="button">
          <i class="fa fa-plus"></i>
        </button>
        <button id="${id}-count-down" class="count-down-btn" type="button">
          <i class="fa fa-minus"></i>
        </button>
      </div>
      <p class="title">
        <span class="itemCount" id="${id}No">${count}</span>
        <span id="${id}">${text}</span>
      </p>
      <!-- edit / delete item buttons-->
      <div class="btn-container">
        <button id="${id}-save" class="save-btn hide-btn" type="button">
          <i class="fas fa-save"></i>
        </button>
        <button id="${id}-edit" class="edit-btn" type="button">
          <i class="fas fa-edit"></i>
        </button>
        <button id="${id}-delete" class="delete-btn" type="button">
          <i class="fas fa-trash"></i>
        </button>
      </div>`;

    return element;
  };

  this.createArticleEvents = (elem) => {
    if (!this.setItemEvents) return;

    const up = elem.querySelector(".count-up-btn");
    up.addEventListener("click", this.countUp);

    const down = elem.querySelector(".count-down-btn");
    down.addEventListener("click", this.countDown);

    const editBtn = elem.querySelector(".edit-btn");
    editBtn.addEventListener("click", this.editItem);

    const saveBtn = elem.querySelector(".save-btn");
    saveBtn.addEventListener("click", this.saveItem);

    const deleteBtn = elem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", this.deleteItem);
  };

  this.findListItem = (findThisItem) => {
    let foundItem = false;
    this.itemsArray.find((item, index) => {
      foundItem = { ...item, index };
      return item.item === findThisItem;
    });
    return foundItem;
  };

  /* Set the initial display of items (if any) */
  this.setDisplay = () => {
    try {
      const gcItems = this.getGroceryItems();
      if (!gcItems || !gcItems.length) return;

      gcItems.forEach((item) => this.outputGroceryItem(item));

      this.toggleContainer();
    } catch (e) {
      this.logError("setDisplay", e);
    }
  };

  /* Output for new item - new row */
  this.outputNew = (iItem) => {
    try {
      const newItem = { item: iItem, count: 1 };
      this.itemsArray.push(newItem);

      const newItemText = this.itemText(iItem);
      const displayItem = { ...newItem, text: newItemText };

      this.outputGroceryItem(displayItem);
      this.toggleContainer();
      this.updateLocalStorage();
      this.successInfo(`Item ${newItemText} has been added to your list`);
      document.getElementById("grocery").value = "";
    } catch (e) {
      this.logError("outputNew", e);
    }
  };

  // Add the input item to localStorage and the container
  this.addItem = (e) => {
    e.preventDefault();

    this.clearUserInfo();

    this.inputItem = document.getElementById("grocery").value.toUpperCase() || null;

    // nothing entered - userInfo and exit
    if (!this.inputItem) {
      this.errorInfo("Enter an item to add");
      return;
    }

    try {
      if (!this.outputExisting(this.inputItem, this.COUNT_UP)) {
        // output new item
        this.outputNew(this.inputItem);
      }
    } catch (err) {
      this.logError("addItem", err);
    }
  };

  this.updateLocalStorage = () => {
    localStorage.setItem("items", JSON.stringify(this.itemsArray));
  };

  this.removeAllChildNodes = (parent) => {
    try {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    } catch (err) {
      this.logError("removeAllChildNodes", err);
    }
  };

  this.deleteLocalStorage = (key) => {
    localStorage.removeItem(key);
  };

  // eslint-disable-next-line no-unused-vars
  this.clearItems = (e) => {
    e.preventDefault();
    this.event = e.currentTarget.id; // set event
    if (this.eventTest) return; // if a test - exit

    try {
      this.removeAllChildNodes(this.list); // remove children (the items) from DOM
      this.setGroceryItems(null);
      this.toggleContainer();
      this.deleteLocalStorage("items");

      this.successInfo("All items removed from list");
    } catch (err) {
      this.logError("clearItems", err);
    }
  };

  this.setEventListeners = () => {
    this.submitBtn.addEventListener("click", this.addItem);
    this.clearBtn.addEventListener("click", this.clearItems);
  };
}
