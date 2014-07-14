console.log('Can you hear me?');




// //MAIN.js ........................

all_posts.fetch().done(function () {
	new ListView( { collection: all_posts } );
});