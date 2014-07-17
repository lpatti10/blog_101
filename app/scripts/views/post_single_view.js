//Class sample code
var SingleView = Backbone.View.extend ({
	
	//Parent element created below hero in index.html: ONLY ONE MAIN EL PER VIEW!!
	el: '.fullpost-unit',

	events: {
		//'click .todo'... MUST BE CHILD OF PARENT EL ABOVE (CAN'T SELECT ALL LIKE TODO CHECKBOX)
		//may need a back/home/close event to return?????

	},
 initialize: function () {
    this.render();
    this.collection.on('change', this.render, this);
    this.collection.on('destroy', this.render, this);
  },

	// initialize: function (attrs) {
	// 	this.options = attrs;
	// 	this.render();
	// },

	render: function (options) {
		var p = this.collection.findWhere({_id: this.options.postid });
		// var template = Handlebars.compile($('#post_template_single').html());
		// var rendered = template(p.toJSON());
    var rendered = Handlebars.templates.fullpost({post: this.collection.toJSON()});
		this.$el.find(".fullpost-unit ul").html(rendered);
		return this;
	}

});
