// This is a view of all of my blog posts
// I've decided this will also be my home page, but that is defined in my route
var ListView = Backbone.View.extend({

  // Parent element only (vs. jQ) where all events are happening. 
  el: ".hero-unit",

  events: {
    
     "submit #formID": "submitForm",
  // "click #submitBtn": "submitForm",
     "click .post_title": "seeFullpost",
     "click .delete": "omitPost"
  },

  initialize: function () {
    this.render(); // This will run the `render` function below
    this.collection.on('change', this.render, this); // This watches my collection for when I add/update a whiskey
    this.collection.on('destroy', this.render, this);
  },

  //Render page data
  render: function(){
    //Pass data to template
    var template = Handlebars.compile($('#post_feed').html()); // Grabs my handlebars temlate from my index.html file.
    var rendered = template({ posts: this.collection.toJSON() }); // Renders out a block of HTML to be used in my code
    this.$el.find(".post_list ul").html(rendered);
    
    //EXPERIMENTAL
    $(".full_post").hide();
    
    return this;
  },


  submitForm: function (event){
    event.preventDefault(); // Prevents the default click event
    event.stopPropagation(); // Helps stop the bubbling up effect
    var item_clicked = $(event.currentTarget); // Gets the object I clicked
    var post_id = item_clicked.attr('id'); // ?? Gets the ID of that object
    var post = this.collection.get(post_id); // ?? Gets the instance of my model with the ID

    //Grabs all form data and defines variables for each to use below = new instance of your model 
    var temp_post = new Post({
      title:  $("#title").val(),
      content: $("#content").val(),
      author:  $("#author").val(),
      tags: $("#tags").val(),
      // tags: tags.replace(/\s+/g, '').split(','),
      status: "Published",
      date: new Date().toJSON().slice(0,10)
    });
   console.log("adding and saving")
    all_posts.add(temp_post).save();

    //Clears form upon submit
    this.$el.find( '#formID' ).trigger( 'reset' );
    // $(this).trigger('reset');
  },


  seeFullpost: function (event){ 
    console.log("Prompting full post view");
    event.preventDefault();
    event.stopPropagation();

    // These 2 lines, get my ID and then route to my URL with the ID in it
    // My router then sees that and runs the proper function based on the routes I set up.
    var post_id = $(event.target).attr('id');
    window.router_instance.navigate('#post/'+post_id, { trigger: true });
  },     


  omitPost: function (event){
    console.log("Prompting delete post");
    event.preventDefault();
    event.stopPropagation();

    // var post_id = $(event.target).attr('id');
    // var omit = this.collection.get($('.post_id').val());
    // post_id.destroy({success: function (){
    //   window.router_instance.navigate("", { trigger: true });  
    // }});
    if (window.confirm("Are you sure?")) {
      this.post.destroy({success: function () { 
        window.router_instance.navigate("", { trigger: true }); // E.T. Phone Home (route me home)
      }});
    }
  }

});

    // Navigating using backbone...Defined in main.js = "appr" stands for "app router" = global variable in js by attaching to window "window.appr"
    // window.appr.navigate($(event.target).attr('href'), { trigger: true});












