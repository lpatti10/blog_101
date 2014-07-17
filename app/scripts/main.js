

all_posts.fetch().done( function (){
  new ListView({ collection: all_posts });
});


$('header a').on('click', function (e) {
 e.preventDefault();
 window.appr.navigate("", {trigger: true});
});


//THIS IS WHERE TIM PUT HIS HOME BUTTON .NAVIGATE ON CLICK FUNCTION AS GLOBAL NAV.

// $('header a').on('click', function (e) {
//  e.preventDefault();
//  window.appr.navigate("", {trigger: true});
// });








// // Grab all my data from my server
// // After it's complete, create a new view with data
// whiskey_list.fetch().done( function (){
//   new WhiskeyListView({ collection: whiskey_list });
// });



// Get and Compile My Template
// var template = Handlebars.compile($('#feed_template').html());
 
// Pass the `data` to my compiled template to render it
// var rendered = template(data);
 
// Choose a spot on my page and dump my rendered template HTML into it.
// $('.post_collection').html(rendered);