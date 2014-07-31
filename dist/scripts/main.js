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

var Feed = Parse.Collection.extend({

    model: Post,
    // url: "http://tiy-atl-fe-server.herokuapp.com/collections/laura_blog"
    // url: "http://tiy-atl-fe-server.herokuapp.com/collections/laura_blog2"
    
});
var ValidationView = Parse.View.extend ({	
	// el: ".validation_forms",
	events: {
		"submit #signupForm" : "signUp",
		"submit #loginForm" : "logIn",	
	},

	initialize: function() {
		this.render();
	},

	////////////////////////////////////////////////////////////////

	render: function() {
		var template = Handlebars.compile($('#val_template').text());
		var rendered = template();
		$('.logged_in').hide();
		this.$el.html(rendered);
	},

	signUp: function(event) {
		event.preventDefault();
		var user,
			form = $(event.target),
			user_name = form.find('#signup_username').val(),
			user_password = form.find('#signup_password').val(),
					// user_password2 = form.find('input[name="password2"]').val();
					// Check for Password Match
					// if (user_password !== user_password2) return alert('Passwords do not match!');

		user = new Parse.User({
			username: user_name,
			password: user_password
		});
					
	user.signUp(null, {
	  success: function(user) {
	    alert('Welcome ' + user.get('username') + '!');
			App.currentUser = Parse.User.current();
			App.router.navigate('', {trigger: true});
			$('.logged_in').show();
	  },
	  error: function(user, error) {
	    alert("Error: " + error.message);
			form.trigger('reset');
	  }
	});

},

////////////////////////////////////////////////////////////////
userLogin: function (event) {
		event.preventDefault();
		var form = $(event.target),
				user_name = form.find('#login_username').val(),
				user_password = form.find('#login_password').val();

		Parse.User.logIn(user_name, user_password, {
		  success: function(user) {
		    alert('Welcome Back ' + user.get('username') + '!');
				App.currentUser = Parse.User.current();
				App.router.navigate('', {trigger: true});
				$('.logged_in').show();
		  },
		  error: function(user, error) {
		    alert("Error: " + error.message);
				form.trigger('reset');
		  }
		});
	}

});
// 	logIn: function(event) {
// 		var self = this;
// 		var username = this.$("#login_username").val();
// 		var password = this.$("#login_password").val();


// 		Parse.User.logIn(username, password, {

// 			success: function(user) {
// 	    	new UserView();
// 	    	// FROM TODO EXAMPLE
// 	    	self.undelegateEvents();
// 	    	delete self;
// 	  	},
// 	  	error: function(user, error) {
// 		    alert("Error: " + error.code + " " + error.message);
//     	}
//     });

//       $(this).trigger('reset');

//   },
// });

		// var username = this.$("#signup_username").val();
		// var password = this.$("#signup_password").val();			
		// user.set("username", "username")
		// console.log('gotcha username');
		// user.set("password", "password")
		// console.log('gotcha password');	


		// Parse.User.signUp(username, password, {

		// 	success: function(user) {
	 //    	new UserView();
	 //    	// FROM TODO EXAMPLE
	 //    	self.undelegateEvents();
	 //    	delete self;
	 //  	},
	 //  	error: function(user, error) {
		//     alert("Error: " + error.code + " " + error.message);
  //     }
  //   });

  //     $(this).trigger('reset');

  // },

