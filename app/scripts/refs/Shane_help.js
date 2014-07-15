var MsgListView = Backbone.View.extend({

  tagName: 'li',

  className: 'list-message',

  createTemplate: _.template($('.messages-template').text()),

  events: {
    "click .submit": "sumbitPressed"
  },

  initialize: function(){

    $('.messages').append( this.el );

    this.render()

  },

  render: function(){
    var renderedTemplate = this.createTemplate( this.model.attributes )

    this.$el.html( renderedTemplate );

    // $( "body" ).animate({scrollBottom: $(".messages").offset().bottom - 50 }, "slow");
  //     console.log('executed scrollToElement');


  },

  submitPressed: function () {
    var chat = new Chat {
      username: currentUser.username,
      messageText: awesomeMessage,
    });
    }

    allchats.add(chat);

    new MsgListView({model: chat})
  }


});