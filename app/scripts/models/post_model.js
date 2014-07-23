// TIM'S VALIDATION HERE



var Post =  Parse.Object.extend({
	
  // Class name (data base table) needed for Parse "what we will be saving to Parse database table."" (Could also be set up in view: give el a class name)
  className: 'BlogItem',

  idAttribute: "objectId" ,

  defaults: {
    title: "", 
    content: "", 
    date: "", 
    status: "", 
    author: "", 
    tags: []

  },
  
  initialize: function (){
  	console.log("A new post has been submitted!");
  }

});