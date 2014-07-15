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






var Feed = Backbone.Collection.extend({

    model: Post,
    url: "http://tiy-atl-fe-server.herokuapp.com/collections/laura_blog"
});

var all_posts = new Feed();
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










all_posts.fetch().done( function (){
  new PostView({ collection: all_posts });
});

$('header a').on('click', function (e) {
 e.preventDefault();
 window.appr.navigate("", {trigger: true});
});

// all_posts.fetch().done(function () {
// 	new ListView( { collection: all_posts } );
// });


// Get and Compile My Template
var template = Handlebars.compile($('#feed_template').html());
 
// Pass the `data` to my compiled template to render it
var rendered = template(data);
 
// Choose a spot on my page and dump my rendered template HTML into it.
$('.post_collection').html(rendered);
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['post'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });
})();