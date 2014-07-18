var Post = Backbone.Model.extend({
	
  idAttribute: "_id" ,

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

var Feed = Backbone.Collection.extend({

    model: Post,
    url: "http://tiy-atl-fe-server.herokuapp.com/collections/laura_blog"
    
});
// This is a view of all of my blog posts
// I've decided this will also be my home page, but that is defined in my route
var ListView = Backbone.View.extend({

  // Parent element only (vs. jQ) where all events are happening. 
  el: ".hero-unit",

  events: {
    
     "submit #formID": "submitForm",
  // "click #submitBtn": "submitForm",
     "click .post_title": "seeFullpost"
  },

  initialize: function () {
    this.render(); // This will run the `render` function below
    this.collection.on('change', this.render, this); // This watches my collection for when I add/update a whiskey
    // this.collection.on('destroy', this.render, this);
  },

  //Render page data
  render: function(){
    //Pass data to template
    var template = Handlebars.compile($('#post_feed').html()); // Grabs my handlebars temlate from my index.html file.
    var rendered = template({ posts: this.collection.toJSON() }); // Renders out a block of HTML to be used in my code
    // this.$el.next().html(''); // Empties out a container I don't need for this view
    // this.$el.html(rendered); // Throws my rendered data into my `el` using jQuery
    this.$el.find(".post_list ul").html(rendered);
    // this.$el.find(".full_post ul").show();
    return this;
  },


  submitForm: function (event){
    event.preventDefault(); // Prevents the default click event
    event.stopPropagation(); // Helps stop the bubbling up effect
    var item_clicked = $(event.currentTarget); // Gets the object I clicked
    var post_id = item_clicked.attr('id'); // ?? Gets the ID of that object
    var post = this.collection.get(post_id); // ?? Gets the instance of my model with the ID

    //Grabs all form data and defines variables for each to use below = new instance of your model 
    var temp_post = new Post({
      title:  $("#title").val(),
      content: $("#content").val(),
      author:  $("#author").val(),
      tags: $("#tags").val(),
      //tags: tags.replace(/\s+/g, '').split(','),
      status: "Published",
      date: new Date().toJSON().slice(0,10)
    });
   
    all_posts.add(temp_post).save();

    //Clears form upon submit
    this.$el.find( '#formID' ).trigger( 'reset' );
    // $(this).trigger('reset');
  },


  seeFullpost: function (event){ 
    console.log("Prompting full post view");
    event.preventDefault();
    event.stopPropagation();

    // These 2 lines, get my ID and then route to my URL with the ID in it
    // My router then sees that and runs the proper function based on the routes I set up.
    var post_id = $(event.target).attr('id');
    window.router_instance.navigate('#post/'+post_id, {trigger: true});
  }     


});

    // Navigating using backbone...Defined in main.js = "appr" stands for "app router" = global variable in js by attaching to window "window.appr"
    // window.appr.navigate($(event.target).attr('href'), { trigger: true});














var SingleView = Backbone.View.extend ({
	
	//Parent element created below hero in index.html: ONLY ONE MAIN EL PER VIEW!!
	el: '.full_post',

	// events: {
	// 	//may need a back/home/close event to return?????
	// },

 	// My initialize function
  // Notice it takes attributes that I've passed in (from my router)
  // I then am setting my "this.whiskey" to equal the postid I passed in
  // ... and more specifically to the whiskey object model I want to work with
  // ... it is now reusable throuout this view.
	initialize: function (attrs) {
		console.log("testing");
		//Also use this to set post properties if needed
		this.post = this.collection.get(attrs.postid);
		this.render();
	},

	render: function () {

		// var p = this.collection.findWhere({_id: this.options.postid });
    var template = Handlebars.compile($('#post_single').html());
    var rendered = template(this.post.toJSON()); // here is `this.whiskey` again :)
    // this.$el.prev().html('');
    // this.$el.html(rendered);
    this.$el.find("ul").html(rendered);
    console.log(rendered);
		return this;

  //   //Experimental ...
		// $(".post_list").hide();

  //   this.$el.find(".full_post ul").html(rendered);
  //   this.$el.find(".full_post ul").show();
  //   return this;
  },

	// render: function (options) {
	// 	var p = this.collection.findWhere({_id: this.options.postid });
	// 	// var template = Handlebars.compile($('#post_template_single').html());
	// 	// var rendered = template(p.toJSON());
 //    var rendered = Handlebars.templates.fullpost({post: this.collection.toJSON()});
	// 	this.$el.find(".fullpost-unit ul").html(rendered);
	// 	return this;
	// }


});

// This is my router. It will react to the URL I visit and run a function based on that
// Right now I only have 2, but I could easily add a lot more.
// Also, both trigger a new view instance currently

var PostRouter = Backbone.Router.extend({

	// Defining my Routes
	routes: {
		//2 ROUTES: DEFAULT/HOME, POST "PAGE"
		'': 'home',
		//"posts is defining what URL & will appear in this route"
		//Calling /:id allows us to pass it in to function below
		"post/:id": 'single_post'
	},

	//HOME PAGE VIEW AS FEED/LIST
	home: function () {
		new ListView({ collection: all_posts });
	},

	//NEW FULL POST VIEW
	single_post: function (id) {
		alert("Loading Post " + id);
		new SingleView({ postid: id, collection: all_posts });
	}

});
//Instance of collection
var all_posts = new Feed();


// Grab all my data from my server
// After it's complete, create a new view with data
all_posts.fetch().done( function (){

//DEFINE POST ROUTER INSTANCE
window.router_instance = new PostRouter();
Backbone.history.start();
});



//FETCH data and initiate router and start history watch
	// all_posts.fetch().done( function (){

	// 	window.appr = new PostRouter();
	// 	Backbone.history.start();
	// })

// $('.post_title').on('click', function (e) {
//  e.preventDefault();
//  window.appr.navigate("", {trigger: true});
// });


//THIS IS HOME BUTTON .NAVIGATE ON CLICK FUNCTION AS GLOBAL NAV.

// $('header a').on('click', function (e) {
//  e.preventDefault();
//  window.appr.navigate("", {trigger: true});
// });






