/* eslint-env jest */

/* For reference ... example item output
      <!-- item: start -->
      <article class="grocery-item">
        <p class="title" id="EGGS">Eggs <span id="EGGSNo">(1)</span></p>
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
        <p class="title" id="TOMATOES">Tomatoes <span id="TOMATOESNo">(1)</span></p>
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
