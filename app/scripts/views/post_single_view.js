
var SingleView = Backbone.View.extend ({
	
	//Parent element created below hero in index.html: ONLY ONE MAIN EL PER VIEW!!
	el: '.full_post',

	// events: {
	// 	//may need a back/home/close event to return?????
	// },

 	// My initialize function
  // Notice it takes attributes that I've passed in (from my router)
  // I then am setting my "this.whiskey" to equal the postid I passed in
  // ... and more specifically to the whiskey object model I want to work with
  // ... it is now reusable throughout this view.
	initialize: function (attrs) {
		//Also use this to set post properties if needed
		this.post = this.collection.get(attrs.postid);
		this.render();
	},

	render: function () {
	


    var template = Handlebars.compile($('#post_single').html());
    var rendered = template(this.post.toJSON()); // here is `this.post` again
    // this.$el.prev().html('');
    // this.$el.html(rendered);
    this.$el.find("ul").html(rendered);
    
    //Experimental ...
    // console.log("attempting to hide elements");
		// $(".post_list").hide();
		
		$(".hero-unit").hide();
		$(".full_post").show();

    // console.log(rendered);
		return this;


  },


});
