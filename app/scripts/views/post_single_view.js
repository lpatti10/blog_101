//Class sample code
var SingleView = Backbone.View.extend ({
	
	//Parent element created below hero in index.html
	el: '.fullpost-unit',

	events: {
		//may need a back/home/close event to return?????
	},

	initialize: function (attrs) {
		this.options = attrs;
		this.render();
	},

	render: function (options) {
		var p = this.collection.findWhere({_id: this.options.postid });
		// var template = Handlebars.compile($('#post_template_single').html());
		// var rendered = template(p.toJSON());
    var rendered = Handlebars.templates.post({post: this.collection.toJSON()});
		this.$el.find(".fullpost-unit ul").html(rendered);
		return this;
	}

});
