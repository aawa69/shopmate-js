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
    e.preventDefault();
    this.event = e.currentTarget.id; // set event
    if (this.eventTest) return; // exit when just a test

    this.updateExistingFromEvent(e.currentTarget.id, this.COUNT_UP);
  };

  // eslint-disable-next-line no-unused-vars
  this.countDown = (e) => {
    e.preventDefault();
    this.event = e.currentTarget.id; // set event
    if (this.eventTest) return; // exit when just a test

    this.updateExistingFromEvent(e.currentTarget.id, this.COUNT_DOWN);
  };

  // eslint-disable-next-line no-unused-vars
  this.editItem = (e) => {
    e.preventDefault();
    this.event = e.currentTarget.id; // set event
    // eslint-disable-next-line no-useless-return
    if (this.eventTest) return; // exit when just a test
  };

  // eslint-disable-next-line no-unused-vars
  this.deleteItem = (e) => {
    e.preventDefault();
    this.event = e.currentTarget.id;
    // eslint-disable-next-line no-useless-return
    if (this.eventTest) return; // exit when just a test
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
    const selectedItem = iSelectedItem.substr(0, iSelectedItem.indexOf("-"));
    this.outputExisting(selectedItem, iAction);
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

      switch (iAction) {
        case this.COUNT_UP:
          existingItem.count += 1;
          break;
        default:
          existingItem.count -= 1;
      }

      document.getElementById(`${existingItem.item}No`).innerHTML = ` ${existingItem.count} `; // update count in DOM

      this.updateLocalStorage();

      this.successInfo(`Item ${this.itemText(existingItem.item)} has been incremented in your list`);
    } catch (e) {
      this.logError("outputExisting", e);
    }
    return true;
  };

  /* Get the item text for output */
  this.outputGroceryItem = (iItem) => {
    try {
      const text = this.itemText(iItem.item);

      this.list.innerHTML += `  
      <!-- item: start -->
      <article class="grocery-item">
        <div class="count-container">
          <button id="${iItem.item}-count-up" class="count-up-btn" type="button">
            <i class="fa fa-plus"></i>
          </button>
          <button id="${iItem.item}-count-down" class="count-down-btn" type="button">
            <i class="fa fa-minus"></i>
          </button>
        </div>
        <p class="title" id="${iItem.item}"><span id="${iItem.item}No"> ${iItem.count} </span>${text}</p>
        <!-- edit / delete item buttons-->
        <div class="btn-container">
          <button id="${iItem.item}-edit" class="edit-btn" type="button">
            <i class="fas fa-edit"></i>
          </button>
          <button id="${iItem.item}-delete" class="delete-btn" type="button">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </article>
      <!-- item: end -->`;

      // set during testing - quit if false
      if (!this.setItemEvents) return;

      const events = [
        { event: "count-up", action: this.countUp },
        { event: "count-down", action: this.countDown },
        { event: "edit", action: this.editItem },
        { event: "delete", action: this.deleteItem },
      ];

      events.forEach((ev) => {
        const event = `${iItem.item}-${ev.event}`;
        document.getElementById(event).addEventListener("click", ev.action);
      });
    } catch (e) {
      this.logError("outputGroceryItem", e);
    }
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
