var Post =  Parse.Object.extend({
	
  // Class name (data base table) needed for Parse "what we will be saving to Parse database table."" (Could also be set up in view: give el a class name)
  className: 'BlogItem',

  // If no input is entered, messages will display...
  validate: function(attrs) {
    if(!attrs.title){
      return 'Please enter the name of a Sundays song.';
    }
    if(!attrs.content){
      return 'Please enter a snippet of song lyrics.';
    }
  },

  idAttribute: "objectId" ,

  defaults: {
    title: "", 
    content: "", 
    date: "", 
    status: "", 
    author: "", 
    tags: []
  },
  
  // initialize: function (){
  // 	console.log("A new post has been submitted!");
  // }

});