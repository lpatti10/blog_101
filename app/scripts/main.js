all_posts.fetch().done( function (){
  new ListView({ collection: all_posts });
});









// $('header a').on('click', function (e) {
//  e.preventDefault();
//  window.appr.navigate("", {trigger: true});
// });








// Get and Compile My Template
// var template = Handlebars.compile($('#feed_template').html());
 
// Pass the `data` to my compiled template to render it
// var rendered = template(data);
 
// Choose a spot on my page and dump my rendered template HTML into it.
// $('.post_collection').html(rendered);