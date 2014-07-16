


//Class sample code:

	var PostRouter = Backbone.Router.extend({
		routes: {
			' ': 'home',
			"posts/:id": 'single_post'
		},

		home: function () {
			new ListView({ collection: all_posts });
		},

		single_post: function (id) {
			alert("Loading Post " + id);
			new SingleView({ collection: all_posts, postid: id});
		}
	});

//FETCH data and initiate router and start history watch
	all_posts.fetch().done( function (){

		WINDOW.APPR = NEW POSTROUTE();
		BACKBONE.HISTORY.START();
	})

	//Create an instance
	// var post_router = new PostRouter;

	//Start Backbone History ...almost like a "watch" function
	Backbone.history.start();



// 	//Gist sample code. Passing Data from Router to View

// var PostRoute = Backbone.Router.extend({
 
//   routes: {
//     'posts/:id' : 'single_post'
//   },
 
//   single_post: function (id) {
//     new PostSingle({ postid: id });
//   }
 
// });