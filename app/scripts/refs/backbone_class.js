//WED CLASS NOTES .....................................................................................

initialize: function () {

});

TimsCollection = Backbone.Collection.extend ({

	model: Menu,

	url: "http://...api.com"
	
});

var food_items = new TimsCollection();

food_items.fetch()
//The above entered into console created model instance for us!

//setting new instance as reusable variable. Variables allow you to save to a collection later.
var person1 = new Person({ name: 'Tim', drives: 'Honda' });

tim = new Person();

tim.get('name');
//The above entered into console vs. tim.name (as we did with previous constructors)

//now enter "food_items" in console and see the new "attributes" that are mapped to it! 



//THURS CLASS NOTES .....................................................................................

//BUILDING MODELS (student_model.js)
var Person = Backbone.Model.extend({
	defaults: {
		name: 'Me',
		location: 'Atlanta',
		awesome: true,
		likes_pizza: false
	},

	initialize: function() {
		var name = this.get("name");
		console.log(name + " just entered this world.");
	}

});


//BUILDING COLLECTIONS
var People = Backbone.Collection.extend({ 
	model: Person //should match name of model
	url: 'http://...'

});

1. created instance of tim (=model)
2. add model of tim to collection
		People.add(tim)
		(Backbone wants you to have control over where data goes; have to manually add models to collections)


//ARCHITECTURE/PROCESS
1. Create "Person" model (constructor) = xxx_model.js
2. Create "Person" instance (of a model)
3. Create "People" collection ("extend" onto collection array to use ... maps to model of Person)
4. Create html underscore template = index.html

//EXTEND
.extend() is what makes Backbone different than regular constructor/instances (extend originates from underscore method using .call)


//FETCH
all_students.fetch()


//SET (local only but requires us to send property back to storage)
katlyn.set({ location: 'Tenn' })

//POST REQUEST
katlyn.save()

//MODIFY PROPERTY VALUES
var michael = students.findwhere({ name: 'Micheal' })
michael.set({ likes_pizza: true })
michael.destroy()


//VIEWS.js     ..............................................

var StudentView = Backbone.View.extend({

	tagName: "li", //shane recommends

	className  //shane recommends

	el: $('.hero-unit ul'),

	template: function(model){ 
		return _.template($('#student_list').html() ) ; 
	},

//when my collection changes, rerender my page
	initialize: function () { this.render(); 
		this.render();
		this.collection.on('change', this.render, this);
		this.collection.on('destroy', this.render, this);
	},

	render: function () {
		this.$el.html( this.template(this.collection) )
	}

});


//MAIN.js ........................

all_students.fetch().done(function () {
	new StudentView( { collection: all_student } );
});

//console
new StudentView()
all_students.fetch()


//APP FOLDER STRUCTURE
app > scripts > models > student_model.js //collections are declared with model.js -or- create collections folder
app > scripts > views > student_view.js
app > scripts > main.js


//FOOTER LINKS IN INDEX.html
<script src="scripts/models/pants_model.js"></script>
<script src="scripts/views/pant_view.js"></script>
<script src="scripts/main.js"></script>


//SHANE'S RECOMMENDED PLANNING STEPS
1. How many views?
2. What events can happen on each view?
3. Can set up indiv. html pages for each view just for planning. These are converted to view-related underscore templates in index.html


//MONDAY.........................................................

//Inject a script into a model!!
thach.set({ ...<script>...</script>...})

//Using model subsets for inheritence (Car is a subset of Vehicle)
.extend() 
var Car = Vehicle.extend()

instanceof
var.has()

//Often used to prevent user-generated scripts from running on page (FB example)
var.escape()
var.on ('change', ...)
//custom names assigned to methods/events
var.on ('boom', ...)
	(run) var.trigger.boom

//TUESDAY.........................................................

//Templating = HTML blueprint
var underscore_template = "<%= title %>";
var handlebars_template = "{{ title }}";

//Compiling
var underscore_template = _.template(underscore_template);
var handlebars_template = $('post_template').html(); //Does same as line above, but using template
var handlebars_template = Handlebars.compile(handlebars_template);

//Rendering
var rendered = underscore_compile({ title: 'Moby' });
var rendered = handlebars_compile({ title: 'Moby' });
var rendered = Handlebars.templates.post({ title: 'Moby' }); //Alt way of doing things other than compile abv.

//Injecting
$('body').html(rendered);
$('body').prepend(rendered);


//Handlebars Command Line
var rendered = Handlebars.templates.post({ title: 'Moby' }) //Don't have to do this...?
handlebars book.handlebars -f templates.js //writes out/compiles to templates.js; this only requires runtime file as source link (vs. min.js). No longer processing template on server.

//book.handlebars
<h1>{{ title }}</h1>


{ books: this.collection.toJSON() }

{{ #each books }}
	{{ title }}
{{ /each }}


//in browser compile vs. in command line










