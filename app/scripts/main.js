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






