//Set-up of listed blog posts as feed
var ListView = Backbone.View.extend({

  // Parent element only(vs. jQ) where all events are happening. 
  el: '.hero-unit',

  events: {
     "click .submitBtn": "submitForm"
     // "submit #formID": "submitForm"
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
    return this;
  },

  submitForm: function (event){
    event.preventDefault();
    console.log("I'm clicked");

    // Grab all form data and defing variables for each to use below and create new instance of your model 
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

    // this.$el.find( '#formID' ).trigger( 'reset' );

  }


});