// This is a view of all of my blog posts
// I've decided this will also be my home page, but that is defined in my route
var ListView = Backbone.View.extend({

  events: {
    
     "submit #formID": "submitForm",
     "click .post_title": "seeFullpost",
     "click .delete": "omitPost"
  },

  //EXPERIMENTING with 'attrs' param and first line call...
  initialize: function () {
    var self = this;
    App.all_posts = new Feed();
    App.all_posts.query = new Parse.Query(Post);
  
    // this.options = attrs;
    App.all_posts.query.equalTo('user', App.currentUser);
    App.all_posts.on('change', this.render, this); // This watches my collection for when I add/update a post
    App.all_posts.on('destroy', this.render, this); // This watches my collection for when I delete a post
    App.all_posts.on('add', this.render, this); // 'Change' doesn't watch for 'adds'
    App.all_posts.fetch().done( function () {
      self.render(); // This will run the `render` function below
    });
  }, 
  

  //Render page data
  render: function(){
    //Pass data to template
    var template = Handlebars.compile($('#post_feed').html()); // Grabs my handlebars temlate from my index.html file.
    var rendered = template({ posts: App.all_posts.toJSON() }); // Renders out a block of HTML to be used in my code
    // this.$el.find(".post_list ul").html(rendered);
    this.$el.html(rendered); 

    //EXPERIMENTAL WEDNESDAY TO ATTEMPT REPAIR OF BACK BUTTON
    $(".hero-unit").show();

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
		
		'': 'home', //ListView
		'post/:id': 'single_post', //SingleView
		// 'user' : 'user_validate' //ValidationView
	},

	// ZOMBIE FIX : INSTANCE VARIABLE "ONLY EVER CREATING ONE"
  initialize: function () {
    this.appView = new App.View();
  },

	//HOME PAGE VIEW AS FEED/LIST
	home: function () {
		// if(!App.currentUser) return App.router.navigate('user', {trigger: true});
		
		// showUser(App.currentUser);  ?????????????????????????????????????????????????????
		// var list_view = new ListView({ collection: all_posts });
		var list_view = new ListView();

		// ZOMBIE FIX : CALLING METHOD OF SHOWVIEW ON INSTANCE OF APPVIEW
		this.appView.showView(list_view);

	},

	//NEW FULL POST VIEW
	single_post: function (id) {
		// alert("Loading Post " + id);
		var post_single_view = new SingleView({ postid: id, collection: all_posts });
		// ZOMBIE FIX
		this.appView.showView(post_single_view);

	},

	user_validate: function () {
		if(App.currentUser) return App.router.navigate('', {trigger: true});
		// New instance of Validation View
		var val = new ValidationView();
		this.appView.showView(val);
	}

});
// Initialize Parse
Parse.initialize("EFaSOx8OMDQzadR62QT66Haedv7aTbjd70PaEDTU", "eIKnA5CTuTAmkv1DPi2AAWeVJC5dHyTJc9mPaoA2");

//INITIALIZE APP
var App = {};

//CHECK FOR USER
App.currentUser = Parse.User.current();

//MANAGING APP VIEWS
App.View = function (){
  this.showView = function(view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;
    this.currentView.render();
    $('.post_list ul').html(this.currentView.el);
  }
}

//SCRIPT TO UPDATE USER FIELD
// var showUser = function(user) {
//   var name = user.get('username'); //???????????????????????????? .get of null ???????? 
//   $('.profile').text(name);            
// };

//"FIRE UP" + START LISTENING
App.router = new PostRouter();
Backbone.history.start();

// //CREATE A NEW POST  ???????????????????????????????
// $('#formID').on('submit', function (event) {
//   event.preventDefault();
  
//   //NEW INSTANCE OF POST MODEL??????????????????????
//   var temp_post = new Post();

//   //SET PROPERTIES  ???????????????????????????????????
//   var validate = temp_post.set({
//     title:  $("#title").val(),
//     content: $("#content").val(),
//     author:  $("#author").val(),
//     tags: $("#tags").val(),
//     // tags: tags.replace(/\s+/g, '').split(','),
//     status: "Published",
//     date: new Date().toJSON().slice(0,10),    
//     user: App.currentUser
//   }, {validate: true});

//   // SAVE POST
//   if(validate !== false) {
//     temp_post.setACL(new Parse.ACL(Parse.User.current()));
//     temp_post.save(null, {
//       success: function(temp_post) {
//         // Adds to my collection
//         App.all_posts.add(temp_post);
//         // Resets my form - skadoosh
//         $(this).trigger('reset');
//       }
//     });
//   } else {
//     alert('You must fill out all fields!');
//   }

// });

//LOGOUT ??????????????????????????????????????????
$('.logout').on('click', function () {      
console.log("clicked")

  Parse.User.logout();
  App.currentUser = Parse.User.current();
  App.router.navigate('user', {trigger: true});
});




//????????????????????????????????????????????????????????????




// // Grab all my data from my server
// // After it's complete, create a new view with data
// all_posts.fetch().done( function (){
// 	//DEFINING POST ROUTER INSTANCE
// 	window.router_instance = new PostRouter();
// 	Backbone.history.start();
// });


// // ZOMBIE FIX 
// var AppView = function (){

// // IS CURRENT VIEW AVAILABLE??
//   this.showView = function(view) {
//     if (this.currentView){
//       // IF THERE'S A CURRENT VIEW, REMOVE IT
//       this.currentView.remove();
//     }

//     this.currentView = view;
//     this.currentView.render();

//     $(".zombie_cont").html(this.currentView.el);
//   }

// }







