// Storage controller for end
// item controller for local data
// UI controller anthing to do for ui
// Main app controller where everyhting meets init functions and eventlisteners

// Storage Controller
const StorageCtrl = (function () {
  // PUBLIC METHODS

  // First is to store items to local Storage
  return {
    storeItem: function (item) {
      let items;

      // first turn to string to store in data
      // Check if any items in LOCAL STORAGE
      if (localStorage.getItem('items') === null) {
        items = [];

        // Push new item
        items.push(item);

        // Set LOCAL STORAGE
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // If theres something in here/ GET WHATS IN LOCAL STORAGE
        items = JSON.parse(localStorage.getItem('items'));

        // Push new item
        items.push(item);

        // Reset LOCAL STORAGE
        localStorage.setItem('items', JSON.stringify(items));
      }
    },

    getItemsFromStorage: function () {
      let items;

      if (localStorage.getItem('items') === null) {
        // if nothing in items set to empty array
        items = [];
      } else {
        // else items is set to json.parse
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },

    updateItemStorage: function (updatedItem) {
      // pull from ls
      let items = JSON.parse(localStorage.getItem('items'));

      // loop throuh items
      items.forEach(function (item, index) {
        // if id is === to current id we splice it out/remove
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items))
    },

    deleteItemFromStorage: function (id) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function (item, index) {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items))
    },

    clearItemsFromStorage: function () {
      localStorage.removeItem('items');
    }

  }

})();




// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Create Data Structure / State
  const data = {
    // items: [
    //   {
    //     id: 0,
    //     name: 'Steak Dinner',
    //     calories: 1200
    //   },
    //   {
    //     id: 1,
    //     name: 'Cookie',
    //     calories: 400
    //   },
    //   {
    //     id: 2,
    //     name: 'Eggs',
    //     calories: 300
    //   }
    // ],
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  }

  // have to return cause its private and cant see above
  // Public methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      let ID;
      // Create / Generate ID 
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1
      } else {
        ID = 0;
      }

      // take number and parse it cause its a string first
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Add/push newItem to itemConstructor/data structure arr
      data.items.push(newItem)

      return newItem;
    },
    getItemById: function (id) {
      // loop through items and match id
      let found = null;

      // loop through items
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updateItem: function (name, calories) {
      // Turn calories into numbers through parse
      calories = parseInt(calories)

      let found = null;

      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function (id) {
      // Get ids
      const ids = data.items.map(function (item) {
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id)

      // Splice/Remove item from array
      data.items.splice(index, 1);

    },
    clearAllItems: function () {
      data.items = [];
    },
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
    },
    getTotalCalories: function () {
      let total = 0;

      // loop through items and add calories
      data.items.forEach(function (item) {
        total += item.calories;
      });

      // Set total calories in data structure
      data.totalCalories = total;

      // return total calories
      return data.totalCalories;

    },
    logData: function () {
      return data;
    }
  }

})();



// UI controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
  }

  // Public Methods
  return {
    populateItemList: function (items) {
      let html = '';

      items.forEach(function (item) {
        // append 
        html += `
        <li id="item-${item.id}" class="collection-item">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="far fa-edit edit-item "></i>
          </a>
        </li>`;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      // return object with name and calories
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function (item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';

      // Create li element
      const li = document.createElement('li');

      // add class to li
      li.className = 'collection-item';

      // Add dynamic ID
      li.id = `item-${item.id}`;

      // Add HTML
      li.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="far fa-edit edit-item "></i>
        </a>
      `;

      // Insert Item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
    },
    updateItem: function (item) {
      // get list items from the DOM
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn Node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function (listItem) {
        const itemID = listItem.getAttribute('id');

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="far fa-edit edit-item "></i>
        </a>
      `;
        }
      })
    },
    deleteListItem: function (id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID)
      item.remove();
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    removeItems: function () {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node list into array
      listItems = Array.from(listItems);

      // Loop through array for clearing task
      listItems.forEach(function (item) {
        item.remove();
      })
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function () {
      // make sure fields are clear
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    // make selectors public to use in App loadEL
    getSelectors: function () {
      return UISelectors;
    }
  }

})();




// App Controller
const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
  // console.log(ItemCtrl.logData()); // shoes data {}
  // return init method

  // Load event Listeners
  const loadEventListeners = function () {
    // Get UI Selectors from UICtrl made public
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);


    // DISABLE SUBMIT ON ENTER
    document.addEventListener('keypress', function (e) {
      // Check if enter key is pressed
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }

    })


    // EDIT INCON CLICK EVENT
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);


    // Update Item Event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);


    // Delete Item Event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);


    // Back Button Event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

    // Clear Items Event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);

  }

  // Add item submit
  const itemAddSubmit = function (e) {
    // Check if input has values
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // make sure were getting caloriesitems and name
    // console.log(input);

    // Check for name and calorie input
    if (input.name !== '' && input.calories !== '') {

      // Add item... and need after to update ui
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem)

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);


      // Store in LOCAL STORAGE
      StorageCtrl.storeItem(newItem);// newitem comes from above input.?

      // Clear fields after submission
      UICtrl.clearInput();

    }

    e.preventDefault();
  }


  // Click edit item
  const itemEditClick = function (e) {
    // target the edit icon only
    if (e.target.classList.contains('edit-item')) {
      // Get list item ID (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      // gets list id in the mark up
      // console.log(listId);

      // Break into an array / split to item and number
      const listIdArr = listId.split('-')

      // console.log(listIdArr);

      // Get the actual ID and we want it to be a number
      const id = parseInt(listIdArr[1]); // gives actual item id


      // Get entire object / item
      const itemToEdit = ItemCtrl.getItemById(id);

      // console.log(itemToEdit);


      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form to edit
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  }

  // UPDATE ITEM SUBMIT
  const itemUpdateSubmit = function (e) {
    // console.log('update');

    // Get item input
    const input = UICtrl.getItemInput();

    // Update Item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI
    UICtrl.updateItem(updatedItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // UPDATE LOCAL STORAGE
    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();

    e.preventDefault();
  }


  // Delete button event
  const itemDeleteSubmit = function (e) {
    // console.log(123);

    // Get current item id
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id)

    // Delete from ui/html
    UICtrl.deleteListItem(currentItem.id)

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // DELET FROM LOCAL STORAGE
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    UICtrl.clearEditState();

    e.preventDefault();
  }


  // CLEAR ALL ITEMS EVENTS
  const clearAllItemsClick = function () {
    // Delete all items from data structure
    ItemCtrl.clearAllItems();

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories)

    // Remove from UI
    UICtrl.removeItems();


    // CLEAR FROM LOCAL STORAGE
    StorageCtrl.clearItemsFromStorage();


    // Hide ul list underline when everything is cleared
    UICtrl.hideList();

  }




  // Public methods
  return {
    init: function () {
      // Clear edit state / set initial set
      UICtrl.clearEditState();

      // console.log('Initializing App...');
      // fetch items from data structures
      const items = ItemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items)
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Load event listener from this function
      loadEventListeners()

    }
  }


})(ItemCtrl, StorageCtrl, UICtrl);



// Initialize App
App.init()























