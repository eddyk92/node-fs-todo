var prompt = require('prompt');       // npm module, how do we know?
var TodoList = require('./todoList'); // file module, how do we know?

// initializes todo list file
TodoList.init()

console.log("Welcome to Command Line Todo!");
prompt.start();

// These are the things we can do
var options = {
  1: "addItem",
  2: "toggleItem",
  3: "listItems",
  4: "removeItem",
}

// Show the options menu
homePrompt();

// run a function in the runOption object based on what number the user enters
runOption = {
  addItem: function(){
    // show any tasks that exist
    TodoList.list(function(tasks){
      showTask(tasks);

      console.log("Add another to-do item");
      console.log("Enter a description for the new item");

    // Get user input for task description
     prompt.get( ['description'], function (err, result) {
       
        TodoList.addItem(result.description,function(){
          homePrompt();
        });
      
      });
    });
  },
 
    // Run a method on TodoList that adds a task
    toggleItem: function(){
      // show any tasks that exist
      TodoList.list(function(task){

        console.log("Toggle this item");
        // Get user input for which task to toggle
        console.log("Enter the item number you want to toggle");
        // Run a method on TodoList that toggles the task complete
        prompt.get(['itemNumber'], function(err, result){
        // Go back to the home prompt after
          homePrompt();
        });

      });
    }
},
 
  listItems: function(){
    // show any tasks that exist
    TodoList.list(function(tasks){
      showTasks(tasks);
      // Go back to the home prompt after
      homePrompt();
    })
  },

  removeItem: function(){
    // show any tasks that exist
    TodoList.list(function(tasks){
      showTasks(tasks);

     // Get user input for task to remove
     console.log("Remove Item");
     // Run a method on TodoList that removes the item
     console.log("Enter item number you want to delete");

     promt.get(['taskNumber'], function(err, result){
        
        TodoList.removeItem(result.taskNumber, function(){   
           // Go back to the home prompt after
          homePrompt();
        });
      });
    });
  }
}

function showMenu(){
  console.log("***********HOME**************");
  console.log("OPTIONS FOR LIST:");
  console.log("Please enter 1 - 4");
  Object.keys(options).forEach(function(option){
    console.log(option, " - ", options[option]);
  });
  console.log("***********HOME**************");
}

/**
 * This function is commonly used as a callback. We do this so that we can
 * show the home screen prompt after an asyc callback (which is how we must
 * fetch data using the fs module).
 */
function homePrompt(){
  showMenu();

  prompt.get( ['option'], function (err, result) {

    if (err) {
      console.log(err);
      return 1;
    }

    if (!options.hasOwnProperty(result.option) ) {
      // not a valid option
      console.error( 'please try again with 1 - 4');
    } else {
      console.log('\n You selected:', options[result.option], "\n");
      var userSelection = options[result.option]

      runOption[userSelection]();
    }

  });
}

//function to display to-do items
function showItems(itemsToShow){
  console.log("_____List Items_____");
  if (itemsToShow.length === 0){
      console.log("There are no items in your to-do list");
  }else {
    for (var i = 0; i < itemsToShow.length; i++){
      //start numbering from 1 
      console.log(i+':', itemsToShow[i].description,'| completed: ' + itemsToShow [i].completed);
    }
  }
}










