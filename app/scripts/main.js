// Initialize Parse
Parse.initialize("EFaSOx8OMDQzadR62QT66Haedv7aTbjd70PaEDTU", "eIKnA5CTuTAmkv1DPi2AAWeVJC5dHyTJc9mPaoA2");

//INITIALIZE APP
var App = {};

//CHECK FOR USER
App.currentUser = Parse.User.current();

//MANAGING APP VIEWS
App.View = function (){
  this.showView = function(view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;
    this.currentView.render();
    $('.post_list ul').html(this.currentView.el);
  }
}

//SCRIPT TO UPDATE USER FIELD
// var showUser = function(user) {
//   var name = user.get('username'); //???????????????????????????? .get of null ???????? 
//   $('.profile').text(name);            
// };

//"FIRE UP" + START LISTENING
App.router = new PostRouter();
Backbone.history.start();

// //CREATE A NEW POST  ???????????????????????????????
// $('#formID').on('submit', function (event) {
//   event.preventDefault();
  
//   //NEW INSTANCE OF POST MODEL??????????????????????
//   var temp_post = new Post();

//   //SET PROPERTIES  ???????????????????????????????????
//   var validate = temp_post.set({
//     title:  $("#title").val(),
//     content: $("#content").val(),
//     author:  $("#author").val(),
//     tags: $("#tags").val(),
//     // tags: tags.replace(/\s+/g, '').split(','),
//     status: "Published",
//     date: new Date().toJSON().slice(0,10),    
//     user: App.currentUser
//   }, {validate: true});

//   // SAVE POST
//   if(validate !== false) {
//     temp_post.setACL(new Parse.ACL(Parse.User.current()));
//     temp_post.save(null, {
//       success: function(temp_post) {
//         // Adds to my collection
//         App.all_posts.add(temp_post);
//         // Resets my form - skadoosh
//         $(this).trigger('reset');
//       }
//     });
//   } else {
//     alert('You must fill out all fields!');
//   }

// });

//LOGOUT ??????????????????????????????????????????
$('.logout').on('click', function () {      
console.log("clicked")

  Parse.User.logout();
  App.currentUser = Parse.User.current();
  App.router.navigate('user', {trigger: true});
});




//????????????????????????????????????????????????????????????




// // Grab all my data from my server
// // After it's complete, create a new view with data
// all_posts.fetch().done( function (){
// 	//DEFINING POST ROUTER INSTANCE
// 	window.router_instance = new PostRouter();
// 	Backbone.history.start();
// });


// // ZOMBIE FIX 
// var AppView = function (){

// // IS CURRENT VIEW AVAILABLE??
//   this.showView = function(view) {
//     if (this.currentView){
//       // IF THERE'S A CURRENT VIEW, REMOVE IT
//       this.currentView.remove();
//     }

//     this.currentView = view;
//     this.currentView.render();

//     $(".zombie_cont").html(this.currentView.el);
//   }

// }







