var Post = Backbone.Model.extend({
	
  idAttribute: "_id" ,

  defaults: {
    title: "", 
    content: "", 
    date: "", 
    status: "", 
    author: "", 
    tags: [],

  },
  
  initialize: function (){
  	console.log("A new post has been submitted!");
  }

});


// var Whiskey = Backbone.Model.extend({

//   idAttribute: '_id',

//   defaults: {
//     name: '',
//     description: '',
//     tried: false
//   }

// });


