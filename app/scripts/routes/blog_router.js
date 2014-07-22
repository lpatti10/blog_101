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

	// TIM'S ZOMBIE FIX
	// initialize: function () {
	// 	this.appView = new AppView();
	// },


	//HOME PAGE VIEW AS FEED/LIST
	home: function () {
		new ListView({ collection: all_posts });

		// TIM'S ZOMBIE FIX
		// this.appView.showView(listView);
	},

	//NEW FULL POST VIEW
	single_post: function (id) {
		// alert("Loading Post " + id);
		new SingleView({ postid: id, collection: all_posts });

		// TIM'S ZOMBIE FIX
		// this.appView.showView(editView);
	}

});