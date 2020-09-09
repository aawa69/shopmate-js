/* eslint-env jest */

/* For reference ... example item output
      <!-- item: start -->
      <article class="grocery-item">
        <div class="count-container">
          <button id="EGGS-count-up" class="count-up-btn" type="button">
            <i class="fa fa-plus"></i>
          </button>
          <button id="EGGS-count-down" class="count-down-btn" type="button">
            <i class="fa fa-minus"></i>
          </button>
        </div>
        <p class="title" id="EGGS"><span id="EGGSNo"> 1 </span>Eggs</p>
        <!-- edit / delete item buttons-->
        <div class="btn-container">
          <button id="EGGS-edit" class="edit-btn" type="button">
            <i class="fas fa-edit"></i>
          </button>
          <button id="EGGS-delete" class="delete-btn" type="button">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </article>
      <!-- item: end -->
      <!-- item: start -->
      <article class="grocery-item">
        <div class="count-container">
          <button id="TOMATOES-count-up" class="count-up-btn" type="button">
            <i class="fa fa-plus"></i>
          </button>
          <button id="TOMATOES-count-down" class="count-down-btn" type="button">
            <i class="fa fa-minus"></i>
          </button>
        </div>
        <p class="title" id="TOMATOES"><span id="TOMATOESNo"> 1 </span>Tomatoes</p>
        <!-- edit / delete item buttons-->
        <div class="btn-container">
          <button id="TOMATOES-edit" class="edit-btn" type="button">
            <i class="fas fa-edit"></i>
          </button>
          <button id="TOMATOES-delete" class="delete-btn" type="button">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </article>
      <!-- item: end -->
*/

export const formControl = `
    <div class="form-control">
        <p class="userInfo"></p>
        <input type="text" id="grocery" placeholder="e.g. eggs" />
        <button id="submit" class="submit-btn" type="submit">add</button>
    </div>
`;

export const container = `
    <div id="container" class="grocery-container">
      <div class="grocery-list"></div>
      <button id="clear" class="clear-btn" type="button">clear items</button>
    </div>
`;

export const unloadEvents = (gc) => {
  const items = gc.getGroceryItems();
  if (!items || !items.length) return;

  const events = [
    { event: "count-up", action: gc.countUp },
    { event: "count-down", action: gc.countDown },
    { event: "edit", action: gc.editItem },
    { event: "delete", action: gc.deleteItem },
  ];

  items.forEach((item) => {
    events.forEach((ev) => {
      const event = `${item.item}-${ev.event}`;
      // const action = ev.action();
      document.getElementById(event).removeEventListener("click", ev.action);
    });
  });
};

export let localStorageItems = {}; // eslint-disable-line import/no-mutable-exports

export const localStorageMock = {
  getItem: jest.fn().mockImplementation((key) => localStorageItems[key]),
  setItem: jest.fn().mockImplementation((key, value) => {
    localStorageItems[key] = value;
  }),
  clear: jest.fn().mockImplementation(() => {
    localStorageItems = {};
  }),
  removeItem: jest.fn().mockImplementation((key) => {
    localStorageItems[key] = undefined;
  }),
};
