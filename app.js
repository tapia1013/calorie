// Storage controller for end
// item controller for local data
// UI controller anthing to do for ui
// Main app controller where everyhting meets init functions and eventlisteners

// Storage Controller

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
    items: [
      {
        id: 0,
        name: 'Steak Dinner',
        calories: 1200
      },
      {
        id: 1,
        name: 'Cookie',
        calories: 400
      },
      {
        id: 2,
        name: 'Eggs',
        calories: 300
      },
    ],
    currentItem: null,
    totalCalories: 0
  }

  // have to return cause its private and cant see above
  // Public methods
  return {
    logData: function () {
      return data;
    }
  }

})();



// UI controller
const UICtrl = (function () {

  // Public Methods
  return {

  }

})();




// App Controller
const App = (function (ItemCtrl, UICtrl) {
  // console.log(ItemCtrl.logData()); // shoes data {}
  // return init method

  // Public methods
  return {
    init: function () {
      console.log('Initializing App...');

    }
  }


})(ItemCtrl, UICtrl);



// Initialize App
App.init()























