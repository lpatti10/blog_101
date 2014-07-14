var Post = Backbone.Model.extend({
	title: "", 
  content: "", 
  date: "", 
  status: "", 
  author: "", 
  tags: [],

  idattribute: "_id" ,

  initialize: function (){
  	console.log("a new post has been submitted.");
  }
});






var Feed = Backbone.Collection.extend({

    model: Post,
    url: "http://tiy-atl-fe-server.herokuapp.com/collections/laura_blog"
});

var all_posts = new Feed();
var ListView = Backbone.View.extend({

	tagName: "li",

	className: "",

	el: $('.post_collection ul'),

	initialize: function () {
		this.render();
		this.collection.on('change', this.render, this);
		this.collection.on('destroy', this.render, this);
	},

	render: function(){
		var rendered = Handlebars.templates.post({posts: this.collection.toJSON()});
			this.$el.html(renedered);
			return this;
	},
	
});







console.log('Can you hear me?');




// //MAIN.js ........................

all_posts.fetch().done(function () {
	new ListView( { collection: all_posts } );
});
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['post'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });
})();