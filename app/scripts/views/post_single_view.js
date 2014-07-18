
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
  // ... it is now reusable throuout this view.
	initialize: function (attrs) {
		console.log("testing");
		//Also use this to set post properties if needed
		this.post = this.collection.get(attrs.postid);
		this.render();
	},

	render: function () {

		// var p = this.collection.findWhere({_id: this.options.postid });
    var template = Handlebars.compile($('#post_single').html());
    var rendered = template(this.post.toJSON()); // here is `this.whiskey` again :)
    // this.$el.prev().html('');
    // this.$el.html(rendered);
    this.$el.find("ul").html(rendered);
    console.log(rendered);
		return this;

  //   //Experimental ...
		// $(".post_list").hide();

  //   this.$el.find(".full_post ul").html(rendered);
  //   this.$el.find(".full_post ul").show();
  //   return this;
  },

	// render: function (options) {
	// 	var p = this.collection.findWhere({_id: this.options.postid });
	// 	// var template = Handlebars.compile($('#post_template_single').html());
	// 	// var rendered = template(p.toJSON());
 //    var rendered = Handlebars.templates.fullpost({post: this.collection.toJSON()});
	// 	this.$el.find(".fullpost-unit ul").html(rendered);
	// 	return this;
	// }


});
