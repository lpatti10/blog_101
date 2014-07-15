//Gist sample code. Passing Data from Router to View

var PostRoute = Backbone.Router.extend({
 
  routes: {
    'posts/:id' : 'single_post'
  },
 
  single_post: function (id) {
    new PostSingle({ postid: id });
  }
 
});


//Class sample code:

	var PostRouter = Backbone.Router.extend({
		routes: {
			'': 'home',
			"posts/:id": 'single_post'
		},

		home: function () {
			new PostView({ collection: all_posts });
		},

		single_post: function (id) {
			alert("Loading Post " + id);
			new PostSingle({ collection: all_posts, postid: id});
		}
	});

//Fetch data and initiate router and start history watch

	//Create an instance
	var post_router = new PostRouter;

	//Start Backbone History ...almost like a "watch" function
	Backbone.history.start();