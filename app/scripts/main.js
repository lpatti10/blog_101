//Instance of collection
var all_posts = new Feed();


// Grab all my data from my server
// After it's complete, create a new view with data
all_posts.fetch().done( function (){
//DEFINING POST ROUTER INSTANCE
window.router_instance = new PostRouter();
Backbone.history.start();
});



//THIS IS HOME BUTTON .NAVIGATE ON CLICK FUNCTION AS GLOBAL NAV.

// $('header a').on('click', function (e) {
//  e.preventDefault();
//  window.appr.navigate("", {trigger: true});
// });






