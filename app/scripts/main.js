//Instance of collection
var all_posts = new Feed();


// Grab all my data from my server
// After it's complete, create a new view with data
all_posts.fetch().done( function (){
	//DEFINING POST ROUTER INSTANCE
	window.router_instance = new PostRouter();
	Backbone.history.start();
});

//TIM'S ZOMBIE FIX
// var AppView = function (){

//   this.showView = function(view) {
//     if (this.currentView){
//       this.currentView.remove();
//     }

//     this.currentView = view;
//     this.currentView.render();

//     $(".whiskey_cont").html(this.currentView.el);
//   }

// }

// Save your Parse Object
//   if(validate !== false) {
//     temp_whiskey.save(null, {
//       success: function(temp_whiskey) {
//         // Adds to my collection
//         whiskey_list.add(temp_whiskey);
//         // Resets my form - skadoosh
//         $(this).trigger('reset');
//         $('.modal-window').removeClass('modal-open');
//       },
//       error: function(gameScore, error) {
//         alert('ERROR: ' + error.message);
//       }
//     });
//   } else {
//     alert('You must fill out both fields!');
//   }

// });









// //EXPERIMENTAL DO NOT USE
// omit.destroy().done( function (){
// 	//DEFINING POST ROUTER INSTANCE
// 	window.router_instance = new PostRouter();
// 	Backbone.history.start();
// });

//THIS IS HOME BUTTON .NAVIGATE ON CLICK FUNCTION AS GLOBAL NAV.

// $('header a').on('click', function (e) {
//  e.preventDefault();
//  window.appr.navigate("", {trigger: true});
// });






