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

	// ZOMBIE FIX : INSTANCE VARIABLE "ONLY EVER CREATING ONE"
  initialize: function () {
    this.appView = new AppView();
  },

	//HOME PAGE VIEW AS FEED/LIST
	home: function () {
		var list_view = new ListView({ collection: all_posts });
		// ZOMBIE FIX : CALLING METHOD OF SHOWVIEW ON INSTANCE OF APPVIEW
		this.appView.showView(list_view);
		//SEE TIM'S NEW UPDATED METHOD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	},

	//NEW FULL POST VIEW
	single_post: function (id) {
		// alert("Loading Post " + id);
		var post_single_view = new SingleView({ postid: id, collection: all_posts });
		// ZOMBIE FIX
		this.appView.showView(post_single_view);
		//SEE TIM'S NEW UPDATED METHOD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	}

});