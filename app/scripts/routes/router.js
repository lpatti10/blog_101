//Class sample code:

	var PostRouter = Backbone.Router.extend({
		routes: {
			//2 ROUTES: DEFAULT/HOME, POST "PAGE"
			' ': 'home',
			//"posts is defining what URL & will appear in this route"
			//Calling /:id allows us to pass it in to function below
			"posts/:id": 'single_post'
		},
		//HOME PAGE VIEW
		home: function () {
			new ListView({ collection: all_posts });
		},
		//NEW VIEW
		single_post: function (id) {
			alert("Loading Post " + id);
			new SingleView({ collection: all_posts, postid: id});
		}
	});



	//Create an instance
	// var post_router = new PostRouter;

	//Start Backbone History ...almost like a "watch" function
	// Backbone.history.start();



// 	//Gist sample code. Passing Data from Router to View

// var PostRoute = Backbone.Router.extend({
 
//   routes: {
//     'posts/:id' : 'single_post'
//   },
 
//   single_post: function (id) {
//     new PostSingle({ postid: id });
//   }
 
// });