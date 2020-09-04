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

  //    this.#editBtn = document.querySelector(".edit-btn");
  //    this.#deleteBtn = document.querySelector(".delete-btn");

  this.logError = (err) => {
    // eslint-disable-next-line no-console
    console.log(err.message);
  };

  this.itemText = (text) => {
    return text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : text;
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
      this.logError(e);
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
      this.logError(e);
    }
  };

  this.clearUserInfo = () => {
    this.userInfo.classList.remove("userInfo-success", "userInfo-error");
    this.userInfo.textContent = "";
  };

  // toggle display of the grocery list container
  this.toggleContainer = () => {
    try {
      if (this.itemsArray.length === 0) {
        this.container.classList.remove("show-container");
      } else if (!this.container.classList.contains("show-container")) {
        this.container.classList.add("show-container");
      }
    } catch (e) {
      this.logError(e);
    }
  };

  /* Output for existing item - update the count */
  this.outputExisting = (item) => {
    try {
      const itemHTML = document.getElementById(item.item);
      const htmlItemNo = itemHTML.getElementById(`${item.item}No`);
      htmlItemNo.innerHTML = `(${item.count})`; // update count in DOM

      this.successInfo(`Item ${this.itemText(item.item)} has been incremented in your list`);
    } catch (e) {
      this.logError(e);
    }
  };

  this.editItem = (e) => {
    // TODO
    // eslint-disable-next-line no-console
    console.log(e);
  };

  this.deleteItem = (e) => {
    // TODO
    // eslint-disable-next-line no-console
    console.log(e);
  };

  /* Get the item text for output */
  this.outputGroceryItem = (iItem) => {
    try {
      const text = this.itemText(iItem.item);

      this.list.innerHTML += `  
      <!-- item: start -->
      <article class="grocery-item">
        <div class="count-container">
          <button id="count-up" class="count-up-btn" type="button">
            <i class="fa fa-plus"></i>
          </button>
          <button id="count-down" class="count-down-btn" type="button">
            <i class="fa fa-minus"></i>
          </button>
        </div>
        <p class="title" id="${iItem.item}">${text} <span id="${iItem.item}No">(${iItem.count})</span></p>
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

      document.getElementById(`${iItem.item}-edit`).addEventListener("click", this.editItem);
      document.getElementById(`${iItem.item}-delete`).addEventListener("click", this.deleteItem);
    } catch (e) {
      this.logError(e);
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
      this.logError(e);
    }
  };

  /* Output for new item - new row */
  this.outputNew = (item) => {
    try {
      const newItemText = this.itemText(item.item);
      const displayItem = { ...item, text: newItemText };

      this.outputGroceryItem(displayItem);
      this.toggleContainer();
      this.successInfo(`Item ${newItemText} has been added to your list`);
      document.getElementById("grocery").value = "";
    } catch (e) {
      this.logError(e);
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
      // get the number requested from LS and update
      // const exists = itemsArray && itemsArray.length ? itemsArray.find((item) item.item === this.inputItem) : null;
      const exists = this.itemsArray?.length ? this.itemsArray.find((item) => item.item === this.inputItem) : null;

      if (exists) {
        exists.count += 1;
        this.outputExisting(exists);
      } else {
        // new item
        const newItem = { item: this.inputItem, count: 1 };
        this.itemsArray.push(newItem);
        this.outputNew(newItem);
      }

      localStorage.setItem("items", JSON.stringify(this.itemsArray));
    } catch (err) {
      this.logError(err);
    }
  };

  this.removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  this.deleteLocalStorage = (key) => {
    localStorage.removeItem(key);
  };

  // eslint-disable-next-line no-unused-vars
  this.clearItems = (test = false, e) => {
    e.preventDefault();
    this.event = e.currentTarget.id; // set event
    if (test) return; // just exit when a test

    this.removeAllChildNodes(this.list); // remove children (the items) from DOM
    this.setGroceryItems(null);
    this.toggleContainer();
    this.deleteLocalStorage("items");

    this.successInfo("All items removed from list");
  };

  this.setEventListeners = () => {
    this.submitBtn.addEventListener("click", this.addItem);
    this.clearBtn.addEventListener("click", this.clearItems.bind(null, false));
  };
}
