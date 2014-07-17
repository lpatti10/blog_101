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
    // this.collection.on('destroy', this.render, this);
  },

  //Render page data
  render: function(){
    //Pass data to template
    THIS.COLLECTION.SORT();
    VAR TEMPLATE = HANDLEBARS.COMPILE......DO NOT NEED???
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

      // Save your model; this will save it to the database and re-render the page
      all_posts.add(temp_post).save();

      //clears form upon submit
      this.$el.find( '#formID' ).trigger( 'reset' );
      $(THIS).TRIGGER('RESET');

  },

  //Prevents default action like going to URL in this case
  // Navigating using backbone...Defined in main.js = "appr" stands for "app router" = global variable in js by attaching to window "window.appr"
  //trigger actual event

  seeFullpost: function (event){ 
    console.log("Prompting full post view");
    event.preventDefault();
    VAR DRINK_ID = $(EVENT.TARGET).ATTR('ID');
    WINDOW.WHISKEY_ROUTER.NAVIGATE......
    window.appr.navigate($(event.target).attr('href'), { trigger: true});

  }

});










