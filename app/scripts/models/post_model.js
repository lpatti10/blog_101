var Post = Backbone.Model.extend({
	defaults: {
    title: "", 
    content: "", 
    date: "", 
    status: "", 
    author: "", 
    tags: [],

  },
  
  idattribute: "_id" ,

  initialize: function (){
  	console.log("A new post has been submitted!");
  }

});




