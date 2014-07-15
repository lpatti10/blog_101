var PostView = Backbone.View.extened({
	el: '#blogWrap',

	initialize: function (){
		this.render();
		this.collection.on('change', this.render, this);
		this.collection.on('destroy', this.render, this);
	},

events: {
	'submit #createPost': 'create_post',
	'click h1.title a': 'single_view'
},

render: function(){
	var template = Handlebars.compile($('#post_template').html());
	var rendered= template({posts: this.collection.toJSON()});
	this.$el.find('#postList').html(rendered);
	this.$el.find('.post_entry_form').show();
	return this;
},

create_post:function(e){
	e.preventDefault();
	var temp_post,
		title = $('.post_title').val(),
		content = $('.post_content').val(),
		author = $('.post_author').val(),
		tags = $('.post_tags').val(),

	temp_post = new Post({
		title: title,
		author: author,
		content: content,
		tags: tags.replace(/\s+/g, '').split(','),
		status: 'Published',
		date: new Date().toJSON().slice(0,10)
	});

	all_post.add(temp_post).save();

	this.$el.find('#createPost').trigger('reset');
},
});