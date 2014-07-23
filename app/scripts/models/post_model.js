// TIM'S VALIDATION HERE



var Post =  Parse.Object.extend({
	
  // Class name (data base table) needed for Parse
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