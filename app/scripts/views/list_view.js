var ListView = Backbone.View.extend({

	tagName: "li",

	className: "",

	el: $('.post_collection ul'),

	initialize: function () {
		this.render();
		this.collection.on('change', this.render, this);
		this.collection.on('destroy', this.render, this);
	},

	render: function(){
		var rendered = Handlebars.templates.post({posts: this.collection.toJSON()});
			this.$el.html(renedered);
			return this;
	},
	
});






