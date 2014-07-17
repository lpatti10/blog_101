var Post = Backbone.Model.extend({
	
  idAttribute: "_id" ,

  defaults: {
    title: "", 
    content: "", 
    date: "", 
    status: "", 
    author: "", 
    tags: [],

  },
  
  initialize: function (){
  	console.log("A new post has been submitted!");
  }

});


// var Whiskey = Backbone.Model.extend({

//   idAttribute: '_id',

//   defaults: {
//     name: '',
//     description: '',
//     tried: false
//   }

// });




var Feed = Backbone.Collection.extend({

    model: Post,
    url: "http://tiy-atl-fe-server.herokuapp.com/collections/laura_blog"
});

var all_posts = new Feed();










// var WhiskeyCollection = Backbone.Collection.extend ({
//   model: Whiskey,
//   url: 'http://tiy-atl-fe-server.herokuapp.com/collections/whiskeyapp'
// });

// // Create an instance of my Collection
// var whiskey_list = new WhiskeyCollection();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['post'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n  <li>\n    <a href=\"#\" class=\"post_title\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n    <p>";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n    <small>";
  if (helper = helpers.author) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.author); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</small>\n    <small>";
  if (helper = helpers.date) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.date); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</small>\n    <a href=\"#\">";
  if (helper = helpers.tags) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.tags); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n  </li>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.post), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });
})();
//Set-up of listed blog posts as feed
var ListView = Backbone.View.extend({

  // Parent element only (vs. jQ) where all events are happening. 
  el: '.hero-unit',

  events: {
     "click .submitBtn": "submitForm",
     // "submit #formID": "submitForm"

     "click a.post_title": "seeFullpost" //h1.title a
  },

  initialize: function () {
    this.render();
    this.collection.on('change', this.render, this);
    this.collection.on('destroy', this.render, this);
  },

  //Render page data
  render: function(){
    //Pass data to template
    var rendered = Handlebars.templates.post({post: this.collection.toJSON()});
    this.$el.find(".post_collection ul").html(rendered);
    this.$el.find(".fullpost-unit ul").show();
    return this;
  },

  submitForm: function (event){
    event.preventDefault();
    console.log("I'm clicked");

    // Grab all form data and defining variables for each to use below and create new instance of your model 
    var temp_post = new Post({
      title:  $('#title').val(),
      content: $('#content').val(),
      author:  $('#author').val(),
      tags: $('#tags').val(),
      //tags: tags.replace(/\s+/g, '').split(','),
      status: 'Published',
      date: new Date().toJSON().slice(0,10)
    });
  },

  //Prevents default action like going to URL in this case
  // Navigating using backbone...Defined in main.js = "appr" stands for "app router" = global variable in js by attaching to window "window.appr"
  //trigger actual event

  seeFullpost: function (event){ 
    console.log("Promting full post view");
    event.preventDefault();
    window.appr.navigate($(event.target).attr('href'), { trigger: true});

    // Save your model; this will save it to the database and re-render the page
    all_posts.add(temp_post).save();

    // this.$el.find( '#formID' ).trigger( 'reset' );

  }

});













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