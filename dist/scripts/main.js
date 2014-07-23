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

var Feed = Parse.Collection.extend({

    model: Post,
    // url: "http://tiy-atl-fe-server.herokuapp.com/collections/laura_blog"
    // url: "http://tiy-atl-fe-server.herokuapp.com/collections/laura_blog2"
    
});
// This is a view of all of my blog posts
// I've decided this will also be my home page, but that is defined in my route
var ListView = Backbone.View.extend({

  // Parent element only (vs. jQ) where all events are happening. 
  el: ".hero-unit",

  events: {
    
     "submit #formID": "submitForm",
     "click .post_title": "seeFullpost",
     "click .delete": "omitPost"
  },

  //EXPERIMENTING with 'attrs' param and first line call...
  initialize: function (attrs) {
    this.options = attrs;
    this.render(); // This will run the `render` function below
    this.collection.on('change', this.render, this); // This watches my collection for when I add/update a post
    this.collection.on('destroy', this.render, this); // This watches my collection for when I delete a post
    this.collection.on('add', this.render, this); // 'Change' doesn't watch for 'adds'
  }, 
  

  //Render page data
  render: function(){
    //Pass data to template
    var template = Handlebars.compile($('#post_feed').html()); // Grabs my handlebars temlate from my index.html file.
    var rendered = template({ posts: this.collection.toJSON() }); // Renders out a block of HTML to be used in my code
    this.$el.find(".post_list ul").html(rendered);
    
    //EXPERIMENTAL
    $(".full_post").hide();
    
    return this;
  },


  submitForm: function (event){
    event.preventDefault(); // Prevents the default click event
    event.stopPropagation(); // Helps stop the bubbling up effect
    var item_clicked = $(event.currentTarget); // Gets the object I clicked
    var post_id = item_clicked.attr('id'); // ?? Gets the ID of that object
    
    var post = this.collection.get(post_id); // ?? Gets the instance of my model with the ID


    //GREELEY'S VARIATION OF ABOVE LINE:
    // var post = this.collection.get(attributes.post_id);
      // 1. creating a variable ... a local 'this' mapped var = this.post
      // 2. Looking into my collection with this.collection
      // 3. Using BB's 'get' method to get model
      // 4. Using object passed in 'attributes' to drill down our id 'attributes.id'
      // 5. returns 'this.post' = our specific model from our url

    //Grabs all form data and defines variables for each to use below = new instance of your model 
    var temp_post = new Post({
      title:  $("#title").val(),
      content: $("#content").val(),
      author:  $("#author").val(),
      tags: $("#tags").val(),
      // tags: tags.replace(/\s+/g, '').split(','),
      status: "Published",
      date: new Date().toJSON().slice(0,10)
    });
    console.log("adding and saving")

// Save your Parse Object
  
    temp_post.save(null, {
      success: function(temp_post) {
        // Adds to my collection
        all_posts.add(temp_post);
        // Resets my form 
        $( '#formID' ).trigger( 'reset' );

        // $(this).trigger('reset');
        // $('.modal-window').removeClass('modal-open');
      }
    });

    // all_posts.add(temp_post);
    
  //Clears form upon submit
    // this.$el.find( '#formID' ).trigger( 'reset' );
   
  },


  seeFullpost: function (event){ 
    console.log("Prompting full post view");
    event.preventDefault();
    event.stopPropagation();

    // These 2 lines, get my ID and then route to my URL with the ID in it
    // My router then sees that and runs the proper function based on the routes I set up.
    var post_id = $(event.target).attr('id');

    window.router_instance.navigate('#post/'+post_id, { trigger: true });
  },     


  omitPost: function (event){
    event.preventDefault();
    event.stopPropagation();
    console.log("Prompting delete post");

    if (window.confirm("Are you sure?")) {
      console.log("Delete pressed");

      //Specifically the x needs id
      var x_id = $(event.currentTarget).attr('id');
        console.log("Grabbed ID of X button");

      var omit = this.collection.get(x_id);
        console.log("Getting");
      
      omit.destroy({success: function (){
        window.router_instance.navigate("", { trigger: true }); // (route back home)
      }});

    }
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
  // ... it is now reusable throughout this view.
	initialize: function (attrs) {
		//Also use this to set post properties if needed
		this.post = this.collection.get(attrs.postid);
		this.render();

		   
	},

	render: function () {
	


    var template = Handlebars.compile($('#post_single').html());

    var rendered = template(this.post.toJSON()); 
    this.$el.find("ul").html(rendered);
    
 
		
		$(".hero-unit").hide();
		$(".full_post").show();


		return this;


  },


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

	// ZOMBIE FIX 
  initialize: function () {
    this.appView = new AppView();
  },

	//HOME PAGE VIEW AS FEED/LIST
	home: function () {
		var list_view = new ListView({ collection: all_posts });
		// ZOMBIE FIX
		this.appView.showView(list_view);
	},

	//NEW FULL POST VIEW
	single_post: function (id) {
		// alert("Loading Post " + id);
		var post_single_view = new SingleView({ postid: id, collection: all_posts });
		// ZOMBIE FIX
		this.appView.showView(post_single_view);
	}

});
// Initialize Parse
Parse.initialize("EFaSOx8OMDQzadR62QT66Haedv7aTbjd70PaEDTU", "eIKnA5CTuTAmkv1DPi2AAWeVJC5dHyTJc9mPaoA2");


//Instance of collection
var all_posts = new Feed();




// Grab all my data from my server
// After it's complete, create a new view with data
all_posts.fetch().done( function (){
	//DEFINING POST ROUTER INSTANCE
	window.router_instance = new PostRouter();
	Backbone.history.start();
});


// ZOMBIE FIX 
var AppView = function (){

  this.showView = function(view) {
    if (this.currentView){
      this.currentView.remove();
    }

    this.currentView = view;
    this.currentView.render();

    $(".zombie_cont").html(this.currentView.el);
  }

}



//TIM'S ZOMBIE FIX
// var AppView = function (){

//   this.showView = function(view) {
//     if (this.currentView){
//       this.currentView.remove();
//     }

//     this.currentView = view;
//     this.currentView.render();

//     $(".whiskey_cont").html(this.currentView.el);
//   }

// }




//THIS IS HOME BUTTON .NAVIGATE ON CLICK FUNCTION AS GLOBAL NAV.

// $('header a').on('click', function (e) {
//  e.preventDefault();
//  window.appr.navigate("", {trigger: true});
// });






