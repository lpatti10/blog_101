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