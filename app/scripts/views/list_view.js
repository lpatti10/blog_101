// This is a view of all of my blog posts
// I've decided this will also be my home page, but that is defined in my route
var ListView = Backbone.View.extend({

  events: {
    
     "submit #formID": "submitForm",
     "click .post_title": "seeFullpost",
     "click .delete": "omitPost"
  },

  //EXPERIMENTING with 'attrs' param and first line call...
  initialize: function () {
    var self = this;
    App.all_posts = new Feed();
    App.all_posts.query = new Parse.Query(Post);
  
    // this.options = attrs;
    App.all_posts.query.equalTo('user', App.currentUser);
    App.all_posts.on('change', this.render, this); // This watches my collection for when I add/update a post
    App.all_posts.on('destroy', this.render, this); // This watches my collection for when I delete a post
    App.all_posts.on('add', this.render, this); // 'Change' doesn't watch for 'adds'
    App.all_posts.fetch().done( function () {
      self.render(); // This will run the `render` function below
    });
  }, 
  

  //Render page data
  render: function(){
    //Pass data to template
    var template = Handlebars.compile($('#post_feed').html()); // Grabs my handlebars temlate from my index.html file.
    var rendered = template({ posts: App.all_posts.toJSON() }); // Renders out a block of HTML to be used in my code
    // this.$el.find(".post_list ul").html(rendered);
    this.$el.html(rendered); 

    //EXPERIMENTAL WEDNESDAY TO ATTEMPT REPAIR OF BACK BUTTON
    $(".hero-unit").show();

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


    //GREELEY'S VARIATION OF ABOVE LINE:
    // var post = this.collection.get(attributes.post_id);
      // 1. creating a variable ... a local 'this' mapped var = this.post
      // 2. Looking into my collection with this.collection
      // 3. Using BB's 'get' method to get model
      // 4. Using object passed in 'attributes' to drill down our id 'attributes.id'
      // 5. returns 'this.post' = our specific model from our url

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

// Save your Parse Object
  
    temp_post.save(null, {
      success: function(temp_post) {
        // Adds to my collection
        all_posts.add(temp_post);
        // Resets my form 
        $( '#formID' ).trigger( 'reset' );

        // $(this).trigger('reset');
        // $('.modal-window').removeClass('modal-open');
      }
    });

    // all_posts.add(temp_post);
    
  //Clears form upon submit
    // this.$el.find( '#formID' ).trigger( 'reset' );
   
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
    event.preventDefault();
    event.stopPropagation();
    console.log("Prompting delete post");

    if (window.confirm("Are you sure?")) {
      console.log("Delete pressed");

      //Specifically the x needs id
      var x_id = $(event.currentTarget).attr('id');
        console.log("Grabbed ID of X button");

      var omit = this.collection.get(x_id);
        console.log("Getting");
      
      omit.destroy({success: function (){
        window.router_instance.navigate("", { trigger: true }); // (route back home)
      }});

    }
  }
});

    // Navigating using backbone...Defined in main.js = "appr" stands for "app router" = global variable in js by attaching to window "window.appr"
    // window.appr.navigate($(event.target).attr('href'), { trigger: true});














