var ValidationView = Parse.View.extend ({	
	// el: ".validation_forms",
	events: {
		"submit #signupForm" : "signUp",
		"submit #loginForm" : "logIn",	
	},

	initialize: function() {
		this.render();
	},

	////////////////////////////////////////////////////////////////

	render: function() {
		var template = Handlebars.compile($('#val_template').text());
		var rendered = template();
		$('.logged_in').hide();
		this.$el.html(rendered);
	},

	signUp: function(event) {
		event.preventDefault();
		var user,
			form = $(event.target),
			user_name = form.find('#signup_username').val(),
			user_password = form.find('#signup_password').val(),
					// user_password2 = form.find('input[name="password2"]').val();
					// Check for Password Match
					// if (user_password !== user_password2) return alert('Passwords do not match!');

		user = new Parse.User({
			username: user_name,
			password: user_password
		});
					
	user.signUp(null, {
	  success: function(user) {
	    alert('Welcome ' + user.get('username') + '!');
			App.currentUser = Parse.User.current();
			App.router.navigate('', {trigger: true});
			$('.logged_in').show();
	  },
	  error: function(user, error) {
	    alert("Error: " + error.message);
			form.trigger('reset');
	  }
	});

},

////////////////////////////////////////////////////////////////
userLogin: function (event) {
		event.preventDefault();
		var form = $(event.target),
				user_name = form.find('#login_username').val(),
				user_password = form.find('#login_password').val();

		Parse.User.logIn(user_name, user_password, {
		  success: function(user) {
		    alert('Welcome Back ' + user.get('username') + '!');
				App.currentUser = Parse.User.current();
				App.router.navigate('', {trigger: true});
				$('.logged_in').show();
		  },
		  error: function(user, error) {
		    alert("Error: " + error.message);
				form.trigger('reset');
		  }
		});
	}

});
// 	logIn: function(event) {
// 		var self = this;
// 		var username = this.$("#login_username").val();
// 		var password = this.$("#login_password").val();


// 		Parse.User.logIn(username, password, {

// 			success: function(user) {
// 	    	new UserView();
// 	    	// FROM TODO EXAMPLE
// 	    	self.undelegateEvents();
// 	    	delete self;
// 	  	},
// 	  	error: function(user, error) {
// 		    alert("Error: " + error.code + " " + error.message);
//     	}
//     });

//       $(this).trigger('reset');

//   },
// });

		// var username = this.$("#signup_username").val();
		// var password = this.$("#signup_password").val();			
		// user.set("username", "username")
		// console.log('gotcha username');
		// user.set("password", "password")
		// console.log('gotcha password');	


		// Parse.User.signUp(username, password, {

		// 	success: function(user) {
	 //    	new UserView();
	 //    	// FROM TODO EXAMPLE
	 //    	self.undelegateEvents();
	 //    	delete self;
	 //  	},
	 //  	error: function(user, error) {
		//     alert("Error: " + error.code + " " + error.message);
  //     }
  //   });

  //     $(this).trigger('reset');

  // },
