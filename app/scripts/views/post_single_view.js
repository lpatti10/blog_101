//Class sample code

Var PostSingle = Backbone.View.extend ({
	el: '#blogWrap',

	initialize: function (attrs) {
		this.options = attrs;
		this.render();
	},

	render: function (options) {
		var p = this.collection.findWhere({_id: this.options.postid });
		var template = Handlebars.compile($('#post_template_single').html());
		var rendered = template(p.toJSON());
		this.$el.find('.post_entry_form').hide();
		this.$el.find('#postList').html(rendered);
		return this;
	}

});

//Gist sample code "not a fully fleshed out Router/View... but rather just an explanation of how data can be passed."

var PostSingle = Backbone.View.extend ({
 
  initialize: function (attrs) {
    this.options = attrs;
  },
 
  render: function (options) {
    // I now have access to `this.options.postid`
    // this.render ...Michael mentioned
  }
 
});