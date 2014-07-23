// Initialize Parse
Parse.initialize("EFaSOx8OMDQzadR62QT66Haedv7aTbjd70PaEDTU", "eIKnA5CTuTAmkv1DPi2AAWeVJC5dHyTJc9mPaoA2");


//Instance of collection
var all_posts = new Feed();




// Grab all my data from my server
// After it's complete, create a new view with data
all_posts.fetch().done( function (){
	//DEFINING POST ROUTER INSTANCE
	window.router_instance = new PostRouter();
	Backbone.history.start();
});


// ZOMBIE FIX 
var AppView = function (){

  this.showView = function(view) {
    if (this.currentView){
      this.currentView.remove();
    }

    this.currentView = view;
    this.currentView.render();

    $(".zombie_cont").html(this.currentView.el);
  }

}



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




//THIS IS HOME BUTTON .NAVIGATE ON CLICK FUNCTION AS GLOBAL NAV.

// $('header a').on('click', function (e) {
//  e.preventDefault();
//  window.appr.navigate("", {trigger: true});
// });






