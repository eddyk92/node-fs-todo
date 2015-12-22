var fs = require('fs'); // builtin module, how do we know?


/* This is a class, even if it's not using a constructor function. Instead
   We are using the init function as a constructor.
*/
var TodoList = {

  /**
   * This function reads our todo list file, and if it's empty it initializes
   * such a file with a todo object.
   */
  init: function(){

  	this.todoFilePath = createFilePathFor('myTodo.json')
  //see if myTodo.json tasks are empty
  tasksStatus(this.todoFilePath, function(status, filepath){
  	if(status === 'empty'){
  		var emptyListString = '{"name": "myTodo" ,"tasks": []}';

  		//write the empty list to the file, and print any errors
  		fs.writeFile(filepath, emptyListString, function(err){
  			if(err)console.log(err);
  		});
  	}
  });

  },

  //print current todo list
  //function using array of items 


  list:function(cb){
  	//read myTodo.json
  	fs.readFile(TodoList.todoFilePath, 'utf8', function(err, data){
  		var tasks = JSON.parse(data).tasks;
  		var todo = JSON.parse(data);
  	})
  },

  //add unfinished tasks with description 
  //callback if provided

  addItem: function(itemDesc, cb){

  	fs.readFile(TodoList.todoFilePath, newData, function(err){
  		if(err)console.error(err);
 
 	 	console.log('wrote', newData, ' to ', TodoList.todoFilePath );

 	 	//the caller is not required to provide a callback
 	 	if(cb) cb();
 	 })
  })
},
//given itemNumber, toggle that item finished or unfinished, then callback

toogleItem: function(itemNumber, cb){
	TodoList.list(function(tasks, todo){

		if(tasks[itemNumber] !== undefined){
			console.log('Updating to-do item');
			//get the end result
			var completedStatus = tasks[itemNumber].completed
			tasks[itemNumber].completed = !completedStatus
		}
		else {
			console.log('To-list item number was not valid');
		}
		//update todo list
		todo.tasks = tasks;
		var updatedTodo = JSON.stringify(todo);

		//update todo.json
		fs.writeFile(TodoList.todoFilePath, updatedTodo, function(err){
			if(err) console.error(err);
		});
	});
},

//delete itemNumber if completed

removeItem: function(itemNumber, cb){
	TodoList.list(function(tasks, todo){
		//remove task
		if(todo.tasks[itemNumber] !== undefined){
			console.log('Removing item');
			todo.tasks.splice(itemNumber,1);
		}else{
			console.log("To-do item not valid");
		}

		var updateTodo = JSON.stringify(todo);

		//update myTodo.json 
		fs.writeFile(TodoList.todoFilePath, updateTodo, function(err){
				if(err)console.error(err);
			});
		});
	}
} 

//not member functions to list

function tasksStatus(tasksFile, cb){
	fs.readFile(tasksFile, 'utf8', function(err,data){
		if(err)console.error(err);

		var taskData = null;
		var status = null;
		var tasks= null;

		if(data === ''){
			status = 'empty';
		} else{
			tasks = JSON.parse(data).tasks
		}

		if(tasks === null){
			status = 'empty';
		} else{
			status = 'notEmpty'
		}

		cb(status,tasksFile);

	});
}


module.exports = TodoList;

