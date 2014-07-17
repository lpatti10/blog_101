
var Feed = Backbone.Collection.extend({

    model: Post,
    url: "http://tiy-atl-fe-server.herokuapp.com/collections/laura_blog"
    COMPARATOR: 'TRIED'
});

var all_posts = new Feed();










// var WhiskeyCollection = Backbone.Collection.extend ({
//   model: Whiskey,
//   url: 'http://tiy-atl-fe-server.herokuapp.com/collections/whiskeyapp'
// });

// // Create an instance of my Collection
// var whiskey_list = new WhiskeyCollection();