var ListView = Backbone.View.extend({

  // Parent element only(vs. jQ) where all events are happening.
  el: '.hero-unit',

  initialize: function () {
    this.render(); //runs render function below
    this.collection.on('change', this.render, this);
    this.collection.on('destroy', this.render, this);
  },

  events: {
     "submit #formID": "submitForm"
  },

//Render page data
  render: function(){
    //Pass data to template
    var rendered = Handlebars.templates.post({post: this.collection.toJSON()});
    this.$el.find(".post_collection ul").html(rendered);
    return this;
  },


  submitForm: function (event){
		event.preventDefault();
    console.log("I'm clicked");
    

	// Grab all form data 
    var temp_post,
    title = $('#title').val(),
    content = $('#content').val(),
    author = $('#author').val(),
    tags = $('#tags').val(),

	// Create new instance of your model (using variables above)
    temp_post = new Post({
      title: title,
      author: author,
      content: content,
      tags: tags.replace(/\s+/g, '').split(','),
      status: 'Published',
      date: new Date().toJSON().slice(0,10)
    });


	// Add new model instance to your collection
	// Save your model - this will save it to the database && re-render the page

  },
//on 
  all_posts.add(temp_post).save();

  this.$el.find( '#formID' ).trigger('reset')

  
});









